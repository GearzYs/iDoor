const fs = require('fs');
const { exec } = require("child_process");
const ttn = require("ttn")


module.exports = {
    name: 'open',
    description: 'Ouvre la porte',
    execute(message, args) {
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

            function expire() {
                var expiration = traduire()
                var Key = require(`../keys/${message.author.id}.json`)

                if (Date.now()>=expiration) {
                    message.channel.send("Votre clé a expirée.")
                    exec(`rm -f ${path}`)
                    message.channel.send("Fichier supprimé.")
                }
                if (Date.now()<expiration) {
                    if (Key.cle==args[0]) {
                        message.channel.send(`Clé reconnu, porte ouverte.`);
                        var appID = "csf"
                        var accessKey = "ttn-account-v2.hDRuu_0CtGOEIkTahersbwyiMgPH31bhkXqKG_AW9CI"
                        var cname = "reksai"
                        ttn.data(appID, accessKey)
                        .then(function (client) {
                            client.send(cname, "11111111111111111111",1)
                            })
                        .catch(function (error) {
                            console.error("Error", error)
                            process.exit(1)
                        })
                      }
                      else {
                        message.channel.send(`Clé erronée.`);
                      }
                      return
                }
            }
            expire()

        }
        else {
          message.channel.send(`Il n'y a pas de fichier en votre nom.`);
          return
        }
    }};
