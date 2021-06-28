AFRAME.registerComponent('dynamic-room', {
    init: function () {
        var el = this.el;
        var params = this.getUrlParams();

        var networkedComp = {
            app: 'event-horizon',
            room: params.room, 
            onConnect: 'onConnectCallback'
        };
      
        el.setAttribute('networked-scene', networkedComp);
    },
    getUrlParams: function () {
        var match;
        var pl = /\+/g;  // Regex for replacing addition symbol with a space
        var search = /([^&=]+)=?([^&]*)/g;
        var decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); };
        var query = window.location.search.substring(1);
        var urlParams = {};

        match = search.exec(query);
        while (match) {
            urlParams[decode(match[1])] = decode(match[2]);
            match = search.exec(query);
        }
        return urlParams;
    }
});