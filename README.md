# spaces

## html5 canvas animation experiment, loop of spaces in colors

Demo: https://quinten.github.io/spaces/

### About this demo

I programmed this demo to get familiar with some of the new es6 javascript features. So it probably won't work in IE11.

It has a little homemade 3d engine running that is loaded through javascript modules. No external frameworks. Everything is drawn onto the canvas 2d context.

The animation is a camera moving through doors and turning corners, but it is kept very abstract. There is no shading on the walls and each room appears to have a different color.

If you look deeper into the code, you will see that there are actually no walls rendered at all. Instead the doors are being rendered with a special compositing effect that reveals the door behind it. Once a door is passed, the background of the canvas becomes the color of the door.

### Running the code on your local machine

Once you have cloned this repo, you can run a local dev server with:

```
node server.js
```

And open http://localhost:4567/ in your browser.
