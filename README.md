# iDoor

# Fonctionnement

- Télécharger NodeJS
- Télécharger les modules discordjs, child-process, fs et ttn en executant la commande `npm install discordjs child-process fs ttn`.
- Inserez le token du bot obtenable sur discord.com/developers dans le fichier config.json à la place de `INSEREZ-LE-TOKEN`.
- Dans le fichier `open.js` qui se trouve dans le dossier `commands`, remplacer les valeurs des variables `appID`, `accessKey` et `cname` par le votre.
- Dans le fichier `UCA-ABP_Basic1.ino` qui se trouve dans le dossier `UCA-ABP_Basic1`, remplacer les valeurs des variables `DEVADDR`, `NWKSKEY` et `APPSKEY` par le votre.
- Executez la commande `node index.js` pour lancer le bot

Le but du Projet est d'emmetre un paquet via Discord et qu'elle soit réceptionné par la carte LoRa en utilisant The Things Network.

Ici, nous avons pris l'exemple d'un entrepreneur basé sur une application du type AirBnB ayant plusieurs logement à louer aux quatre coins de la France. Il serai impossible pour lui de se déplacer chaque jour à chaque logement afin de donner clé au nouveau locataire. L'idée étant qu'on puisse généré une clé digitale qu'on puisse utilisé sur Discord afin d'ouvrir la porte, que ça soit sur le téléphone, sur l'ordinateur, sur la tablette, etc.

Cela implique plusieurs problèmes : une clé différente à chaque utilisation, une sécurité, une solution de secours, une clé possédant une date d’expiration correspondant au nombre de jours loués, etc.

Discord sera le début du circuit, il nous servira à :
-	Générer la clé
-	Supprimer la clé
-	Vérifier la date d’expiration de la clé
-	Créer une fiche utilisateur
-	Vérifier la clé afin d’ouvrir la porte

The Things Network sera le 2ème élément de notre circuit, il nous sera utile afin d’envoyer le paquet permettant l’ouverture de la porte en utilisant une Gateway lorsque la clé, vérifié par Discord, est valide.

La carte LoRa sera le 3ème et dernier élément de notre circuit, il nous sera utile afin de recevoir le paquet émis par la Gateway The Things Network et permet l’alimentation et l’ouverture de la porte.

Chaque fichier dans le dossier « commandes » correspond à une commande. Nous avons donc 6 commandes :

-	Key
-	Deletekey
-	Sendkey
-	Open
-	Status
-	Help

Nous allons détailler chaque commandes.

Key 
La commande key permet de créer une fiche utilisateur avec la clé. Elle se compose de la manière suivante :
	!key {durée} {utilisateur}
La durée se présente sous la forme : chiffre+lettre. Les lettres possibles sont « d » (pour days), « w » (pour weeks) et « m » (pour months). Si nous voulons générer une clé pour 9 semaines, ça serait donc 9w.
La commande génère une clé aléatoire de 64 caractères pouvant contenir des lettres majuscules, des lettres minuscules et des chiffres. Elle crée un fichier utilisateur nommé par l’id de l’utilisateur renseigné sous la forme « id.json » avec comme contenu :
Clé (généré), Temps (renseigné), Date (de création), 
Propriétaire (renseigné)
Afin de pouvoir faire des calculs avec la date de création (comme rajouter le temps renseigné à cette dernière), nous allons utilisé une fonction disponible dans JavaScript nommé Date.now() qui nous retourne le nombre de millisecondes écoulées depuis le 1er Janvier 1970 (correspondant au temps 0 en informatique). 
Ainsi, si nous exécutons la commande : « !key 9w @Gearz#2021 » le 11/05/2021 à 01:45:30, cela nous créer le fichier 341297132243910676.json avec comme contenu :
{"cle":"eHrs0JTxVYuzCZsYHW6sBBRAHmzq4NHU4maQZFTb235D6fd32V3zUVVAZZszNvW8","temps":"9w","date":1620690330684,"proprietaire":"341297132243910676"}


Deletekey
La commande deletekey permet de supprimer la fiche utilisateur et donc, la clé. Elle se compose de la manière suivante :
	!deletekey {utilisateur}

Il n’y a pas une fonction permettant de supprimer un fichier en JavaScript sans ajouté de module, c’est pour cela que nous avons utilisé le module « child-process » nous permettant d’exécuter des commandes dans le terminal directement via le code JavaScript.
Ainsi, afin de supprimer le fichier de l’utilisateur renseigné, nous vérifions d’abord si une fiche utilisateur est créée, si oui, nous la supprimons avec la commande dans le terminal « rm -f id.json ».
rm est la commande permettant de supprimer un fichier (remove)
-f force sa suppression même si le fichier n’est pas vide
id.json correspond à la fiche utilisateur créée avec !key


Sendkey
La commande sendkey permet d’envoyer à nouveau la même clé en message privé. Elle se compose de la manière suivante :
	!sendkey

Open
La commande clé permet d’ouvrir la porte en renseignant la bonne clé. Elle se compose de la manière suivante :
	!open {clé}

Premièrement, la commande vérifie si la date de validité de la clé est toujours bonne, pour cela, nous convertissons la durée renseignée dans la commande !key en milliseconde : 
-	1d = 86400000ms
-	1w = 86400000ms * 7
-	1m = 86400000ms * 30
Ensuite, nous l’ajoutons à la date de création de la clé et nous vérifions si le résultat est supérieur à la date de l’exécution de la commande !open. Si oui, alors, la clé est expiré et ainsi, le fichier est supprimer et la porte reste fermée. Sinon, elle vérifie si la clé est juste. Si oui, un paquet de 10 bytes est envoyé à The Things Network. Sinon, un message d’erreur est envoyé signalant une clé erronée.

Status
La commande status permet d’obtenir les informations de sa fiche utilisateur. Elle se compose de la manière suivante :
	!status


Help
La commande help permet d’obtenir la liste de toute les commandes. Elle se compose de la manière suivante :
	!help	


Les commandes en rouges sont exécutables uniquement par le propriétaire des biens et non les autres utilisateurs.
