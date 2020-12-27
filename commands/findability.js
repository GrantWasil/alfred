const Ability = require('../models/ability');

module.exports = {
    name: 'findability',
    description: 'Find a saved ability',
    args: true,
    usage: '<abilityName>',
    guildOnly: true,
    execute(message, args) {
        const name = args[0];
        
        Ability.findOne({
            name
        }, (err, ability) => {
            if (ability) {
                message.channel.send(`Name: ${ability.name}, Description: ${ability.description} , Uses: ${ability.uses}`);
                return;
            }
            message.channel.send(`Unable to find ability: ${name}`);
        })

    }
}