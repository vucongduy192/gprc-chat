package server

import (
	"grpc-stream/pb"
	"strconv"
	"time"

	"github.com/rs/zerolog/log"
)

func (server *Server) GreetServerStream(req *pb.ServerStreamGreetRequest, stream pb.ProtocService_GreetServerStreamServer) error {
	firstName := req.GetFirstname()
	for i := 0; i < 10; i++ {
		result := "Hello " + firstName + " number " + strconv.Itoa(i)
		res := &pb.ServerStreamGreetResponse{
			Result: result,
		}
		err := stream.Send(res)

		if err != nil {
			log.Fatal().Err(err).Msg("Error while sending server stream")
		}

		time.Sleep(1000 * time.Millisecond)
	}
	return nil
}
