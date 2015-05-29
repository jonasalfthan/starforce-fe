'use strict';
var myModule = require('./_index');
/*global THREE*/
/*global TWEEN*/

window.$ = require('jquery');


/**
 * @ngInject
 */
function letTheStarsFlyDirective(){

    //main star container
    var table;
    var minWidthForStars = 10;

    var camera, scene, renderer;
    var mainDomArea;

    var objects = [];
    var that = this;


    function init(appendToThis, starArray) {
        mainDomArea = appendToThis;

        // Fastest way of cleaning up area
        // http://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
        while (mainDomArea.firstChild) {
            mainDomArea.removeChild(mainDomArea.firstChild);
        }

        camera = new THREE.PerspectiveCamera( 25, mainDomArea.offsetWidth/ mainDomArea.offsetHeight, 1, 5000 );
        camera.position.z = 1500;
        scene = new THREE.Scene();
        table = starArray;


        for ( var i = 0; i < table.length; i += 1 ) {
            var element = document.createElement( 'div' );
            element.className = 'element';
            var symbol = document.createElement( 'div' );
            symbol.className = 'symbol';
            symbol.textContent = table[i].comment;
            element.appendChild(symbol);

            var object = new THREE.CSS3DObject(element);
            object.position.x = Math.random() * 4000 - 2000;
            object.position.y = Math.random() * 4000 - 2000;
            object.position.z = Math.random() * 4000 - 2000;
            scene.add( object );

            objects.push( object );
        }

        renderer = new THREE.CSS3DRenderer();
        renderer.setSize( mainDomArea.offsetWidth, mainDomArea.offsetHeight);
        renderer.domElement.style.position = 'absolute';

        mainDomArea.appendChild( renderer.domElement );

        /*once to "have a small enought screen" the stars will not come back on resize*/
        animate();
        goToChaosTarget();

        window.addEventListener('resize', onResizeCallback);

    }

    function goToChaosTarget() {

        TWEEN.removeAll();

        for ( var i = 0; i < objects.length; i ++ ) {
            var object = objects[ i ];

            new TWEEN.Tween( object.position )
                .to( { x: Math.random() * 4000 - 2000, y: Math.random() * 800 - 400, z: Math.random() * 4000 - 2000 }, Math.random() * 4000 + 4000 )
                .easing( TWEEN.Easing.Exponential.InOut )
                .start();

            new TWEEN.Tween( object.rotation )
                .to( { x: Math.random(), y: Math.random(), z: Math.random() }, Math.random() * 2000 + 2000 )
                .easing( TWEEN.Easing.Exponential.InOut )
                .start();
        }
        new TWEEN.Tween(that)
            .to( {}, 4000 * 2 )
            .onUpdate( render )
            .onComplete(goToChaosTarget)
            .start();
    }

    function onResizeCallback() {
        console.log("resizing");
        camera.aspect = mainDomArea.offsetWidth / mainDomArea.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( mainDomArea.offsetWidth, mainDomArea.offsetHeight );
        console.log("mainDomArea.offsetWidth " + mainDomArea.offsetWidth);

        if(mainDomArea.offsetWidth<minWidthForStars){
            TWEEN.removeAll();
        }
        else{
            render();
            animate();
        }
    }

    function animate() {
        requestAnimationFrame( animate );
        TWEEN.update();
    }

    function render() {
        renderer.render( scene, camera );
    }

    return {
        restrict: 'E',
        link: function (scope, element, attribute) {
            //TODO with some different options the stars could be mounted on a various type of containers
            // the init function expects a old-school dom element
            scope.$watchCollection("flyingStars", function() {
                if(scope.flyingStars && scope.flyingStars.length > 0 ) {
                    TWEEN.removeAll();
                    init(document.getElementById(attribute.attachToOtherContainer), scope.flyingStars);
                }
            });
        },
        scope: {
            flyingStars: "="
        }
    };
}

myModule.directive('letTheStarsFlyFreelyDirective', letTheStarsFlyDirective);