AFRAME.registerComponent('end-game', {
  init: function () {
    let el = this.el;
    let head = document.querySelector("#rig");
    let DURATION = 15000;

    this.callbackGameOver = function(senderId, dataType, data, targetId) {
      el.emit('game-over')
    }
    
    // play end game video
    this.gameOver = function () {
      var video = el.components.material.material.map.image;
      if (!video) { return; }
      document.querySelector('a-sky').setAttribute('visible', 'false');
      el.setAttribute('visible', 'true');
      video.play();
      let sphere = document.createElement('a-sphere');
      sphere.setAttribute('radius','1');
      sphere.setAttribute('position', {x: 0, y: 1.5, z: 0});
      let materialParams = {
          shader: 'flat',
          color: 'black',
          opacity: 0,
          side: 'double'
      }
      sphere.setAttribute('material', materialParams);
      let animateParams = {
        property: 'material.opacity',
        from: 0,
        to: 1,
        dur: 1000,
        dir: 'alternate',
        startEvents: 'animate'
      }
      sphere.setAttribute('animation', animateParams);
      head.appendChild(sphere);
      setTimeout(() => {sphere.emit("animate");}, DURATION);
    }
    
    NAF.connection.subscribeToDataChannel('string', this.callbackGameOver);
    document.body.addEventListener('game-over', this.gameOver);
  },

  remove: function () {
    document.body.removeEventListener('game-over', this.gameOver);
  }
});