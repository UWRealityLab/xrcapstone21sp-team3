AFRAME.registerComponent('button-press', {
  init: function() {
    let el = this.el
    this.startRotation = function() {
      el.emit('rotate');
    }
    this.el.addEventListener('click', this.startRotation);
  },
  remove: function() {
    this.el.removeEventListener('click', this.startRotation);
  }
});