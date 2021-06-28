AFRAME.registerComponent('upgrade', {
    schema: {
        hand: {type: 'string'}
    },
    init: function () {
        const DURATION = 3000;

        let el = this.el;
        let data = this.data;

        this.progressBar = function (e) {
            if (e.detail.hand.id == data.hand) {
                let params = {
                    property: 'height',
                    to: 0.25,
                    dur: DURATION
                };
    
                el.children[0].setAttribute('animation', params);
            }
        };

        this.reset = function (e) {
            if (e.detail.hand.id == data.hand) {
                if (el.children[0].getAttribute('height') == 0.25) {
                    // upgrade complete, give ability
                    if (data.hand == "robotRightHand") {
                        el.emit('upgrade-magnet');
                    } else if (data.hand == "robotLeftHand") {
                        el.emit('upgrade-laser');
                    }
                } else {
                    // upgrade incomplete, pause progress bar
                    el.children[0].removeAttribute('animation');
                }
            }
        };

        el.addEventListener('hover-start', this.progressBar);
        el.addEventListener('hover-end', this.reset);
    },
    remove: function () {
        this.el.removeEventListener('hover-start', this.progressBar);
        this.el.removeEventListener('hover-end', this.reset);
    }
});
