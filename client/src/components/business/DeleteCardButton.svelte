<button onclick={toggleModal}><Trash2 /></button>

<FormModal
  bind:open={open}
  onSubmit={deleteCard}
  modalTitle="Supprimer la carte"
  submitLabel="Supprimer"
>
  <p>Êtes-vous certain de vouloir supprimer cette carte ?</p>
</FormModal>

<script>
  import { Trash2 } from "@lucide/svelte";
  import { api } from "../../services/api.service.js";
  import { kanban } from "../../stores/kanban.store.js";
  import FormModal from "../generic/FormModal.svelte";

  const { card } = $props();

  let open = $state(false);
  let toggleModal = () => open = !open;

  async function deleteCard() {
    await api.deleteCard(card.id);
    kanban.removeCard(card);
  }

</script>
