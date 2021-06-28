AFRAME.registerComponent('plug-in', {
    init: function() {
        let el = this.el;
        let dest = null;
        
        this.plugA = function(e) {
            let hitEl = e.detail.body.el;
            if (hitEl.parentEl.getAttribute('class') == 'socket') {
                dest = hitEl.parentEl;
                el.addState('plugged-a');
                el.emit('state-change');
            }
        };

        this.plugB = function(e) {
            let hitEl = e.detail.body.el;
            if (hitEl.parentEl.getAttribute('class') == 'socket') {
                dest = hitEl.parentEl;
                el.addState('plugged-b');
                el.emit('state-change');
            }
        };

        this.plugIn = function() {
            if (el.is('plugged-a') && el.is('plugged-b')) {
                el.setAttribute('constraint', {target: dest});

                // turn on tv
                if (el.id == 'tv-wire-end') {
                    el.emit('plugged-in');
                }

                // wire puzzle
                if (el.id == 'green-wire-end' && dest.id == 'red-socket') {
                    el.emit('green-correct');
                } else if (el.id == 'red-wire-end' && dest.id == 'yellow-socket') {
                    el.emit('red-correct');
                } else if (el.id == 'blue-wire-end' && dest.id == 'green-socket') {
                    el.emit('blue-correct');
                } else if (el.id == 'yellow-wire-end' && dest.id == 'blue-socket') {
                    el.emit('yellow-correct');
                }
            }
        };

        this.plugOut = function() {
            el.removeState('plugged-a');
            el.removeState('plugged-b');
            el.removeAttribute('constraint');

            // turn off tv
            if (el.id == 'tv-wire-end') {
                el.emit('unplugged');
            }

            // wire puzzle
            if (el.id == 'green-wire-end') {
                el.emit('green-wrong');
            } else if (el.id == 'red-wire-end') {
                el.emit('red-wrong');
            } else if (el.id == 'blue-wire-end') {
                el.emit('blue-wrong');
            } else if (el.id == 'yellow-wire-end') {
                el.emit('yellow-wrong');
            }
        };

        el.children[0].addEventListener('collide', this.plugA);
        el.children[1].addEventListener('collide', this.plugB);
        el.addEventListener('state-change', this.plugIn);
        el.addEventListener('grab-start', this.plugOut);
    },
    remove: function() {
        this.el.children[0].removeEventListener('collide', this.plugA);
        this.el.children[1].removeEventListener('collide', this.plugB);
        this.el.removeEventListener('state-change', this.plugIn);
        this.el.removeEventListener('grab-start', this.plugOut);
    }
});
