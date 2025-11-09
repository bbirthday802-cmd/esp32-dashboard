// Show selected panel
window.showPanel = function(panelId) {
  const panels = document.querySelectorAll(".panel");
  const buttons = document.querySelectorAll(".tab-btn");

  panels.forEach(panel => {
    panel.classList.toggle("active", panel.id === panelId || panelId === "all");
    panel.style.opacity = panel.classList.contains("active") ? "1" : "0";
  });

  buttons.forEach(btn => {
    btn.classList.toggle("active", btn.textContent.toLowerCase() === panelId || panelId === "all");
  });

  document.querySelector(".dashboard-grid").classList.toggle("split-screen", panelId === "all");
};

// Connect to WebSocket server
const socket = new WebSocket("wss://YOUR_RENDER_URL_HERE"); // Replace with your Render URL

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Data received:", data);

  document.getElementById("heartRate").innerText = data.heartRate ? `${data.heartRate} bpm` : "N/A";
  document.getElementById("spo2").innerText = data.spo2 ? `${data.spo2}%` : "N/A";
  document.getElementById("temp").innerText = data.temperature ? `${data.temperature}°C` : "N/A";

  const alertPanel = document.getElementById("alertPanel");
  alertPanel.style.display = (data.spo2 && Number(data.spo2) < 90) ? "block" : "none";
};

// Example hospital list
const hospitals = [
  { name: "CityCare Hospital", distance: "1.2 km" },
  { name: "Metro Heart Institute", distance: "2.3 km" },
  { name: "GreenLife Medical Center", distance: "3.1 km" }
];

window.searchHospitals = function() {
  const hospitalList = document.getElementById("hospitalList");
  hospitalList.innerHTML = "";
  hospitals.forEach(hospital => {
    const btn = document.createElement("button");
    btn.className = "hospital-btn";
    btn.textContent = `🏥 ${hospital.name} (${hospital.distance})`;
    btn.onclick = () => alert(`Hospital '${hospital.name}' selected.`);
    hospitalList.appendChild(btn);
  });
};

window.onload = () => showPanel("health");