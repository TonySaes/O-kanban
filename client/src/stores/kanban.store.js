import { writable } from "svelte/store";

export const lists = writable([]);

export const kanban = {
  getLists,
  setLists,
  
  addList,
  removeList,
  updateList,
  moveList,

  addCard,
  removeCard,
  updateCard,
  moveCard,
}

// ====== Lists ======

function getLists() {
  return lists;
}

function setLists(newLists) {
  lists.set(newLists);
}

function addList(newList) {
  lists.update(currentLists => [...currentLists, newList]);
}

function removeList(listToRemove) {
  lists.update(currentLists => currentLists.filter(list => list.id !== listToRemove.id));
}

function updateList(updatedList) {
  lists.update(currentLists =>
    currentLists.map(list => {
      if (list.id !== updatedList.id) { return list; }
      return { ...list, ...updatedList }
    })
  );
}

function moveList(oldIndex, newIndex) {
  lists.update(currentLists => {
    const itemToMove = currentLists[oldIndex];
    const newLists = [
      ...currentLists.slice(0, oldIndex),
      ...currentLists.slice(oldIndex + 1)
    ];
    return [
      ...newLists.slice(0, newIndex),
      itemToMove,
      ...newLists.slice(newIndex)
    ];
  });
}

// ====== Cards ======

function addCard(card) {
  lists.update(currentLists => {
    return currentLists.map(list => {
      if (list.id !== card.list_id) { return list; }
      const cards = [...(list.cards || []), card];
      return { ...list, cards }
    });
  })
}

function updateCard(updatedCard) {
  lists.update(currentLists => {
    return currentLists.map(list => {
      if (list.id !== updatedCard.list_id) { return list; }
      const cards = list.cards.map(card => card.id === updatedCard.id ? updatedCard : card);
      return { ...list, cards };
    });
  }
  );
}

function removeCard(cardToRemove) {
  lists.update(currentLists => {
    return currentLists.map(list => {
      if (list.id !== cardToRemove.list_id) { return list; }
      const cards = list.cards.filter(card => card.id !== cardToRemove.id);
      return { ...list, cards };
    })
  });
}

function moveCard({ oldIndex, newIndex, fromListId, toListId }) {
  lists.update(currentLists => {
    const newLists = [...currentLists];
    const fromListIndex = currentLists.findIndex(list => list.id === fromListId);
    const toListIndex = currentLists.findIndex(list => list.id === toListId);

    const [card] = newLists[fromListIndex].cards.splice(oldIndex, 1);
    card.list_id = toListId;
    newLists[toListIndex].cards.splice(newIndex, 0, card);

    return newLists;
  });
}
