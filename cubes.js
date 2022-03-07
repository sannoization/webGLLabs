let cubeSize = 50;
function generateCubes(scene) {
    let bigCubeGeometry = new THREE.CubeGeometry(cubeSize*3, cubeSize*3, cubeSize*3,1,1,1);
    let middleCubeGeometry = new THREE.CubeGeometry(cubeSize*2, cubeSize*2, cubeSize*2,3,3,3);
    let smallCubeGeometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize, 5,5,5);

    let material = new THREE.MeshBasicMaterial({color: 'black',wireframe: true});

    let bigCube = new THREE.Mesh(bigCubeGeometry, material);
    let middleCube = new THREE.Mesh(middleCubeGeometry, material);
    let smallCube = new THREE.Mesh(smallCubeGeometry, material);

    middleCube.position.x = bigCube.position.x + cubeSize*3;
    smallCube.position.x = middleCube.position.x + cubeSize*2;
    scene.add(bigCube, middleCube, smallCube);
}


window.onload = function() {
    let scene = setup();
    generateCubes(scene)
}
