AFRAME.registerComponent('melt-ice-block', {
    init: function() {
        const DURATION = 1000;
        let el = this.el;
        let p = el.getAttribute('position');

        this.changeStateCallback = function(senderId, dataType, data, targetId) {
            let params = {
                property: 'position',
                to: {
                    x: p.x, 
                    y: -3, 
                    z: p.z
                },
                dur: DURATION
            }
            el.setAttribute('animation', params);
        }
      
        this.changeState = function() {            
            NAF.connection.broadcastData('ice', 'melt');
            let params = {
                property: 'position',
                to: {
                    x: p.x, 
                    y: -3, 
                    z: p.z
                },
                dur: DURATION
            }
            el.setAttribute('animation', params);
        }

        el.addEventListener('die', this.changeState);
        NAF.connection.subscribeToDataChannel('ice', this.changeStateCallback);
    },
    remove: function() {
        this.el.removeEventListener('die', this.changeState);
        NAF.connection.unsubscribeToDataChannel('ice');
    }
});