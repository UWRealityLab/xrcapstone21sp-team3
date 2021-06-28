AFRAME.registerComponent('character-select', {
    schema: {
        human: {type: 'int', default: 0},
        robot: {type: 'int', default: 0}
    },
    init: function () {
        let el = this.el;
        let data = this.data;
        let that = this; 
      
        el.addState('spectator');

        this.chooseHuman = function () {
            if (data.human == 0) {
                if (!NAF.utils.isMine(el)) {
                    NAF.utils.takeOwnership(el);
                }
              
                el.children[3].object3D.visible = true;
                el.children[4].object3D.visible = false;
                el.children[5].object3D.visible = false;
                el.addState('human');
                el.removeState('robot');
                el.removeState('spectator');
            } else {
                that.chooseSpectator();
            }
        };
      
        this.chooseRobot = function () {
            if (data.robot == 0) {
                if (!NAF.utils.isMine(el)) {
                    NAF.utils.takeOwnership(el);
                }
              
                el.children[3].object3D.visible = false;
                el.children[4].object3D.visible = true;
                el.children[5].object3D.visible = false;
                el.removeState('human');
                el.addState('robot');
                el.removeState('spectator');
            } else {
                that.chooseSpectator();
            }
        };
      
        this.chooseSpectator = function () {
            el.children[3].object3D.visible = false;
            el.children[4].object3D.visible = false;
            el.children[5].object3D.visible = true;
            el.removeState('human');
            el.removeState('robot');
            el.addState('spectator');
        };
      
        this.loadGame = function () {
            if (!NAF.utils.isMine(el)) {
                NAF.utils.takeOwnership(el);
            }
          
            // if user had already hovered occupied role
            if ((el.is('human') && data.human == 1) ||
                (el.is('robot') && data.robot == 1)) {
                that.chooseSpectator();
                return;
            }
          
            let rig = document.querySelector('#rig');
            let camera = document.querySelector('#camera');
            let leftHand = document.querySelector('#leftHand');
            let rightHand = document.querySelector('#rightHand');
            let leftHandModel = document.querySelector('#leftHandModel');
            let rightHandModel = document.querySelector('#rightHandModel');
          
            rig.setAttribute('movement-controls', 'enabled', 'true');
            camera.setAttribute('look-controls', 'enabled', 'true');
            camera.object3D.visible = false;
          
            if (el.is('spectator')) {
                rig.object3D.position.set(10, 0, -40);
                rig.object3D.rotateY(Math.PI);
                rig.setAttribute('movement-controls', 'fly', 'true');
                camera.setAttribute('networked', 'template', '#spectator-head-template');
            } else {
                if (el.is('human')) {
                    that.spawnHumanObjects();
                  
                    rig.setAttribute('class', 'human-rig');
                    rig.object3D.position.set(0, 0, -20);
                    camera.setAttribute('networked', 'template', '#human-head-template');

                    leftHand.setAttribute('hand-controls', 'handModelStyle', 'highPoly');
                    leftHand.setAttribute('hand-controls', 'color', '#ffdbac');
                    leftHand.setAttribute('networked', 'template', '#human-lefthand-template');
                    leftHandModel.setAttribute('networked', 'template', '#human-lh-template');

                    rightHand.setAttribute('hand-controls', 'handModelStyle', 'highPoly');
                    rightHand.setAttribute('hand-controls', 'color', '#ffdbac');
                    rightHand.setAttribute('networked', 'template', '#human-righthand-template');
                    rightHandModel.setAttribute('networked', 'template', '#human-rh-template');
                    
                    // disable button
                    el.children[0].setAttribute('material', 'opacity', 0.4);
                    data.human = 1;
                } else if (el.is('robot')) {
                    that.spawnRobotObjects();
                  
                    rig.setAttribute('class', 'robot-rig');
                    rig.object3D.position.set(16, 0, 0);
                    rig.object3D.rotateY(Math.PI);
                    camera.setAttribute('networked', 'template', '#robot-head-template');

                    leftHand.setAttribute('hand-controls', 'handModelStyle', 'toon');
                    leftHand.setAttribute('hand-controls', 'color', 'grey');
                    leftHand.setAttribute('networked', 'template', '#robot-lefthand-template');
                    leftHandModel.setAttribute('networked', 'template', '#robot-lh-template');

                    rightHand.setAttribute('hand-controls', 'handModelStyle', 'toon');
                    rightHand.setAttribute('hand-controls', 'color', 'grey');
                    rightHand.setAttribute('networked', 'template', '#robot-righthand-template');
                    rightHandModel.setAttribute('networked', 'template', '#robot-rh-template');

                    let magnetHand = document.createElement('a-entity');
                    magnetHand.setAttribute('hand-controls', 'hand', 'right');
                    magnetHand.setAttribute('hand-controls', 'handModelStyle', 'toon');
                    magnetHand.setAttribute('hand-controls', 'color', 'grey');
                    magnetHand.setAttribute('super-hands', 'colliderEvent', 'raycaster-intersection');
                    magnetHand.setAttribute('super-hands', 'colliderEventProperty', 'els');
                    magnetHand.setAttribute('super-hands', 'colliderEndEvent', 'raycaster-intersection-cleared');
                    magnetHand.setAttribute('super-hands', 'colliderEndEventProperty', 'clearedEls');
                    magnetHand.setAttribute('static-body', 'shape', 'sphere');
                    magnetHand.setAttribute('static-body', 'sphereRadius', '0.05');
                    magnetHand.setAttribute('networked', 'template', '#robot-righthandmagnet-template');
                    rig.appendChild(magnetHand);
                    
                    // disable button
                    el.children[1].setAttribute('material', 'opacity', 0.4);
                    data.robot = 1;
                }
              
                rig.setAttribute('kinematic-body', {radius: 0.2, linearDamping: 0.01});
            }
        };
      
        el.children[0].addEventListener('click', this.chooseHuman);
        el.children[1].addEventListener('click', this.chooseRobot);
        el.children[2].addEventListener('click', this.chooseSpectator);
        el.sceneEl.addEventListener('enter-vr', this.loadGame);
        //el.children[6].addEventListener('click', this.loadGame);
    },
    remove: function () {
        this.el.children[0].removeEventListener('click', this.chooseHuman);
        this.el.children[1].removeEventListener('click', this.chooseRobot);
        this.el.children[2].removeEventListener('click', this.chooseSpectator);
        this.el.sceneEl.removeEventListener('enter-vr', this.loadGame);
        //this.el.children[6].removeEventListener('click', this.loadGame);
    },
    spawnHumanObjects: function () {
        let el = document.getElementById('map1');
        let el2 = document.getElementById('map2');

        // Scene 1

        // Primatives
        var tetrahedron = document.createElement('a-tetrahedron');
        tetrahedron.setAttribute('networked', 'template: #tetrahedron-template');
        tetrahedron.object3D.position.set(19.25, 1.17, 5);
        tetrahedron.setAttribute('dynamic-body', '');
        el.appendChild(tetrahedron);

        var torus = document.createElement('a-torus');
        torus.setAttribute('networked', 'template: #torus-template');
        torus.object3D.position.set(18.5, 1.17, -3.5);
        torus.object3D.rotation.set(THREE.Math.degToRad(90), 0, 0);
        torus.setAttribute('dynamic-body', '');
        el.appendChild(torus);

        var box = document.createElement('a-box');
        box.setAttribute('networked', 'template: #box-template');
        box.object3D.position.set(18.2, 1.17, 4);
        box.setAttribute('dynamic-body', '');
        el.appendChild(box);

        var dodecahedron = document.createElement('a-dodecahedron');
        dodecahedron.setAttribute('networked', 'template: #dodecahedron-template');
        dodecahedron.object3D.position.set(19.25, 1.17, -4.5);
        dodecahedron.setAttribute('dynamic-body', '');
        el.appendChild(dodecahedron);

        // ice syringe
        var iceSyringe = document.createElement('a-cylinder');
        iceSyringe.setAttribute('networked', 'template: #syringe-template');
        iceSyringe.setAttribute('injection', 'hand: left');
        iceSyringe.setAttribute('constraint', 'target', '#ice-pedestal');
        iceSyringe.object3D.position.set(22.4, 1.2, -13);
        iceSyringe.object3D.rotation.set(THREE.Math.degToRad(90), THREE.Math.degToRad(30), 0);
        iceSyringe.setAttribute('height', 0.175);
        iceSyringe.setAttribute('radius', 0.01);
        iceSyringe.setAttribute('dynamic-body', '');
        el.appendChild(iceSyringe);

        // flashlight
        var flashlight = document.createElement('a-cylinder');
        flashlight.setAttribute('networked', 'template: #flashlight-template');
        flashlight.object3D.position.set(18.8, 1.27, 4);
        flashlight.object3D.rotation.set(THREE.Math.degToRad(90), 0, 0);
        flashlight.setAttribute('dynamic-body', '');
        el.appendChild(flashlight);

        // wires
        var wire = document.createElement('a-box');
        wire.setAttribute('networked', 'template: #wire-template');
        wire.object3D.position.set(8, 2.8, 19.5);
        wire.setAttribute('dynamic-body', 'linearDamping: 0.9; angularDamping: 0.9');
        wire.setAttribute('spring', 'target: #green-wire-start; restLength: 1.5')
        wire.setAttribute('id', 'green-wire-end');
        wire.setAttribute('plug-in', '');
        wire.setAttribute('color', '#7BC8A4');
        el.appendChild(wire);
        var spring = document.getElementById('green-spring');
        spring.setAttribute('show-spring', 'start: #green-wire-start; end: #green-wire-end');

        var wire = document.createElement('a-box');
        wire.setAttribute('networked', 'template: #wire-template');
        wire.object3D.position.set(10, 2.8, 19.5);
        wire.setAttribute('dynamic-body', 'linearDamping: 0.9; angularDamping: 0.9');
        wire.setAttribute('spring', 'target: #red-wire-start; restLength: 1.5')
        wire.setAttribute('id', 'red-wire-end');
        wire.setAttribute('plug-in', '');
        wire.setAttribute('color', '#EF2D5E');
        el.appendChild(wire);
        var spring = document.getElementById('red-spring');
        spring.setAttribute('show-spring', 'start: #red-wire-start; end: #red-wire-end');

        var wire = document.createElement('a-box');
        wire.setAttribute('networked', 'template: #wire-template');
        wire.object3D.position.set(12, 2.8, 19.5);
        wire.setAttribute('dynamic-body', 'linearDamping: 0.9; angularDamping: 0.9');
        wire.setAttribute('spring', 'target: #blue-wire-start; restLength: 1.5')
        wire.setAttribute('id', 'blue-wire-end');
        wire.setAttribute('plug-in', '');
        wire.setAttribute('color', '#4CC3D9');
        el.appendChild(wire);
        var spring = document.getElementById('blue-spring');
        spring.setAttribute('show-spring', 'start: #blue-wire-start; end: #blue-wire-end');

        var wire = document.createElement('a-box');
        wire.setAttribute('networked', 'template: #wire-template');
        wire.object3D.position.set(14, 2.8, 19.5);
        wire.setAttribute('dynamic-body', 'linearDamping: 0.9; angularDamping: 0.9');
        wire.setAttribute('spring', 'target: #yellow-wire-start; restLength: 1.5')
        wire.setAttribute('id', 'yellow-wire-end');
        wire.setAttribute('plug-in', '');
        wire.setAttribute('color', '#FFC65D');
        el.appendChild(wire);
        var spring = document.getElementById('yellow-spring');
        spring.setAttribute('show-spring', 'start: #yellow-wire-start; end: #yellow-wire-end');

        // Scene 2

        // fire syringe
        var fireSyringe = document.createElement('a-cylinder');
        fireSyringe.setAttribute('networked', 'template: #syringe-template');
        fireSyringe.setAttribute('injection', 'hand: right');
        fireSyringe.setAttribute('constraint', 'target', '#fire-pedestal');
        fireSyringe.object3D.position.set(22.35, 1.1, -23.7);
        fireSyringe.object3D.rotation.set(THREE.Math.degToRad(90), THREE.Math.degToRad(30), 0);
        fireSyringe.setAttribute('height', 0.175);
        fireSyringe.setAttribute('radius', 0.01);
        fireSyringe.setAttribute('dynamic-body', '');
        el2.appendChild(fireSyringe);
    },
    spawnRobotObjects: function () {
        let el = document.getElementById('map1');
        let el2 = document.getElementById('map2');

        // Scene 1

        var plug = document.createElement('a-box');
        plug.setAttribute('networked', 'template: #plug-template');
        plug.object3D.position.set(1, -9, 11);
        plug.setAttribute('dynamic-body', 'linearDamping: 0.9; angularDamping: 0.9');
        plug.setAttribute('spring', 'target: #tv-wire-start; stiffness: 10;')
        plug.setAttribute('id', 'tv-wire-end');
        plug.setAttribute('plug-in', '');
        document.getElementById('roomSlides').appendChild(plug);
        var spring = document.getElementById('tv-spring');
        spring.setAttribute('show-spring', 'start: #tv-wire-start; end: #tv-wire-end');
      
        var monitor = document.createElement('a-plane');
        monitor.setAttribute('networked', 'template: #monitor-template');
        monitor.object3D.position.set(0, 18.5, 2.2);
        document.getElementById('roomSlides').appendChild(monitor);

        // robot start debris
        var crateA1 = document.createElement('a-gltf-model');
        crateA1.setAttribute('networked', 'template: #crate-a-template');
        crateA1.object3D.position.set(-13.25, 0.2, 18);
        crateA1.object3D.rotation.set(0, THREE.Math.degToRad(110), 0);
        crateA1.object3D.scale.set(1.5, 1.5, 1.5);
        crateA1.setAttribute('dynamic-body', '');
        el.appendChild(crateA1);

        var crateA2 = document.createElement('a-gltf-model');
        crateA2.setAttribute('networked', 'template: #crate-a-template');
        crateA2.object3D.position.set(-13.7, 0.2, 15.6);
        crateA2.object3D.rotation.set(0, THREE.Math.degToRad(90), 0);
        crateA2.object3D.scale.set(1.5, 1.5, 1.5);
        crateA2.setAttribute('dynamic-body', '');
        el.appendChild(crateA2);

        var crateA3 = document.createElement('a-gltf-model');
        crateA3.setAttribute('networked', 'template: #crate-a-template');
        crateA3.object3D.position.set(-13.5, 1.35, 17);
        crateA3.object3D.rotation.set(0, THREE.Math.degToRad(90), 0);
        crateA3.object3D.scale.set(1.5, 1.5, 1.5);
        crateA3.setAttribute('dynamic-body', '');
        el.appendChild(crateA3);

        var crateA4 = document.createElement('a-gltf-model');
        crateA4.setAttribute('networked', 'template: #crate-a-template');
        crateA4.object3D.position.set(-13, 1.35, 14.5);
        crateA4.object3D.rotation.set(0, THREE.Math.degToRad(70), 0);
        crateA4.object3D.scale.set(1.5, 1.5, 1.5);
        crateA4.setAttribute('dynamic-body', '');
        el.appendChild(crateA4);

        var crateA5 = document.createElement('a-gltf-model');
        crateA5.setAttribute('networked', 'template: #crate-a-template');
        crateA5.object3D.position.set(-12, 0.2, 13.65);
        crateA5.object3D.rotation.set(0, THREE.Math.degToRad(10), 0);
        crateA5.object3D.scale.set(1.5, 1.5, 1.5);
        crateA5.setAttribute('dynamic-body', '');
        el.appendChild(crateA5);

        var crateB1 = document.createElement('a-gltf-model');
        crateB1.setAttribute('networked', 'template: #crate-b-template');
        crateB1.object3D.position.set(-10.8, 0.1, 19);
        crateB1.object3D.rotation.set(0, THREE.Math.degToRad(90), 0);
        crateB1.setAttribute('dynamic-body', '');
        el.appendChild(crateB1);

        var crateB2 = document.createElement('a-gltf-model');
        crateB2.setAttribute('networked', 'template: #crate-b-template');
        crateB2.object3D.position.set(-10.8, 0.9, 19);
        crateB2.object3D.rotation.set(0, THREE.Math.degToRad(90), 0);
        crateB2.setAttribute('dynamic-body', '');
        el.appendChild(crateB2);

        var crateB3 = document.createElement('a-gltf-model');
        crateB3.setAttribute('networked', 'template: #crate-b-template');
        crateB3.object3D.position.set(-10.9, 0.15, 17.7);
        crateB3.object3D.rotation.set(0, THREE.Math.degToRad(54), 0);
        crateB3.setAttribute('dynamic-body', '');
        el.appendChild(crateB3);

        var pipeC1 = document.createElement('a-gltf-model');
        pipeC1.setAttribute('networked', 'template: #pipe-c-template');
        pipeC1.object3D.position.set(-12, 1.1, 16.25);
        pipeC1.object3D.rotation.set(0, THREE.Math.degToRad(-90), 0);
        pipeC1.setAttribute('dynamic-body', '');
        el.appendChild(pipeC1);

        var pipeC2 = document.createElement('a-gltf-model');
        pipeC2.setAttribute('networked', 'template: #pipe-c-template');
        pipeC2.object3D.position.set(-9, 1, 19.4);
        pipeC2.object3D.rotation.set(0, THREE.Math.degToRad(90), 0);
        pipeC2.setAttribute('dynamic-body', '');
        el.appendChild(pipeC2);

        var pipeC3 = document.createElement('a-gltf-model');
        pipeC3.setAttribute('networked', 'template: #pipe-c-template');
        pipeC3.object3D.position.set(-8.3, 1.1, 19.3);
        pipeC3.object3D.rotation.set(0, THREE.Math.degToRad(90), 0);
        pipeC3.setAttribute('dynamic-body', '');
        el.appendChild(pipeC3);

        var doorA = document.createElement('a-gltf-model');
        doorA.setAttribute('networked', 'template: #door-a-template');
        doorA.object3D.position.set(-9.3, 0.1, 18.75);
        doorA.object3D.rotation.set(0, THREE.Math.degToRad(-10), 0);
        doorA.setAttribute('dynamic-body', '');
        //doorA.setAttribute('shape', 'orientation', '1 1 0 1');
        el.appendChild(doorA);

        // Scene 2

        // corridor debris
        var crate1 = document.createElement('a-gltf-model');
        crate1.setAttribute('networked', 'template: #crate-a-template');
        crate1.object3D.position.set(-2, 1, 11);
        crate1.object3D.rotation.set(0, THREE.Math.degToRad(90), 0);
        crate1.object3D.scale.set(0.5, 0.5, 0.5);
        crate1.setAttribute('dynamic-body', '');
        el2.appendChild(crate1);

        var crate2 = document.createElement('a-gltf-model');
        crate2.setAttribute('networked', 'template: #crate-a-template');
        crate2.object3D.position.set(1, 1, 10);
        crate2.object3D.rotation.set(0, THREE.Math.degToRad(90), 0);
        crate2.object3D.scale.set(0.5, 0.5, 0.5);
        crate2.setAttribute('dynamic-body', '');
        el2.appendChild(crate2);

        var crate3 = document.createElement('a-gltf-model');
        crate3.setAttribute('networked', 'template: #crate-a-template');
        crate3.object3D.position.set(0, 1, 3);
        crate3.object3D.rotation.set(0, THREE.Math.degToRad(90), 0);
        crate3.object3D.scale.set(0.5, 0.5, 0.5);
        crate3.setAttribute('dynamic-body', '');
        el2.appendChild(crate3);

        var crate4 = document.createElement('a-gltf-model');
        crate4.setAttribute('networked', 'template: #crate-a-template');
        crate4.object3D.position.set(-2, 1, 3);
        crate4.object3D.rotation.set(0, THREE.Math.degToRad(90), 0);
        crate4.object3D.scale.set(0.5, 0.5, 0.5);
        crate4.setAttribute('dynamic-body', '');
        el2.appendChild(crate4);

        var crate5 = document.createElement('a-gltf-model');
        crate5.setAttribute('networked', 'template: #crate-a-template');
        crate5.object3D.position.set(0, 1, 6);
        crate5.object3D.rotation.set(0, THREE.Math.degToRad(90), 0);
        crate5.object3D.scale.set(0.5, 0.5, 0.5);
        crate5.setAttribute('dynamic-body', '');
        el2.appendChild(crate5);

        var crate6 = document.createElement('a-gltf-model');
        crate6.setAttribute('networked', 'template: #crate-a-template');
        crate6.object3D.position.set(2, 1, 6);
        crate6.object3D.rotation.set(0, THREE.Math.degToRad(90), 0);
        crate6.object3D.scale.set(0.5, 0.5, 0.5);
        crate6.setAttribute('dynamic-body', '');
        el2.appendChild(crate6);

        // batteries
        var battery1 = document.createElement('a-cylinder');
        battery1.setAttribute('networked', 'template: #battery-template');
        battery1.setAttribute('radius', 0.25);
        battery1.setAttribute('height', 0.75);
        battery1.object3D.position.set(-13.5, 0.4, -17);
        battery1.setAttribute('dynamic-body', '');
        battery1.setAttribute('id', 'firstBattery');
        el2.appendChild(battery1);

        var battery2 = document.createElement('a-cylinder');
        battery2.setAttribute('networked', 'template: #battery-template');
        battery2.setAttribute('radius', 0.25);
        battery2.setAttribute('height', 0.75);
        battery2.object3D.position.set(14.1, 0.6, -21.25);
        battery2.setAttribute('dynamic-body', '');
        battery2.setAttribute('id', 'secondBattery');
        el2.appendChild(battery2);

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
      
        // Doorway 1
        let doorway1 = document.getElementById('doorway1');
        var beam = document.createElement('a-gltf-model');
        beam.setAttribute('networked', 'template: #beam-template');
        beam.object3D.position.set(0, 1, -0.5);
        beam.object3D.scale.set(1, 0.75, 1);
        beam.setAttribute('laser-cutter', 'isRobot', 1);
        var cuttable1 = document.createElement('a-cylinder');
        cuttable1.setAttribute('networked', 'template: #cuttable-template');
        cuttable1.object3D.position.set(0, 1.6, 0);
        beam.appendChild(cuttable1);
        var cuttable2 = document.createElement('a-cylinder');
        cuttable2.setAttribute('networked', 'template: #cuttable-template');
        cuttable2.object3D.position.set(0, -1.6, 0);
        beam.appendChild(cuttable2);
        doorway1.appendChild(beam);

        var beam = document.createElement('a-gltf-model');
        beam.setAttribute('networked', 'template: #beam-template');
        beam.object3D.position.set(0, 2, -0.5);
        beam.object3D.scale.set(1, 0.75, 1);
        beam.setAttribute('laser-cutter', 'isRobot', 1);
        var cuttable1 = document.createElement('a-cylinder');
        cuttable1.setAttribute('networked', 'template: #cuttable-template');
        cuttable1.object3D.position.set(0, 1.6, 0);
        beam.appendChild(cuttable1);
        var cuttable2 = document.createElement('a-cylinder');
        cuttable2.setAttribute('networked', 'template: #cuttable-template');
        cuttable2.object3D.position.set(0, -1.6, 0);
        beam.appendChild(cuttable2);
        doorway1.appendChild(beam);

        var beam = document.createElement('a-gltf-model');
        beam.setAttribute('networked', 'template: #beam-template');
        beam.object3D.position.set(0, 3, 0);
        beam.setAttribute('laser-cutter', 'isRobot', 1);
        var cuttable1 = document.createElement('a-cylinder');
        cuttable1.setAttribute('networked', 'template: #cuttable-template');
        cuttable1.object3D.position.set(0, 1.6, 0);
        beam.appendChild(cuttable1);
        var cuttable2 = document.createElement('a-cylinder');
        cuttable2.setAttribute('networked', 'template: #cuttable-template');
        cuttable2.object3D.position.set(0, -1.6, 0);
        beam.appendChild(cuttable2);
        doorway1.appendChild(beam);

        var beam = document.createElement('a-gltf-model');
        beam.setAttribute('networked', 'template: #beam-template');
        beam.object3D.position.set(0, 4, 0.5);
        beam.object3D.scale.set(1, 0.75, 1);
        beam.setAttribute('laser-cutter', 'isRobot', 1);
        var cuttable1 = document.createElement('a-cylinder');
        cuttable1.setAttribute('networked', 'template: #cuttable-template');
        cuttable1.object3D.position.set(0, 1.6, 0);
        beam.appendChild(cuttable1);
        var cuttable2 = document.createElement('a-cylinder');
        cuttable2.setAttribute('networked', 'template: #cuttable-template');
        cuttable2.object3D.position.set(0, -1.6, 0);
        beam.appendChild(cuttable2);
        doorway1.appendChild(beam);

        // Doorway 2
        let doorway2 = document.getElementById('doorway2');
        var beam = document.createElement('a-gltf-model');
        beam.setAttribute('networked', 'template: #beam-template');
        beam.object3D.position.set(0, 1, -0.5);
        beam.object3D.scale.set(1, 0.75, 1);
        beam.setAttribute('laser-cutter', 'isRobot', 1);
        var cuttable1 = document.createElement('a-cylinder');
        cuttable1.setAttribute('networked', 'template: #cuttable-template');
        cuttable1.object3D.position.set(0, 1.6, 0);
        beam.appendChild(cuttable1);
        var cuttable2 = document.createElement('a-cylinder');
        cuttable2.setAttribute('networked', 'template: #cuttable-template');
        cuttable2.object3D.position.set(0, -1.6, 0);
        beam.appendChild(cuttable2);
        doorway2.appendChild(beam);

        var beam = document.createElement('a-gltf-model');
        beam.setAttribute('networked', 'template: #beam-template');
        beam.object3D.position.set(0, 2, -0.5);
        beam.object3D.scale.set(1, 0.75, 1);
        beam.setAttribute('laser-cutter', 'isRobot', 1);
        var cuttable1 = document.createElement('a-cylinder');
        cuttable1.setAttribute('networked', 'template: #cuttable-template');
        cuttable1.object3D.position.set(0, 1.6, 0);
        beam.appendChild(cuttable1);
        var cuttable2 = document.createElement('a-cylinder');
        cuttable2.setAttribute('networked', 'template: #cuttable-template');
        cuttable2.object3D.position.set(0, -1.6, 0);
        beam.appendChild(cuttable2);
        doorway2.appendChild(beam);

        var beam = document.createElement('a-gltf-model');
        beam.setAttribute('networked', 'template: #beam-template');
        beam.object3D.position.set(0, 3, 0);
        beam.setAttribute('laser-cutter', 'isRobot', 1);
        var cuttable1 = document.createElement('a-cylinder');
        cuttable1.setAttribute('networked', 'template: #cuttable-template');
        cuttable1.object3D.position.set(0, 1.6, 0);
        beam.appendChild(cuttable1);
        var cuttable2 = document.createElement('a-cylinder');
        cuttable2.setAttribute('networked', 'template: #cuttable-template');
        cuttable2.object3D.position.set(0, -1.6, 0);
        beam.appendChild(cuttable2);
        doorway2.appendChild(beam);

        var beam = document.createElement('a-gltf-model');
        beam.setAttribute('networked', 'template: #beam-template');
        beam.object3D.position.set(0, 4, 0.5);
        beam.object3D.scale.set(1, 0.75, 1);
        beam.setAttribute('laser-cutter', 'isRobot', 1); 
        var cuttable1 = document.createElement('a-cylinder');
        cuttable1.setAttribute('networked', 'template: #cuttable-template');
        cuttable1.object3D.position.set(0, 1.6, 0);
        beam.appendChild(cuttable1);
        var cuttable2 = document.createElement('a-cylinder');
        cuttable2.setAttribute('networked', 'template: #cuttable-template');
        cuttable2.object3D.position.set(0, -1.6, 0);
        beam.appendChild(cuttable2);
        doorway2.appendChild(beam);

        // Doorway 3
        let doorway3 = document.getElementById('doorway3');
        var beam = document.createElement('a-gltf-model');
        beam.setAttribute('networked', 'template: #beam-template');
        beam.object3D.position.set(0, 1, -0.5);
        beam.object3D.scale.set(1, 0.75, 1);
        beam.setAttribute('laser-cutter', 'isRobot', 1); 
        var cuttable1 = document.createElement('a-cylinder');
        cuttable1.setAttribute('networked', 'template: #cuttable-template');
        cuttable1.object3D.position.set(0, 1.6, 0);
        beam.appendChild(cuttable1);
        var cuttable2 = document.createElement('a-cylinder');
        cuttable2.setAttribute('networked', 'template: #cuttable-template');
        cuttable2.object3D.position.set(0, -1.6, 0);
        beam.appendChild(cuttable2);
        doorway3.appendChild(beam);

        var beam = document.createElement('a-gltf-model');
        beam.setAttribute('networked', 'template: #beam-template');
        beam.object3D.position.set(0, 2, -0.5);
        beam.object3D.scale.set(1, 0.75, 1);
        beam.setAttribute('laser-cutter', 'isRobot', 1);  
        var cuttable1 = document.createElement('a-cylinder');
        cuttable1.setAttribute('networked', 'template: #cuttable-template');
        cuttable1.object3D.position.set(0, 1.6, 0);
        beam.appendChild(cuttable1);
        var cuttable2 = document.createElement('a-cylinder');
        cuttable2.setAttribute('networked', 'template: #cuttable-template');
        cuttable2.object3D.position.set(0, -1.6, 0);
        beam.appendChild(cuttable2);
        doorway3.appendChild(beam);

        var beam = document.createElement('a-gltf-model');
        beam.setAttribute('networked', 'template: #beam-template');
        beam.object3D.position.set(0, 3, 0);
        beam.setAttribute('laser-cutter', 'isRobot', 1);  
        var cuttable1 = document.createElement('a-cylinder');
        cuttable1.setAttribute('networked', 'template: #cuttable-template');
        cuttable1.object3D.position.set(0, 1.6, 0);
        beam.appendChild(cuttable1);
        var cuttable2 = document.createElement('a-cylinder');
        cuttable2.setAttribute('networked', 'template: #cuttable-template');
        cuttable2.object3D.position.set(0, -1.6, 0);
        beam.appendChild(cuttable2);
        doorway3.appendChild(beam);

        var beam = document.createElement('a-gltf-model');
        beam.setAttribute('networked', 'template: #beam-template');
        beam.object3D.position.set(0, 4, 0.5);
        beam.object3D.scale.set(1, 0.75, 1);
        beam.setAttribute('laser-cutter', 'isRobot', 1);  
        var cuttable1 = document.createElement('a-cylinder');
        cuttable1.setAttribute('networked', 'template: #cuttable-template');
        cuttable1.object3D.position.set(0, 1.6, 0);
        beam.appendChild(cuttable1);
        var cuttable2 = document.createElement('a-cylinder');
        cuttable2.setAttribute('networked', 'template: #cuttable-template');
        cuttable2.object3D.position.set(0, -1.6, 0);
        beam.appendChild(cuttable2);
        doorway3.appendChild(beam);
    }
});