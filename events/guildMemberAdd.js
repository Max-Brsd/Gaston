const { Events } = require('discord.js')

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member){
        console.log(`Un membre à rejoins ${member.user.tag}!`)
    }
}