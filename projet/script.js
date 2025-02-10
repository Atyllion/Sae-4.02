AFRAME.registerComponent("click-grab", {
  init: function () {
    let el = this.el;
    let scene = el.sceneEl;
    let camera = document.querySelector("a-camera");
    let isGrabbed = false;
    let controller;

    function updatePosition(event) {
      if (isGrabbed) {
        let cameraPos = new THREE.Vector3();
        let cameraQuat = new THREE.Quaternion();

        if (controller) {
          controller.object3D.getWorldPosition(cameraPos);
          controller.object3D.getWorldQuaternion(cameraQuat);
        } else {
          camera.object3D.getWorldPosition(cameraPos);
          camera.object3D.getWorldQuaternion(cameraQuat);
        }

        // Convertit la position de la souris en coordonnées 3D
        let mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        let mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        let offset = new THREE.Vector3(mouseX * 0.5, mouseY * 0.5, -3); // Toujours devant
        offset.applyQuaternion(cameraQuat); // Oriente l'objet devant la caméra

        let newPosition = cameraPos.clone().add(offset);
        el.object3D.position.copy(newPosition);
      }
    }

    el.addEventListener("mousedown", function () {
      console.log("Objet attrapé avec la souris !");
      isGrabbed = true;
      el.setAttribute("dynamic-body", "mass: 0"); // Désactive la gravité
      window.addEventListener("mousemove", updatePosition);
    });

    scene.addEventListener("mouseup", function () {
      if (isGrabbed) {
        console.log("Objet tombé avec la souris !");
        el.setAttribute("dynamic-body", "mass: 1; restitution: 0.6; friction: 0.5"); // Réactive la gravité
        isGrabbed = false;
        window.removeEventListener("mousemove", updatePosition);
      }
    });

    let rightController = document.querySelector('#rightController');
    if (rightController) {
      rightController.addEventListener('gripdown', function () {
        console.log("Objet attrapé avec le contrôleur VR !");
        isGrabbed = true;
        controller = rightController;
        el.setAttribute("dynamic-body", "mass: 0"); // Désactive la gravité
      });

      rightController.addEventListener('gripup', function () {
        if (isGrabbed) {
          console.log("Objet tombé avec le contrôleur VR !");
          el.setAttribute("dynamic-body", "mass: 1; restitution: 0.6; friction: 0.5"); // Réactive la gravité
          isGrabbed = false;
          controller = null;
        }
      });
    }
  },
});
