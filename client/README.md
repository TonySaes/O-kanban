# Frontend — O-kanban (Svelte 5)

Ce dossier contient la partie **Frontend** du projet **O-kanban**, une application Kanban développée en **Svelte 5** et construite avec **Vite**.

Ce projet communique avec l’API backend (Node.js / Express / PostgreSQL / Sequelize) située dans le dossier `api/` du même dépôt.

---

## 🚀 Fonctionnalités du Frontend

- Interface Kanban responsive
- Création, modification et suppression de tâches
- Déplacement des tâches entre colonnes
- Communication avec l'API backend via appels HTTP (REST)
- Architecture composantielle avec **Svelte 5**
- Build optimisé grâce à **Vite**

---

## 🧱 Stack utilisée

| Domaine | Technologie |
|--------|------------|
| Framework Frontend | **Svelte 5** |
| Outil de build | **Vite** |
| Style | CSS natif |
| Communication API | Fetch/store |

---

## 📂 Structure du dossier

```txt
client/
├── public/            # Assets statiques
├── src/
│   ├── components/    # Composants UI
│   ├── assets/        # CSS généraux
│   ├── store/         # Gestion d’état 
│   ├── services/      # services API
│   └── main.js        # Point d'entrée de l'application
├── index.html
├── vite.config.js
└── package.json
```

---

## ⚙️ Pré-requis

- **Node.js v18+** (LTS recommandé)
- **npm** (ou yarn / pnpm si utilisé)

---

## 📦 Installation

Depuis la racine du projet :

```bash
npm run install
```

Cette commande installe les dépendances du backend **et** du frontend.

Si tu veux installer uniquement la partie front :

```bash
cd client
npm install
```

---

## ▶️ Lancer le projet (Développement)

Depuis la racine :

```bash
npm run dev
```

Ou uniquement le front :

```bash
cd client
npm run dev
```

Le front sera accessible sur :

👉 **http://localhost:5173**

---

## 🏗️ Build Production

Pour construire une version optimisée :

```bash
npm run build
```

Pour la prévisualiser localement :

```bash
npm run preview
```

---

## 🔌 Connexion à l’API Backend

L'application consomme l'API située dans le dossier `api/`.

Selon ton organisation, l’URL peut être configurée via :

```
.env
vite.config.js
src/utils/api.js
```


```js
const API_BASE_URL = "http://localhost:3000/api";
```

---

## 📌 Scripts disponibles dans `client/package.json`

| Script | Action |
|--------|--------|
| `npm run dev` | Démarre l’application en mode développement (Vite) |
| `npm run build` | Génére les fichiers optimisés pour la production |
| `npm run preview` | Sert en local la version buildée |

---

## 📌 Roadmap front

- Intégration drag & drop natif
- Gestion multi-boards
- Mode sombre
- Animations UI
- Accessibilité (ARIA, navigation clavier)

---

## 👤 Auteur

**Tony Saes**  
🔗 GitHub : https://github.com/TonySaes

---

