export function preventDOMUpdates(event) {  
  const { from, item, oldIndex } = event;

  // Remove the element that Sortable just inserted or moved
  item.remove();

  // Restore source container's DOM
  if (oldIndex !== undefined) {
    from.insertBefore(item, from.children[oldIndex]);
  }
}
