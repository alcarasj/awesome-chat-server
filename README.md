# Awesome Chat Server (CS4400 Socket Programming Task)
### By Jerico Alcaras, 14317110
Introducing my Awesome Chat Server, written in NodeJS using the built-in Net API!
## Run using start.sh (no Node installation required)
The repository contains three files: `server-linux`, `server-macos` and `server-win.exe`, which were packaged using PKG (https://github.com/zeit/pkg). This allows for the running of the server out-of-the-box, without the required dependencies. `start.sh` contains a script that detects your operating system and runs the correct file accordingly. 
1. On a terminal, `cd` to the directory.
2. Type `start.sh <PORT_NUMBER>` and press enter, replacing `PORT_NUMBER` with the port number of your choice.
## Run using Node
1. Make sure you have a Node environment installed on your system. If on Windows, see https://nodejs.org/en/download/ to install Node. If on Linux, open a terminal and type `sudo apt-get install node` and should install Node for you. If on a Mac, ~~you should just throw it away and hang yourself~~ install Brew from (https://brew.sh/), then once Brew is installed, run `brew install node` on a terminal.
2. On a terminal (On Windows it's a Node.js command prompt) `cd` to the directory.
3. Type `node server.js <PORT_NUMBER>` and press enter, replacing `PORT_NUMBER` with the port number of your choice.
## Run on a Docker container
Ah, so you're a distributed systems autist? Well, assuming that you have Docker already installed on the container you want to run it on:
1. Clone this repository on the container.
2. `cd` to the repository's directory.
3. Type `docker build -t <USERNAME>/awesome-chat-server .` (yes, including the full stop), replacing <USERNAME> with your desired username.
4. Type `docker run -p 49160:8080 -d <USERNAME>/awesome-chat-server`
5. The app will now run on port 8080 (externally) in the container.
6. If you're having trouble, look here: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/.