function onConnectCallback () {
    // wait for NAF to process
    setTimeout(function () {
        // get number of connected users
        let clients = NAF.connection.getConnectedClients();
        let nClients = 0;
        for (const key in clients) {
            nClients++;
        }
        
        // only create menu if only 1 connected user
        if (nClients == 0) {
            let menu = document.createElement('a-entity');
            menu.setAttribute('networked', 'template', '#character-select-template');
            //menu.setAttribute('networked', 'persistent', true);
            AFRAME.scenes[0].appendChild(menu);
        }
    }, 100);
}