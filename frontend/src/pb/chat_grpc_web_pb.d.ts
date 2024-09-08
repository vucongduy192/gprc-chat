import * as grpcWeb from 'grpc-web';

import * as chat_pb from './chat_pb'; // proto import: "chat.proto"


export class BroadcastClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createStream(
    request: chat_pb.Connect,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<chat_pb.Message>;

  broadcastMessage(
    request: chat_pb.Message,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: chat_pb.Close) => void
  ): grpcWeb.ClientReadableStream<chat_pb.Close>;

}

export class BroadcastPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createStream(
    request: chat_pb.Connect,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<chat_pb.Message>;

  broadcastMessage(
    request: chat_pb.Message,
    metadata?: grpcWeb.Metadata
  ): Promise<chat_pb.Close>;

}

