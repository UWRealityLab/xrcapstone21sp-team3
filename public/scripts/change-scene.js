AFRAME.registerComponent('change-scene', {
    init: function() {
        let el = this.el;

        this.changeScene = function(e) {
            let rig = document.getElementById('rig');
            
            if (document.getElementById('scene1').object3D.visible) {
                document.getElementById('scene1').object3D.visible = false;
                document.getElementById('scene2').object3D.visible = true;
                rig.setAttribute('movement-controls', {fly: true, speed: 0.1});
                rig.setAttribute('position', {x: 9, y: 1, z: 0});
                rig.setAttribute('kinematic-body', {enableJumps: true, linearDamping: 0.6});
                // maybe change these later if needed: friction: 0.9, restitution: 0.05
                el.sceneEl.systems.physics.driver.world.gravity.y = 0;
                
                // prevent player from skipping corridor
                el.parentNode.removeChild(el);
            } else {
                rig.setAttribute('movement-controls', {fly: false, speed: 0.3});
                rig.setAttribute('kinematic-body', {enableJumps: false, linearDamping: 0.01});
                rig.setAttribute('position', {x: -18, y: 0.1, z: 0});
                el.sceneEl.systems.physics.driver.world.gravity.y = -9.81;
                
                /*
                let hand = e.detail.hand.id;
                if (hand == 'robotRightHand' || hand == 'robotLeftHand') {
                    let el2 = document.getElementById('map2');
                  
                    // final debris
                    var debris1 = document.createElement('a-gltf-model');
                    debris1.setAttribute('networked', 'template: #crate-a-template');
                    debris1.object3D.position.set(-11.5, 0.6, -18.6);
                    debris1.object3D.rotation.set(0, THREE.Math.degToRad(90), 0);
                    debris1.object3D.scale.set(1.5, 1.5, 1.5);
                    debris1.setAttribute('dynamic-body', '');
                    el2.appendChild(debris1);

                    var debris2 = document.createElement('a-gltf-model');
                    debris2.setAttribute('networked', 'template: #crate-a-template');
                    debris2.object3D.position.set(-7, 1, -17.75);
                    debris2.object3D.rotation.set(0, THREE.Math.degToRad(90), 0);
                    debris2.object3D.scale.set(1.5, 1.5, 1.5);
                    debris2.setAttribute('dynamic-body', '');
                    el2.appendChild(debris2);

                    var debris3 = document.createElement('a-gltf-model');
                    debris3.setAttribute('networked', 'template: #crate-a-template');
                    debris3.object3D.position.set(-13, 0.6, -24.5);
                    debris3.object3D.rotation.set(0, THREE.Math.degToRad(45), 0);
                    debris3.object3D.scale.set(1.5, 1.5, 1.5);
                    debris3.setAttribute('dynamic-body', '');
                    el2.appendChild(debris3);

                    var debris4 = document.createElement('a-gltf-model');
                    debris4.setAttribute('networked', 'template: #crate-a-template');
                    debris4.object3D.position.set(-14, 1.7, -17.75);
                    debris4.object3D.rotation.set(0, THREE.Math.degToRad(90), 0);
                    debris4.object3D.scale.set(1.5, 1.5, 1.5);
                    debris4.setAttribute('dynamic-body', '');
                    el2.appendChild(debris4);

                    var debris5 = document.createElement('a-gltf-model');
                    debris5.setAttribute('networked', 'template: #crate-a-template');
                    debris5.object3D.position.set(-12.25, 1.7, -17.75);
                    debris5.object3D.rotation.set(0, THREE.Math.degToRad(90), 0);
                    debris5.object3D.scale.set(1.5, 1.5, 1.5);
                    debris5.setAttribute('dynamic-body', '');
                    el2.appendChild(debris5);

                    var debris6 = document.createElement('a-gltf-model');
                    debris6.setAttribute('networked', 'template: #crate-a-template');
                    debris6.object3D.position.set(-13.5, 0.6, -18.25);
                    debris6.object3D.rotation.set(0, 0, 0);
                    debris6.object3D.scale.set(1.5, 1.5, 1.5);
                    debris6.setAttribute('dynamic-body', '');
                    el2.appendChild(debris6);
                }
                */
            }
        };

        el.addEventListener('grab-start', this.changeScene);
    },
    remove: function() {
        this.el.removeEventListener('grab-start', this.changeScene);
    }
});
