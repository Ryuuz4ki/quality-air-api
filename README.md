# quality-air-api
A REST API responsible for exposing the air quality information.

## French Version
## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Git](https://git-scm.com/) pour cloner le projet depuis GitHub.
- [Node.js](https://nodejs.org/) et [npm](https://www.npmjs.com/) pour exécuter l'application.
- [MongoDB](https://www.mongodb.com/) pour la base de données.
- Les modules npm suivants installés globalement : [nodemon](https://www.npmjs.com/package/nodemon) et [env-cmd](https://www.npmjs.com/package/env-cmd).

## Installation

1. Clonez ce projet depuis GitHub en utilisant la commande suivante :

   ```bash
   git clone https://github.com/Ryuuz4ki/quality-air-api.git
   
2. Accédez au répertoire du projet :

   ```bash
   cd quality-air-api
   
3. Installez toutes les dépendances du projet en exécutant :

   ```bash
   npm install
   
## Configuration

Le fichier `.env` contient les variables d'environnement nécessaires pour le bon fonctionnement du projet.

## Démarrage

1. Pour lancer l'application en mode de développement, exécutez la commande suivante :

   ```bash
   npm run dev 

Cela démarrera le serveur à l'aide de nodemon, ce qui signifie que le serveur se relancera automatiquement à chaque modification de code.

## Scripts Disponibles

1. `npm run dev`: Lance le serveur en mode de développement avec nodemon.
2. `npm start`: Lance le serveur en mode de production.
3. `npm test`: Lance les tests unitaires.
4. `npm run cron`: Pour lancer la tâche planifiée présente dans le projet. Cette tâche planifiée est très importante pour mettre à jour la base de données. 
Notamment les informations concernant la qualité de l'air sur la région de Paris.

## Documentation de l'API

Pour accéder à la documentation de l'API et comprendre les endpoints disponibles et les requêtes acceptées, veuillez consulter http://localhost:3030/api-docs.

## Contributeurs

Edem KUEVIAKOE [edemf.kueviakoe@gmail.com](mailto:edemf.kueviakoe@gmail.com)

## English Version
## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Git](https://git-scm.com/) to clone the project from GitHub.
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) to run the application.
- [MongoDB](https://www.mongodb.com/) for the database.
- The following npm modules installed globally: [nodemon](https://www.npmjs.com/package/nodemon) and [env-cmd](https://www.npmjs.com/package/env-cmd).

## Installation

1. Clone this project from GitHub using the following command:

   ```bash
   git clone https://github.com/Ryuuz4ki/quality-air-api.git

2. Navigate to the project directory:

   ```bash
   cd quality-air-api

3. Install all project dependencies by running:

   ```bash
   npm install

## Configuration

The `.env` file contains the necessary environment variables for the proper functioning of the project.

## Getting Started

1. To launch the application in development mode, run the following command:

   ```bash
   npm run dev 

This will start the server using nodemon, which means the server will automatically restart with each code change.

## Available Scripts

1. `npm run dev`: Launches the server in development mode with nodemon.
2. `npm start`: Launches the server in production mode.
3. `npm test`: Runs unit tests.
4. `npm run cron`: To launch the scheduled task present in the project. 
This scheduled task is crucial for updating the database, especially the air quality information for the Paris region.

## API Documentation

To access the API documentation and understand the available endpoints and accepted requests, please refer to http://localhost:3030/api-docs.

## Contributors

Edem KUEVIAKOE [edemf.kueviakoe@gmail.com](mailto:edemf.kueviakoe@gmail.com)