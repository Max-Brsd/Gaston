const { SlashCommandBuilder } = require('discord.js');
const path = require('node:path')
const cFinder = require('../../utilities/commandFinder')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads a command.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command to reload.')
                .setRequired(true)),
    async execute(interaction){
        const commandName = interaction.options.getString('command',true).toLowerCase();
        const command = interaction.client.commands.get(commandName);

        if(!command){
            return interaction.reply(`There is no command with name \`${commandName}\` !`)
        }

        const appDir = path.dirname(require.main.filename)
        const cmdPath = cFinder.commandFinder(commandName,appDir);
        delete require.cache[require.resolve(cmdPath)];

        try {
            const newCommand = require(cmdPath);
            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
        } catch (error){
            console.error(error);
            await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
        }
    }
}