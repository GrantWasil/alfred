const { GuildMember } = require("discord.js");

module.exports = {
	name: 'move',
    description: 'Moves user to correct channel!',
    args: true,
	usage: '<Voice Chat Name>',
	guildOnly: true,
	execute(message, args) {
		message.GuildMember(message.author.id).voice.setChannel('Test 2');
	},
}