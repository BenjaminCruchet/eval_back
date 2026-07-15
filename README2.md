# ABGYhuDJ - Plateforme de réservation de concerts

Projet web full-stack réalisé dans le cadre d'une évaluation de développement.
L'application permet aux utilisateurs de consulter une tournée de concerts, réserver des places, gérer un panier, simuler une validation de commande, télécharger ses billets, modifier ses informations utilisateur.
Une interface d'administration permet également de gérer les concerts disponibles.

# Sommaire

Présentation
Fonctionnalités
Architecture
Stack technique
Installation
Configuration
Lancement
Structure du projet
Sécurité
Améliorations possibles

# Présentation

ABGYhuDJ est une application de réservation de concerts développée avec une architecture séparant :

- le backend serveur
- la logique métier
- l'accès aux données
- les interfaces utilisateur

Le projet utilise une architecture inspirée du modèle MVC avec une séparation :

- Routes
- Controllers
- Services
- Repositories
- Views

L'objectif est de proposer une application complète de gestion de billetterie avec authentification utilisateur et espace administrateur.

# Fonctionnalités

## Utilisateurs

- Création de compte
- Connexion / déconnexion
- Modification des informations personnelles
- Modification du mot de passe
- Consultation des commandes
- Téléchargement des billets


## Réservation

- Consultation des dates de tournée
- Recherche dynamique par :
  - ville
  - date
  - lieu

- Suggestions automatiques lors de la recherche
- Ajout de places au panier


## Panier

- Modification des quantités
- Suppression d'articles
- Validation de commande simulée
- Calcul automatique des montants
- Vider le panier

## Administration

Gestion complète des concerts :

- Ajout d'un concert
- Modification d'un concert
- Suppression d'un concert

## Logs

Traçabilité des actions utilisateur :

- connexion
- visites des pages
- recherches effectuées
- ajouts au panier

Les logs sont stockés dans MongoDB.

# Architecture

Le projet suit une organisation séparant les responsabilités :

Utilisateur
|
Frontend (HTML / CSS / JavaScript)
|
Express Router
|
Controllers
|
Services
|
Repositories
|
Bases de données mySQL

# Stack technique

## Frontend

- HTML5
- CSS3
- JavaScript ES6
- Bootstrap 5.3.2

## Backend

- Node.js
- Express.js
- EJS
- Prisma ORM

## Bases de données

### MySQL

Utilisée pour les données principales :

- utilisateurs
- concerts
- places
- paniers
- commandes

### MongoDB

Utilisée pour :

- logs utilisateurs
- suivi des actions

## Tests
- Jest
- Supertest

## Déploiement
- Railway
- GitHub (gestion du code source)

# Installation

## Prérequis

Installer :

- Node.js
- npm
- MySQL
- MongoDB

## Installation du projet sur la machine

1. Cloner le dépôt :

git clone https://github.com/BenjaminCruchet/eval_back
cd eval_back

2. Installer les dépendances :

npm install

3. Créer un fichier `.env` :

PORT=
DATABASE_URL=
MONGO_URI=
SESSION_SECRET=

4. Vérifier que MySQL est démarré.

5. Démarrer MongoDB :

sudo systemctl start mongod

6. Lancer le serveur
node Back/server.js


# Structure du projet

Eval_back/

├── Back/
│
│   ├── Controllers/
│   │
│   ├── Database/
│   │
│   ├── Middleware/
│   │
│   ├── Repository/
│   │
│   ├── Routes/
│   │
│   ├── Services/
│   │
│   ├── Views/
│   │
│   ├── prisma.config.ts
│   │
│   └── server.js
│
├── Front/
│
│   ├── CSS/
│   │
│   ├── Images/
│   │
│   └── JavaScript/
│
├── Prisma/
│
├── Tests/
│
├── .env
│
├── .gitignore
│
├── package.json
|
├── README.md
│
└── package-lock.json

# Sécurité 

Eléments de sécurité mis en place :

- Hashage des mots de passe avec bcrypt
- Gestion des sessions utilisateurs
- Middleware d'authentification
- Middleware de contrôle des droits administrateur
- Séparation des responsabilités backend

# Améliorations possibles

- Token JWT pour sécuriser davantage les sessions
- Critères minimum sur les mots de passe
- Structure MongoDB plus claire avec des schéma pour les données
- Eviter les renvois .JSON sur certaines actions (ajout de concert notamment)
- Ajouter des types de places / prix différents en fonctions des concerts
- Améliorer l'UX et l'UI des pages ajoutées
- Développer l'historique de commande au niveau admin (présent uniquement en front-end)