Have you ever got a goldstar and had nowhere to put it. Those days are gone! Here comes the ultimate storage project. Storage of goldstars that is. A new "like button this time bundled with a comment - dragable"! 
Some people say its the biggest that has happened since the snowball maker. 


The project is built using using: angularjs-gulp-browserify-boilerplate as base. https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate
(Boilerplate info: 

- [AngularJS](http://angularjs.org/)
- [SASS](http://sass-lang.com/)
- [Gulp](http://gulpjs.com/)
- [Browserify](http://browserify.org/)
)

I can recommend this boilerplate: it's based on https://github.com/greypants/gulp-starter and fitted my needs very well with only minor structural modifications  

- Since star-force was an existing project I decided to stick to bower for third party web libs and using debowerify to simplify the use of bower components with browserify. 
- I consider the project structure presented here: https://scotch.io/tutorials/angularjs-best-practices-directory-structure better than the structure of the boilerplate so I use that one.


What else?

- The 3D stuff is made possible through: three.js
- This project also utilizes the great REST package: angular-restmod and drag and drop from angular-dragdrop. 

The angular-dragdrop
- requires jquery and jquery-ui. If I ever touch this project again I will look into what better alternatives there are. Maybe https://github.com/marceljuenemann/angular-drag-and-drop-lists



### Getting it up and running

1. Clone this repo 
2. Run `npm install` from the root directory
3. Run `bower install`
4. run the oneliner from inside the:  makeSCSSOutOfCSS. It's there to create .scss files from .css. (since I didnt have time to figure out how to import normal .css into .scss.)
3. Run `gulp dev` (may require installing Gulp globally `npm install gulp -g`)
4. Your browser will automatically be opened and directed to the browser-sync proxy address
5. All API calls will be directed to star-force.se so you will be using "live"
6. To prepare assets for production, run the `gulp prod` task (Note: the production task does not fire up the express server, and won't provide you with browser-sync's live reloading. Simply use `gulp dev` during development. More information below)
7. To run a few unit and e2e test run gulp test.
8. Find the test coverage reports inside coverage


---


