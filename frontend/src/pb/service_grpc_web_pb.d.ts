import * as grpcWeb from 'grpc-web';

import * as greet_pb from './greet_pb'; // proto import: "greet.proto"
import * as chat_pb from './chat_pb'; // proto import: "chat.proto"


export class ProtocServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  greet(
    request: greet_pb.GreetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: greet_pb.GreetResponse) => void
  ): grpcWeb.ClientReadableStream<greet_pb.GreetResponse>;

  greetServerStream(
    request: greet_pb.ServerStreamGreetRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<greet_pb.ServerStreamGreetResponse>;

  connect(
    request: chat_pb.ConnectRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: chat_pb.ConnectResponse) => void
  ): grpcWeb.ClientReadableStream<chat_pb.ConnectResponse>;

  sendMessage(
    request: chat_pb.SendMessageRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: chat_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<chat_pb.Empty>;

  getMessage(
    request: chat_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<chat_pb.GetMessageResponse>;

  getUsers(
    request: chat_pb.Empty,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: chat_pb.GetUsersResponse) => void
  ): grpcWeb.ClientReadableStream<chat_pb.GetUsersResponse>;

}

export class ProtocServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  greet(
    request: greet_pb.GreetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<greet_pb.GreetResponse>;

  greetServerStream(
    request: greet_pb.ServerStreamGreetRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<greet_pb.ServerStreamGreetResponse>;

  connect(
    request: chat_pb.ConnectRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<chat_pb.ConnectResponse>;

  sendMessage(
    request: chat_pb.SendMessageRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<chat_pb.Empty>;

  getMessage(
    request: chat_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<chat_pb.GetMessageResponse>;

  getUsers(
    request: chat_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): Promise<chat_pb.GetUsersResponse>;

}

