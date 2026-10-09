(function () {
    'use strict';

    var svg = document.querySelector('.shapes-game');
    if (!svg) return;

    var handles = {};
    svg.querySelectorAll('[data-handle]').forEach(function (element) {
        handles[element.dataset.handle] = {
            element: element,
            x: Number(element.getAttribute('cx')),
            y: Number(element.getAttribute('cy'))
        };
    });

    function render() {
        Object.keys(handles).forEach(function (name) {
            var handle = handles[name];
            handle.element.setAttribute('cx', handle.x);
            handle.element.setAttribute('cy', handle.y);
        });
        var center = handles['circle-center'];
        var radius = handles['circle-radius'];
        var circle = svg.querySelector('#game-circle');
        circle.setAttribute('cx', center.x);
        circle.setAttribute('cy', center.y);
        circle.setAttribute('r', Math.abs(radius.x - center.x));

        var start = handles['rectangle-start'];
        var end = handles['rectangle-end'];
        var rectangle = svg.querySelector('#game-rectangle');
        rectangle.setAttribute('x', Math.min(start.x, end.x));
        rectangle.setAttribute('y', Math.min(start.y, end.y));
        rectangle.setAttribute('width', Math.abs(end.x - start.x));
        rectangle.setAttribute('height', Math.abs(end.y - start.y));

        var top = handles['triangle-start'];
        var bottom = handles['triangle-end'];
        svg.querySelector('#game-triangle').setAttribute('d',
            'M ' + top.x + ' ' + top.y + ' L ' + top.x + ' ' + bottom.y +
            ' L ' + bottom.x + ' ' + bottom.y + ' Z');
    }

    function move(name, x, y) {
        var handle = handles[name];
        var partner = name === 'circle-center' ? handles['circle-radius'] :
            name === 'rectangle-start' ? handles['rectangle-end'] : null;
        var dx = x - handle.x;
        var dy = name === 'circle-radius' ? 0 : y - handle.y;
        // Keep both handles reachable when translating a shape.
        dx = Math.max(12 - handle.x, Math.min(328 - handle.x, dx));
        dy = Math.max(12 - handle.y, Math.min(338 - handle.y, dy));
        if (partner) {
            dx = Math.max(12 - partner.x, Math.min(328 - partner.x, dx));
            dy = Math.max(12 - partner.y, Math.min(338 - partner.y, dy));
            partner.x += dx;
            partner.y += dy;
        }
        handle.x += dx;
        handle.y += dy;
        render();
    }

    function point(event) {
        var p = svg.createSVGPoint();
        p.x = event.clientX;
        p.y = event.clientY;
        return p.matrixTransform(svg.getScreenCTM().inverse());
    }

    Object.keys(handles).forEach(function (name) {
        var handle = handles[name];
        var drag = null;
        handle.element.addEventListener('pointerdown', function (event) {
            if (event.button !== 0 || drag) return;
            var p = point(event);
            drag = { id: event.pointerId, x: p.x - handle.x, y: p.y - handle.y };
            handle.element.setPointerCapture(event.pointerId);
            handle.element.focus();
            event.preventDefault();
        });
        handle.element.addEventListener('pointermove', function (event) {
            if (!drag || drag.id !== event.pointerId) return;
            var p = point(event);
            move(name, p.x - drag.x, p.y - drag.y);
        });
        ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (type) {
            handle.element.addEventListener(type, function (event) {
                if (drag && drag.id === event.pointerId) drag = null;
            });
        });
        handle.element.addEventListener('keydown', function (event) {
            var directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
            var direction = directions[event.key];
            if (!direction) return;
            event.preventDefault();
            var step = event.shiftKey ? 10 : 2;
            move(name, handle.x + direction[0] * step, handle.y + direction[1] * step);
        });
    });
    render();
}());
