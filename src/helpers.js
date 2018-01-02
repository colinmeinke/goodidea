const sortIdeas = (a, b) => (
  (a.score === undefined && b.score !== undefined) ||
  b.score > a.score ||
  (b.score === a.score && b.created < a.created)
    ? 1
    : -1
)

const sortCriterias = (a, b) => (
  b.weight > a.weight || (b.weight === a.weight && b.created < a.created)
    ? 1
    : -1
)

export {
  sortIdeas,
  sortCriterias
}
