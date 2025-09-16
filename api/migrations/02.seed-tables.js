/* eslint-disable no-unused-vars */
import { sequelize, List, Card, Tag, User } from "../models/index.js";

// creation des listes
console.log("🌱 Creation des listes...");
const list1 = await List.create({ title: "Liste de courses"});
const list2 = await List.create({ title: "Todo", position: 2});
const list3 = await List.create({ title: "Anniversaires"});
console.log("✅ Listes crées\n");

// creation des cartes
console.log("🌱 Creation des cartes...");
const card1 = await Card.create({ content: "Pomme", color: "#00FF00", list_id: list1.id });
const card2 = await Card.create({ content: "Pain", color: "#FFFF00", list_id: list1.id });
const card3 = await Card.create({ content: "Savon", list_id: list1.id });

const card4 = await Card.create({ content: "Sortir le chien", list_id: list2.id });
const card5 = await Card.create({ content: "Faire la vaisselle", list_id: list2.id });
const card6 = await Card.create({ content: "Faire la lessive", list_id: list2.id });

const card7 = await Card.create({ content: "Maman : 17/07", list_id: list3.id });
const card8 = await Card.create({ content: "Jerome : 24/05", list_id: list3.id });
console.log("✅ Cartes crées\n");

// creation des tags
console.log("🌱 Creation des tags...");
const tag1 = await Tag.create({ name: "Urgent", color: "#FF0000" });
const tag2 = await Tag.create({ name: "Important", color: "#FF00FF" });
const tag3 = await Tag.create({ name: "Perso" });
console.log("✅ Tags crées\n");

// associer des tags aux cartes
console.log("🌱 Association des tags aux cartes...");
// on utilise les "specials methods" de sequelize pour ajouter des associations
await card1.addTag(tag1); // Pomme et urgent
await card2.addTag(tag3); // Pain et perso
await card3.addTag(tag2); // Savon et important
await card3.addTag(tag1); // Savon et urgent
await card8.addTag(tag2); // Jerome et important
console.log("✅ Tags associés aux cartes\n");

// créer des users
console.log("🌱 Création des utilisateurs...");
await User.create({ username: "Alice", role: "admin", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" }); // Passw0rd
await User.create({ username: "Bob", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" });
console.log("✅ Utilisateurs créés\n");

// ferme manuellement la connexion
await sequelize.close();
