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
    camera.position.set(0, 0, 9000);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    let whiteStarsGeometry = new THREE.Geometry();
    let whiteStarsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        opacity: 0.1,
        opacity: true,
        size: 1,
        sizeAttenuation: false
    });

    for (let i = 0; i < 40000; i++) {
        let vertex = new THREE.Vector3()
        vertex.x = Math.random()*2-1;
        vertex.y = Math.random()*2-1;
        vertex.z = Math.random()*2-1;
        vertex.multiplyScalar(2000);
        whiteStarsGeometry.vertices.push(vertex);
    }

    let stars = new THREE.Points(whiteStarsGeometry, whiteStarsMaterial);
    scene.add(stars);
    stars.scale.set(200,200,200);

    let blueStarsGeometry = new THREE.Geometry();
    let blueStarsMaterial = new THREE.PointsMaterial({
        color: 0x5555ff,
        opacity: 0.1,
        opacity: true,
        size: 2,
        sizeAttenuation: false
    })
    for (let i = 0; i < 20000; i++) {
        let vertex = new THREE.Vector3()
        vertex.x = Math.random()*2-1;
        vertex.y = Math.random()*2-1;
        vertex.z = Math.random()*2-1;
        vertex.multiplyScalar(2000);
        blueStarsGeometry.vertices.push(vertex);
    }
    let blueStars = new THREE.Points(blueStarsGeometry, blueStarsMaterial);
    scene.add(blueStars);
    blueStars.scale.set(200,200,200);

    var rendering = function () {
        requestAnimationFrame(rendering);

        controls.update();
        renderer.render(scene, camera);
    };

    rendering();
}