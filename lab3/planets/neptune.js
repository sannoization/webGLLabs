function generateTexture(image) {
    let loader = new THREE.TextureLoader();
    let texture = loader.load(image);
    texture.anisotropy = 1;
    return texture;
}
function generateSphere(radius, widthSegments, heightSegments, image, emissiveColor){
    let texture = generateTexture(image);
    let geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
    let material = new THREE.MeshPhongMaterial({map: texture, emissive: emissiveColor })
    return new THREE.Mesh(geometry, material);
}
function setDefaultRotation(mesh, t, speed, distance) {
    mesh.position.x = Math.sin(t*speed)*distance;
    mesh.position.z = Math.cos(t*speed)*distance;
}
function setLookAt(camera, mesh) {
    camera.position.z = mesh.position.z + 3000;
    camera.position.x = mesh.position.x + 3000;
    camera.lookAt(mesh.position);
}

window.onload = function(){

    let width = window.innerWidth;
    let height = window.innerHeight;

    let canvas = document.getElementById('canvas');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    let renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0x000000);

    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 300000);

    let light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    //setup sun and planets
    var sun = generateSphere(2300, 80, 80, '../img/sun.jpg' ,0x555500);
    var earth = generateSphere(100, 40, 40, '../img/earth.jpg', 0x000000);
    var mercury = generateSphere(60,20,20, '../img/mercury.jpg' ,0x000000);
    var venus = generateSphere(90,20,20, '../img/venus.jpg' ,0x000000);
    var mars = generateSphere(80,20,20, '../img/mars.jpg' ,0x330000);

    var jupiter = generateSphere(1500, 80, 80, '../img/jupiter.jpg', 0x000000);
    var saturn = generateSphere(1000, 80, 80, '../img/saturn.jpg', 0x000000);
    var uranus = generateSphere(600, 80, 80, '../img/uranus.jpg', 0x000000);
    var neptune = generateSphere(800, 80, 80, '../img/neptune.jpg', 0x000000);

    scene.add(mercury);
    scene.add(venus);
    scene.add(mars);
    scene.add(earth);
    scene.add(sun);
    scene.add(jupiter);
    scene.add(saturn);
    scene.add(uranus);
    scene.add(neptune);


    var t = 0;

    var rendering = function () {
        requestAnimationFrame(rendering);

        sun.rotation.y += 0.001;

        setLookAt(camera,neptune);

        setDefaultRotation(earth, t,0.5, 7500);
        setDefaultRotation(mercury, t, 0.2,4000);
        setDefaultRotation(venus, t, 0.2, 5500);
        setDefaultRotation(mars, t, 0.08, 8000);
        setDefaultRotation(jupiter, t, 0.04, 13000);
        setDefaultRotation(saturn, t, 0.03, 17000);
        setDefaultRotation(uranus, t, 0.02, 25000);
        setDefaultRotation(neptune, t, 0.01, 30000);

        t += 0.01;
        renderer.render(scene, camera);
    };

    rendering();
}