import * as jspb from 'google-protobuf'



export class GreetRequest extends jspb.Message {
  getFirstname(): string;
  setFirstname(value: string): GreetRequest;

  getLastname(): string;
  setLastname(value: string): GreetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GreetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GreetRequest): GreetRequest.AsObject;
  static serializeBinaryToWriter(message: GreetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GreetRequest;
  static deserializeBinaryFromReader(message: GreetRequest, reader: jspb.BinaryReader): GreetRequest;
}

export namespace GreetRequest {
  export type AsObject = {
    firstname: string,
    lastname: string,
  }
}

export class ServerStreamGreetRequest extends jspb.Message {
  getFirstname(): string;
  setFirstname(value: string): ServerStreamGreetRequest;

  getLastname(): string;
  setLastname(value: string): ServerStreamGreetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServerStreamGreetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ServerStreamGreetRequest): ServerStreamGreetRequest.AsObject;
  static serializeBinaryToWriter(message: ServerStreamGreetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServerStreamGreetRequest;
  static deserializeBinaryFromReader(message: ServerStreamGreetRequest, reader: jspb.BinaryReader): ServerStreamGreetRequest;
}

export namespace ServerStreamGreetRequest {
  export type AsObject = {
    firstname: string,
    lastname: string,
  }
}

export class ClientStreamGreetRequest extends jspb.Message {
  getFirstname(): string;
  setFirstname(value: string): ClientStreamGreetRequest;

  getLastname(): string;
  setLastname(value: string): ClientStreamGreetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientStreamGreetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientStreamGreetRequest): ClientStreamGreetRequest.AsObject;
  static serializeBinaryToWriter(message: ClientStreamGreetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientStreamGreetRequest;
  static deserializeBinaryFromReader(message: ClientStreamGreetRequest, reader: jspb.BinaryReader): ClientStreamGreetRequest;
}

export namespace ClientStreamGreetRequest {
  export type AsObject = {
    firstname: string,
    lastname: string,
  }
}

export class BiDirectionalGreetRequest extends jspb.Message {
  getFirstname(): string;
  setFirstname(value: string): BiDirectionalGreetRequest;

  getLastname(): string;
  setLastname(value: string): BiDirectionalGreetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BiDirectionalGreetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BiDirectionalGreetRequest): BiDirectionalGreetRequest.AsObject;
  static serializeBinaryToWriter(message: BiDirectionalGreetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BiDirectionalGreetRequest;
  static deserializeBinaryFromReader(message: BiDirectionalGreetRequest, reader: jspb.BinaryReader): BiDirectionalGreetRequest;
}

export namespace BiDirectionalGreetRequest {
  export type AsObject = {
    firstname: string,
    lastname: string,
  }
}

export class GreetResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): GreetResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GreetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GreetResponse): GreetResponse.AsObject;
  static serializeBinaryToWriter(message: GreetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GreetResponse;
  static deserializeBinaryFromReader(message: GreetResponse, reader: jspb.BinaryReader): GreetResponse;
}

export namespace GreetResponse {
  export type AsObject = {
    result: string,
  }
}

export class ServerStreamGreetResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): ServerStreamGreetResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServerStreamGreetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ServerStreamGreetResponse): ServerStreamGreetResponse.AsObject;
  static serializeBinaryToWriter(message: ServerStreamGreetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServerStreamGreetResponse;
  static deserializeBinaryFromReader(message: ServerStreamGreetResponse, reader: jspb.BinaryReader): ServerStreamGreetResponse;
}

export namespace ServerStreamGreetResponse {
  export type AsObject = {
    result: string,
  }
}

export class ClientStreamGreetResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): ClientStreamGreetResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientStreamGreetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientStreamGreetResponse): ClientStreamGreetResponse.AsObject;
  static serializeBinaryToWriter(message: ClientStreamGreetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientStreamGreetResponse;
  static deserializeBinaryFromReader(message: ClientStreamGreetResponse, reader: jspb.BinaryReader): ClientStreamGreetResponse;
}

export namespace ClientStreamGreetResponse {
  export type AsObject = {
    result: string,
  }
}

export class BiDirectionalGreetResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): BiDirectionalGreetResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BiDirectionalGreetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BiDirectionalGreetResponse): BiDirectionalGreetResponse.AsObject;
  static serializeBinaryToWriter(message: BiDirectionalGreetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BiDirectionalGreetResponse;
  static deserializeBinaryFromReader(message: BiDirectionalGreetResponse, reader: jspb.BinaryReader): BiDirectionalGreetResponse;
}

export namespace BiDirectionalGreetResponse {
  export type AsObject = {
    result: string,
  }
}

