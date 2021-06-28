AFRAME.registerComponent('turn-off-lights', {

  init: function () {
    let el = this.el;
    let target = document.querySelector('#foamTarget');

    this.lightsOff = function () {
      el.setAttribute('light', 'intensity', '0');
    }

    this.lightsOn = function () {
      el.setAttribute('light', 'intensity', '0.75');
    }

    target.addEventListener('die', this.lightsOff);
    document.body.addEventListener('doorOpen', this.lightsOn);
  },

  remove: function () {
    let target = document.querySelector('#foamTarget');
    target.removeEventListener('die', this.lightsOff);
    document.body.removeEventListener('doorOpen', this.lightsOn);
  }
});