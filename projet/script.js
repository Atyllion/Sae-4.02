AFRAME.registerComponent("click-grab", {
    init: function () {
      let el = this.el;
      let scene = el.sceneEl;
      let camera = document.querySelector("a-camera");
      let isGrabbed = false;

      function updatePosition(event) {
        if (isGrabbed) {
          let cameraPos = new THREE.Vector3();
          let cameraQuat = new THREE.Quaternion();

          camera.object3D.getWorldPosition(cameraPos);
          camera.object3D.getWorldQuaternion(cameraQuat);

          // Convertit la position de la souris en coordonnées 3D
          let mouseX = (event.clientX / window.innerWidth) * 2 - 1;
          let mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

          let offset = new THREE.Vector3(mouseX * 0.5, mouseY * 0.5, -1); // Toujours devant
          offset.applyQuaternion(cameraQuat); // Oriente l'objet devant la caméra

          let newPosition = cameraPos.clone().add(offset);
          el.object3D.position.copy(newPosition);
        }
      }

      el.addEventListener("mousedown", function () {
        console.log("Objet attrapé !");
        isGrabbed = true;
        el.setAttribute("dynamic-body", "mass: 0"); // Désactive la gravité
        window.addEventListener("mousemove", updatePosition);
      });

      scene.addEventListener("mouseup", function () {
        if (isGrabbed) {
          console.log("Objet tombé !");
          el.setAttribute("dynamic-body", "mass: 1; restitution: 0.6; friction: 0.5"); // Réactive la gravité
          isGrabbed = false;
          window.removeEventListener("mousemove", updatePosition);
        }
      });

      let rightController = document.querySelector('#rightController');
      if (rightController) {
        rightController.addEventListener('triggerdown', function () {
          console.log("Objet attrapé avec le contrôleur !");
          isGrabbed = true;
          el.setAttribute("dynamic-body", "mass: 0"); // Désactive la gravité
          window.addEventListener("mousemove", updatePosition);
        });

        rightController.addEventListener('triggerup', function () {
          if (isGrabbed) {
            console.log("Objet tombé avec le contrôleur !");
            el.setAttribute("dynamic-body", "mass: 1; restitution: 0.6; friction: 0.5"); // Réactive la gravité
            isGrabbed = false;
            window.removeEventListener("mousemove", updatePosition);
          }
        });
      }
    },
  });