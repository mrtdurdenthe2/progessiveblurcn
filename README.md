<h1 align="center">
  <picture><img src="readmelogo.png" height="400"/></picture>
  <br />
  progressiveblurcn
</h1>

ProgressiveBlur is a lightweight, declarative React component that renders a layered, progressive blur overlay using pure CSS. It’s ideal for fading content out along an edge or creating a smooth “fog” effect over backgrounds, images, or video.

| Prop | Default | Description |
| ------------- | ------------- | --------------------------------------------------------------------------- |
| className | '' | Extra classes on the wrapper (e.g. sizing, layout) |
| direction | "to top" | Controls the direction of the gradient mask and overlay |
| overlayColor| "transparent" | A color to fade into at the far end of the blur (e.g. rgba(0,0,0,0.5)) |
| intensity | 2 | Scales the maximum blur radius (higher = stronger blur) |
| curve | "smooth" | Tweaks how the blur builds up (more gradual vs. more sudden) |

## Prerequisites
A react-based project and tailwind CSS

If installing via the shadcn CLI, make sure your project is compatible with shadcn


## Installation
```
npx shadcn@latest
```
