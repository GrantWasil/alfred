require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
        let reply = `You dind't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${PREFIX}${command.name} ${command.usage}`;
        }

        return message.channel.send(reply);
    }

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    try {
        command.execute(message, args);
    }
    catch (err) {
        console.error(err);
        message.reply('There was an error attempting to use that command');
    }
});

client.on('voiceStateUpdate', (oldVoiceState, newVoiceState) => {
    const textChannel = client.channels.cache.get('791923781216108574');
    let member, newChannel, oldChannel, newRole, oldRole;
    const booths = ['booth-1', 'booth-2', 'booth-3', 'booth-4', 'booth-5']
    if (newVoiceState.channel) {
        member = newVoiceState.member;
        newChannel = newVoiceState.channel;
        oldChannel = oldVoiceState.channel || null;
        newRole = member.guild.roles.cache.find(role => role.name === newChannel.name);
        if (oldChannel) {
            oldRole = member.guild.roles.cache.find(role => role.name === oldChannel.name);
        }

        // Handle booths and cap them at 2
        if (booths.some(booth => booth.includes(newChannel.name))) {
            if (newChannel.members.size >= 2) {
                member.voice.setChannel(oldChannel);
                return;
            }
        }
        member.roles.add(newRole);
        member.roles.remove(oldRole);
    }
    else if (oldVoiceState.channel) {
        member = oldVoiceState.member;
        oldChannel = oldVoiceState.channel.name;
        oldRole = member.guild.roles.cache.find(role => role.name === oldChannel);
        defaultRole = member.guild.roles.cache.find(role => role.name === 'Test 1');
        member.roles.remove(oldRole);
        member.roles.add(defaultRole);
    }
})


const { BOT_TOKEN, PREFIX } = process.env;

client.once('ready', () => {
    console.log('Ready!');
});

client.login(BOT_TOKEN);
