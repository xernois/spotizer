# [Spotizer](http://spotizer.xernois.fr)

Spotizer est un petit projet réalisé à deux avec [Killian Grenouilloux](https://github.com/lianki36) dans le cadre de nos cours en LP Développeur d'Applications Web et Big Data a l'IUT du Limousin

Ce projet est une application web s'inspirant d'application tel que Spotify et Deezer destinée à une utilisation PC accessible [ici](http://spotizer.xernois.fr).

Cette application a été réalisée avec Angular et se base sur une api accessible via le vpn de l'iut du limousin à l'adresse suivante [https://mmi.unilim.fr/~morap01/L250/public/index.php/api](https://mmi.unilim.fr/~morap01/L250/public/index.php/api). Nous avons donc essayer de faire de notre mieux avec l'api fournit.

# Dépendance 

Pour ce qui est des dépendances, nous sommes restés avec ce que le projet Angular contient de base.
```js
    "@angular/animations": "^15.2.0",
    "@angular/common": "^15.2.0",
    "@angular/compiler": "^15.2.0",
    "@angular/core": "^15.2.0",
    "@angular/forms": "^15.2.0",
    "@angular/platform-browser": "^15.2.0",
    "@angular/platform-browser-dynamic": "^15.2.0",
    "@angular/router": "^15.2.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.12.0"
```

# Fonctionnalitées

- Recherche par nom d'album, de son, d'artiste et de playlist
- Possibilité de liker des sons et des albums
- Ajouter des playlist, modifier leurs noms, supprimer des sons et supprimer la playlist
- lire des musique, des albums et des playlist, skip des musique, mettre en pause, avance rapide et gérer le volume 
- afficher une liste d'artistes et d'albums ainsi que leurs détails

# Installation
Pour lancer le projet ou le modifier, commencer par cloner le projet 

```bash
git clone git@github.com:xernois/spotizer.git

or

git clone https://github.com/xernois/spotizer.git
```

Ensuite, se placer dedans 

```bash
cd spotizer
```

Installer les dépendances

```bash
npm i
```

Et enfin lancer le serveur

```bash
npm run start
```

# F.A.Q

Si vous avez des questions, n'hésitez pas à me contacter, ou a contacter [Killian Grenouilloux](https://github.com/lianki36)