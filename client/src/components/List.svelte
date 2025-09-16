<article>
  <div>
    <h2>{list.title}</h2>
    
    {#if $isAdmin}
      <div>
        <button data-list-grab><Hand /></button>
        <EditListButton {list} />
        <DeleteListButton {list} />
        <AddCardButton {list} />
      </div>  
    {/if}
  </div>

  <ul bind:this={cardsContainer} data-list-id={list.id}>
    {#each list.cards as card}
      <li data-card-id={card.id}>
        <Card {card}/>
      </li>
    {/each}
  </ul>

</article>


<script>
  import { Hand } from "@lucide/svelte";
  import { onMount } from "svelte";
  import Sortable from "sortablejs";
  import Card from "./Card.svelte";
  import AddCardButton from "./business/AddCardButton.svelte";
  import DeleteListButton from "./business/DeleteListButton.svelte";
  import EditListButton from "./business/EditListButton.svelte";
  import { kanban, lists } from "../stores/kanban.store.js";
  import { preventDOMUpdates } from "../lib/sortable.js";
  import { api } from "../services/api.service.js";
  import { isAdmin } from "../stores/auth.store.js";
  
  const { list } = $props();
  let cardsContainer; // HTMLUlListElement

  onMount(() => {
    Sortable.create(cardsContainer, {
      handle: "[data-card-grab]",
      group: "cards",
      onEnd: onDragAndDrop
    })
  });

  async function onDragAndDrop(event) {
    preventDOMUpdates(event);

    const { item, from, to, oldIndex, newIndex } = event;
    const cardId = parseInt(item.dataset.cardId);
    const fromListId = parseInt(from.dataset.listId);
    const toListId = parseInt(to.dataset.listId);

    // Store update
    kanban.moveCard({ fromListId, toListId, oldIndex, newIndex });

    // API calls
    // (possible improvement : add a dedicated API route to limit the number of updates)
    if (fromListId !== toListId) {
      await api.updateCard(cardId, { list_id: toListId });
    }

    const fromList = $lists.find(list => list.id === fromListId);
    await api.updateCardsPosition(fromList);
    
    const toList = $lists.find(list => list.id === toListId);
    await api.updateCardsPosition(toList);
  }

</script>

<style scoped>
  article {
    padding: 1rem;
    margin: 1rem;
    border: 1px solid black;

    > div {
      display: flex;
      justify-content: space-between;
    }
  }

</style>