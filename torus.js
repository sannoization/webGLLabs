let radius = 100;

function generateTor(scene){
    let torGeometry = new THREE.TorusGeometry(radius, 7, 16, 100);
    let torMaterial = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
    let torusOne = new THREE.Mesh(torGeometry, torMaterial);
    let torusTwo = new THREE.Mesh(torGeometry, torMaterial);
    let torusThree = new THREE.Mesh(torGeometry, torMaterial);
    torusTwo.position.x = torusTwo.position.y = 150;
    torusThree.position.x = torusThree.position.y = -150;
    scene.add(torusOne, torusTwo, torusThree);
}

window.onload = function(){

    let scene = setup();
    generateTor(scene)

}

function putRing() {
    let scene = setup();
    generateTor(scene)
    let ringGeometry = new THREE.RingGeometry(radius - radius / 2, radius, 32, 11, 1);
    let ringMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    let ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.z = 10;
    scene.add(ring);
}



   




