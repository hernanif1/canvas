// Find the module of triangle array x and y
export const determinant = (a) => {
  var order = a.length

  if (order === 1) {
    return a[0][0]
  }

  if (order === 2) {
    return a[0][0] * a[1][1] - a[0][1] * a[1][0]
  }

  var det = 0
  for (var j = 0; j < order; j++) {
    det += a[0][j] * cofactor(a, j)
  }
  return det
}
// Default cofactor of a given matrix
function cofactor (a, column) {
  var subMatrix = []
  var order = a.length
  var m = 0

  for (var i = 1; i < order; i++) {
    subMatrix[m] = []
    for (var j = 0; j < order; j++) {
      if (j !== column) {
        subMatrix[m].push(a[i][j])
      }
    }
    m++
  }

  return (column % 2 ? -1 : 1) * determinant(subMatrix)
}
