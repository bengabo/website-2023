/**
 * Scene
 */
const container = document.getElementById("threejs-container");

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6;

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
  new THREE.IcosahedronGeometry(1, 4),
  meshBasicMat
);
const cone = new THREE.Mesh(new THREE.TetrahedronGeometry(0.15, 0), meshBasicMat);
cone.position.x = 1.255;

const geoGroup = new THREE.Group();
geoGroup.position.x = 1;
geoGroup.position.y = 0.4;
geoGroup.add(sphere01, cone);
scene.add(geoGroup);

/**
 * Renderer
 */
let renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);
// renderer.setSize(
//   document.getElementById("threejs-container").clientWidth,
//   document.getElementById("threejs-container").clientHeight
// );
// document.getElementById("threejs-container").appendChild(renderer.domElement);

window.addEventListener("resize", function () {
  let width = document.getElementById("threejs-container").clientWidth;
  let height = document.getElementById("threejs-container").clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
console.log(
  "Container height: " +
    document.getElementById("threejs-container").clientHeight
);

// const clock = new Clock();

// const tick = () => {
//   const time = clock.getElapsedTime();

//   renderer.render(scene, camera);
//   controls.update();
//   requestAnimationFrame(tick);
// };

// tick();

// Animation loop
function tick() {
  requestAnimationFrame(tick);
  geoGroup.rotation.x += 0.001;
  geoGroup.rotation.y += 0.001;
  cone.rotation.x += 0.01;
  cone.rotation.y += 0.01;
  renderer.render(scene, camera);
}

tick();
