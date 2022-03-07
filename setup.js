function setup() {

    var width = window.innerWidth;
    var height = window.innerHeight;

    var canvas = document.getElementById('canvas');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    var renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0xffffff);

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 8000);
    camera.position.set(0, 0, 1000);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);


    var rendering = function () {
        requestAnimationFrame(rendering);
        controls.update();
        renderer.render(scene, camera);
    };

    rendering();

    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    return scene;
} 