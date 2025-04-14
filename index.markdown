---
title: Home
layout: default
footer_text: say hi
---

<section class="section index__hero" style="max-height: 960px;">
    <article>
        <h3>
            I'm a designer, developer and internet maker. 
            Based in Delhi, by way of San Diego, Hong Kong and New York. 
            Currently working as a Product Designer at <a target="_blank" href="https://netlify.com">Netlify</a>, and tinkering with some new ideas.
        </h3>

        <img class="hover-img" alt="your intention in question">
    </article>

    <div class="wall">
        <img class="axis--v" src="{{ site.baseurl }}/assets/img/axis--gray.svg" alt="">
        <img class="axis--h" src="{{ site.baseurl }}/assets/img/axis--gray.svg" alt="">

        <div class="box box--shapes">
            <div id="my-interactive" class="">
            </div>
        </div>
        <div class="box box--work">
            <a class="point" href="/work/jeffstaple/" id="jeffstaple">
                <img class="shape" src="{{ site.baseurl }}/assets/img/triangle--red.svg" alt="red square">
                <span class="caption label">(work, jeffstaple)</span>
            </a>
            
            <a class="point" href="/work/skilli/" id="skilli">
                <img class="shape" src="{{ site.baseurl }}/assets/img/square--red.svg" alt="red square">
                <span class="caption label">(work, skilli)</span>
            </a>
            <a class="point" href="/work/boldvoice/" id="boldvoice">
                <img class="shape" src="{{ site.baseurl }}/assets/img/circle--red.svg" alt="red square">
                <span class="caption label">(work, boldvoice)</span>
            </a>
        </div>
        <div class="box box--mood">
            <a target="_blank" class="point" id="haptic" href="https://open.spotify.com/playlist/72SDJhgLd15veW9QIZrSgJ?si=318ee9660a3c4399">
                <img class="shape" src="{{ site.baseurl }}/assets/img/square--yellow.svg" alt="red square">
                <span class="caption label">(listening, haptic touch)</span>
            </a>
            <a target="_blank" class="point" id="beatles" href="https://www.imdb.com/title/tt9735318/">
                <img class="shape" src="{{ site.baseurl }}/assets/img/triangle--yellow.svg" alt="red square">
                <span class="caption label">(watching, get back)</span>
            </a>
            <a target="_blank" class="point" id="house" href="https://open.spotify.com/playlist/56VUADHOYrHtnUEjBXomOP?si=8c058a708a7b43be">
                <img class="shape" src="{{ site.baseurl }}/assets/img/circle--yellow.svg" alt="red square">
                <span class="caption label">(listening, deep house)</span>
            </a>
        </div>
        <div class="box box--sketchpad" id="sketchpadapp">
            <canvas id="sketchpad" height="400" width="400%">
            </canvas>
            <p class="caption" contenteditable="true">
                Can I have your autograph?<span class="cursor">|</span>
            </p>
        </div>
    </div>
</section>

<script type="module">
    import Interactive from "https://cdn.jsdelivr.net/npm/@vector-js/library@0.0.1/dist/interactive.js";

    // Construct an interactive within the HTML element with the id "my-interactive"
    let myInteractive = new Interactive('my-interactive',{
        width: 800,
        height: 500,
        originX: 300,
        originY: -400
    });

    let circle = myInteractive.circle(0, 0, 0);
    circle.root.classList.add('default');
    let l1 = myInteractive.line(0, 0, 0, 0);
    l1.stroke = 'cornflowerblue';
    
    let centerControl = myInteractive.control(250, 80);
    let radiusControl = myInteractive.control(200, 80);
    circle.update = function () {
        this.cx = centerControl.x;
        this.cy = centerControl.y;
        this.r = Math.abs(radiusControl.x - centerControl.x);
    };
    circle.update();
    circle.addDependency(centerControl);
    circle.addDependency(radiusControl);
    radiusControl.update = function () {
        this.x += centerControl.dx;
        this.y += centerControl.dy;
    };
    radiusControl.addDependency(centerControl);
    radiusControl.constrainToX();
    l1.update = function () {
        this.x1 = centerControl.x;
        this.y1 = centerControl.y;
        this.x2 = radiusControl.x;
        this.y2 = radiusControl.y;
    };
    l1.update();
    l1.addDependency(centerControl);
    l1.addDependency(radiusControl);
    export default {
        title: 'myInteractive SVG Circle',
        description: 'This interactive demonstrates the basic properties of the SVG Circle Element. It has on control point which controls the position of the center of the circle and another control point which controls the length of the radius.',
        interactive: myInteractive,
        input: [
            centerControl,
            radiusControl
        ],
        tags: ['svg', 'circle']
    };
</script>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const svgElements = document.querySelectorAll('svg.element.interactive');
        svgElements.forEach(function(svg) {
            svg.setAttribute('width', '1000');
            svg.setAttribute('height', '1000');
        });
    });
</script>

<script type="module">

