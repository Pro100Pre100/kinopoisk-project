export const idInLocalStorage = (id: number) => {
  return Object.keys(localStorage).includes(String(id))
}