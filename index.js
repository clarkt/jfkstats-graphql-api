const hapi = require('hapi');
const mongoose = require('mongoose');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./graphql/schema');

const Player = require('./models/player');

mongoose.connect('mongodb://test:test1234@ds143262.mlab.com:43262/jfk-graphql');

mongoose.connection.once('open', () => {
    console.log('connected to the database');
});

const server = hapi.server({
    port: 1337,
    host: 'localhost'
});

const init = async () => {
    server.route([
        {
            method: 'GET',
            path: '/',
            handler: function(req, res) {
                return `<h1>My modern API</h1>`
            }
        },
        {
            method: 'GET',
            path: '/api/v1/players',
            handler: () => {
                return Player.find();
            }
        },
        {
            method: 'POST',
            path: '/api/v1/players',
            handler: (req, res) => {
                const { firstName, lastName, positions } = req.payload;
                const player = new Player({
                    firstName,
                    lastName,
                    positions
                });
                return player.save();
            }
        }
    ]);


    await server.start();
    console.log(`server running at ${server.info.uri} `);
};

init();

//mongodb://<dbuser>:<dbpassword>@ds143262.mlab.com:43262/jfk-graphql