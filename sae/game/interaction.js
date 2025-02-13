// Le code fait effet quand le jeu est en VR 

AFRAME.registerComponent("click-grab", {         // version VR
  init: function () {
    const el = this.el;
    let grabbed = false;
    let controller = null;

    const grab = (evt) => {
      if (grabbed) return;

      controller = evt.detail.target;
      if (!controller) return;

      el.setAttribute("dynamic-body", "mass: 0"); // Désactiver la gravité
      controller.object3D.attach(el.object3D); // Attacher l'objet au contrôleur
      grabbed = true;
    };

    const release = () => {
      if (!grabbed || !controller) return;

      controller.sceneEl.object3D.attach(el.object3D); // Détacher de la main
      el.setAttribute("dynamic-body", "mass: 1"); // Réactiver la gravité
      grabbed = false;
      controller = null;
    };
 
    this.el.addEventListener("grabstart", grab);
    this.el.addEventListener("grabend", release);
  },
});

// Ajouter le comportement aux contrôleurs
AFRAME.registerComponent("hand-grabber", {
  init: function () {
    const el = this.el;

    el.addEventListener("triggerdown", function () {
      const intersectedEl = el.components.raycaster.intersectedEls[0];
      if (intersectedEl) {
        intersectedEl.emit("grabstart", { target: el });
      }
    });

    el.addEventListener("triggerup", function () {
      const intersectedEl = el.components.raycaster.intersectedEls[0];
      if (intersectedEl) {
        intersectedEl.emit("grabend", { target: el });
      }
    });
  },
});



// // Le code fait effet quand le jeu est en navigateur
// AFRAME.registerComponent("click-grab", {      // Version navigateur

//   init: function () {
//     let el = this.el;
//     let scene = el.sceneEl;
//     let camera = document.querySelector("a-camera");
//     let isGrabbed = false;
//     let controller;

//     function updatePosition(event) {
//       if (isGrabbed) {
//         let cameraPos = new THREE.Vector3();
//         let cameraQuat = new THREE.Quaternion();

//         if (controller) {
//           controller.object3D.getWorldPosition(cameraPos);
//           controller.object3D.getWorldQuaternion(cameraQuat);
//         } else {
//           camera.object3D.getWorldPosition(cameraPos);
//           camera.object3D.getWorldQuaternion(cameraQuat);
//         }

//         // Convertit la position de la souris en coordonnées 3D
//         let mouseX = (event.clientX / window.innerWidth) * 2 - 1;
//         let mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

//         let offset = new THREE.Vector3(mouseX * 0.5, mouseY * 0.5, -3); // Toujours devant
//         offset.applyQuaternion(cameraQuat); // Oriente l'objet devant la caméra

//         let newPosition = cameraPos.clone().add(offset);
//         el.object3D.position.copy(newPosition);
//       }
//     }

//     el.addEventListener("mousedown", function () {
//       console.log("Objet attrapé avec la souris !");
//       isGrabbed = true;
//       el.setAttribute("dynamic-body", "mass: 0"); // Désactive la gravité
//       window.addEventListener("mousemove", updatePosition);
//     });

//     scene.addEventListener("mouseup", function () {
//       if (isGrabbed) {
//         console.log("Objet tombé avec la souris !");
//         el.setAttribute("dynamic-body", "mass: 1; restitution: 0.6; friction: 0.5"); // Réactive la gravité
//         isGrabbed = false;
//         window.removeEventListener("mousemove", updatePosition);
//       }
//     });

//   }
// });