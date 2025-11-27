# API Documentation - OKanban

## Vue d'ensemble

L'API OKanban est une API REST qui permet de gérer des listes et des cartes dans un système de type Kanban (inspiré de Trello). Cette API est développée avec Node.js, Express.js et Sequelize avec PostgreSQL.

**URL de base :** `http://localhost:3000`  
**Version :** 1.0.0  
**Format de réponse :** JSON  

## Sommaire

### Informations générales
- [Architecture](#architecture)
- [Authentification](#authentification)
- [Format des réponses](#format-des-réponses)
- [Codes de statut HTTP](#codes-de-statut-http)
- [Endpoint d'accueil](#endpoint-daccueil)

### Ressource Lists (Listes)
- [Structure d'une Liste](#structure-dune-liste)
- [GET /lists](#get-lists) - Récupérer toutes les listes
- [GET /lists/expanded](#get-listsexpanded) - Récupérer les listes avec cartes et tags
- [POST /lists](#post-lists) - Créer une nouvelle liste
- [GET /lists/:id](#get-listsid) - Récupérer une liste spécifique
- [PATCH /lists/:id](#patch-listsid) - Modifier une liste
- [DELETE /lists/:id](#delete-listsid) - Supprimer une liste
- [GET /lists/:id/cards](#get-listsidcards) - Récupérer les cartes d'une liste

### Ressource Cards (Cartes)
- [Structure d'une Carte](#structure-dune-carte)
- [GET /cards](#get-cards) - Récupérer toutes les cartes
- [POST /cards](#post-cards) - Créer une nouvelle carte
- [GET /cards/:id](#get-cardsid) - Récupérer une carte spécifique
- [PATCH /cards/:id](#patch-cardsid) - Modifier une carte
- [DELETE /cards/:id](#delete-cardsid) - Supprimer une carte
- [PUT /cards/:cardId/tags/:tagId](#put-cardscardidtagstagid) - Associer un tag à une carte
- [DELETE /cards/:cardId/tags/:tagId](#delete-cardscardidtagstagid) - Dissocier un tag d'une carte

### Ressource Tags
- [Structure d'un Tag](#structure-dun-tag)
- [GET /tags](#get-tags) - Récupérer tous les tags
- [POST /tags](#post-tags) - Créer un nouveau tag
- [GET /tags/:id](#get-tagsid) - Récupérer un tag spécifique
- [PATCH /tags/:id](#patch-tagsid) - Modifier un tag
- [DELETE /tags/:id](#delete-tagsid) - Supprimer un tag

### Guides pratiques
- [Exemples complets d'utilisation](#exemples-complets-dutilisation)
- [Relations entre les ressources](#relations-entre-les-ressources)
- [Notes techniques](#notes-techniques)

---

## Architecture

- **Framework :** Express.js
- **ORM :** Sequelize
- **Base de données :** PostgreSQL
- **Validation :** Joi
- **Structure :** MVC (Model-View-Controller)

## Authentification

Aucune authentification n'est actuellement requise pour utiliser cette API.

## Format des réponses

Toutes les réponses sont au format JSON. Les erreurs suivent le format suivant :

```json
{
  "error": "Message d'erreur descriptif"
}
```

## Codes de statut HTTP

| Code | Description |
|------|-------------|
| 200  | OK - Requête réussie |
| 201  | Created - Ressource créée avec succès |
| 204  | No Content - Requête réussie sans contenu de réponse |
| 400  | Bad Request - Erreur dans les paramètres de la requête |
| 404  | Not Found - Ressource non trouvée |
| 500  | Internal Server Error - Erreur serveur |

## Endpoint d'accueil

### GET /

Indique que l'API est opérationnelle et fournit quelques informations de base.

**Réponse :**
```json
{
  "message": "Welcome to the Okanban API",
  "description": "This is the API for the Okanban application, a kanban board application.",
  "version": "1.0.0",
  "author": "Cambridge - Oclock",
  "base_get_routes": {
    "lists": "/lists",
    "liste_expanded": "/lists/expanded",
    "cards": "/cards",
    "tags": "/tags"
  }
}
```

---

# Endpoints - Ressource "Lists"

## Structure d'une Liste

```json
{
  "id": 1,
  "title": "À faire",
  "position": 1,
  "created_at": "2025-07-24T10:00:00.000Z",
  "updated_at": "2025-07-24T10:00:00.000Z"
}
```

### Propriétés

| Propriété | Type | Description |
|-----------|------|-------------|
| `id` | number | Identifiant unique de la liste (généré automatiquement) |
| `title` | string | Titre de la liste (1-100 caractères, obligatoire) |
| `position` | number | Position de la liste dans l'ordre d'affichage (entier ≥ 1) |
| `created_at` | string | Date de création au format ISO 8601 |
| `updated_at` | string | Date de dernière modification au format ISO 8601 |

---

## GET /lists

<details>
<summary><strong>Récupère toutes les listes triées par position croissante</strong></summary>

### Réponse de succès

**Code :** `200 OK`

**Contenu :**
```json
[
  {
    "id": 1,
    "title": "À faire",
    "position": 1,
    "created_at": "2025-07-24T10:00:00.000Z",
    "updated_at": "2025-07-24T10:00:00.000Z"
  },
  {
    "id": 2,
    "title": "En cours",
    "position": 2,
    "created_at": "2025-07-24T10:05:00.000Z",
    "updated_at": "2025-07-24T10:05:00.000Z"
  }
]
```

### Exemple d'utilisation

```bash
curl -X GET http://localhost:3000/lists
```

</details>

---

## GET /lists/expanded

<details>
<summary><strong>Récupère toutes les listes avec leurs cartes et leurs tags associés</strong> ⚠️ <em>Réponse volumineuse</em></summary>

Cette route est très utile pour obtenir une vue complète du tableau Kanban en une seule requête.

**⚠️ Attention :** Cette route peut générer une réponse volumineuse selon le nombre de listes, cartes et tags.

### Réponse de succès

**Code :** `200 OK`

**Contenu :**
```json
[
  {
    "id": 1,
    "title": "À faire",
    "position": 1,
    "createdAt": "2025-07-24T10:00:00.000Z",
    "updatedAt": "2025-07-24T10:00:00.000Z",
    "cards": [
      {
        "id": 1,
        "content": "Faire les courses",
        "position": 1,
        "color": "#ffffff",
        "list_id": 1,
        "createdAt": "2025-07-24T10:00:00.000Z",
        "updatedAt": "2025-07-24T10:00:00.000Z",
        "tags": [
          {
            "id": 1,
            "name": "Urgent",
            "color": "#ff0000",
            "createdAt": "2025-07-24T10:00:00.000Z",
            "updatedAt": "2025-07-24T10:00:00.000Z"
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "title": "En cours",
    "position": 2,
    "createdAt": "2025-07-24T10:05:00.000Z",
    "updatedAt": "2025-07-24T10:05:00.000Z",
    "cards": []
  }
]
```

### Avantages de cette route

- **Performance :** Une seule requête au lieu de plusieurs
- **Frontend :** Idéale pour l'initialisation d'un tableau Kanban
- **Complétude :** Toutes les données nécessaires en une fois

### Exemple d'utilisation

```bash
curl -X GET http://localhost:3000/lists/expanded
```

</details>

---

## POST /lists

<details>
<summary><strong>Crée une nouvelle liste</strong></summary>

### Paramètres du corps de la requête

**Content-Type :** `application/json`

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `title` | string | Oui | Titre de la liste (1-100 caractères) |
| `position` | number | Non | Position de la liste (entier ≥ 1, défaut: 1) |

### Exemple de requête

```json
{
  "title": "Nouvelle liste",
  "position": 3
}
```

### Réponse de succès

**Code :** `201 Created`

### Réponses d'erreur

| Code | Contenu | Description |
|------|---------|-------------|
| 400 | `{"error": "\"title\" is required"}` | Le titre est manquant |
| 400 | `{"error": "\"title\" is not allowed to be empty"}` | Le titre est vide |
| 400 | `{"error": "\"position\" must be a number"}` | La position n'est pas un nombre |

### Exemple d'utilisation

```bash
curl -X POST http://localhost:3000/lists \
  -H "Content-Type: application/json" \
  -d '{"title": "Ma nouvelle liste", "position": 2}'
```

</details>

---

## GET /lists/:id

<details>
<summary><strong>Récupère une liste spécifique par son ID</strong></summary>

### Paramètres de l'URL

| Paramètre | Type | Description |
|-----------|------|-------------|
| `id` | number | Identifiant unique de la liste |

### Réponse de succès

**Code :** `200 OK`

### Réponses d'erreur

| Code | Contenu | Description |
|------|---------|-------------|
| 400 | `{"error": "Invalid ID format"}` | L'ID fourni n'est pas valide |
| 404 | `{"error": "List not found"}` | La liste avec cet ID n'existe pas |

### Exemple d'utilisation

```bash
curl -X GET http://localhost:3000/lists/1
```

</details>

---

## PATCH /lists/:id

<details>
<summary><strong>Met à jour partiellement une liste existante</strong></summary>

### Paramètres du corps de la requête

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `title` | string | Non | Nouveau titre de la liste (1-100 caractères) |
| `position` | number | Non | Nouvelle position de la liste (entier ≥ 1) |

**Note :** Au moins un des paramètres `title` ou `position` doit être fourni.

### Exemple d'utilisation

```bash
curl -X PATCH http://localhost:3000/lists/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Nouveau titre"}'
```

</details>

---

## DELETE /lists/:id

<details>
<summary><strong>Supprime une liste et toutes ses cartes</strong> ⚠️ <em>Suppression cascade</em></summary>

### Réponse de succès

**Code :** `204 No Content`

### Exemple d'utilisation

```bash
curl -X DELETE http://localhost:3000/lists/1
```

</details>

---

## GET /lists/:id/cards

<details>
<summary><strong>Récupère toutes les cartes d'une liste spécifique</strong></summary>

### Paramètres de l'URL

| Paramètre | Type | Description |
|-----------|------|-------------|
| `id` | number | Identifiant unique de la liste |

### Réponse de succès

**Code :** `200 OK`

**Contenu :**
```json
[
  {
    "id": 1,
    "content": "Faire les courses",
    "position": 1,
    "color": "#ffffff",
    "list_id": 1,
    "created_at": "2025-07-24T10:00:00.000Z",
    "updated_at": "2025-07-24T10:00:00.000Z"
  }
]
```

### Exemple d'utilisation

```bash
curl -X GET http://localhost:3000/lists/1/cards
```

</details>

---

# Endpoints - Ressource "Cards"

## Structure d'une Carte

```json
{
  "id": 1,
  "content": "Faire les courses",
  "position": 1,
  "color": "#ffffff",
  "list_id": 1,
  "created_at": "2025-07-24T10:00:00.000Z",
  "updated_at": "2025-07-24T10:00:00.000Z"
}
```

### Propriétés

| Propriété | Type | Description |
|-----------|------|-------------|
| `id` | number | Identifiant unique de la carte (généré automatiquement) |
| `content` | string | Contenu de la carte (1-300 caractères, obligatoire) |
| `position` | number | Position de la carte dans la liste (entier ≥ 1, défaut: 1) |
| `color` | string | Couleur de la carte au format hexadécimal (#RRGGBB) |
| `list_id` | number | Identifiant de la liste parent (obligatoire) |
| `created_at` | string | Date de création au format ISO 8601 |
| `updated_at` | string | Date de dernière modification au format ISO 8601 |

---

## GET /cards

<details>
<summary><strong>Récupère toutes les cartes</strong> 🔍 <em>Filtrage par liste possible</em></summary>

Récupère toutes les cartes, avec possibilité de filtrage par liste.

### Paramètres de requête (optionnels)

| Paramètre | Type | Description |
|-----------|------|-------------|
| `list_id` | number | Filtrer les cartes par ID de liste |

### Réponse de succès

**Code :** `200 OK`

**Contenu :**
```json
[
  {
    "id": 1,
    "content": "Faire les courses",
    "position": 1,
    "color": "#ffffff",
    "list_id": 1,
    "created_at": "2025-07-24T10:00:00.000Z",
    "updated_at": "2025-07-24T10:00:00.000Z"
  }
]
```

### Exemples d'utilisation

```bash
# Toutes les cartes
curl -X GET http://localhost:3000/cards

# Cartes d'une liste spécifique
curl -X GET "http://localhost:3000/cards?list_id=1"
```

</details>

---

## POST /cards

<details>
<summary><strong>Crée une nouvelle carte</strong></summary>

### Paramètres du corps de la requête

**Content-Type :** `application/json`

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `content` | string | Oui | Contenu de la carte (1-300 caractères) |
| `list_id` | number | Oui | ID de la liste parent (doit exister) |
| `position` | number | Non | Position dans la liste (entier ≥ 1, défaut: 1) |
| `color` | string | Non | Couleur au format hexadécimal (#RRGGBB) |

### Exemple de requête

```json
{
  "content": "Nouvelle tâche",
  "list_id": 1,
  "position": 2,
  "color": "#ffcc00"
}
```

### Réponse de succès

**Code :** `201 Created`

### Réponses d'erreur

| Code | Contenu | Description |
|------|---------|-------------|
| 400 | `{"error": "\"content\" is required"}` | Le contenu est manquant |
| 400 | `{"error": "\"list_id\" is required"}` | L'ID de liste est manquant |
| 400 | `{"error": "List not found"}` | La liste spécifiée n'existe pas |

### Exemple d'utilisation

```bash
curl -X POST http://localhost:3000/cards \
  -H "Content-Type: application/json" \
  -d '{"content": "Nouvelle tâche", "list_id": 1}'
```

</details>

---

## GET /cards/:id

<details>
<summary><strong>Récupère une carte spécifique par son ID</strong></summary>

### Paramètres de l'URL

| Paramètre | Type | Description |
|-----------|------|-------------|
| `id` | number | Identifiant unique de la carte |

### Réponse de succès

**Code :** `200 OK`

### Réponses d'erreur

| Code | Contenu | Description |
|------|---------|-------------|
| 400 | `{"error": "Invalid ID format"}` | L'ID fourni n'est pas valide |
| 404 | `{"error": "Card not found"}` | La carte avec cet ID n'existe pas |

### Exemple d'utilisation

```bash
curl -X GET http://localhost:3000/cards/1
```

</details>

---

## PATCH /cards/:id

<details>
<summary><strong>Met à jour partiellement une carte</strong></summary>

### Paramètres du corps de la requête

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `content` | string | Non | Nouveau contenu (1-300 caractères) |
| `position` | number | Non | Nouvelle position (entier ≥ 1) |
| `color` | string | Non | Nouvelle couleur (#RRGGBB) |
| `list_id` | number | Non | Nouvel ID de liste (pour déplacer la carte) |

**Note :** Au moins un paramètre doit être fourni.

### Exemple d'utilisation

```bash
curl -X PATCH http://localhost:3000/cards/1 \
  -H "Content-Type: application/json" \
  -d '{"content": "Contenu modifié", "position": 3}'
```

</details>

---

## DELETE /cards/:id

<details>
<summary><strong>Supprime une carte existante</strong></summary>

### Réponse de succès

**Code :** `204 No Content`

### Exemple d'utilisation

```bash
curl -X DELETE http://localhost:3000/cards/1
```

</details>

---

## PUT /cards/:cardId/tags/:tagId

<details>
<summary><strong>Associe un tag à une carte</strong> 🔗</summary>

### Paramètres de l'URL

| Paramètre | Type | Description |
|-----------|------|-------------|
| `cardId` | number | Identifiant unique de la carte |
| `tagId` | number | Identifiant unique du tag |

### Réponse de succès

**Code :** `204 No Content`

### Réponses d'erreur

| Code | Contenu | Description |
|------|---------|-------------|
| 400 | `{"error": "Invalid card or tag ID"}` | ID de carte ou tag invalide |
| 400 | `{"error": "Card not found"}` | La carte n'existe pas |
| 400 | `{"error": "Tag not found"}` | Le tag n'existe pas |

### Exemple d'utilisation

```bash
curl -X PUT http://localhost:3000/cards/1/tags/2
```

</details>

---

## DELETE /cards/:cardId/tags/:tagId

<details>
<summary><strong>Dissocie un tag d'une carte</strong> 🔗</summary>

### Paramètres de l'URL

| Paramètre | Type | Description |
|-----------|------|-------------|
| `cardId` | number | Identifiant unique de la carte |
| `tagId` | number | Identifiant unique du tag |

### Réponse de succès

**Code :** `204 No Content`

**Note :** Cette opération est "silencieuse" - elle réussit même si l'association n'existait pas.

### Exemple d'utilisation

```bash
curl -X DELETE http://localhost:3000/cards/1/tags/2
```

</details>

---

# Endpoints - Ressource "Tags"

## Structure d'un Tag

```json
{
  "id": 1,
  "name": "Urgent",
  "color": "#ff0000",
  "created_at": "2025-07-24T10:00:00.000Z",
  "updated_at": "2025-07-24T10:00:00.000Z"
}
```

### Propriétés

| Propriété | Type | Description |
|-----------|------|-------------|
| `id` | number | Identifiant unique du tag (généré automatiquement) |
| `name` | string | Nom du tag (1-50 caractères, obligatoire, unique) |
| `color` | string | Couleur du tag au format hexadécimal (#RRGGBB, défaut: #808080) |
| `created_at` | string | Date de création au format ISO 8601 |
| `updated_at` | string | Date de dernière modification au format ISO 8601 |

---

## GET /tags

<details>
<summary><strong>Récupère tous les tags triés par nom</strong></summary>

### Réponse de succès

**Code :** `200 OK`

**Contenu :**
```json
[
  {
    "id": 1,
    "name": "Important",
    "color": "#ffaa00",
    "created_at": "2025-07-24T10:00:00.000Z",
    "updated_at": "2025-07-24T10:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Urgent",
    "color": "#ff0000",
    "created_at": "2025-07-24T10:05:00.000Z",
    "updated_at": "2025-07-24T10:05:00.000Z"
  }
]
```

### Exemple d'utilisation

```bash
curl -X GET http://localhost:3000/tags
```

</details>

---

## POST /tags

<details>
<summary><strong>Crée un nouveau tag</strong> ⚠️ <em>Nom unique requis</em></summary>

### Paramètres du corps de la requête

**Content-Type :** `application/json`

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `name` | string | Oui | Nom du tag (1-50 caractères, unique) |
| `color` | string | Non | Couleur au format hexadécimal (#RRGGBB, défaut: #808080) |

### Exemple de requête

```json
{
  "name": "Nouveau tag",
  "color": "#00ff00"
}
```

### Réponse de succès

**Code :** `201 Created`

### Réponses d'erreur

| Code | Contenu | Description |
|------|---------|-------------|
| 400 | `{"error": "Tag name already exists"}` | Le nom du tag existe déjà |
| 400 | `{"error": "\"name\" is required"}` | Le nom est manquant |
| 400 | `{"error": "\"color\" must match pattern"}` | Format de couleur invalide |

### Exemple d'utilisation

```bash
curl -X POST http://localhost:3000/tags \
  -H "Content-Type: application/json" \
  -d '{"name": "Important", "color": "#ffaa00"}'
```

</details>

---

## GET /tags/:id

<details>
<summary><strong>Récupère un tag spécifique par son ID</strong></summary>

### Paramètres de l'URL

| Paramètre | Type | Description |
|-----------|------|-------------|
| `id` | number | Identifiant unique du tag |

### Réponse de succès

**Code :** `200 OK`

### Réponses d'erreur

| Code | Contenu | Description |
|------|---------|-------------|
| 400 | `{"error": "Invalid ID format"}` | L'ID fourni n'est pas valide |
| 404 | `{"error": "Tag not found"}` | Le tag avec cet ID n'existe pas |

### Exemple d'utilisation

```bash
curl -X GET http://localhost:3000/tags/1
```

</details>

---

## PATCH /tags/:id

<details>
<summary><strong>Met à jour partiellement un tag</strong></summary>

### Paramètres du corps de la requête

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `name` | string | Non | Nouveau nom du tag (1-50 caractères, unique) |
| `color` | string | Non | Nouvelle couleur au format hexadécimal (#RRGGBB) |

**Note :** Au moins un des paramètres `name` ou `color` doit être fourni.

### Exemple d'utilisation

```bash
curl -X PATCH http://localhost:3000/tags/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Très urgent", "color": "#cc0000"}'
```

</details>

---

## DELETE /tags/:id

<details>
<summary><strong>Supprime un tag existant</strong></summary>

### Réponse de succès

**Code :** `204 No Content`

### Réponses d'erreur

| Code | Contenu | Description |
|------|---------|-------------|
| 404 | `{"error": "Tag not found"}` | Le tag avec cet ID n'existe pas |

### Exemple d'utilisation

```bash
curl -X DELETE http://localhost:3000/tags/1
```

</details>

---

# Exemples complets d'utilisation

## Scénario 1 : Créer un tableau Kanban complet

### 1. Créer des listes

```bash
# Créer liste "À faire"
curl -X POST http://localhost:3000/lists \
  -H "Content-Type: application/json" \
  -d '{"title": "À faire", "position": 1}'

# Créer liste "En cours"
curl -X POST http://localhost:3000/lists \
  -H "Content-Type: application/json" \
  -d '{"title": "En cours", "position": 2}'

# Créer liste "Terminé"
curl -X POST http://localhost:3000/lists \
  -H "Content-Type: application/json" \
  -d '{"title": "Terminé", "position": 3}'
```

### 2. Créer des tags

```bash
# Tag urgent
curl -X POST http://localhost:3000/tags \
  -H "Content-Type: application/json" \
  -d '{"name": "Urgent", "color": "#ff0000"}'

# Tag important
curl -X POST http://localhost:3000/tags \
  -H "Content-Type: application/json" \
  -d '{"name": "Important", "color": "#ffaa00"}'
```

### 3. Créer des cartes

```bash
# Carte dans "À faire"
curl -X POST http://localhost:3000/cards \
  -H "Content-Type: application/json" \
  -d '{"content": "Faire les courses", "list_id": 1, "position": 1}'

# Carte dans "En cours"
curl -X POST http://localhost:3000/cards \
  -H "Content-Type: application/json" \
  -d '{"content": "Développer nouvelle fonctionnalité", "list_id": 2, "position": 1, "color": "#ccffcc"}'
```

### 4. Associer des tags aux cartes

```bash
# Associer tag "Urgent" à la première carte
curl -X PUT http://localhost:3000/cards/1/tags/1

# Associer tag "Important" à la deuxième carte  
curl -X PUT http://localhost:3000/cards/2/tags/2
```

## Scénario 2 : Déplacer une carte

```bash
# Déplacer la carte 1 vers la liste "En cours" (ID 2)
curl -X PATCH http://localhost:3000/cards/1 \
  -H "Content-Type: application/json" \
  -d '{"list_id": 2, "position": 2}'
```

## Scénario 3 : Récupérer l'état complet

```bash
# Récupérer toutes les listes
curl -X GET http://localhost:3000/lists

# Récupérer toutes les cartes
curl -X GET http://localhost:3000/cards

# Récupérer tous les tags
curl -X GET http://localhost:3000/tags

# Récupérer les cartes d'une liste spécifique
curl -X GET http://localhost:3000/lists/1/cards
```

---

# Relations entre les ressources

## Modèle de données

```
Lists (1) -----> (*) Cards (*) <-----> (*) Tags
                     |                    |
                     |                    |
         relation one-to-many    relation many-to-many
```

### Relations

1. **Liste → Cartes** (One-to-Many)
   - Une liste peut contenir plusieurs cartes
   - Une carte appartient à une seule liste
   - Suppression en cascade : supprimer une liste supprime ses cartes

2. **Cartes ↔ Tags** (Many-to-Many)
   - Une carte peut avoir plusieurs tags
   - Un tag peut être associé à plusieurs cartes
   - Table de jointure : `card_has_tag`

---

# Notes techniques

## Validation des données

L'API utilise Joi pour la validation :

### Listes
- **title :** chaîne 1-100 caractères, obligatoire
- **position :** entier ≥ 1, optionnel (défaut: 1)

### Cartes  
- **content :** chaîne 1-300 caractères, obligatoire
- **list_id :** entier ≥ 1, obligatoire (doit exister)
- **position :** entier ≥ 1, optionnel (défaut: 1)
- **color :** format hexadécimal #RRGGBB, optionnel

### Tags
- **name :** chaîne 1-50 caractères, obligatoire, unique
- **color :** format hexadécimal #RRGGBB, optionnel (défaut: #808080)

## Gestion des erreurs

- Erreurs HTTP personnalisées avec codes de statut appropriés
- Messages d'erreur descriptifs
- Validation automatique avec Joi
- Middleware centralisé de gestion d'erreurs

## Tri automatique

- **Listes :** triées par `position ASC`, puis `id ASC`
- **Cartes :** triées par `list_id ASC`, puis `position ASC`, puis `id ASC`  
- **Tags :** triés par `name ASC`, puis `id ASC`

---

# Informations de contact

**Projet :** OKanban API  
**Version :** 1.0.0  
**Auteur :** O'Clock  
**Licence :** ISC

**Base de données :** PostgreSQL avec Sequelize ORM  
**Validation :** Joi  
**Architecture :** Express.js MVC
