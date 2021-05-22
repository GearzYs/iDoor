const fs = require('fs');

function makeid(length) {
  var result           = [];
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() * 
charactersLength)));
 }
 return result.join('');
}

module.exports = {
    name: 'key',
    description: 'Créer le code.',
    execute(message, args) {
      var temps = args[0]
      const personne = message.mentions.users.map(user => {
        const path = `keys/${user.id}.json`;
        if (fs.existsSync(path)) {
          message.channel.send(`Un fichier à ce nom est déjà crée, supprimé la avant de générer une autre clé.`);
          return
        }
        else if (message.author.id=='341297132243910676' || message.author.id=='203783493233147904') {
          const code = makeid(64);
          const personne = message.mentions.users.map(user => {
          var datemili = Date.now();
          var temps = args[0]
          var key = {
            cle : code,
            temps : temps,
            date : datemili,
            proprietaire : user.id
          };
          const data = JSON.stringify(key);
          fs.appendFile(`keys/${user.id}.json`, `${data}`, (err) => {
            if (err) {
            throw err;
          }});
          user.send(`La nouvelle clé est : ||${code}||`);
          return `<@${user.id}>`});
          var key = {
            cle : code,
            temps : args[0],
            proprietaire : personne
          };
          var datemili = Date(Date.now());
          var date = datemili.toString();
          message.channel.send(`> Clé : Envoyé en privé`);
          message.channel.send(`> Temps : ${key.temps}`);
          message.channel.send(`> Date : ${date}`);
          message.channel.send(`> Propriétaire : ${key.proprietaire}`);
        }

          else {
            message.channel.send("Vous n'êtes pas autorisé à utiliser cette commande.")
          }
        })}};