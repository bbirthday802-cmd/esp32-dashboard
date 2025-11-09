// Show selected panel
window.showPanel = function(panelId) {
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

// ---------------------------
// Replace with your Render WebSocket URL
const socket = new WebSocket("wss://esp32-dashboard-4690.onrender.com");

// Called when WebSocket connection is established
socket.onopen = () => {
    console.log("✅ Connected to WebSocket server");
};

// Called when WebSocket receives a message
socket.onmessage = (event) => {
    console.log("Data received:", event.data);

    try {
        // Parse JSON data from ESP32
        const data = JSON.parse(event.data);

        // Update dashboard values
        document.getElementById('heartRate').innerText = data.heartRate ? `${data.heartRate} bpm` : 'N/A';
        document.getElementById('spo2').innerText = data.spo2 ? `${data.spo2}%` : 'N/A';
        document.getElementById('temp').innerText = data.temperature ? `${data.temperature}°C` : 'N/A';

        // Show alert if SpO2 is low
        if (data.spo2 && data.spo2 < 90) {
            document.getElementById('alertPanel').style.display = 'block';
        } else {
            document.getElementById('alertPanel').style.display = 'none';
        }

    } catch (err) {
        console.error("JSON parse error:", err);
    }
};

// Called if WebSocket connection closes
socket.onclose = () => {
    console.log("❌ WebSocket connection closed");
};

// Called if there’s a WebSocket error
socket.onerror = (error) => {
    console.error("WebSocket error:", error);
};

// Example hospitals
const hospitals = [
  { name: "CityCare Hospital", distance: "1.2 km" },
  { name: "Metro Heart Institute", distance: "2.3 km" },
  { name: "GreenLife Medical Center", distance: "3.1 km" }
];

window.searchHospitals = function() {
  const hospitalList = document.getElementById('hospitalList');
  hospitalList.innerHTML = '';
  hospitals.forEach(hospital => {
    const button = document.createElement('button');
    button.className = 'hospital-btn';
    button.textContent = `🏥 ${hospital.name} (${hospital.distance})`;
    button.onclick = () => alert(`Hospital '${hospital.name}' selected.`);
    hospitalList.appendChild(button);
  });
};

window.onload = () => {
  showPanel('health');
};

