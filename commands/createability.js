const Ability = require('../models/ability');

module.exports = {
    name: 'createability',
    description: 'Creates a characters ability',
    args:  true,
    usage: `<abilityName> <ablityDescription> <uses>`,
    guildOnly: true,
    execute(message, args) {
        const name = args[0];
        const uses = args[args.length - 1]
        args.shift();
        args.pop();
        const description = args.join(" ");

        message.channel.send(`Name: ${name}, Description: ${description} , Uses: ${uses}`);

        const abiity = new Ability({
            name, 
            description,
            uses
        });

        ability.save();
    },
}