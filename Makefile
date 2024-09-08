server:
	go run main.go

client:
	go run client/client.go

protoc:
	rm -rf pb/*.go
	protoc --proto_path=proto \
	--go_out=pb --go_opt=paths=source_relative \
    --go-grpc_out=pb --go-grpc_opt=paths=source_relative \
    proto/*.proto

protoc-js:
	rm -rf frontend/src/pb/*.js
	protoc --proto_path=proto \
	--js_out=import_style=commonjs:./frontend/src/pb \
	--grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:./frontend/src/pb \
	proto/*.proto


.PHONY: client server protoc protoc-js
