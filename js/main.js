import {Circles, Paralelogram} from './shapes'
import {resetCanvasContext, resetTextInfos} from './utils'
import {resetCanvas, mouseMove, mouseDown, mouseUp} from './userInteractions'

function init () {
  // Get screen elements
  const canvas = document.querySelector('#canvas')
  const context = canvas.getContext('2d')
  const selectedPointsTextField = document.querySelector('div[data-js="selected-points"]')
  const objectsAreaTextField = document.querySelector('span[data-js="objects-area"]')

  // Initialize canvas board
  resetCanvasContext(context, canvas)

  // Initialize shapes
  let circles = Circles()
  let paralelogram = Paralelogram()
  let boundries = canvas.getBoundingClientRect()

  // User interactions (create red circles)
  mouseUp(
    canvas,
    context,
    circles,
    paralelogram,
    resetCanvasContext,
    selectedPointsTextField,
    objectsAreaTextField,
    boundries
  )

  // On down check if is over a red circle
  mouseDown(canvas, circles, boundries)

  // On move over canvas
  mouseMove(
    canvas,
    context,
    circles,
    paralelogram,
    resetCanvasContext,
    selectedPointsTextField,
    objectsAreaTextField,
    boundries
  )

  // User reset
  const buttonReset = document.querySelector('a[data-js="reset"]')
  resetCanvas(
    buttonReset,
    context,
    canvas,
    selectedPointsTextField,
    objectsAreaTextField,
    circles,
    paralelogram,
    resetCanvasContext,
    resetTextInfos
  )
}
init()
