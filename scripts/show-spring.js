AFRAME.registerComponent('show-spring', {
    tick: function() {
        let data = this.data;

        var pos1 = document.querySelector('#' + data.start).getAttribute('position');
        var pos2 = document.querySelector('#' + data.end).getAttribute('position');
        this.el.setAttribute('line', 'start', pos1.x + ' ' + pos1.y + ' ' + pos1.z);
        this.el.setAttribute('line', 'end', pos2.x + ' ' + pos2.y + ' ' + pos2.z);
    }
})