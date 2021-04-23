AFRAME.registerComponent('button-press', {
  init: function() {
    const DURATION = 250
    let el = this.el
    let p = el.getAttribute('position');

    this.moveIn = function() {
      let params = {
        property: 'position',
        to: {
          x: p.x, 
          y: p.y, 
          z: 7
        },
        dur: DURATION
      }
      el.setAttribute('animation', params);
      setTimeout(() => {el.emit('depressed');}, DURATION)
    }

    this.moveOut = function() {
      let params = {
        property: 'position',
        to: {
          x: p.x, 
          y: p.y, 
          z: 3
        },
        dur: DURATION
      }
      el.setAttribute('animation', params);
    }

    this.el.addEventListener('click', this.moveIn);
    this.el.addEventListener('depressed', this.moveOut);
  },
  remove: function() {
    this.el.removeEventListener('click', this.moveIn);
    this.el.removeEventListener('click', this.moveOut);
  }
});