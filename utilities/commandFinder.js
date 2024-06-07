const path = require('node:path');
const fs = require('node:fs');

function commandFinder(commandName,dirPath){
    const commandPath = path.join(dirPath,'commands');
    const commandFolder = fs.readdirSync(commandPath);

    for(folder of commandFolder){
        const commandsPath = path.join(commandPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        if(commandFiles.includes(`${commandName}.js`)){
            return path.join(commandsPath,`${commandName}.js`);
        }
    }
}

module.exports = {
    commandFinder: commandFinder,
};