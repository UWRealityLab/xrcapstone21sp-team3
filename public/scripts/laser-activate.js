AFRAME.registerComponent('laser-activate', {
    init: function () {
        let el = this.el;

        this.activate = function () {
            if (el.parentEl.is('upgraded')) {
                el.parentEl.setAttribute('raycaster', 'enabled', 'true');
                el.parentEl.setAttribute('raycaster', 'showLine', 'true');
            }
        };

        this.deactivate = function () {
            if (el.parentEl.is('upgraded')) {
                el.parentEl.setAttribute('raycaster', 'enabled', 'false');
                el.parentEl.setAttribute('raycaster', 'showLine', 'false');
            }
        };

        this.getAbility = function () {
            el.object3D.visible = true;
            el.parentEl.addState('upgraded');
        };

        el.parentEl.addEventListener('ybuttondown', this.activate);
        el.parentEl.addEventListener('ybuttonup', this.deactivate);
        el.sceneEl.addEventListener('upgrade-laser', this.getAbility);
    },
    remove: function () {
        this.el.parentEl.removeEventListener('ybuttondown', this.activate);
        this.el.parentEl.removeEventListener('ybuttonup', this.deactivate);
        this.el.sceneEl.removeEventListener('upgrade-laser', this.getAbility);
    }
});
