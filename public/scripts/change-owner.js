AFRAME.registerComponent('change-owner', {
    init: function () {
        let el = this.el;

        this.changeOwner = function () {
            if (!NAF.utils.isMine(el)) {
                NAF.utils.takeOwnership(el);
                el.setAttribute('dynamic-body', '');
            }
        }

        el.addEventListener('hover-start', this.changeOwner);
    },
    remove: function () {
        this.el.removeEventListener('hover-start', this.changeOwner);
    }
  });