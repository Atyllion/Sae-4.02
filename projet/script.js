let book;

function getBook() {
    book = document.getElementById('bookModel');
    return book;
}

function Grab() {
    document.addEventListener('mousedown', () => {
        let book = getBook();
        if (book) {
            book.removeAttribute('dynamic-body');
            document.addEventListener('mousemove', moveBook);
        }
    });
}

function Drop() {
    document.addEventListener('mouseup', () => {
        let book = getBook();
        if (book) {
            book.setAttribute('dynamic-body', 'shape: box; mass: 1');
            document.removeEventListener('mousemove', moveBook);
        }
    });
}

function moveBook() {
    let book = getBook();
    if (book) {
        let cameraEl = document.querySelector('[camera]').object3D;

        let vector = new THREE.Vector3();
        cameraEl.getWorldDirection(vector);
        vector.multiplyScalar(1); // Adjust the distance from the camera
        
        // Calculate the new position using cos and sin for rotation around the camera

        let distance = 1; // Adjust the distance from the camera
        let angle = Math.atan2(vector.z, vector.x);
        let newPosX = cameraEl.position.x + distance * Math.cos(angle);
        let newPosY = cameraEl.position.y; // Keep the same height as the camera
        let newPosZ = cameraEl.position.z + distance * Math.sin(angle);

        book.object3D.rotation.y = angle + Math.PI; // Rotate the book to face the camera
        book.object3D.position.set(newPosX, newPosY, newPosZ);
    }
}


console.log(getBook());
Drop();
Grab();