const fs = require('fs');

module.exports = {
    name: 'sendkey',
    description: 'Renvoie la clé en message privé.',
    execute(message) {
        const auteur = message.author.id
        var Key = require(`../keys/${auteur}.json`)
        message.author.send(`Votre clé est : ||${Key.cle}||`);
        message.channel.send(`Votre clé vous a été envoyé en message privé.`);
    }};