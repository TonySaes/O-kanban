# O-kanban

SPA de gestion de tâches en mode Kanban, avec un **front Svelte 5** et une **API Node.js / PostgreSQL / Sequelize**, packagés dans un monorepo.

> 🧑‍💻 Projet réalisé dans le cadre de ma formation Développeur Web & Web Mobile (O'Clock).

---

## 🚀 Fonctionnalités

- Organisation des tâches sous forme de **colonnes Kanban** (ex. : À faire / En cours / Terminé)
- Création / modification / suppression de tâches
- Intégration API LLM pour correction orthographique et traduction des Titres listes + Tâches
- Déplacement des tâches entre colonnes
- Persistance en base de données PostgreSQL
- Architecture **front / back** séparée mais unifiée en monorepo
- Compatible Docker (API + BDD)


---

## 🧱 Stack technique

### Frontend

- Svelte 5 (SPA)
- Vite (dev server)

### Backend

- Node.js + Express
- Sequelize ORM
- PostgreSQL
- Middlewares de validation 
- Normalisation et vérifications des données entrantes via Joi

### Base de données

- PostgreSQL
- Modèles : `tag`, `list`, `card`, `user`
- Migrations Sequelize

### Outils & Infra

- Docker & docker-compose
- Fichiers `.env` pour config
- Scripts npm pour lancer API et client

---

## 🗂️ Structure du projet

```text
O-kanban/
├── api/                     # Code backend Node.js / Sequelize
├── client/                  # SPA Svelte 5
├── docker-compose.yml       # Orchestration services
├── .database.docker.env     # Env pour la BDD (pas versionné)
├── database.docker_copy.env.example
└── README.md
```

---

## ⚙️ Prérequis

- Node.js (LTS recommandé)
- npm / yarn / pnpm
- Docker & Docker Compose (optionnel)
- PostgreSQL (si démarrage sans Docker)

---

## 🐳 Installation avec Docker (recommandé)

1. Copier le fichier d’exemple :

```bash
cp database.docker_copy.env.example .database.docker.env
```

2. Lancer les services :

- Construction des images Docker : 

```bash
docker compose build
```
- Démarrer les conteneurs (en mode *detached* à partir des images (les reconstruits si non existantes) : 

```bash
docker compose up -d
```

3. Accéder au projet :

| Service | URL |
|---------|-----|
| Frontend | http://localhost:4173 |
| API | http://localhost:3000/api |

4. Structure des conteneurs
```
+----------------------+       +-----------------------+
|      FRONTEND        |       |       BACKEND         |
|   (Vite / Docker)    | <---- |  Node.js / Express    |
|    Port 4173         |       |  Port 3000            |
+----------------------+       +-----------+-----------+
                                          |
                                +---------v----------+
                                |    PostgreSQL      |  
                                +--------------------+
```

---|

---

## 💻 Installation locale (sans Docker)

### 1. Cloner le projet

```bash
git clone https://github.com/TonySaes/O-kanban.git
cd O-kanban
```

### 2. Installer les dépendances

```bash
cd client && npm install
cd ../api && npm install
```

### 3. Configurer PostgreSQL

Créer une base et un utilisateur :

```sql
CREATE DATABASE okanban;
CREATE USER okanban_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE okanban TO okanban_user;
```

Configurer l’API + le client via un fichier `.env` dans chaque dossier :

```api
# Port de l'api
PORT=3000

# DB URL
DB_URL=postgres://user:password@localhost:5432/dbname

# Secret pour JWT
JWT_SECRET=your_jwt_secret_key

# Clé API Mistral
MISTRAL_API_KEY=you-api-key-here

# Modèle Mistral
MISTRAL_MODEL=mistral-small-latest

# URL de l'API Mistral
MISTRAL_API_URL=https://api.mistral.ai/v1/chat/completions
```

```client
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Lancer le backend

```bash
npm run dev
```

### 5. Lancer le frontend

```bash
npm run dev
```

Ouvrir : `http://localhost:5173`

---

## 🔌 API - Endpoints (exemple-type)

[Voir la documentation de l'API](./api/api-documentation.md)

---

## 📌 Roadmap / améliorations

- Drag & drop natif
- Authentification et multi-utilisateurs
- Multi-boards
- Collaboration temps réel
- Priorités, labels, dates limites

---

## 👤 Auteur

**Tony Saes**

- GitHub : https://github.com/TonySaes
- LinkedIn : https://www.linkedin.com/in/tony-saes-3a7a92366/
