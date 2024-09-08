package main

import (
	pb "grpc-stream/pb"
	"grpc-stream/server"
	"grpc-stream/util"
	"net"
	"os"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func grpc_server(config util.Config) {
	server, err := server.NewServer(config)
	if err != nil {
		log.Fatal().Err(err).Msg("unable to create server")
	}

	gprcLogger := grpc.UnaryInterceptor(util.GrpcLogger)
	grpcServer := grpc.NewServer(gprcLogger)

	pb.RegisterProtocServiceServer(grpcServer, server)
	pb.RegisterBroadcastServer(grpcServer, server)
	reflection.Register(grpcServer)

	listener, err := net.Listen("tcp", "0.0.0.0:9090")
	if err != nil {
		log.Fatal().Err(err).Msg("unable create listener")
	}

	log.Info().Msgf("start gRPC gateway server at %s", listener.Addr().String())
	err = grpcServer.Serve(listener)
	if err != nil {
		log.Fatal().Err(err).Msg("unable start gRPC server")
	}
}

func main() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal().Err(err).Msg("unable to load env")
	}
	if config.Environment == "development" {
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
	}

	grpc_server(config)
}
