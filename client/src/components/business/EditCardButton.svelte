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
  <SpellCheckButton text={content} onCorrect={(correctedText) => content = correctedText} />
  <Translator text={content} onTranslate={(translatedText) => content = translatedText} />  
</FormModal>

<script>
  import { Pencil } from "@lucide/svelte";
  import { api } from "../../services/api.service.js";
  import { kanban } from "../../stores/kanban.store.js";
  import FormModal from "../generic/FormModal.svelte";
  import SpellCheckButton from "../business/SpellCheckButton.svelte";
  import Translator from "../business/Translator.svelte";

  const { card } = $props();

  let open = $state(false);
  let content = $state(card.content);
  let toggleModal = () => open = !open;

  async function editCard(formData) {
    const editedCard = await api.updateCard(card.id, formData);
    kanban.updateCard(editedCard);
  }

</script>