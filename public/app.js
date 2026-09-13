// Initialize 3D plane display using Three.js
function initializePlaneDisplay() {
  const container = document.getElementById('plane-display');
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x667eea);

  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Create a simple airplane geometry
  const fuselageGeometry = new THREE.CylinderGeometry(0.3, 0.2, 2, 32);
  const fuselageMaterial = new THREE.MeshPhongMaterial({ color: 0x00aaff });
  const fuselage = new THREE.Mesh(fuselageGeometry, fuselageMaterial);

  const wingsGeometry = new THREE.BoxGeometry(3, 0.2, 0.5);
  const wingsMaterial = new THREE.MeshPhongMaterial({ color: 0xff6b6b });
  const wings = new THREE.Mesh(wingsGeometry, wingsMaterial);
  wings.position.y = -0.1;

  const plane = new THREE.Group();
  plane.add(fuselage);
  plane.add(wings);
  scene.add(plane);

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    plane.rotation.x += 0.005;
    plane.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}

// Load services from API
async function loadServices() {
  try {
    const response = await fetch('/api/services');
    const services = await response.json();

    const container = document.getElementById('services-container');
    container.innerHTML = '';

    services.forEach((service) => {
      const serviceCard = createServiceCard(service);
      container.appendChild(serviceCard);
    });
  } catch (error) {
    console.error('Error loading services:', error);
  }
}

// Create service card element
function createServiceCard(service) {
  const card = document.createElement('div');
  card.className = 'service-card';

  const imageDiv = document.createElement('div');
  imageDiv.className = 'service-image';
  if (service.images && service.images.length > 0) {
    imageDiv.innerHTML = `<img src="${service.images[0]}" style="width: 100%; height: 100%; object-fit: cover;" alt="${service.name}">`;
  } else {
    imageDiv.innerHTML = '🏖️';
  }

  const content = document.createElement('div');
  content.className = 'service-content';

  content.innerHTML = `
    <h3>${service.name}</h3>
    <p>${service.description}</p>
    <a href="/service-detail.html?id=${service.id}" class="service-link">View Details</a>
  `;

  // Add attributes
  if (service.attributes && Object.keys(service.attributes).length > 0) {
    const attributesDiv = document.createElement('div');
    attributesDiv.className = 'service-attributes';
    Object.entries(service.attributes).forEach(([key, value]) => {
      const attr = document.createElement('span');
      attr.className = 'attribute';
      attr.textContent = `${key}: ${value}`;
      attributesDiv.appendChild(attr);
    });
    content.appendChild(attributesDiv);
  }

  card.appendChild(imageDiv);
  card.appendChild(content);

  return card;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializePlaneDisplay();
  loadServices();
});
