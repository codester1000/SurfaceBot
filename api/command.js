const { REST } = require("@discordjs/rest");
const { SlashCommandBuilder, Routes } = require("discord.js");
require("dotenv").config(); //to start process from .env file

const clientId = "1007863475122487379";

const token = process.env.TOKEN;

const commands = [
  new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Sets up server data"),
  new SlashCommandBuilder()
    .setName("dashboard")
    .setDescription("PMs you link to servers dashboard!"),
  new SlashCommandBuilder()
    .setName("health")
    .setDescription("Checks the health of the server!"),
].map((command) => command.toJSON());

// Place your client and guild ids here

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
