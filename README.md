# Website Performance Optimization portfolio project

## Getting started

### Gulp
This project uses Gulp as the build system. In order to run it you first need 
to install and run Gulp as follows:

`npm install gulp-cli -g`

`npm install`

`gulp`

Gulp is being used to minify and autoprefix CSS, uglify JS, and inline most of the 
resulting assets.
src_index.html is the working file, dist/index.html is the Gulp task-runners output. 
Thus, any changes should be applied at src_index.html, since index.html gets overwritten 
every time Gulp runs.

### Run
Once built, the final project is in the `dist` directory. From there you can just 
open the index.html in the browser. 
If you prefer, you can also serve the project from a webserver by running any of the 
below commands:
  - node's `http-server` or
  - Python's SimpleHTTPServer, like so: `python -m SimpleHTTPServer 8080`

### Tunnel to localhost
In case you wish to check the pagespeed insights score, or make the side available to 
the outside world for any other purpose, it is recommended you use `ngrok`.
You can download and install it [here](https://ngrok.com/download).

After installing it, you can run `ngrok http 8080`, while at the same time running a 
webserver on port 8080. The forwarding link to the project will be displayed 
by the ngrok CLI.

## Optimizations

### index.html
- Minified HTML
- Minified CSS
- Inlined JS and CSS
- Uglified JS
- Images have been compressed and optimized

### views/js/main.js
- **updatePositions**:
    This code has been split into 2 batch processes. The first one reads layout for every .mover element. The second one sets the `left` style attribute for all of those elements.
    This results in a much faster animation while scrolling.
- **changePizzaSizes**:
    The code was changed to prevent FSL.
    Now there are two batch processes taking place. One for reading
    layout properties, the other one to modify the styles.
    Since all pizzas have the same size, the determineDX function call has been taken
    out of the loop and applied to only the first one.
- **DOMContentLoaded event listener function**:
    The amount of .mover pizzas has been decreased by calculating it dynamically,
    based on the screen height.
    Since the vast majority of them were never visible, the user won't notice any
    difference in their quantity.

### views/css/style.css
- **.mover class**:
    The pizzas have been placed each on their own composition layer to prevent them
    from being repainted on every movement.