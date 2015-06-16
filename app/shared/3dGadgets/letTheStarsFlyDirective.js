'use strict';
var myModule = require('./_index');
/*global THREE*/
/*global TWEEN*/


/**
 * @ngInject
 */
function letTheStarsFlyFreelyDirective(){

    var minWidthForStars = 10;
    var camera, scene, renderer;
    var mainDomArea;

    var starObjects = [];

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

        // Creating the stars. Each star is a div.
        for ( var i = 0; i < starArray.length; i += 1 ) {
            var element = document.createElement( 'div' );
            element.className = 'element';
            var symbol = document.createElement( 'div' );
            symbol.className = 'symbol';
            symbol.textContent = starArray[i].comment;
            element.appendChild(symbol);

            var starObject = new THREE.CSS3DObject(element);
            starObject.position.x = Math.random() * 4000 - 2000;
            starObject.position.y = Math.random() * 4000 - 2000;
            starObject.position.z = Math.random() * 4000 - 2000;
            scene.add(starObject);

            starObjects.push(starObject);
        }

        renderer = new THREE.CSS3DRenderer();
        renderer.setSize( mainDomArea.offsetWidth, mainDomArea.offsetHeight);
        renderer.domElement.style.position = 'absolute';

        mainDomArea.appendChild( renderer.domElement );

        animate();
        goToChaosTarget();

        window.addEventListener('resize', onResizeCallback);

    }

    function goToChaosTarget() {

        TWEEN.removeAll();

        for ( var i = 0; i < starObjects.length; i ++ ) {
            var starObject = starObjects[ i ];

            new TWEEN.Tween( starObject.position )
                .to( { x: Math.random() * 4000 - 2000, y: Math.random() * 800 - 400, z: Math.random() * 4000 - 2000 }, Math.random() * 4000 + 4000 )
                .easing( TWEEN.Easing.Exponential.InOut )
                .start();

            new TWEEN.Tween( starObject.rotation )
                .to( { x: Math.random(), y: Math.random(), z: Math.random() }, Math.random() * 2000 + 2000 )
                .easing( TWEEN.Easing.Exponential.InOut )
                .start();
        }

        // follow one "fake" star. When it has completed then go to
        // chaos target again for all others
        new TWEEN.Tween()
            .to( {}, 4000 * 2 )
            .onUpdate( render )
            .onComplete(goToChaosTarget)
            .start();
    }

    function onResizeCallback() {
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

myModule.directive('letTheStarsFlyFreely', letTheStarsFlyFreelyDirective);