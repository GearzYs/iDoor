const fs = require('fs');
const { exec } = require("child_process");

module.exports = {
    name: 'deletekey',
    description: 'Supprime la clé.',
    execute(message) {
      const personne = message.mentions.users.map(user => {
      const path = `keys/${user.id}.json`;
      if (message.author.id=='341297132243910676') {
        if (fs.existsSync(path)) {
          message.channel.send(`Fichier supprimé.`);
          exec(`rm -f ${path}`)
          return
      }
        else {
          message.channel.send(`Il n'y a pas de fichier en ce nom.`);
          return
        }
      }
      else {
        message.channel.send(`Vous n'avez pas les permissions pour executer cette commande.`);
      }
  })}};