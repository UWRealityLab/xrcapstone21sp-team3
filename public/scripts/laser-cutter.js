AFRAME.registerComponent('laser-cutter', {
    schema: {
        isRobot: {type: 'int', default: 0}
    },
    init: function() {
        let el = this.el;
        let data = this.data;
        let linkA = el.children[0];
        let linkB = el.children[1];

        this.cutA = function() {
            el.removeChild(linkA);
            el.addState('cut-a');
            el.emit('state-change');
        };

        this.cutB = function() {
            el.removeChild(linkB);
            el.addState('cut-b');
            el.emit('state-change');
        };

        this.stateChange = function() {
            if (el.is('cut-a') && el.is('cut-b')) {
                if (data.isRobot == 0) {
                    // human
                    el.removeAttribute('body');
                    el.removeAttribute('shape');
                } else {
                    // robot
                    el.setAttribute('body', 'mass', 5);
                }
            }
        }

        linkA.addEventListener('raycaster-intersected', this.cutA);
        linkB.addEventListener('raycaster-intersected', this.cutB);
        el.addEventListener('state-change', this.stateChange);
    },
    remove: function() {
        this.el.children[0].removeEventListener('raycaster-intersected', this.cutA);
        this.el.children[1].removeEventListener('raycaster-intersected', this.cutB);
        this.el.removeEventListener('state-change', this.stateChange);
    }
});
