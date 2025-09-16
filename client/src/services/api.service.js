import { httpRequester } from "./httpRequester.js";

export const api = {
  getAllLists,
  createList,
  deleteList,
  updateList,
  updateListsPosition,

  createCard,
  deleteCard,
  updateCard,
  updateCardsPosition,

  register,
  login,
};

async function getAllLists() {
  return await httpRequester.get("/lists/expanded");
}

async function createList(list) {
  return await httpRequester.post("/lists", list);
}

async function deleteList(listId) {
  return await httpRequester.delete(`/lists/${listId}`);
}

async function updateList(listId, listData) {
  return await httpRequester.patch(`/lists/${listId}`, listData);
}

async function updateListsPosition(lists) {
  const promises = lists.map((list, index) => updateList(list.id, { position: index + 1 }));
  await Promise.all(promises);
}

async function createCard(card) {
  return await httpRequester.post(`/cards`, card);
}

async function deleteCard(cardId) {
  return await httpRequester.delete(`/cards/${cardId}`);
}

async function updateCard(cardId, cardData) {
  return await httpRequester.patch(`/cards/${cardId}`, cardData);
}

async function updateCardsPosition(list) {
  const promises = list.cards.map((card, index) => updateCard(card.id, { position: index + 1 }));
  await Promise.all(promises);
}

async function register(signupData) {
  return await httpRequester.post(`/auth/register`, signupData);
}

async function login(loginData) {
  return await httpRequester.post(`/auth/login`, loginData);
}


