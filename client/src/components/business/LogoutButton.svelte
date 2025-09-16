<button onclick={logout}>Se déconnecter</button>

<script>
  import * as auth from "../../stores/auth.store.js";
  import { kanban } from "../../stores/kanban.store.js";

  function logout() {
    auth.logout();
    kanban.setLists();
  }
</script>
