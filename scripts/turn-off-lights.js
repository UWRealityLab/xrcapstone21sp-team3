AFRAME.registerComponent('turn-off-lights', {

  init: function () {
    let el = this.el;
    let target = document.querySelector('#foamTarget');

    this.lightsOff = function () {
      el.setAttribute('intensity', '0');
    }

    target.addEventListener('die', this.lightsOff);
  },

  remove: function () {
    let target = document.querySelector('#foamTarget');
    target.removeEventListener('die', this.lightsOff);
  }
});