AFRAME.registerComponent('rotate', {
  init: function() {
    let el = this.el;
    
    this.rotate = function() {
      let rot = el.getAttribute('rotation');
      let params = {
        property: 'rotation',
        to: {
          x: 0,
          y: rot.y + 90,
          z: 0
        },
        dur: 5000,
        easing: 'easeInOutQuad'
      };
      el.setAttribute('animation', params);
    }
    this.el.addEventListener('rotate', this.rotate);
  },
  remove: function() {
    this.el.removeEventListener('rotate', this.rotate);
  }
})