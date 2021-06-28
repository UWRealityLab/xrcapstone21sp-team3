    NAF.schemas.add({
      template: '#character-select-template',
      components: [
        'position',
        'rotation',
        {
          selector: '.menu',
          component: 'character-select'
        },
        {
          selector: '.human-button',
          component: 'material',
          property: 'opacity'
        },
        {
          selector: '.robot-button',
          component: 'material',
          property: 'opacity'
        }
      ]
    });
  
    NAF.schemas.add({
      template: '#human-lefthand-template',
      components: [
        'position',
        'rotation',
        {
          selector: '.ability',
          component: 'particle-system',
          property: 'enabled'
        }
      ]
    });

    NAF.schemas.add({
      template: '#human-righthand-template',
      components: [
        'position',
        'rotation',
        {
          selector: '.ability',
          component: 'particle-system',
          property: 'enabled'
        }
      ]
    });

    NAF.schemas.add({
      template: '#robot-lefthand-template',
      components: [
        'position',
        'rotation',
        'raycaster',
        {
          selector: '.ability',
          component: 'visible'
        }
      ]
    });
  
    NAF.schemas.add({
      template: '#robot-righthandmagnet-template',
      components: [
        'position',
        'rotation',
        'raycaster',
        {
          selector: '.ability',
          component: 'visible'
        },
        {
          selector: '.ability-2',
          component: 'line',
          property: 'visible'
        },
        {
          selector: '.ability-2',
          component: 'line__2',
          property: 'visible'
        }
      ]
    });

    NAF.schemas.add({
      template: '#wire-template',
      components: [
        'position',
        'rotation',
        'color',
        'id'
      ]
    });
  
    NAF.schemas.add({
      template: '#monitor-template',
      components: [
        'position',
        'rotation',
        'material',
        'src'
      ]
    });
  
    NAF.schemas.add({
      template: '#crate-a-template',
      components: [
        'position',
        'rotation',
        'scale'
      ]
    }); 
  
    NAF.schemas.add({
      template: '#beam-template',
      components: [
        'position',
        'rotation',
        'scale'
      ]
    });