<button type="button" onclick={handleCheck}><SpellCheck /></button>

<script>
  import { SpellCheck } from "@lucide/svelte";
  import { api } from "../../services/api.service.js";

const props = $props();

async function handleCheck() {
  const correctedText = await api.getCorrectedText(props.text);
  props.onCorrect(correctedText.response);
}
</script>
