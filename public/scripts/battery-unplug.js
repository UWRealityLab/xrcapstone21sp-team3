AFRAME.registerComponent('battery-unplug', {
    init: function() {
        let el = this.el;
        let monitor = document.querySelector('#powerDisplay');
        let batOneWires = el.sceneEl.querySelectorAll('.batteryOneWire');
        let batTwoWires = el.sceneEl.querySelectorAll('.batteryTwoWire');

        this.unplugOne = function(senderId, dataType, data, targetId) {
          monitor.setAttribute('src', '#no_power');
          monitor.removeState('one-plugged');
          monitor.addState('no-batteries');
          for (var i = 0; i < batOneWires.length; i++) {
              batOneWires[i].setAttribute('material', {color: 'red'});
          }
        }
      
        this.unplugTwo = function(senderId, dataType, data, targetId) {
          monitor.setAttribute('src', '#no_power');
          monitor.removeState('two-plugged');
          monitor.addState('no-batteries');
          for (var i = 0; i < batTwoWires.length; i++) {
              batTwoWires[i].setAttribute('material', {color: 'red'});
          }
        }
      
        this.unplug = function() {
            let holder = el.getAttribute('constraint').target;
            if (holder.getAttribute('class') == 'battery-holder' && !monitor.is('powered')) {
                el.removeAttribute('constraint');
                if (holder.getAttribute('id') == 'holder1') {
                    NAF.connection.broadcastData('unplug1', 'unplug1');
                    monitor.setAttribute('src', '#no_power');
                    monitor.removeState('one-plugged');
                    monitor.addState('no-batteries');
                    for (var i = 0; i < batOneWires.length; i++) {
                        batOneWires[i].setAttribute('material', {color: 'red'});
                    }
                } else if (holder.getAttribute('id') == 'holder2') {
                    NAF.connection.broadcastData('unplug2', 'unplug2');
                    monitor.setAttribute('src', '#no_power');
                    monitor.removeState('two-plugged');
                    monitor.addState('no-batteries');
                    for (var i = 0; i < batTwoWires.length; i++) {
                        batTwoWires[i].setAttribute('material', {color: 'red'});
                    }
                }
            }
        }

        el.addEventListener('grab-start', this.unplug);
        NAF.connection.subscribeToDataChannel('unplug1', this.unplugOne);
        NAF.connection.subscribeToDataChannel('unplug2', this.unplugTwo);
    },
    remove: function() {
        this.el.removeEventListener('grab-start', this.unplug);
        NAF.connection.unsubscribeToDataChannel('plug1');
        NAF.connection.unsubscribeToDataChannel('plug2');
    }
});