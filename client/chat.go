package main

import (
	"bufio"
	"context"
	"crypto/sha256"
	"encoding/hex"
	"flag"
	"fmt"
	pb "grpc-stream/pb"
	"os"
	"sync"
	"time"

	"github.com/rs/zerolog/log"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var client pb.BroadcastClient
var wait *sync.WaitGroup

func init() {
	wait = &sync.WaitGroup{}
}

func connect(user *pb.User) error {
	var streamerror error
	stream, err := client.CreateStream(context.Background(), &pb.Connect{
		User:   user,
		Active: true,
	})

	if err != nil {
		log.Fatal().Err(err).Msg("unable to create stream")
	}

	wait.Add(1)
	go func(str pb.Broadcast_CreateStreamClient) {
		defer wait.Done()
		for {
			msg, err := str.Recv()
			if err != nil {
				streamerror = fmt.Errorf("error reading message: %v", err)
				break
			}
			log.Info().Msgf("%v : %s", msg.Id, msg.Content)
		}

	}(stream)
	return streamerror
}

func main() {
	done := make(chan int)
	timestamp := time.Now()

	name := flag.String("N", "Anon", "The name of the user")
	flag.Parse()

	id := sha256.Sum256([]byte(timestamp.String() + *name))

	conn, err := grpc.NewClient("0.0.0.0:9090", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatal().Err(err).Msg("unable to connect server")
	}
	client = pb.NewBroadcastClient(conn)
	user := &pb.User{
		Id:   hex.EncodeToString(id[:]),
		Name: *name,
	}

	fmt.Print(client)
	connect(user)

	wait.Add(1)
	go func(client pb.BroadcastClient) {
		defer wait.Done()

		scanner := bufio.NewScanner(os.Stdin)
		for scanner.Scan() {
			msg := &pb.Message{
				Id:        user.Id,
				Content:   scanner.Text(),
				Timestamp: timestamp.String(),
			}
			_, err := client.BroadcastMessage(context.Background(), msg)
			if err != nil {
				log.Fatal().Err(err).Msg("unable to send message")
			}
		}
	}(client)

	go func() {
		wait.Wait()
		close(done)
	}()

	<-done

}
