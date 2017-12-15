export function getSingleItem(id, arr) {
  const isItem = arr.filter(item => {
    return item.id === id;
  })
  return isItem
}
