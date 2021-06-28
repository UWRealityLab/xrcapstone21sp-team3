AFRAME.registerComponent('freeze-melt', {
    init: function() {
        let el = this.el;
        el.addState('liquid');

        this.changeStateCallback = function(senderId, dataType, data, targetId) {
            if (dataType == el.id) {
                if (el.is('liquid')) {
                    // freeze
                    el.setAttribute('material', 'opacity', 0);
                    el.children[0].setAttribute('material', 'opacity', 1);

                    el.setAttribute('target', 'bulletType', 'fire');
                    el.removeState('liquid');
                    el.addState('solid');
                } else {
                    // melt
                    el.setAttribute('material', 'opacity', 0.8);
                    el.children[0].setAttribute('material', 'opacity', 0);

                    el.setAttribute('target', 'bulletType', 'ice');
                    el.removeState('solid');
                    el.addState('liquid');
                }
            }
        }
      
        this.changeState = function() {           
            NAF.connection.broadcastData(el.id, 'freeze-melt');
          
            if (el.is('liquid')) {
                // freeze
                el.setAttribute('material', 'opacity', 0);
                el.children[0].setAttribute('material', 'opacity', 1);

                el.setAttribute('target', 'bulletType', 'fire');
                el.removeState('liquid');
                el.addState('solid');
            } else {
                // melt
                el.setAttribute('material', 'opacity', 0.8);
                el.children[0].setAttribute('material', 'opacity', 0);

                el.setAttribute('target', 'bulletType', 'ice');
                el.removeState('solid');
                el.addState('liquid');
            }
        }

        el.addEventListener('die', this.changeState);
        NAF.connection.subscribeToDataChannel(el.id, this.changeStateCallback);
    },
    remove: function() {
        this.el.removeEventListener('die', this.changeState);
        NAF.connection.unsubscribeToDataChannel(this.el.id);
    }
});