const fs = require('fs');

module.exports = {
    name: 'status',
    description: "Renvoie les informations d'un fichier utilisateur.",
    execute(message) {
        const path = `keys/${message.author.id}.json`;

        if (fs.existsSync(path)) {
            var Key = require(`../keys/${message.author.id}.json`)
            message.channel.send(`Fichier existant.`);

            function traduire(){
                if (Key.temps[1]=="d") {
                    const date = Key.date+(Key.temps[0]*86400000);
                    return date
                }
                if (Key.temps[1]=="w") {
                    const date = Key.date+(Key.temps[0]*86400000*7);
                    return date
                }
                if (Key.temps[1]=="m") {
                    const date = Key.date+(Key.temps[0]*86400000*30);
                    return date
                }
                else {
                    message.channel.send("La durée inscrite n'est pas reconnu.")
                }
            };

            function duree(){
                if (Key.temps[1]=="d") {
                    const temps = `${Key.temps[0]} jour(s)`;
                    return temps
                }
                if (Key.temps[1]=="w") {
                    const temps = `${Key.temps[0]} semaine(s)`;
                    return temps
                }
                if (Key.temps[1]=="m") {
                    const temps = `${Key.temps[0]} mois`;
                    return temps
                }
                else {
                    message.channel.send("La durée inscrite n'est pas reconnu.")
                }
            };

            function restant() {
                var expire = traduire()
                var reste = expire-Date.now()
                if (reste <86400000*7) {
                    const temp = reste/86400000
                    const restant = `${temp.toString().slice(0,4)} jour(s)`
                    return restant
                }
                else if (reste < 86400000*30 || reste==86400000*7) {
                    const temp = reste/(86400000*7)
                    const restant = `${temp.toString().slice(0,4)} semaine(s)`
                    return restant
                }
                else if (reste>=86400000*30) {
                    const temp = reste/(86400000*30)
                    const restant = `${temp.toString().slice(0,4)} mois`
                    return restant
                    }
                
                else {
                    restant = "Date non reconnu"
                    return restant
                }
            }
            function status() {
                var Key = require(`../keys/${message.author.id}.json`)
                var date = restant();
                var temps = duree();
                message.channel.send(`> Propriétaire : <@${Key.proprietaire}>`)
                message.channel.send(`> Durée : ${temps}.`)
                message.channel.send(`> Temps restant : **${date}**.`)
                message.channel.send(`> Clé : Utilisez la commande !sendkey pour avoir de nouveau votre clé.`)
            }
            status()
        }
        else {
          message.channel.send(`Il n'y a pas de fichier en votre nom.`);
          return
    }}};