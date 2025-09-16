<button onclick={toggleModal}>Se connecter</button>

<FormModal
  bind:open={open}
  onSubmit={login}
  modalTitle="Se connecter"
  submitLabel="Connexion"
>
  <label>
    Pseudo
    <input type="text" name="username" autocomplete="username">
  </label>

  <label>
    Mot de passe
    <input type="password" name="password" autocomplete="new-password">
  </label>
</FormModal>

<script>
  import { api } from "../../services/api.service.js";
  import { setToken, setUser } from "../../stores/auth.store.js";
  import { kanban } from "../../stores/kanban.store.js";
  import FormModal from "../generic/FormModal.svelte";

  let open = $state(false);
  let toggleModal = () => open = !open;

  async function login(formData) {
    const { token, user } = await api.login(formData);
    setToken(token);
    setUser(user);

    const lists = await api.getAllLists();
    kanban.setLists(lists);
  }
</script>
