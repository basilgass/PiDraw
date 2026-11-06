---
aside: false
---

# Controls

PiDraw has no interface of its own. It gives a program the objects to control a drawing, and a page builds the buttons it wants. This page shows four of them: an `Animate`, which plays the animated points, a `Zoom`, which zooms and moves the drawing, a `Slides`, which shows the figures step by step, and a `Buttons`, which shows and hides the figures that the code ties to a button. They are made with the same graph and do not know each other. The list of events under the buttons is what the program receives.

<ClientOnly>
    <ControlsPlayground />
</ClientOnly>

## How the page is wired

```ts
import {PiDraw, Animate, Zoom, Slides, Buttons} from 'pidraw'

const draw = new PiDraw(container, {code})
const animation = new Animate(draw.graph)
const zoom = new Zoom(draw.graph, {gestures: true})
const slides = new Slides(draw.graph)
const buttons = new Buttons(draw.graph)

playButton.onclick = () => animation.start()
pauseButton.onclick = () => animation.pause()
stopButton.onclick = () => animation.stop()
restartButton.onclick = () => animation.restart()

zoomInButton.onclick = () => zoom.zoomIn()
zoomOutButton.onclick = () => zoom.zoomOut()
leftButton.onclick = () => zoom.moveOrigin(60, 0)
resetButton.onclick = () => zoom.reset()
modeButton.onclick = () => { zoom.navigating = !zoom.navigating }

nextButton.onclick = () => slides.next()
previousButton.onclick = () => slides.previous()

// One button of the page for each button of the code.
for (const {id, title} of buttons.buttons) {
    addButton(title, () => buttons.toggle(id))
}

// What the buttons show comes from the events, not from the clicks.
animation.on('start', () => { state.textContent = 'Playing' })
animation.on('end', () => { state.textContent = 'Finished' })
zoom.on('change', (event) => { shown.textContent = JSON.stringify(event.detail) })
zoom.on('navigation', (event) => { modeButton.ariaPressed = String(event.detail) })
buttons.on('change', (event) => { showPressed(event.detail.buttons) })
slides.on('change', (event) => { step.textContent = `${event.detail.current} / ${event.detail.count} ${event.detail.title ?? ''}` })
```

## Animation

- `start` begins the animation, and goes on after a pause. `restart` begins again from the start, whatever the animation was doing. `stop` puts the points back.
- `end` is sent when every point reached its end and none loops. An animation that loops never ends: only `pause` and `stop` stop it.
- When the code changes and a point is removed, its animation goes with it; if nothing is left to play, `stop` is sent.

## Zoom and move

- `zoomIn`, `zoomOut`, `zoomTo`, `moveOrigin` and `reset` act on the part of the plane that is shown. `change` gives the window each time it changes, whoever changed it.
- `allow` says what the zoom may do: `both`, `zoom` (the origin stays where it is) or `move` (the units never change). The three demos of the list above show each one; a button that the zoom may not use is greyed.
- With `gestures: true` the zoom may listen to the drawing. **Ctrl and the wheel** zoom around the cursor. **The mode of navigation** (the button Move / Zoom) puts a layer over the drawing: a drag moves it, the wheel zooms, one finger moves it, and two fingers pinch to zoom and move. The points cannot be dragged in that mode, which is why it is a mode: a drag does one thing at a time.
- A point you dragged, or that the animation moved, keeps its place in the plane when you zoom, and what is built on it follows.

## Slides

- `slide=<2->` on a figure, `@pause` and `@slides` in the code say at which steps the figures are shown (see [slides](./guide/slides)). A `Slides` decides which step is shown: `next`, `previous`, `first`, `last` and `goto`.
- `change` gives the step, the number of steps and the title of the step. The number of steps follows the code: it is the largest step that a figure names, and it changes when the code does. A title (`@pause=Title`, `@title,3=Title`) names a step and makes none.
- Without a `Slides` the steps mean nothing, and every figure is shown. A figure that is hidden by a step is still drawn and updated; what depends on it follows.

## Buttons

- `@button=area->title=Show the area` declares a button and `toggle=area/0.5` ties a figure to it, with a fade of half a second (see [buttons](./guide/buttons)). A `Buttons` lists them (`buttons`) and presses one (`toggle(id)`); a page draws the buttons itself, from the list.
- `change` gives the buttons with the pressed ones, and the id of the button that was pressed (`null` when the code declared other buttons). A press reverses every figure of the button, so figures that start differently stay opposite.
- Without a `Buttons` the buttons mean nothing, and every figure is shown. A figure that a button hides is still drawn and updated; what depends on it follows.

The methods and the events are described in [using it from code](./guide/code#animation), the options of a point in [dragging and animation](./guide/interaction). The components of this page, `AnimationControls.vue`, `ZoomControls.vue`, `SlidesControls.vue` and `ButtonsControls.vue`, are a few lines of Vue around these calls: copy them into your own site.
