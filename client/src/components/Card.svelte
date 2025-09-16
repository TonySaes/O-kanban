<article>
  <p>{card.content}</p>

  {#if $isAdmin}
    <div>
      <button data-card-grab><Hand /></button>
      <EditCardButton {card} />
      <DeleteCardButton {card} />
    </div>
  {/if}
</article>


<script>
  import { Hand } from "@lucide/svelte";
  import DeleteCardButton from "./business/DeleteCardButton.svelte";
  import EditCardButton from "./business/EditCardButton.svelte";
  import { isAdmin } from "../stores/auth.store.js";

  const { card } = $props();
</script>

<style scoped>
  article {
    padding: 1rem;
    margin: 1rem;
    border: 1px solid lightcoral;

    > div {
      display: flex;
      gap: .15rem;
      justify-content: flex-end;
    }
  }
</style>