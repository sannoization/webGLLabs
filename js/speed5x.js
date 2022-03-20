function generateSphere(radius, widthSegments, heightSegments){
    let geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
    let material = new THREE.MeshNormalMaterial();
    return new THREE.Mesh(geometry, material);
}

function setDefaultRotation(mesh, t, speed, distance) {
    mesh.position.x = Math.sin(t*speed)*distance;
    mesh.position.z = Math.cos(t*speed)*distance;
}
window.onload = function(){

    var width = window.innerWidth;
    var height = window.innerHeight;

    var canvas = document.getElementById('canvas');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    var renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0x000000);

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 300000);
    camera.position.set(0, 0, 15000);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    //setup sun and planets
    var sun = generateSphere(2300, 80, 80);
    var earth = generateSphere(100, 40, 40);
    var mercury = generateSphere(60,20,20);
    var venus = generateSphere(90,20,20);
    var mars = generateSphere(80,20,20);

    var jupiter = generateSphere(1500, 80, 80);
    var saturn = generateSphere(1300, 80, 80);
    var uranus = generateSphere(600, 80, 80);
    var neptune = generateSphere(1000, 80, 80);


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

        setDefaultRotation(earth, t,0.5*5, 7500);
        setDefaultRotation(mercury, t, 0.2*5,4000);
        setDefaultRotation(venus, t, 0.2*5, 5500);
        setDefaultRotation(mars, t, 0.08*5, 8000);
        setDefaultRotation(jupiter, t, 0.04*5, 13000);
        setDefaultRotation(saturn, t, 0.03*5, 17000);
        setDefaultRotation(uranus, t, 0.02*5, 25000);
        setDefaultRotation(neptune, t, 0.01*5, 30000);

        t += 0.01;
        controls.update();
        renderer.render(scene, camera);
    };

    rendering();
}