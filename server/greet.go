package server

import (
	"context"
	"grpc-stream/pb"
)

func (server *Server) Greet(ctx context.Context, req *pb.GreetRequest) (*pb.GreetResponse, error) {
	firstName := req.GetFirstname()
	result := "Hello " + firstName

	res := &pb.GreetResponse{
		Result: result,
	}
	return res, nil
}
