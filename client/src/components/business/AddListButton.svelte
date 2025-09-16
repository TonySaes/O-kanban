<button onclick={toggleModal}>Ajouter une liste</button>

<FormModal
  bind:open={open}
  onSubmit={createList}
  modalTitle="Ajouter une liste"
  submitLabel="Créer"
>
  <label>
    Titre de la liste
    <input type="text" name="title" placeholder="Titre de la liste">
  </label>
</FormModal>

<script>
  import { api } from "../../services/api.service.js";
  import { kanban } from "../../stores/kanban.store.js";
  import FormModal from "../generic/FormModal.svelte";

  let open = $state(false);
  let toggleModal = () => open = !open;

  async function createList(formData) {
    const createdList = await api.createList(formData);
    kanban.addList(createdList);
  }
</script>
