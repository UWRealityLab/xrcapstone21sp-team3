AFRAME.registerComponent('spring', {
  schema: {
    target: {
      type: 'selector'
    },
    restLength: {
      default: 1
    },
    stiffness: {
      default: 50
    },
    damping: {
      default: 1
    }
  },
  init: function() {
    let el = this.el;

    if (el.body) {
      this.makeSpring();
    } else {
      el.addEventListener('body-loaded', () => {
        this.makeSpring();
      });
    }
  },
  makeSpring: function() {
    let data = this.data;
    let el = this.el;
    var spring = new CANNON.Spring(el.body, data.target.body, {
      restLength: data.restLength,
      stiffness: data.stiffness,
      damping: data.damping
    });

    el.sceneEl.systems.physics.driver.world.addEventListener('postStep', function(e) {
      spring.applyForce();
    });
  },
  remove: function() {
    this.el.addEventListener('body-loaded', () => {
      this.makeSpring();
    });
    this.el.sceneEl.systems.physics.driver.world.removeEventListener('postStep', function(e) {
      spring.applyForce();
    });
  }
})