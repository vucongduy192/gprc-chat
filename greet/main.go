package main

import (
	"context"
	pb "grpc-stream/pb"
	"io"
	"time"

	"github.com/rs/zerolog/log"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func callServerStreamGreet(client pb.ProtocServiceClient) {
	req := &pb.ServerStreamGreetRequest{
		Firstname: "John",
		Lastname:  "Wick",
	}

	responses, err := client.GreetServerStream(context.Background(), req)
	if err != nil {
		log.Fatal().Err(err).Msg("call GreetServerStream failed")
	}
	for {
		msg, err := responses.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal().Err(err).Msg("read GreetServerStream responses failed")
		}
		log.Info().Msg(msg.GetResult())
	}
}

func callClientStreamGreet(client pb.ProtocServiceClient) {
	requests := []*pb.ClientStreamGreetRequest{
		{
			Firstname: "John 1",
			Lastname:  "Wick",
		},
		{
			Firstname: "John 2",
			Lastname:  "Wick",
		},
		{
			Firstname: "John 3",
			Lastname:  "Wick",
		},
		{
			Firstname: "John 4",
			Lastname:  "Wick",
		},
	}

	stream, err := client.GreetClientStream(context.Background())
	if err != nil {
		log.Fatal().Err(err).Msg("call GreetClientStream failed")
	}
	for _, req := range requests {
		log.Info().Msgf("sending req: %v", req)
		err = stream.Send(req)
		if err != nil {
			log.Fatal().Err(err).Msg("send GreetClientStream request failed")
		}
		time.Sleep(1000 * time.Millisecond)
	}

	res, err := stream.CloseAndRecv()
	if err != nil {
		log.Fatal().Err(err).Msg("read GreetServerStream responses failed")
	}
	log.Info().Msg(res.GetResult())
}

func callBiDirectionalGreet(client pb.ProtocServiceClient) {
	stream, err := client.GreetBiDirectionalStream(context.Background())
	if err != nil {
		log.Fatal().Err(err).Msg("call GreetBiDirectional stream failed")
		return
	}

	requests := []*pb.BiDirectionalGreetRequest{
		{
			Firstname: "John 1",
			Lastname:  "Wick",
		},
		{
			Firstname: "John 2",
			Lastname:  "Wick",
		},
		{
			Firstname: "John 3",
			Lastname:  "Wick",
		},
		{
			Firstname: "John 4",
			Lastname:  "Wick",
		},
	}

	waitc := make(chan struct{})
	go func() {
		for {
			msg, err := stream.Recv()
			if err == io.EOF {
				close(waitc)
				return
			}
			if err != nil {
				log.Fatal().Err(err).Msg("read GreetBiDirectionalStream responses failed")
			}
			log.Info().Msg(msg.GetResult())
		}
	}()
	for _, req := range requests {
		log.Info().Msgf("sending req: %v", req)
		err = stream.Send(req)
		if err != nil {
			log.Fatal().Err(err).Msg("send GreetClientStream request failed")
		}
		time.Sleep(1000 * time.Millisecond)
	}

	stream.CloseSend()
	<-waitc
}

func main() {
	server_address := "0.0.0.0:9090"
	conn, err := grpc.NewClient(server_address, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatal().Err(err).Msg("unable to connect to server")
	}
	defer conn.Close()

	client := pb.NewProtocServiceClient(conn)
	// callServerStreamGreet(client)
	callClientStreamGreet(client)
	// callBiDirectionalGreet(client)
}
