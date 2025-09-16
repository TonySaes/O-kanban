<button onclick={toggleModal}><Trash2 /></button>

<FormModal
  bind:open={open}
  onSubmit={deleteList}
  modalTitle="Supprimer la liste"
  submitLabel="Supprimer"
>
  <p>Êtes-vous certain de vouloir supprimer cette liste?</p>
  <p><strong>Sa suppression entrainera la suppression de toutes les cartes associées.</strong></p>
</FormModal>


<script>
  import { Trash2 } from "@lucide/svelte";
import { api } from "../../services/api.service.js";
  import { kanban } from "../../stores/kanban.store.js";
  import FormModal from "../generic/FormModal.svelte";

  const { list } = $props();

  let open = $state(false);
  let toggleModal = () => open = !open;

  async function deleteList() {
    await api.deleteList(list.id);
    kanban.removeList(list);
  }
</script>