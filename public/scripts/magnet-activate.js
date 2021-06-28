AFRAME.registerComponent('magnet-activate', {
    init: function () {
        let el = this.el;

        this.activate = function () {
            if (el.parentEl.is('upgraded')) {
                el.parentEl.setAttribute('raycaster', 'enabled', 'true');
                el.parentEl.setAttribute('raycaster', 'showLine', 'true');
                //el.parentEl.childNodes[3].setAttribute('line', 'visible', 'true');
                //el.parentEl.childNodes[3].setAttribute('line__2', 'visible', 'true');
            }
        };

        this.deactivate = function () {
            if (el.parentEl.is('upgraded')) {
                el.parentEl.setAttribute('raycaster', 'enabled', 'false');
                el.parentEl.setAttribute('raycaster', 'showLine', 'false');
                //el.parentEl.childNodes[3].setAttribute('line', 'visible', 'false');
                //el.parentEl.childNodes[3].setAttribute('line__2', 'visible', 'false');
            }
        };

        this.getAbility = function () {
            el.object3D.visible = true;
            el.parentEl.addState('upgraded');
        };

        el.parentEl.addEventListener('bbuttondown', this.activate);
        el.parentEl.addEventListener('bbuttonup', this.deactivate);
        el.sceneEl.addEventListener('upgrade-magnet', this.getAbility);
    },
    remove: function () {
        this.el.parentEl.removeEventListener('bbuttondown', this.activate);
        this.el.parentEl.removeEventListener('bbuttonup', this.deactivate);
        this.el.sceneEl.removeEventListener('upgrade-magnet', this.getAbility);
    }
});
