AFRAME.registerComponent('grab-to-shoot', {
   
  init: function () {
    
    let el = this.el;
    let grabbed = false;

    this.shoot = function() {
      el.emit('shoot');
    }
    
    this.el.addEventListener('grab-start', this.shoot);
  },
  
  remove: function() {
    this.el.removeEventListener('grab-start', this.shoot);
  }
});
