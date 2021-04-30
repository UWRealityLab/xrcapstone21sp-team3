AFRAME.registerComponent('light-switch', {

  init: function () {
    let el = this.el;
    let lightParent = document.querySelector('#flashlight');

    this.lightSwitch = function() {
      if (lightParent.is('grabbed')) {
        let intensity = el.getAttribute('light').intensity;
        if (intensity === 0) {
          el.setAttribute('light', 'intensity', 5);
        } else {
          el.setAttribute('light', 'intensity', 0);
        }
      }
    }

    document.body.addEventListener('abuttondown', this.lightSwitch);
  },

  remove: function () {
    document.body.removeEventListener('abuttondown', this.lightSwitch);
  }

});