AFRAME.registerComponent('slideshow', {
    init: function() {
        let el = this.el;
        let idx = Number(el.getAttribute('src').substr(-1));

        // scroll backward
        this.leftClick = function() {
            idx--;
            if (idx == 0) idx = 5;
            el.setAttribute('src', '#floor-plan-' + idx);
        }

        // scroll forward
        this.rightClick = function() {
            idx++;
            if (idx == 6) idx = 1;
            el.setAttribute('src', '#floor-plan-' + idx);
        }

        this.el.sceneEl.addEventListener('left-pressed', this.leftClick);
        this.el.sceneEl.addEventListener('right-pressed', this.rightClick);
    },
    remove: function() {
        this.el.sceneEl.removeEventListener('left-pressed', this.leftClick);
        this.el.sceneEl.removeEventListener('right-pressed', this.rightClick);
    }
});
