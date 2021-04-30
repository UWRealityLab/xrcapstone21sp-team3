AFRAME.registerComponent('hit-handler', {

  init: function () {
    let el = this.el;
    let target = document.querySelector('#foamTarget');

    // give illusion of airflow slowing down
    this.slowParticles = function () {
      let curCount = el.getAttribute('particle-system').particleCount;
      el.setAttribute('particle-system', 'particleCount', curCount-200);
    }

    // stop airflow
    this.stopParticles = function () {
      el.setAttribute('enabled', 'false');
    }

    target.addEventListener('hit', this.slowParticles);
    target.addEventListener('die', this.stopParticles);
  },

  remove: function () {
    let target = document.querySelector('#foamTarget');
    target.removeEventListener('hit', this.slowParticles);
    target.removeEventListener('die', this.stopParticles);
  }
});