<label for="targetLanguage">Choisir la langue de traduction 
<select name="targetLanguage" id="language">
        <option value="français">Français</option>
        <option value="anglais">Anglais</option>
        <option value="espagnol">Espagnol</option>
        <option value="allemand">Allemand</option>
        <option value="italien">Italien</option>
        <option value="portugais">Portugais</option>
    </select>
</label>
<button type="button" onclick={handleTranslate}><Languages /></button>

<script>
    import { Languages } from "@lucide/svelte";
    import { api } from "../../services/api.service.js";

    const props = $props();
    async function handleTranslate() {
       const selectedLanguage = document.getElementById("language").value;
       const translatedText = await api.getTranslation(props.text, selectedLanguage);
       props.onTranslate(translatedText.response);
    }

</script>