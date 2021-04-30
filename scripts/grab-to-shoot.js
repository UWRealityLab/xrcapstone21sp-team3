AFRAME.registerComponent('grab-to-shoot', {

  init: function () {
    let el = this.el;
    let particles = document.querySelector('#sealantParticle');

    this.shootFoam = function() {
      if (el.is('grabbed')) {
        el.emit('shoot');
        particles.setAttribute('particle-system', 'enabled', 'true');
      }
    }

    this.stopFoam = function() {
      particles.setAttribute('particle-system', 'enabled', 'false');
    }

    document.body.addEventListener('triggerdown', this.shootFoam);
    document.body.addEventListener('triggerup', this.stopFoam);
  },

  remove: function() {
    document.body.removeEventListener('triggerdown', this.shootFoam);
    document.body.removeEventListener('triggerup', this.stopFoam);
  }

});
