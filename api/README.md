# API — O-kanban (Node.js / Express / PostgreSQL / Sequelize)

Cette partie du projet correspond au back-end de l'application **O-kanban**.  
Elle expose une API REST permettant de gérer les éléments Kanban (colonnes, tâches, etc.) consommée par le frontend Svelte.

---

## 🚀 Fonctionnalités

- API REST structurée (Express)
- Base de données PostgreSQL
- ORM Sequelize + Sequelize-CLI (migrations + seeds)
- Organisation modulaire des modèles, services et routes
- Compatible exécution locale et via Docker / Docker Compose

> ℹ️ La documentation détaillée des routes est disponible ici :  
👉 [`api-documentation.md`](./api-documentation.md)  

---

## 🧱 Stack utilisée

| Domaine | Technologie |
|--------|------------|
| Runtime | Node.js |
| Framework API | Express |
| ORM | Sequelize |
| Base de données | PostgreSQL |
| Outils | Sequelize-CLI, dotenv |
| Sécurité | Cors, XSS |

---

## 📂 Structure du projet

```txt
api/
├── controllers/      # Logique métier
├── data/             # Scripts sql création tables + seeding (docker)
├── middlewares/      # Middlewares (validation, erreurs, etc.)
├── migrations/       # Scripts JS de création tables + seedings
├── models/           # Définitions des modèles
├── routers/          # Définition des routes Express
├── schemas/          # Définition des schémas de validations des données Joi
├── .env.example      # Exemple variables d'environnement
├── package.json
└── index.js          # Point d
```

---

## ⚙️ Variables d’environnement

Créer un fichier `.env` dans `/api` basé sur `.env.example`.

Exemple :

```
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

---

## 📦 Installation

Depuis la racine du projet :

```bash
npm install
```

Ou uniquement pour l'API :

```bash
cd api
npm install
```

---

## 🗄️ Gestion de la base de données (Sequelize-CLI)

### ▶️ Créer la base

```bash
npm run db:create
```

### ▶️ Peupler avec les données de test (seeders)

```bash
npm run db:seed
```

### ♻️ Reset complet DB + seeds

```bash
npm run db:reset
```

---

## ▶️ Lancer l’API

Depuis la racine :

```bash
npm run dev:back
```

Ou depuis `/api` :

```bash
npm run dev  
```

L’API tourne sur :

👉 `http://localhost:3000/api` *(modifiable via `.env`)*

---

## 📌 Documentation API

La documentation détaillée des endpoints, schémas et exemples JSON se trouve ici :

➡️ [`api-documentation.md`](./api-documentation.md)

---

## 📌 Roadmap Backend

- Validation schémas (Joi)
- Authentification JWT
- Rôles utilisateurs (admin / member)
- Optimisation requêtes Sequelize (relations & include)

---

## 👤 Auteur

**Tony Saes**

🔗 GitHub : https://github.com/TonySaes

---
