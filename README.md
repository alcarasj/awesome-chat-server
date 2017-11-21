# Awesome Chat Server (CS4400 Socket Programming Task)
### By Jerico Alcaras, 14317110
Introducing my Awesome Chat Server, written in NodeJS using the built-in Net API!
## Run using start.sh (no NodeJS installation required)
The repository contains three files: `server-linux`, `server-macos` and `server-win.exe`, which were packaged using PKG (https://github.com/zeit/pkg). This allows for the running of the server out-of-the-box, without the required dependencies. `start.sh` contains a script that detects your operating system and runs the correct file accordingly. 
1. On a terminal, `cd` to the directory.
2. Type `start.sh <PORT_NUMBER>` and press enter, replacing `PORT_NUMBER` with the port number of your choice.
## Run using NodeJS
1. Make sure you have a NodeJS environment installed on your system. If on Windows, see https://nodejs.org/en/download/ to install Node. If on Linux, open a terminal and type `sudo apt-get install node` and it should install NodeJS for you. If on a Mac, ~~you should just throw it away and hang yourself~~ install Brew from (https://brew.sh/), then once Brew is installed, run `brew install node` on a terminal.
2. On a terminal (On Windows it's a Node.js command prompt) `cd` to the directory.
3. Type `node server.js <PORT_NUMBER>` and press enter, replacing `PORT_NUMBER` with the port number of your choice.
## Run on a Docker node
Ah, so you're a distributed systems autist? Well, assuming that you have Docker already installed on the node you want to run it on:
1. Pull the Docker image by running `docker pull alcarasj/chat-server-task`.
2. Run the image on the node using `docker run -p 49160:8080 -d alcaras/awesome-chat-server`.
3. The server will now run in a container using public port 8080. Use this along with the node's public IP address to connect to it.
