'use strict';

const Hapi = require('hapi');

const server = Hapi.server({       //create new hapi server object
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello, world!';
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!'; //URI Encode the name param to prevent content                                                                     injection attacks
    }
});

const init = async () => {

    await server.register({     //adds hapi pino plugin - adds logging to app
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response', 'onPostStart']
        }
    });

    // await server.register(require('inert'));        //plugin inert is used to serve static page - adds inert plugin

    // server.route({      //registers /hello route - tells server to accept GET requests to /hello - reply with hello.html
    //     method: 'GET',
    //     path: '/hello',
    //     handler: (request, h) => {

    //         return h.file('./public/hello.html');
    //     }
    // });

    await server.start();       //start server
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();