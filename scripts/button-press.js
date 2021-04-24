AFRAME.registerComponent('button-press', {
  init: function() {
    const DURATION = 250;
    
    let data = this.data;
    let el = this.el;
    let p = el.getAttribute('position');

    // button forward motion
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

      // toggle slides
      if (data.direction == 'left') {
        el.emit('left-pressed');
      } else if (data.direction == 'right') {
        el.emit('right-pressed');
      }
    }

    // button reverse motion
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

    this.el.addEventListener('hover-start', this.moveIn);
    this.el.addEventListener('depressed', this.moveOut);
  },
  remove: function() {
    this.el.removeEventListener('hover-start', this.moveIn);
    this.el.removeEventListener('depressed', this.moveOut);
  }
});
