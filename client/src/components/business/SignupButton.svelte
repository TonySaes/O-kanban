<button onclick={toggleModal}>Créer un compte</button>

<FormModal
  bind:open={open}
  onSubmit={signup}
  modalTitle="Créer un compte"
  submitLabel="Créer"
>
  <label>
    Pseudo
    <input type="text" name="username" autocomplete="username">
  </label>

  <label>
    Mot de passe
    <input type="password" name="password" autocomplete="new-password">
  </label>

  <label>
    Confirmation du mot de passe
    <input type="password" name="confirm" autocomplete="new-password">
  </label>
</FormModal>

<script>
  import { api } from "../../services/api.service.js";
  import FormModal from "../generic/FormModal.svelte";

  let open = $state(false);
  let toggleModal = () => open = !open;

  async function signup(formData) {
    await api.register(formData);
  }

</script>
