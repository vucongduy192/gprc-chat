package server

import (
	"context"
	pb "grpc-stream/pb"
	"grpc-stream/util"
	"sync"

	"github.com/rs/zerolog/log"
)

type Connection struct {
	stream pb.Broadcast_CreateStreamServer
	id     string
	active bool
	error  chan error
}

type Server struct {
	pb.UnimplementedBroadcastServer
	pb.UnimplementedProtocServiceServer
	config      util.Config
	connections []*Connection
}

func (server *Server) CreateStream(pconn *pb.Connect, stream pb.Broadcast_CreateStreamServer) error {
	for _, conn := range server.connections {
		if conn.id == pconn.User.Id {
			log.Warn().Msgf("unable to use exist user_id: %v", conn.id)
			return nil
		}
	}

	conn := &Connection{
		stream: stream,
		id:     pconn.User.Id,
		active: true,
		error:  make(chan error),
	}
	log.Info().Msgf("new connection: %s - %s", pconn.User.Id, pconn.User.Name)

	server.connections = append(server.connections, conn)
	return <-conn.error
}

func (server *Server) BroadcastMessage(ctx context.Context, msg *pb.Message) (*pb.Close, error) {
	wait := sync.WaitGroup{}
	done := make(chan int)
	for _, conn := range server.connections {
		wait.Add(1)

		go func(msg *pb.Message, conn *Connection) {
			defer wait.Done()
			if conn.active {
				err := conn.stream.Send(msg)
				log.Info().Msgf("sending message %v to: %v", msg.Content, conn.stream)

				if err != nil {
					log.Warn().Msgf("connection error with: %v", conn.id)
					conn.active = false
					conn.error <- err
				}
			}
		}(msg, conn)
	}

	go func() {
		wait.Wait()
		close(done)
	}()

	<-done
	return &pb.Close{}, nil
}

func NewServer(config util.Config) (*Server, error) {
	var connections []*Connection
	server := &Server{
		config:      config,
		connections: connections,
	}
	return server, nil
}
