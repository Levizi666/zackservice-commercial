# ANAYA Boutique & Couture — site e-commerce HTML/CSS/JavaScript

## Contenu
- `index.html` : accueil, catalogue, contact, promotions, panier
- `style.css` : design responsive inspiré de l'affiche ANAYA
- `script.js` : recherche, filtres, tri, panier localStorage, fiches produits, commande WhatsApp
- `assets/affiche-anaya.jpg` : affiche fournie utilisée dans le hero

## Modifier les produits
Ouvre `script.js`, puis modifie le tableau `PRODUCTS`.
Chaque produit contient :
`name`, `category`, `price`, `icon`, `badge`, `desc`.

Pour utiliser de vraies photos, remplace la partie `product-img` de `productCard()` par une balise `<img src="assets/nom.jpg">` et place les photos dans `assets/`.

## Numéro WhatsApp
Le numéro configuré est +223 96 96 66 66.
Pour le changer, recherche `22396966666` dans `index.html` et `script.js`.

## Important
C'est une version front-end. Le panier est sauvegardé dans le navigateur avec localStorage.
Pour un vrai e-commerce professionnel, il faudra ensuite connecter :
- PHP + MySQL pour produits, clients et commandes
- un espace administrateur
- upload des images produits
- paiement (si nécessaire)
- gestion du stock
- authentification
- hébergement avec HTTPS

## Lancer
Double-clique sur `index.html`, ou ouvre le dossier avec VS Code + Live Server.


## Version 2
- Affiche centrale retirée de l'accueil.
- Nouveau visuel premium sans photo centrale.
- Bouton mode sombre / mode clair avec mémorisation.
- Stickers et badges graphiques plus professionnels.


## Produits ajoutés — collection VIGOZ
- Vigoz Ensemble California Gris — `assets/vigoz-ensemble-gris.jpg`
- Vigoz Ensemble Sport Bleu — `assets/vigoz-ensemble-bleu.jpg`
- Vigoz Combishort Femme Gris — `assets/vigoz-combishort-femme.jpg`
Les prix de ces trois articles sont affichés « Prix sur demande » jusqu'à ce que leurs tarifs soient renseignés. Le bouton « Demander le prix » ouvre WhatsApp.
