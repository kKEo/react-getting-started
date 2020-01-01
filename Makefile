all: server-nohup front
	
server-nohup:
	nohup sh server.sh > logs/server.log &
front:
	sh front-dev.sh
