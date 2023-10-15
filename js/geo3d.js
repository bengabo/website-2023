/**
 * Scene
 */
const container = document.getElementById("threejs-container");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6.5;

/**
 * Geometry
 */
// Sphere
const meshBasicMat = new THREE.MeshBasicMaterial({
  color: 0xffe72d,
  wireframe: true,
});

const meshPhysicalMat = new THREE.MeshPhysicalMaterial({
  roughness: 0,
  transmission: 1,
  thickness: 0.5,
});
const sphere01 = new THREE.Mesh(
  new THREE.IcosahedronGeometry(2.8, 4),
  meshBasicMat
);
const cone1 = new THREE.Mesh(
  new THREE.TetrahedronGeometry(0.35, 0),
  meshBasicMat
);
cone1.position.x = 3.5;

const geoGroup = new THREE.Group();

// Cones field
const addCones = () => {
  const cone = new THREE.Mesh(
    new THREE.TetrahedronGeometry(0.15, 0),
    new THREE.MeshBasicMaterial({
      color: 0xffe72d,
      wireframe: true,
    })
  );
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(7));
  cone.position.set(x, y, z);
  geoGroup.add(cone);
};
Array(15).fill().forEach(addCones);

// Cubes field
const addCubes = () => {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshBasicMaterial({
      color: 0xffe72d,
      wireframe: true,
    })
  );
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(7));
  cube.position.set(x, y, z);
  geoGroup.add(cube);
};
Array(15).fill().forEach(addCubes);

geoGroup.add(cone1);
geoGroup.position.x = 2;
geoGroup.position.y = 0.5;
sphere01.position.x = 2;
sphere01.position.y = 0.5;
scene.add(geoGroup);
scene.add(sphere01);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

window.addEventListener("resize", function () {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Scroll function
 */
const moveCamera = () => {};
const clock = new THREE.Clock();

// Animation loop
function tick() {
  const elapsedTime = clock.getElapsedTime();

  geoGroup.rotation.x += 0.001;
  geoGroup.rotation.y += 0.001;
  cone1.rotation.x += 0.01;
  cone1.rotation.y += 0.01;

  geoGroup.children.forEach((cone) => {
    cone.rotation.x += 0.005;
    cone.rotation.y += 0.005;
  });
  geoGroup.children.forEach((cube) => {
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
  });

  sphere01.rotation.x += 0.001;
  sphere01.rotation.y += 0.001;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
