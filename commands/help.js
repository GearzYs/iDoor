const fs = require('fs');

module.exports = {
    name: 'help',
    description: 'Envoie la liste de toutes les commandes.',
    execute(message) {
        message.channel.send(`> !key {durée} {utilisateur} : Créer une fiche utilisateur avec sa clé.`);
        message.channel.send(`> la durée est : d=>days | w=>weeks | m=>months`);
        message.channel.send(`> Exemple : !key 9w @utilisateur permet de créer une clé qui a une durée de 9 semaines avec pour propriétaire @utilisateur.`);
        message.channel.send(`> !sendkey : Permet d'envoyer la clé en message privé.`);
        message.channel.send(`> !open {clé} : Permet d'ouvrir la porte si la clé est valide et la date d'expiration n'est pas dépassée. `);
        message.channel.send(`> !deletekey {utilisateur} : Permet de supprimer la fiche de l'utilisateur ainsi que sa clé.`);
        message.channel.send(`> !status : Permet d'envoyer votre fiche utilisateur.`);
        message.channel.send(`> Attention : !key et !deletekey peuvent être utilisé uniquement par le propriétaire du logement.`);
    }};