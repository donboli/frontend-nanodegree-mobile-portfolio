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