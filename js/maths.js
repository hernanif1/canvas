export const determinante = (a) => {
  var ordem = a.length

  if (ordem === 1) {
    return a[0][0]
  }

  if (ordem === 2) {
    return a[0][0] * a[1][1] - a[0][1] * a[1][0]
  }

  var det = 0

  for (var j = 0; j < ordem; j++) {
    det += a[0][j] * cofator(a, 0, j)
  }

  return det
}

function cofator (a, linha, coluna) {
  var subMatriz = []
  var ordem = a.length
  var m = 0

  for (var i = 1; i < ordem; i++) {
    subMatriz[m] = []

    for (var j = 0; j < ordem; j++) {
      if (j !== coluna) {
        subMatriz[m].push(a[i][j])
      }
    }
    m++
  }

  return (coluna % 2 ? -1 : 1) * determinante(subMatriz)
}
