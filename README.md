<span style='font-size: 25px; color: #f36; font-weight: bold'>NOTE [Install NodeJS](https://nodejs.org/en/) if you want to run a Sourzce server</span>

# Sourzce
A personal home server for uploading files to one computer. Host a server on a computer and connect from any device on your wifi and upload files directly to the host computer.

<hr style="background: #c4882f">

## <span style="color: #fa3; font-weight: bold; text-decoration: underline">Setup for the average user 📦</span>
There are 2 window `batch` files inside of the release folder, if you are on linux/OSX just open them and paste the scripts into the shell, otherwise run them on windows.

First run `install.bat`
Next run `run.bat` this loads the server and gives you an IP to connect to, this IP is unique to the device the server is being run on.

### <span style="color: #fa3;">Where are my files uploaded?</span>
Any files uploaded to the Sourzce server will be located under `public/images` or `public/uploads` depending on what the file type was. `.jpg, .jpeg & .png` files will appear under images and anything else will be under uploads.

<hr style="background: #2a9d8a">

## <span style='color: #3da; font-weight: bold; text-decoration: underline'>Setup up for Developers 🔧</span>
1. Clone this repository
2. run `npm install` or `yarn install`
3. run `npm run build client` or `yarn build client`

It's as easy as 1 2 3

<hr style='background: #7463a6'>

## <span style="color: #a463e6; font-weight: bold; text-decoration: underline">Building a release version 🏭</span>
Run the below command script

`npm run build release` OR `yarn build release` (If you have [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable))

This will clear your current `release` folder and copy all the necessary files for you to use in a release.
This `release` folder is intended to be a lightweight setup of Sourzce and as such it has none of the developer dependencies.

<hr style="background: #a84f28">

## <span style="color: #ff8d36; font-weight: bold; text-decoration: underline">Developing Sourzce</span>
> This development readme is far from complete I may update it in the future but the best way to see how Sourzce works is to checkout the server and clients respectively and see the login in them. <br> You'll need to have a strong basis in **Webpack**, **Typescript**, and **Express** and be familiar with **NestJS** to see how everything works.

Developing with Sourzce consists of 2 components, `the client`, and `the server`.

You run the client by going into `./client` and running the `dev` script.

You build the client by going into `./client` and running the `build` script.

You run the server by going into `./server` and running the `start:dev` script.

You build the server by going into `./server` and running the `build` script.

### <span style="color: #ff8d36">Client → Server</span>
The client sends 2 different requests to the server

1. `/SERVER_EXISTS` checks if the server exists, if the server has this route it should return.
```json
{exists: true}
```

2. `/upload` is the route you upload files to, it handles the file uploading on the server using Multer.