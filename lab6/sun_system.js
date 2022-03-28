function generateTexture(image) {
    let loader = new THREE.TextureLoader();
    let texture = loader.load(image);
    texture.anisotropy = 1;
    return texture;
}

let orbits = {
    mercury: 4000,
    venus: 5500,
    earth: 7500,
    mars: 8000,
    jupiter: 10700,
    saturn: 12000,
    uranus: 13500,
    neptune: 15000
}

function generateSphere(radius, widthSegments, heightSegments, image, emissiveColor) {
    let texture = generateTexture(image);
    let geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
    let material;
    if (radius === 2300) {
        material = new THREE.MeshPhongMaterial({map: texture, emissive: 0x555500})
    } else {
        material = new THREE.MeshPhongMaterial({map: texture, emissive: emissiveColor})
    }

    return new THREE.Mesh(geometry, material);
}

function setDefaultRotation(mesh, t, speed, distance) {
    mesh.position.x = Math.sin(t * speed) * distance;
    mesh.position.z = Math.cos(t * speed) * distance;
}

function generateRing() {
    let geometry = new THREE.Geometry();
    let material = new THREE.PointsMaterial({color: 0x3A3A3A, size: 1, sizeAttenuation: false});
    for (let i = 0; i < 20000; i++) {
        let vertex = new THREE.Vector3();
        vertex.x = Math.sin(Math.PI / 180 * i) * (550 - i / 80);
        vertex.z = Math.cos(Math.PI / 180 * i) * (550 - i / 80);
        vertex.y = Math.random() * 20;
        geometry.vertices.push(vertex);
    }
    let ring = new THREE.Points(geometry, material);
    ring.castShadow = true;
    return ring;
}



function snapRingToObject(ring, object, speed) {
    ring.position.x = object.position.x;
    ring.position.z = object.position.z;
    ring.rotation.y += speed;
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
    camera.position.set(0, 0, 15000);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);

    let light = new THREE.AmbientLight(0x707070);
    scene.add(light);

    let pointLight = new THREE.PointLight(0x707070, 2, 200000);
    pointLight.position.set(0,0,0);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    scene.add(pointLight);

    var generateOrbit = function (radius) {
        this.radius = radius;
        this.draw = function (scene) {
            let planetOrbitGeometry = new THREE.Geometry();
            let material = new THREE.PointsMaterial({color: 0xffffff, size: 1, sizeAttenuation: false});
            for (let i = 0; i < 20000; i++) {
                let vertex = new THREE.Vector3();
                vertex.x = Math.sin(Math.PI / 180 * i) * radius;
                vertex.z = Math.cos(Math.PI / 180 * i) * radius;
                planetOrbitGeometry.vertices.push(vertex);
            }
            let orbit = new THREE.Points(planetOrbitGeometry, material);
            orbit.castShadow = true;
            scene.add(orbit);
            return orbit;
        }
    }

    //setup sun and planets
    var sun = generateSphere(2300, 100, 100, 'img/sun.jpg' ,0x555500);
    var earth = generateSphere(100, 40, 40, 'img/earth.jpg', 0x000000);
    var mercury = generateSphere(60,20,20, 'img/mercury.jpg' ,0x000000);
    var venus = generateSphere(90,20,20, 'img/venus.jpg' ,0x000000);
    var mars = generateSphere(80,20,20, 'img/mars.jpg' ,0x330000);

    var jupiter = generateSphere(350, 20, 20, 'img/jupiter.jpg', 0x000000);
    var saturn = generateSphere(230, 20, 20, 'img/saturn.jpg', 0x000000);
    var uranus = generateSphere(180, 20, 80, 'img/uranus.jpg', 0x000000);
    var neptune = generateSphere(200, 20, 20, 'img/neptune.jpg', 0x000000);

    var saturnRing = generateRing();
    scene.add(saturnRing);

    scene.add(mercury);
    scene.add(venus);
    scene.add(mars);
    scene.add(earth);
    scene.add(sun);
    scene.add(jupiter);
    scene.add(saturn);
    scene.add(uranus);
    scene.add(neptune);
    let earthOrbit = new generateOrbit(orbits.earth);
    let mercuryOrbit = new generateOrbit(orbits.mercury);
    let venusOrbit = new generateOrbit(orbits.venus);
    let marsOrbit = new generateOrbit(orbits.mars);
    let jupiterOrbit = new generateOrbit(orbits.jupiter);
    let saturnOrbit = new generateOrbit(orbits.saturn);
    let uranusOrbit = new generateOrbit(orbits.uranus);
    let neptuneOrbit = new generateOrbit(orbits.neptune);


    var t = 0;

    var rendering = function () {
        requestAnimationFrame(rendering);


        sun.rotation.y += 0.001;
        snapRingToObject(saturnRing, saturn, 0.001);
        snapRingToObject(earthOrbit.draw(scene), sun, 0)
        snapRingToObject(mercuryOrbit.draw(scene), sun, 0);
        snapRingToObject(venusOrbit.draw(scene), sun, 0);
        snapRingToObject(marsOrbit.draw(scene), sun, 0);
        snapRingToObject(jupiterOrbit.draw(scene), sun, 0);
        snapRingToObject(saturnOrbit.draw(scene), sun, 0);
        snapRingToObject(uranusOrbit.draw(scene), sun, 0);
        snapRingToObject(neptuneOrbit.draw(scene), sun, 0);

        setDefaultRotation(earth, t,0.5, orbits.earth);
        setDefaultRotation(mercury, t, 0.2,orbits.mercury);
        setDefaultRotation(venus, t, 0.2, orbits.venus);
        setDefaultRotation(mars, t, 0.08, orbits.mars);
        setDefaultRotation(jupiter, t, 0.08, orbits.jupiter);
        setDefaultRotation(saturn, t, 0.07, orbits.saturn);
        setDefaultRotation(uranus, t, 0.05, orbits.uranus);
        setDefaultRotation(neptune, t, 0.04, orbits.neptune);

        t += 0.01;
        controls.update();
        renderer.render(scene, camera);
    };

    rendering();
}