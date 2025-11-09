// Show selected panel
window.showPanel = function (panelId) {
  const panels = document.querySelectorAll('.panel');
  const buttons = document.querySelectorAll('.tab-btn');

  panels.forEach(panel => {
    if (panel.id === panelId || panelId === 'all') {
      panel.classList.add('active');
      panel.style.opacity = '1';
    } else {
      panel.classList.remove('active');
      panel.style.opacity = '0';
    }
  });

  buttons.forEach(btn => {
    if (btn.textContent.toLowerCase() === panelId || panelId === 'all') {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const dashboardGrid = document.querySelector('.dashboard-grid');
  if (panelId === 'all') {
    dashboardGrid.classList.add('split-screen');
  } else {
    dashboardGrid.classList.remove('split-screen');
  }
};

// Connect to WebSocket Server
const socket = new WebSocket("ws://YOUR_SERVER_IP:3000"); // Change to your server address

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Data received:", data);

  document.getElementById('heartRate').innerText = data.heartRate ? `${data.heartRate} bpm` : 'N/A';
  document.getElementById('spo2').innerText = data.spo2 ? `${data.spo2}%` : 'N/A';
  document.getElementById('temp').innerText = data.temperature ? `${data.temperature}°C` : 'N/A';

  // Show emergency alert if SpO2 < 90
  const alertPanel = document.getElementById('alertPanel');
  if (data.spo2 && Number(data.spo2) < 90) {
    alertPanel.style.display = 'block';
  } else {
    alertPanel.style.display = 'none';
  }
};

// Example hospital list
const hospitals = [
  { name: "CityCare Hospital", distance: "1.2 km" },
  { name: "Metro Heart Institute", distance: "2.3 km" },
  { name: "GreenLife Medical Center", distance: "3.1 km" }
];

window.searchHospitals = function () {
  const hospitalList = document.getElementById('hospitalList');
  hospitalList.innerHTML = '';

  hospitals.forEach(hospital => {
    const button = document.createElement('button');
    button.className = 'hospital-btn';
    button.textContent = `🏥 ${hospital.name} (${hospital.distance})`;
    button.onclick = () => {
      alert(`Hospital '${hospital.name}' selected.`);
    };
    hospitalList.appendChild(button);
  });
};

window.onload = () => {
  showPanel('health');
};