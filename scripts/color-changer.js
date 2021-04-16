AFRAME.registerComponent('color-changer', {
  init: function() {
    let el = this.el;
    this.toggleGrab = function() {
      el.setAttribute('color', 'red');
    }
    this.toggleRelease = function() {
      el.setAttribute('color', 'white');  
    }
    this.el.addEventListener('grab-start', this.toggleGrab);
    this.el.addEventListener('grab-end', this.toggleRelease);
  },
  remove: function() {
    this.el.removeEventListener('grab-start', this.toggleGrab);
    this.el.removeEventListener('grab-end', this.toggleRelease);
  }
})