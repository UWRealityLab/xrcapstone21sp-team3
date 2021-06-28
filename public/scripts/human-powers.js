AFRAME.registerComponent('human-powers', {
    init: function () {
        let el = this.el;

        this.shoot = function() {
            if (el.parentEl.is('active')) {
                el.parentEl.emit('shoot');
                el.setAttribute('particle-system', 'enabled', 'true');
            }
        }

        this.stop = function() {
            if (el.parentEl.is('active')) {
                el.setAttribute('particle-system', 'enabled', 'false');
            }
        }

        this.activate = function() {
            el.parentEl.addState('active');
        }

        el.parentEl.addEventListener('ybuttondown', this.shoot);
        el.parentEl.addEventListener('ybuttonup', this.stop);
        el.parentEl.addEventListener('bbuttondown', this.shoot);
        el.parentEl.addEventListener('bbuttonup', this.stop);
        el.parentEl.addEventListener('injection', this.activate);
    },
    remove: function() {
        this.el.parentEl.removeEventListener('ybuttondown', this.shoot);
        this.el.parentEl.removeEventListener('ybuttonup', this.stop);
        this.el.parentEl.removeEventListener('bbuttondown', this.shoot);
        this.el.parentEl.removeEventListener('bbuttonup', this.stop);
        this.el.parentEl.removeEventListener('injection', this.activate);
    }
});
