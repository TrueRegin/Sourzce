# Sourzce
Sourzce is a NestJS personal home server designed to be hosted on LAN
You can upload files via connecting to a LAN ip on 192.168.1.XXX (You replace the 3 X's)

## Setup / Configuration
#### ***1.*** To setup you need to get your devices LAN ip, to do this on windows open up the command prompt and type in `ipconfig`

***(You want the IPv4 address)***
![](https://user-images.githubusercontent.com/36866793/92984774-c403eb00-f47a-11ea-95ac-ce49b258bc0b.png)

<hr>

#### ***2.*** Create a .env file inside the release, this is where you will set server config info.
You'll want to set ***two*** options for now.
- SERVER_IP this is the IP you'll be hosting the server on and from which you can connect
- PORT this is the port on that server that the server will take requests from

If we ran the server with the below .env file we would be able to connect to the file upload app at [http://192.168.1.XXX:5000]()

![image](https://user-images.githubusercontent.com/36866793/92984855-7cca2a00-f47b-11ea-8f1b-cd6d81de3724.png)

## Contributing
If there are features you want to add you can contribute to the source code, it's a very barebones app with very little learning to do(assuming you know Typescript & Express).

Run `yarn buildRelease` or `npm run buildRelease` to build the server + client into a release folder that you can give to other people who want to run your modified version of the app.

Run `yarn client` or `npm run client` to watch the client dist folder, while this command is running, if you build the client, it will automatically replace the client on the server to save you from copying and pasting it.