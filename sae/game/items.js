    let data;
    fetch('./item.json')
      .then(response => response.json())
      .then(jsonData => {
        data = jsonData;
        console.log(data);
        RandomObject();
      })
      function createObject(modelPath, scale, id) {
        const scene = document.querySelector('a-scene');
        const entity = document.createElement('a-entity');
        entity.setAttribute('gltf-model', modelPath);
        entity.setAttribute('position', "0 3 -0.5"); // Position initiale
        entity.setAttribute('scale', scale);
        entity.setAttribute('dynamic-body', "shape: box; mass: 1;"); // Propriétés physiques
        entity.setAttribute('click-grab', "");
        entity.setAttribute('oculus-grab', "");
        entity.setAttribute('id', id);
        entity.setAttribute('class', "collidable");
      
        // Ajouter des logs pour vérifier la position initiale
        console.log(`Creating object with ID: ${id}`);
        console.log(`Initial position: 0 3 -4`);
        console.log(`Model path: ${modelPath}`);
        console.log(`Scale: ${scale}`);
      
        scene.appendChild(entity);
      
        // Ajouter un événement pour vérifier la position après l'ajout à la scène
        entity.addEventListener('body-loaded', () => {
          entity.object3D.position.set(0, 3, -4); // Réinitialiser la position
          console.log(`Object ${id} position reset to:`, entity.object3D.position);
      
          // Vérifier les forces appliquées à l'objet
          const body = entity.body;
          if (body) {
            console.log(`Object ${id} initial velocity:`, body.velocity);
            body.velocity.set(0, 0, 0); // Réinitialiser la vitesse
            console.log(`Object ${id} velocity reset to:`, body.velocity);
          }
        });
      
        console.log('Object created !');
      }

    function RandomObject() {
      // Génère un nombre aléatoire entre 1 et 6
      const randomNumber = Math.floor(Math.random() * 6) + 1;

      // Récupère l'objet correspondant au nombre aléatoire dans le fichier JSON
      let obj = data.Items.find(item => item.id === randomNumber);
      console.log(obj);
      console.log(randomNumber);

      // Vérifie si l'objet existe
      if (obj) {
    // Crée l'objet dans la scène avec les informations du JSON
    createObject(
        obj.modelPath, // Chemin du modèle
        `${obj.scale.x} ${obj.scale.y} ${obj.scale.z}`, // Échelle par défaut
        obj.name, // ID de l'objet
    );    } 
  } 

  let Deposit = document.getElementById("DepositZone");

  let Destroy = document.getElementById("DestroyItems");

  

  // Function to create multiple objects at intervals
  function MultipleObject() {
    // Set an interval to call the RandomObject function every 2 seconds
    setInterval(RandomObject, 2000);
    
  }

  // Décommenter cette fonction pour générer des objets aléatoires toutes les 2 secondes
  // MultipleObject();
