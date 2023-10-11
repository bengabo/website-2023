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

// Sphere
let sphere = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1.1, 4),
  new THREE.MeshBasicMaterial({
    color: 0xffe72d,
    wireframe: true,
  })
);
sphere.position.x = 0.45;
sphere.position.y = 0.45;
scene.add(sphere);

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
  sphere.rotation.x += 0.001;
  sphere.rotation.y += 0.001;
  renderer.render(scene, camera);
}

tick();
