<button onclick={toggleModal}><Pencil /></button>

<FormModal
  bind:open={open}
  onSubmit={editList}
  modalTitle="Modifier la liste"
  submitLabel="Modifier"
>
  <label>
    Nouveau titre
    <input type="text" value={list.title} name="title" placeholder="Nouveau titre">
  </label>  
</FormModal>

<script>
  import { Pencil } from "@lucide/svelte";
  import { api } from "../../services/api.service.js";
  import { kanban } from "../../stores/kanban.store.js";
  import FormModal from "../generic/FormModal.svelte";

  const { list } = $props();

  let open = $state(false);
  let toggleModal = () => open = !open;

  async function editList(formData) {
    const editedList = await api.updateList(list.id, formData);
    kanban.updateList(editedList);
  }
</script>