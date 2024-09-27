export function removeDuplicates(arr: any[]) {
  const seen = new Set()

  return arr
    .map((item) => {
      if (seen.has(item.id)) {
        return null
      } else {
        seen.add(item.id)
        return item
      }
    })
    .filter((item) => item !== null)
}
