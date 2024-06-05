//Require the necessary Discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');

//Configure dotenv process
const dotenv = require('dotenv');
dotenv.config();

//Get Discord token from env
const token = process.env.DISCORD_TOKEN;

//Create client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready ! Logged in as ${readyClient.user.tag}`);
});

client.login(token);