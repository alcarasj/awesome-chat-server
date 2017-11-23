# Awesome Chat Server (CS4400 Socket Programming Task)
### By Jerico Alcaras, 14317110
Introducing my Awesome Chat Server, written in NodeJS using the built-in Net API!
## Run using start.sh (no NodeJS installation required)
The repository contains three files: `server-linux`, `server-macos` and `server-win.exe`, which were packaged using PKG (https://github.com/zeit/pkg). This allows for the running of the server out-of-the-box, without the required dependencies. `start.sh` contains a script that detects your operating system and runs the correct file accordingly. 
1. On a terminal, `cd` to the directory.
2. Type `start.sh <PORT_NUMBER>` and press enter, replacing `<PORT_NUMBER>` with the port number of your choice.
## Run using NodeJS
1. Make sure you have a NodeJS environment installed on your system. If on Windows, see https://nodejs.org/en/download/ to install Node. If on Linux, open a terminal and type `sudo apt-get install node` and it should install NodeJS for you. If on a Mac, ~~you should just throw it away and hang yourself~~ install Brew from https://brew.sh/, then once Brew is installed, run `brew install node` on a terminal.
2. On a terminal (On Windows it's a Node.js command prompt) `cd` to the directory.
3. Type `node server.js <PORT_NUMBER>` and press enter, replacing `<PORT_NUMBER>` with the port number of your choice.
## Run on a Docker node
Ah, so you're a distributed systems autist? Well, assuming that you have Docker already installed on the node you want to run it on:
1. Pull the Docker image by running `docker pull alcarasj/chat-server-task`.
2. Run the image on the node using `docker run -p 49160:8080 -d alcaras/awesome-chat-server`.
3. The server will now run in a container using public port 8080. Use this along with the node's public IP address to connect to it.
## ____________________________________________________________
## Making an SCSS OpenNebula Node
1. Login to nimbusselfservice.scss.tcd.ie
2. Go to **Templates** -> **VMs** -> **[VM]DebianStretchTeaching[v01]**
3. Click **Instantiate** button, provide a name for your VM and click **Instantiate** again.
4. Go to **Instances** -> **VMs** -> **The name of the VM you just created**.
5. In the **Info** tab, copy the IP of your VM. You'll use this to connect via PuTTY.
## Installing Docker on your new node

For hassle-free connection, I just go on the Windows computers in the LG Labs and use PuTTY. 
You can also use a VPN to SSH into your node from your machine.

1. Open PuTTY and paste the IP of your VM into the Host Name field and type in 22 in the Port field.
2. Make sure SSH is selected as the Connection type and hit Enter.
3. Login with username **root** and password **scssnebula**.

Run the following commands (copy and then right-clicking into PuTTY does the job, if someone writes a script for this that would be awesome).

4. `apt-get update`
5. `apt-get upgrade`
6. `export http_proxy=http://www-proxy.scss.tcd.ie:8080`
7. `export https_proxy=http://www-proxy.scss.tcd.ie:8080`
8. `wget -qO- https://get.docker.com/ | sed 's/docker-ce/docker-ce=17.10.0~ce-0~debian/' | sh`
9. `docker version` 
	(this is for checking if Docker was installed correctly, should say the Docker version e.g Client: blablabla Server: blablabla)
10. `mkdir /etc/systemd/system/docker.service.d`
11. `cd /etc/systemd/system/docker.service.d`
12. `touch http-proxy.conf`
13. `echo  $'[Service]\nEnvironment="HTTP_PROXY=http://www-proxy.scss.tcd.ie:8080/"' > http-proxy.conf`
15. `systemctl daemon-reload`
15. `systemctl show --property Environment docker` 
	(should say Environment=HTTP_PROXY=http://www-proxy.scss.tcd.ie:8080/)
16. `systemctl restart docker`
17. `docker run hello-world`
	(should pull stuff from library/helloworld, and say that your Docker installation appears to be working correctly when complete)

That's it, you've installed Docker on your OpenNebula node!
