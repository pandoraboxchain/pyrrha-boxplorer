# PandoraBoxChain Explorer Web Application

## Initializing and start
```sh
npm i
npm start
```

## Configuration
All configurations are placed in the file `./src/consfig/index.js`  
Default variables are: 
```javascript
default: {
    protocol: 'http',  // boxproxy protocol
    host: 'localhost', // boxproxy host
    port: 1111,        // boxproxy port
    wsport: 1337       // boxproxy web sockets port
}
```
but these settings can be overriden by evirnoment variables:
```sh
REACT_APP_BOXPROXY_PROTOCOL=http
REACT_APP_BOXPROXY_HOST=localhost
REACT_APP_BOXPROXY_PORT=1111
REACT_APP_BOXPROXY_WS_PORT=1337
```


## Useing with docker
Building and starting:  
```sh
npm run build:docker
npm run start:docker
```
...and stopping:
```sh
npm run stop:docker
```
*Docker compose is required (!!!)*
