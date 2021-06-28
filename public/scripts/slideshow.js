AFRAME.registerComponent('slideshow', {
    init: function() {
        let el = this.el;
        let idx = 1;

        this.leftClick = function() {
            if (el.getAttribute('material').opacity == 1) {
                idx--;
                if (idx == 0) idx = 5;
                el.setAttribute('src', '#floor-plan-' + idx);
            }
        }

        this.rightClick = function() {
            if (el.getAttribute('material').opacity == 1) {
                idx++;
                if (idx == 6) idx = 1;
                el.setAttribute('src', '#floor-plan-' + idx);
            }
        }

        this.turnOn = function() {
            el.setAttribute('material', {opacity: 1});
        }

        this.turnOff = function() {
            el.setAttribute('material', {opacity: 0});
        }

        el.sceneEl.addEventListener('left-pressed', this.leftClick);
        el.sceneEl.addEventListener('right-pressed', this.rightClick);
        el.sceneEl.addEventListener('plugged-in', this.turnOn);
        el.sceneEl.addEventListener('unplugged', this.turnOff);
    },
    remove: function() {
        this.el.sceneEl.removeEventListener('left-pressed', this.leftClick);
        this.el.sceneEl.removeEventListener('right-pressed', this.rightClick);
        this.el.sceneEl.removeEventListener('plugged-in', this.turnOn);
        this.el.sceneEl.removeEventListener('unplugged', this.turnOff);
    }
});
