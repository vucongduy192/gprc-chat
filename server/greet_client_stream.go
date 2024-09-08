package server

import (
	pb "grpc-stream/pb"
	"io"

	"github.com/rs/zerolog/log"
)

func (server *Server) GreetClientStream(stream pb.ProtocService_GreetClientStreamServer) error {
	result := ""
	for {
		req, err := stream.Recv()
		if err == io.EOF {
			return stream.SendAndClose(&pb.ClientStreamGreetResponse{
				Result: result,
			})
		}
		if err != nil {
			log.Fatal().Err(err).Msg("Error while reading client stream")
		}

		firstName := req.GetFirstname()
		result += "Hello " + firstName + "! "
	}
}
