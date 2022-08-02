# The ultimate Vue 3 + PHP web development experience!

From development to deployment, this SDK when paired with your own server running Caprover PaaS (https://caprover.com) provides for the ultimate web development experience.
Self host your apps via Caprover on a cheap VPS for as little as $20/mo (or less). I use and recommend Vultr. (https://www.vultr.com/?ref=7182700).

More on Caprover forthcoming, as this project evolves and is documented.

FRONTEND: Vue 3 + Vite build system + Foundation for Sites (SASS edition). Swap out the CSS framwwork with anything you'd like.

BACKEND: PHP 8.1.8 served via FastCGI (FPM-PHP) through Nginx on Alpine Linux. Nginx routes all traffic to /index.php by default. Fat Free Framework serves /dist/index.html for routes not starting with /api/.

Prerequisites for Windows, macOS & Linux users:
  
  - REQUIRED: Docker Desktop for Windows/macOS and optionally Linux (https://docs.docker.com/desktop/). Linux can use native Docker CE + Docker Compose or choose Docker Desktop.
  - REQUIRED: Node 16 above (https://nodejs.org/en/) - Choose the current "stable" release for best results.
  - REQUIRED: Composer 2 (http://getcomposer.org) - NOTE: Requires PHP. You can get PHP from https://php.net
  - HIGHLY RECOMMENDED: Git Bash, also available for Windows, Linux and macOS (https://git-scm.com/downloads).  
  - HIGHLY RECOMMENDED: VSCode (https://code.visualstudio.com/) or the Free/Libre VSCodium (https://vscodium.com/) is recommded.
  - HIGHLY RECOMMENDED: Volar extention for VSCode/VSCodium users. (https://marketplace.visualstudio.com/items?itemName=Vue.volar)

This project combines a Vue 3 frontend and PHP backend in production but in development these are running on seperate servers:

Development Mode: (Automatically in dev mode when using `docker-compose up`)
  Get going with `docker compose up` to launch backend PHP server and `npm run dev` in another terminal for the Vite dev server.
  Vite dev server is running on port 80 to serve your front-end with hot-module-reload features. Open browser to http://localhost:80
  Your backend server runs PHP is on port 81. Used mainly for creating API routes.
  Frontned dev server proxies all requests to /api/* path to port 81 on localhost.
  Docker Compose stack maps frontend/dist/ directory to backend/dist/ in docker containers.
  Backend server always serves the /dist/index.html for any route not starting with /api/. Run `npm build` to create this file.

Production Mode: (Automatically set in deployments)
  Simply commit and push your project's code to the main branch to kick off a build using the provided Github Workflow deploy file.
  The Workflow file will build and merge your frontend dist/ directory with the backend/ files for deployment.
 
 Dependency Management:
 
   All PHP dependencies are managed with Composer. After cloning this project to your machine, use `composer install` to install the PHP dependencies.
   All Javascript dependencies are managed with NPM. After cloning this project to yoru machine, use `npm install` to install the Javascript modules.
    
 For total noobs:
  Composer and Docker Compose are unrelated. Docker Compose is used to deploy a software stack while Composer is used to manage PHP dependencies.
    
 More documentation forthcoming. Feel free to ask any questions via the Issues tab.
