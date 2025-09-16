<header>
  <h1>Okanban</h1>

  <div>
    {#if !$isAuthed}
      <SignupButton />
      <LoginButton />
    {/if}



    {#if $isAuthed}
      <LogoutButton />
      {#if $isAdmin}
        <AddListButton />
      {/if}
    {/if}
  </div>
</header>

<section>
  <ul bind:this={listsContainer}>
    {#each $lists as list}
      <li>
        <List {list} />
      </li>
    {/each}
  </ul>
</section>

<script>
  import { onMount } from "svelte";
  import Sortable from "sortablejs";
  import List from "./components/List.svelte";
  import AddListButton from "./components/business/AddListButton.svelte";
  import { api } from "./services/api.service.js";
  import { kanban, lists } from "./stores/kanban.store.js";
  import { preventDOMUpdates } from "./lib/sortable.js";
  import SignupButton from "./components/business/SignupButton.svelte";
  import LoginButton from "./components/business/LoginButton.svelte";
  import LogoutButton from "./components/business/LogoutButton.svelte";
  import { isAuthed, isAdmin } from "./stores/auth.store.js";

  let listsContainer = $state(); // HTMLUListElement

  onMount(async () => {
    Sortable.create(listsContainer, { onUpdate: onDragAndDrop, handle: "[data-list-grab]" });
    
    if ($isAuthed) {
      const lists = await api.getAllLists();
      kanban.setLists(lists);
    }
  });

  async function onDragAndDrop(event) {
    preventDOMUpdates(event);
    
    // Mise à jour du state et appel de l'API
    kanban.moveList(event.oldIndex, event.newIndex);
    await api.updateListsPosition($lists);
  }
</script>

<style>
  header {
    display: flex;
    justify-content: space-between;
  }
</style>