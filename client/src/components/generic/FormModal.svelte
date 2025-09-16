{#if open}
	<dialog bind:this={dialog}
		onclose={closeModal}
		onclick={onClickOutside}
	>
		<form onsubmit={onFormSubmit}>
      <header>
        <h2>{modalTitle}</h2>
      </header>

      <div>
        {@render children()}
      </div>
			
      <footer>
        <button onclick={closeModal} type="reset">Fermer</button>
        <button type="submit">{submitLabel}</button>
      </footer>
		</form>
	</dialog>
{/if}

<script>
	let { open = $bindable(), children, modalTitle, submitLabel, onSubmit } = $props();
	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (open) {
			dialog.showModal();
			return;
		}
		if (dialog) {
			dialog.close();
		}
	});

	function closeModal() {
		if (open) {
			dialog.close();
			open = false;
		}
	}

	function onClickOutside(event) {
		if (event.target === dialog) {
			closeModal();
		}
	}

	function onFormSubmit(event) {    
    event.preventDefault();
		const form = event.target;

    const formData = Object.fromEntries(new FormData(event.target))
    onSubmit(formData);

		form.reset();
		closeModal();
	}
</script>


<style scoped>
	/* CSS code from https://svelte.dev/playground/modal */
	dialog {
		border-radius: 0.3em;
		border: none;
		margin: auto;
		padding: 0;

		&::backdrop {
			background: rgba(0, 0, 0, 0.7);
		}

		&[open] {
			animation: zoom 0.3s ease-out;
		}

		&[open]::backdrop {
			animation: fade 0.3s ease-out;
		}
	}

	form {
		padding: 1em;
		min-width: 50vw;
	}

	footer {
		display: flex;
		justify-content: space-between;

		button {
			width: 33%;
		}
	}

	@keyframes zoom {
		from { transform: scale(0.9); }
		to { transform: scale(1); }
	}
	@keyframes fade {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>
