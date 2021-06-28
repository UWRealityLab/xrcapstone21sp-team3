AFRAME.registerComponent('injection', {
    schema: {
        hand: {type: 'string'}
    },
    init: function() {
        const DURATION = 2000;

        let el = this.el;
        let data = this.data;
      
        el.children[1].setAttribute('dynamic-body', 'mass: 0');

        this.shot = function (e) {
            if (el.is('grabbed')) {
                let hitEl = e.detail.body.el;
                if (hitEl.id == 'humanLeftHand' && data.hand == 'left') {
                    let params = {
                        property: 'hand-controls.color',
                        to: '#96D9D6',
                        dur: DURATION
                    };
                    hitEl.setAttribute('animation', params);
                    hitEl.emit('injection');
                } else if (hitEl.id == 'humanRightHand' && data.hand == 'right') {
                    let params = {
                        property: 'hand-controls.color',
                        to: '#EE8130',
                        dur: DURATION
                    };
                    hitEl.setAttribute('animation', params);
                    hitEl.emit('injection');
                }
            }
        };

        el.addEventListener('grab-start', () => {el.removeAttribute('constraint');});
        el.children[1].addEventListener('collide', this.shot);
    },
    remove: function() {
        this.el.removeEventListener('grab-start', () => {el.removeAttribute('constraint');});
        this.el.children[1].removeEventListener('collide', this.shot);
    }
});
