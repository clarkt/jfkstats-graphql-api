const hapi = require('hapi');
const mongoose = require('mongoose');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./graphql/schema');

const Player = require('./models/player');

mongoose.connect('mongodb://test:test1234@ds143262.mlab.com:43262/jfk-graphql', { useNewUrlParser: true });

mongoose.connection.once('open', () => {
  console.log('connected to the database');
});

const PORT = process.env.PORT || 1337;

const server = hapi.server({
  port: PORT,
  host: 'localhost'
});

const init = async () => {

  await server.register({
		plugin: graphiqlHapi,
		options: {
			path: '/graphiql',
			graphiqlOptions: {
				endpointURL: '/graphql'
			},
			route: {
				cors: true
			}
		}
	});

	await server.register({
		plugin: graphqlHapi,
		options: {
			path: '/graphql',
			graphqlOptions: {
				schema
			},
			route: {
				cors: true
			}
		}
	});

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: function (req, res) {
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


  try {
    await server.start()
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`)
  }

  console.log(`server running at ${server.info.uri} `);
};

process.on('unHandledRejection', (err) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
});

init();

//mongodb://<dbuser>:<dbpassword>@ds143262.mlab.com:43262/jfk-graphql