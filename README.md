# United FrontEnd

This repository contains all the code related to the FrontEnd application of the United College ERP.

## How to run

1. Clone the repository
2. Run `npm install` to install all the dependencies
3. Configure the .env file. You can use the .env.sample file as a template.
4. Run `npm run dev` to start the development server
5. Open `http://localhost:DEV_APP_PORT` in your browser.
6. Have fun :)

## How to build

1. Configure the .env
2. Run `npm run build` to build the application
3. The build files will be in the `dist` folder
4. Send the contents of the `dist` folder to the server
5. Pray nothing breaks

## How to build with docker

1. Configure the .env
2. Run `docker build -t united-frontend .` to build the docker image. PS: Use tags (:latest, :v1, etc) to determine the version of the image.
3. Send the image to the docker hub repository
