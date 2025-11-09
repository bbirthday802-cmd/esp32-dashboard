// Use your Render WebSocket endpoint (wss, not https)
const socket = new WebSocket("wss://esp32-dashboard-4690.onrender.com");

socket.onopen = () => {
    console.log("✅ Connected to WebSocket server");
};

socket.onmessage = (event) => {
    console.log("📩 Received data:", event.data);

    try {
        const data = JSON.parse(event.data);

        document.getElementById('heartRate').innerText = data.heartRate ? `${data.heartRate} bpm` : '--';
        document.getElementById('spo2').innerText = data.spo2 ? `${data.spo2}%` : '--';
        document.getElementById('temp').innerText = data.temperature ? `${data.temperature}°C` : '--';

        // Show alert if SpO2 < 90
        document.getElementById('alertPanel').style.display = (data.spo2 && data.spo2 < 90) ? 'block' : 'none';
    } catch (err) {
        console.error("⚠️ JSON Parse Error:", err);
    }
};

socket.onclose = () => console.log("❌ WebSocket closed");
socket.onerror = (err) => console.error("⚠️ WebSocket error:", err);
