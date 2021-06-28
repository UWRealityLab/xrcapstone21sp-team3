AFRAME.registerComponent('respawn-robot', {
    init: function () {
        let el = this.el;

        this.respawn = function (e) {
            if (el.getAttribute('material').opacity == 0) {
                if (e.detail.body.el.getAttribute('class') == 'robot-rig') {
                    let rig = document.querySelector('#rig');
                    rig.setAttribute('position', {x: -18, y: 0.1, z: 0});
                }
            }
        };

        el.addEventListener('collide', this.respawn);
    },
    remove: function () {
        this.el.removeEventListener('hover-start', this.respawn);
    }
});