// import {Interactive, getScriptName} from "https://vectorjs.org/index.js";

// Construct an interactive within the HTML element with the id "my-interactive"
// let myInteractive = new Interactive("my-interactive");
// myInteractive.border = true;

// // Construct a control point at the the location (100, 100)
// let control = myInteractive.control(100, 100);

// // Print the two objects to the console
// console.log( control, myInteractive);


    // import interact from 
    // 'https://cdn.interactjs.io/v1.10.6/interactjs/index.js'   

    // interact('.item').draggable({
    //   listeners: {
    //     move (event) {
    //       console.log(event.pageX,
    //                   event.pageY)
    //     }
    //   }
    // })





    // "use strict";

// interact('.resize-drag').resizable({
//   // resize from all edges and corners
//   edges: {
//     left: true,
//     right: true,
//     bottom: true,
//     top: true
//   },
//   listeners: {
//     move(event) {
//       var target = event.target;
//       var x = parseFloat(target.getAttribute('data-x')) || 0;
//       var y = parseFloat(target.getAttribute('data-y')) || 0; // update the element's style

//       target.style.width = event.rect.width + 'px';
//       target.style.height = event.rect.height + 'px'; // translate when resizing from top or left edges

//       x += event.deltaRect.left;
//       y += event.deltaRect.top;
//       target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)';
//       target.setAttribute('data-x', x);
//       target.setAttribute('data-y', y);
//       target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
//     }

//   },
//   modifiers: [// keep the edges inside the parent
//   interact.modifiers.restrictEdges({
//     outer: 'parent'
//   }), // minimum size
//   interact.modifiers.restrictSize({
//     min: {
//       width: 100,
//       height: 50
//     }
//   })],
//   inertia: true
// }).draggable({
//   listeners: {
//     move: window.dragMoveListener
//   },
//   inertia: true,
//   modifiers: [interact.modifiers.restrictRect({
//     restriction: 'parent',
//     endOnly: true
//   })]
// });
</script>

<script type="module">
    /**
* @title Interactive SVG Circle
* @description This interactive demonstrates the basic properties of the SVG Circle Element.
* @tags [svg]
/**
* @title Interactive SVG Circle
* @description This interactive demonstrates the basic properties of the SVG Circle Element.
* @tags [svg]
*/
// import { Interactive, getScriptName } from '../../index.js';
// let interactive = new Interactive(getScriptName());
// interactive.border = true;
// interactive.width = 736;
// let circle = interactive.circle(0, 0, 0);
// circle.classList.add('default');
// let l1 = interactive.line(0, 0, 0, 0);
// l1.stroke = 'cornflowerblue';
// let text = interactive.text(25, 275, "");
// let centerControl = interactive.control(300, 150);
// let radiusControl = interactive.control(375, 150);
// circle.update = function () {
//     this.cx = centerControl.x;
//     this.cy = centerControl.y;
//     this.r = Math.abs(radiusControl.x - centerControl.x);
// };
// circle.update();
// circle.addDependency(centerControl);
// circle.addDependency(radiusControl);
// radiusControl.update = function () {
//     this.x += centerControl.dx;
//     this.y += centerControl.dy;
// };
// radiusControl.addDependency(centerControl);
// radiusControl.constrainToX();
// l1.update = function () {
//     this.x1 = centerControl.x;
//     this.y1 = centerControl.y;
//     this.x2 = radiusControl.x;
//     this.y2 = radiusControl.y;
// };
// l1.update();
// l1.addDependency(centerControl);
// l1.addDependency(radiusControl);
// // TODO: this is rather hacky, and probably best replaced by implementing the
// // tspan element in our SVG wrapper class.
// text.update = function () {
//     let tag = `<tspan style="fill:purple">circle</tspan>`;
//     let cx = `<tspan style="fill:#ab6f00">cx</tspan>`;
//     let cy = `<tspan style="fill:#ab6f00">cy</tspan>`;
//     let r = `<tspan style="fill:#ab6f00">r</tspan>`;
//     this.contents = `&lt;${tag} ${cx}="${circle.cx.toFixed(0)}"
//                               ${cy}="${circle.cy.toFixed(0)}"
//                               ${r}="${circle.r.toFixed(0)}"&gt`;
// };
// text.update();
// text.addDependency(circle);
// export default {
//     title: 'Interactive SVG Circle',
//     description: 'This interactive demonstrates the basic properties of the SVG Circle Element. It has on control point which controls the position of the center of the circle and another control point which controls the length of the radius.',
//     interactive: interactive,
//     input: [
//         centerControl,
//         radiusControl
//     ],
//     tags: ['svg', 'circle']
// };
// # sourceMappingURL=svg-circle.js.map

/**
* @title Interactive SVG Clip Path
* @description This interactive demonstrates how a clip path is applied to another element.
* @tags [svg]
*/
// import { Interactive, getScriptName } from '../../index.js';
// Initialize the interactive
// let myInteractive = new Interactive("my-interactive");

</script>
