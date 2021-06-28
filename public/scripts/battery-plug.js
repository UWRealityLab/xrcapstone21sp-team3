AFRAME.registerComponent('battery-plug', {
    init: function() {
        let el = this.el;
        let monitor = document.querySelector('#powerDisplay');
        let batOneWires = el.sceneEl.querySelectorAll('.batteryOneWire');
        let batTwoWires = el.sceneEl.querySelectorAll('.batteryTwoWire');
        monitor.addState('no-batteries');
      
        this.plugOne = function(senderId, dataType, data, targetId) {
            for (var i = 0; i < batOneWires.length; i++) {
                batOneWires[i].setAttribute('material', {color: '#6db8ff'});
            }
            if (monitor.is('no-batteries')) {
                monitor.setAttribute('src', '#power_one');
                monitor.removeState('no-batteries');
                monitor.addState('one-plugged');
            } else if (monitor.is('two-plugged')) {
                monitor.setAttribute('src', '#full_power');
                monitor.removeState('two-plugged');
                monitor.addState('powered');
            }
        }
      
        this.plugTwo = function(senderId, dataType, data, targetId) {
            for (var i = 0; i < batTwoWires.length; i++) {
                batTwoWires[i].setAttribute('material', {color: '#6db8ff'});
            }
            if (monitor.is('no-batteries')) {
                monitor.setAttribute('src', '#power_two');
                monitor.removeState('no-batteries');
                monitor.addState('two-plugged');
            } else if (monitor.is('one-plugged')) {
                monitor.setAttribute('src', '#full_power');
                monitor.removeState('one-plugged');
                monitor.addState('powered');
                el.emit('game-over');
                NAF.connection.broadcastData('string', 'game-over');
            }
        }

        this.plugIn = function(e) {
            let hitEl = e.detail.body.el;
            if (hitEl.getAttribute('class') == 'battery') {
                hitEl.setAttribute('constraint', {target: el});
                if (el.getAttribute('id') == 'holder1') {
                    NAF.connection.broadcastData('plug1', 'plug1');
                    for (var i = 0; i < batOneWires.length; i++) {
                        batOneWires[i].setAttribute('material', {color: '#6db8ff'});
                    }
                    if (monitor.is('no-batteries')) {
                        monitor.setAttribute('src', '#power_one');
                        monitor.removeState('no-batteries');
                        monitor.addState('one-plugged');
                    } else if (monitor.is('two-plugged')) {
                        monitor.setAttribute('src', '#full_power');
                        monitor.removeState('two-plugged');
                        monitor.addState('powered');
                        el.emit('game-over');
                        NAF.connection.broadcastData('string', 'game-over');
                    }
                } else if (el.getAttribute('id') == 'holder2') {
                      NAF.connection.broadcastData('plug2', 'plug2');
                      for (var i = 0; i < batTwoWires.length; i++) {
                          batTwoWires[i].setAttribute('material', {color: '#6db8ff'});
                      }
                      if (monitor.is('no-batteries')) {
                          monitor.setAttribute('src', '#power_two');
                          monitor.removeState('no-batteries');
                          monitor.addState('two-plugged');
                      } else if (monitor.is('one-plugged')) {
                          monitor.setAttribute('src', '#full_power');
                          monitor.removeState('one-plugged');
                          monitor.addState('powered');
                          el.emit('game-over');
                          NAF.connection.broadcastData('string', 'game-over');
                      }
                }
            }
        };

        el.addEventListener('collide', this.plugIn);
        NAF.connection.subscribeToDataChannel('plug1', this.plugOne);
        NAF.connection.subscribeToDataChannel('plug2', this.plugTwo);
    },
    remove: function() {
        this.el.removeEventListener('collide', this.plugIn);
        NAF.connection.unsubscribeToDataChannel('plug1');
        NAF.connection.unsubscribeToDataChannel('plug2');
    }
});