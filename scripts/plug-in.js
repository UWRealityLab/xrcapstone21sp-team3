/*
AFRAME.registerComponent('plug-in', {
    schema: {
        target: {type: 'selector'}
    },
    init: function() {
        let el = this.el;
        //alert(el.childNodes[3].getAttribute('color'));
        
        el.childNodes[1].addEventListener('collide', () => {});
    },
    remove: function() {

    }
});
*/

AFRAME.registerComponent('plug-in', {
    schema: {
        target: {type: 'selector'}
    },
    init: function() {
        let el = this.el;
        let data = this.data;

        this.plugIn = function(e) {
            let hitEl = e.detail.body.el;
            if (hitEl == data.target) {
                el.setAttribute('constraint', {target: hitEl});
            }
        }

        this.plugOut = function() {
            el.removeAttribute('constraint');
        }

        el.addEventListener('collide', this.plugIn);
        el.addEventListener('grab-start', this.plugOut);
    },
    remove: function() {
        this.el.addEventListener('collide', this.plugIn);
        this.el.addEventListener('grab-start', this.plugOut);
    }
});
