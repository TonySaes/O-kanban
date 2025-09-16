<button onclick={toggleModal}><Plus /></button>

<FormModal
  bind:open={open}
  onSubmit={createCard}
  modalTitle="Créer une carte"
  submitLabel="Créer"
>
  <label>
    Contenu de la carte
    <textarea name="content"></textarea>
  </label>
</FormModal>

<script>
  import { Plus } from "@lucide/svelte";
  import { api } from "../../services/api.service.js";
  import { kanban } from "../../stores/kanban.store.js";
  import FormModal from "../generic/FormModal.svelte";

  const { list } = $props();

  let open = $state(false);
  let toggleModal = () => open = !open;

  async function createCard(formData) {
    const cardData = {
      ...formData,
      list_id: list.id
    };
    const createdCard = await api.createCard(cardData)
    kanban.addCard(createdCard);
  }

</script>
