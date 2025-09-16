<button onclick={toggleModal}><Pencil /></button>

<FormModal
  bind:open={open}
  onSubmit={editCard}
  modalTitle="Modifier la carte"
  submitLabel="Modifier"
>
  <label>
    Nouveau contenu
    <textarea type="text" value={card.content} name="content" placeholder="Nouveau contenu"></textarea>
  </label>  
</FormModal>

<script>
  import { Pencil } from "@lucide/svelte";
  import { api } from "../../services/api.service.js";
  import { kanban } from "../../stores/kanban.store.js";
  import FormModal from "../generic/FormModal.svelte";

  const { card } = $props();

  let open = $state(false);
  let toggleModal = () => open = !open;

  async function editCard(formData) {
    const editedCard = await api.updateCard(card.id, formData);
    kanban.updateCard(editedCard);
  }

</script>