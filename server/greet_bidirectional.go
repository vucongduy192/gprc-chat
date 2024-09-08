package server

import (
	pb "grpc-stream/pb"
	"io"

	"github.com/rs/zerolog/log"
)

func (server *Server) GreetBiDirectionalStream(stream pb.ProtocService_GreetBiDirectionalStreamServer) error {
	for {
		req, err := stream.Recv()
		if err == io.EOF {
			return nil
		}
		if err != nil {
			log.Fatal().Err(err).Msg("Error while reading client stream")
			return err
		}

		firstName := req.GetFirstname()
		result := "Hello " + firstName + "!"

		err = stream.Send(&pb.BiDirectionalGreetResponse{
			Result: result,
		})
		if err != nil {
			log.Fatal().Err(err).Msg("Error while sending server stream")
			return err
		}

	}
}
