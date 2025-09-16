export function preventDOMUpdates(event) {
  // Annuler l'update de l'UI par Sortable et laisser le store du kanban s'en charger
  // Source : https://github.com/SortableJS/Sortable/issues/546#issuecomment-1892931258
  
  const { from, item, oldIndex } = event;

  // Remove the element that Sortable just inserted or moved
  item.remove();

  // Restore source container's DOM
  if (oldIndex !== undefined) {
    from.insertBefore(item, from.children[oldIndex]);
  }
}
