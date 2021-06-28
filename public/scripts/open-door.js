AFRAME.registerComponent('open-door', {
    init: function() {
        const DURATION = 2000;

        let el = this.el;
        let doorOpenButton = document.getElementById('doorOpenButton');

        this.greenCorrect = function() {
            el.addState('green');
            el.emit('state-change');
        };

        this.greenWrong = function() {
            el.removeState('green');
            el.emit('state-change');
        };

        this.redCorrect = function() {
            el.addState('red');
            el.emit('state-change');
        };

        this.redWrong = function() {
            el.removeState('red');
            el.emit('state-change');
        };

        this.blueCorrect = function() {
            el.addState('blue');
            el.emit('state-change');
        };

        this.blueWrong = function() {
            el.removeState('blue');
            el.emit('state-change');
        };

        this.yellowCorrect = function() {
            el.addState('yellow');
            el.emit('state-change');
        };

        this.yellowWrong = function() {
            el.removeState('yellow');
            el.emit('state-change');
        };

        this.stateChange = function() {
            if (el.is('green') && el.is('red') && el.is('blue') && el.is('yellow')) {
                el.emit('doorOpen');
                NAF.connection.broadcastData('doorMsg', 'open-door');
              
                let params = {
                    property: 'position',
                    to: {
                        x: 4.6,
                        y: 4.85,
                        z: 16.75
                    },
                    dur: DURATION
                }
                el.setAttribute('animation', params);
              
                doorOpenButton.object3D.visible = true;
                doorOpenButton.setAttribute('change-scene', '');
            }
        }

        this.callbackOpenDoor = function(senderId, dataType, data, targetId) {
            let params = {
                property: 'position',
                to: {
                    x: 4.6,
                    y: 4.85,
                    z: 16.75
                },
                dur: DURATION
            }
            el.setAttribute('animation', params);
          
            doorOpenButton.object3D.visible = true;
            doorOpenButton.setAttribute('change-scene', '');
        }
      
        el.sceneEl.addEventListener('green-correct', this.greenCorrect);
        el.sceneEl.addEventListener('green-wrong', this.greenWrong);
        el.sceneEl.addEventListener('red-correct', this.redCorrect);
        el.sceneEl.addEventListener('red-wrong', this.redWrong);
        el.sceneEl.addEventListener('blue-correct', this.blueCorrect);
        el.sceneEl.addEventListener('blue-wrong', this.blueWrong);
        el.sceneEl.addEventListener('yellow-correct', this.yellowCorrect);
        el.sceneEl.addEventListener('yellow-wrong', this.yellowWrong);
        el.addEventListener('state-change', this.stateChange);
      
        NAF.connection.subscribeToDataChannel('doorMsg', this.callbackOpenDoor);
    },
    remove: function() {
        this.el.sceneEl.removeEventListener('green-correct', this.greenCorrect);
        this.el.sceneEl.removeEventListener('green-wrong', this.greenWrong);
        this.el.sceneEl.removeEventListener('red-correct', this.redCorrect);
        this.el.sceneEl.removeEventListener('red-wrong', this.redWrong);
        this.el.sceneEl.removeEventListener('blue-correct', this.blueCorrect);
        this.el.sceneEl.removeEventListener('blue-wrong', this.blueWrong);
        this.el.sceneEl.removeEventListener('yellow-correct', this.yellowCorrect);
        this.el.sceneEl.removeEventListener('yellow-wrong', this.yellowWrong);
        this.el.removeEventListener('state-change', this.stateChange);
        NAF.connection.unsubscribeToDataChannel('doorMsg');
    }
});