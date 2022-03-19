let outerRadius = 120;
let innerRadius = 100;
let xDelta = 260;
let yDelta = 110
let ring = new THREE.RingGeometry(innerRadius, outerRadius, 32, 11, 1);

function generateRings(ring, scene) {

    let blue = new THREE.MeshBasicMaterial({color: 0x0000ff});
    let yellow = new THREE.MeshBasicMaterial({color: 0xffff00});
    let black = new THREE.MeshBasicMaterial({color: 0x000000});
    let green = new THREE.MeshBasicMaterial({color: 0x00ff00});
    let blueRing = new THREE.Mesh(ring, blue);
    let yellowRing = new THREE.Mesh(ring, yellow);
    let blackRing = new THREE.Mesh(ring, black);
    let greenRing = new THREE.Mesh(ring, green);
    blueRing.position.x = -xDelta;

    yellowRing.position.x = -xDelta / 2;
    yellowRing.position.y = -yDelta;

    greenRing.position.x = xDelta / 2;
    greenRing.position.y = -yDelta;
    scene.add(blueRing, yellowRing, blackRing, greenRing);
}

window.onload = function() {
    let scene = setup();
    generateRings(ring, scene)
    let red = new THREE.MeshBasicMaterial({color: 0xff0000});
    const redRing = new THREE.Mesh(ring, red);
    redRing.position.x = xDelta;
    scene.add(redRing);
}

function activate() {
    let scene = setup();
    generateRings(ring, scene)
    let closedRing = new THREE.RingGeometry(0, 70, 32, 11, 1);
    let red = new THREE.MeshBasicMaterial({color: 0xff0000});
    const closedRedRing = new THREE.Mesh(closedRing, red);
    closedRedRing.position.x = xDelta;
    scene.add(closedRedRing);
}





