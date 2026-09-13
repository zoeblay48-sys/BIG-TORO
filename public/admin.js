let adminAuthenticated = false;
let adminKey = '';

// Authentication
function authenticate() {
  adminKey = document.getElementById('admin-key').value;
  if (!adminKey) {
    showError('auth-error', 'Please enter admin key');
    return;
  }
  adminAuthenticated = true;
  document.getElementById('auth-section').style.display = 'none';
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById('dashboard').classList.remove('hidden');
  loadDashboard();
}

function logout() {
  adminAuthenticated = false;
  adminKey = '';
  document.getElementById('admin-key').value = '';
  document.getElementById('auth-section').style.display = 'flex';
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
}

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    if (!adminAuthenticated) return;
    const section = this.dataset.section;
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(section).classList.remove('hidden');
    if (section === 'services') loadServices();
  });
});

// Dashboard
async function loadDashboard() {
  try {
    const response = await fetch('/api/admin/services', {
      headers: { 'x-admin-key': adminKey },
    });
    const services = await response.json();
    const activeCount = services.filter(s => s.active).length;
    document.getElementById('total-services').textContent = services.length;
    document.getElementById('active-services').textContent = activeCount;
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}

// Load Services
async function loadServices() {
  try {
    const response = await fetch('/api/admin/services', {
      headers: { 'x-admin-key': adminKey },
    });
    const services = await response.json();
    const tbody = document.getElementById('services-tbody');
    tbody.innerHTML = '';

    services.forEach(service => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${service.name}</td>
        <td>${service.category || 'N/A'}</td>
        <td>${service.active ? '✓ Active' : '✗ Inactive'}</td>
        <td>
          <div class="action-buttons">
            <button class="btn-edit" onclick="editService('${service.id}')">Edit</button>
            <button class="btn-delete" onclick="deleteService('${service.id}')">Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading services:', error);
  }
}

// Handle Service Form Submission
async function handleServiceSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('service-name').value;
  const description = document.getElementById('service-desc').value;
  const category = document.getElementById('service-category').value;
  const imagesInput = document.getElementById('service-images').value;
  const active = document.getElementById('service-active').checked;

  const images = imagesInput
    .split(',')
    .map(img => img.trim())
    .filter(img => img);

  const attributes = {};
  document.querySelectorAll('.attribute-input').forEach(attr => {
    const key = attr.querySelector('.attr-key').value;
    const value = attr.querySelector('.attr-value').value;
    if (key && value) attributes[key] = value;
  });

  try {
    const response = await fetch('/api/admin/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': adminKey,
      },
      body: JSON.stringify({
        name,
        description,
        category,
        images,
        attributes,
        active,
      }),
    });

    if (response.ok) {
      showSuccess('Service added successfully!');
      document.getElementById('service-form').reset();
      loadServices();
      loadDashboard();
    } else {
      showError('auth-error', 'Failed to add service');
    }
  } catch (error) {
    showError('auth-error', 'Error adding service: ' + error.message);
  }
}

// Add Attribute Field
function addAttributeField() {
  const container = document.getElementById('attributes-container');
  const div = document.createElement('div');
  div.className = 'attribute-input';
  div.innerHTML = `
    <input type="text" placeholder="Attribute Key" class="attr-key" />
    <input type="text" placeholder="Attribute Value" class="attr-value" />
    <button type="button" onclick="removeAttribute(this)">Remove</button>
  `;
  container.appendChild(div);
}

function removeAttribute(button) {
  button.parentElement.remove();
}

// Delete Service
async function deleteService(id) {
  if (!confirm('Are you sure you want to delete this service?')) return;

  try {
    const response = await fetch(`/api/admin/services/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-key': adminKey },
    });

    if (response.ok) {
      showSuccess('Service deleted successfully!');
      loadServices();
      loadDashboard();
    }
  } catch (error) {
    showError('auth-error', 'Error deleting service: ' + error.message);
  }
}

function showError(elementId, message) {
  const errorEl = document.getElementById(elementId);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('error');
    setTimeout(() => {
      errorEl.textContent = '';
      errorEl.classList.remove('error');
    }, 5000);
  }
}

function showSuccess(message) {
  alert(message);
}
