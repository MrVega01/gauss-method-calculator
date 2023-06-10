import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({ input, output })
const values = []
// const testValues = [
//   [5, 4, -1, 2, -9, 29],
//   [4, 3, -5, -5, 4, -65],
//   [6, -6, -3, -9, 4, -113],
//   [-8, 8, 5, -3, -6, 35],
//   [-3, -7, 2, -5, 4, -50]
// ]

// Request values

for (let row = 0; row < 5; row++) {
  values[row] = []
  for (let column = 0; column < 6; column++) {
    let answer = await rl.question(`Inserte a[${row + 1}, ${column + 1}]`)
    while (isNaN(Number(answer))) {
      console.log('El valor insertado debe ser un número')
      answer = await rl.question(`Inserte a[${row + 1}, ${column + 1}]`)
    }
    values[row][column] = Number(answer)
  }
}

// Calculating results

values.forEach((row, i) => {
  values[i] = values[i].map(value => value / values[i][i])

  values.forEach((row2, i2) => {
    if (i2 === i) return
    if (values[i2][i] === Math.abs(values[i2][i])) {
      values[i2] = values[i2].map((value, i3) => value - values[i2][i] * values[i][i3])
    } else {
      values[i2] = values[i2].map((value, i3) => value + Math.abs(values[i2][i]) * values[i][i3])
    }
  })
  showMatrix(values)
})
showResults(values)
function showMatrix (matrix) {
  const fixedMatrix = matrix.map(row => {
    return row.map(value => value.toFixed(1))
  })
  console.log(fixedMatrix)
}
function showResults (matrix) {
  matrix.forEach((row, i) => console.log(`X${i + 1}: ${row[row.length - 1].toFixed(2)}`))
}
rl.close()
