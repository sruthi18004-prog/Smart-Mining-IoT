const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));


// =====================================================
// CURRENT SENSOR DATA
// =====================================================

let sensorData = {
    temperature: 30,
    gas: 500,
    oxygen: 20.8,
    latitude: 17.001234,
    longitude: 81.778456,
    status: "SAFE",
    alert: "Mining environment is normal.",
    timestamp: new Date().toLocaleTimeString()
};


// =====================================================
// SENSOR HISTORY
// =====================================================

let sensorHistory = [];


// Add initial reading to history
sensorHistory.push({
    id: 1,
    temperature: sensorData.temperature,
    gas: sensorData.gas,
    oxygen: sensorData.oxygen,
    latitude: sensorData.latitude,
    longitude: sensorData.longitude,
    status: sensorData.status,
    alert: sensorData.alert,
    timestamp: sensorData.timestamp
});


// =====================================================
// SAFETY CHECK FUNCTION
// =====================================================

function checkSafety(data) {

    // DANGER CONDITIONS
    const temperatureDanger = data.temperature >= 45;
    const gasDanger = data.gas >= 2000;
    const oxygenDanger = data.oxygen < 19;


    // WARNING CONDITIONS
    const temperatureWarning = data.temperature >= 38;
    const gasWarning = data.gas >= 1500;
    const oxygenWarning = data.oxygen < 19.5;


    // =================================================
    // DANGER
    // =================================================

    if (
        temperatureDanger ||
        gasDanger ||
        oxygenDanger
    ) {

        data.status = "DANGER";

        const reasons = [];

        if (temperatureDanger) {
            reasons.push("High Temperature");
        }

        if (gasDanger) {
            reasons.push("High Gas Level");
        }

        if (oxygenDanger) {
            reasons.push("Low Oxygen");
        }

        data.alert = "Emergency! " + reasons.join(", ");
    }


    // =================================================
    // WARNING
    // =================================================

    else if (
        temperatureWarning ||
        gasWarning ||
        oxygenWarning
    ) {

        data.status = "WARNING";

        const reasons = [];

        if (temperatureWarning) {
            reasons.push("Temperature");
        }

        if (gasWarning) {
            reasons.push("Gas");
        }

        if (oxygenWarning) {
            reasons.push("Oxygen");
        }

        data.alert = "Warning! Check " + reasons.join(", ");
    }


    // =================================================
    // SAFE
    // =================================================

    else {

        data.status = "SAFE";

        data.alert = "Mining environment is normal.";
    }


    data.timestamp = new Date().toLocaleTimeString();

    return data;
}


// =====================================================
// UPDATE SENSOR DATA
// =====================================================

app.post("/api/update", express.json(), (req, res) => {

    const {
        temperature,
        gas,
        oxygen,
        latitude,
        longitude
    } = req.body;


    const values = [
        temperature,
        gas,
        oxygen,
        latitude,
        longitude
    ];


    // Check empty values
    if (
        values.some(
            v =>
                v === undefined ||
                v === null ||
                v === ""
        )
    ) {

        return res.status(400).json({
            success: false,
            message: "Please enter valid values for all sensors."
        });
    }


    // =================================================
    // PROCESS SENSOR DATA
    // =================================================

    sensorData = checkSafety({

        temperature: Number(temperature),

        gas: Number(gas),

        oxygen: Number(oxygen),

        latitude: Number(latitude),

        longitude: Number(longitude),

        status: "SAFE",

        alert: "",

        timestamp: ""
    });


    // =================================================
    // ADD TO HISTORY
    // =================================================

    const historyRecord = {

        id: sensorHistory.length + 1,

        temperature: sensorData.temperature,

        gas: sensorData.gas,

        oxygen: sensorData.oxygen,

        latitude: sensorData.latitude,

        longitude: sensorData.longitude,

        status: sensorData.status,

        alert: sensorData.alert,

        timestamp: sensorData.timestamp
    };


    sensorHistory.unshift(historyRecord);


    // Keep only latest 100 records
    if (sensorHistory.length > 100) {
        sensorHistory.pop();
    }


    // =================================================
    // SEND LIVE DATA
    // =================================================

    io.emit("sensorData", sensorData);


    console.log("Sensor data updated:");
    console.log(sensorData);


    // =================================================
    // RESPONSE
    // =================================================

    res.json({

        success: true,

        data: sensorData,

        historyAdded: true
    });

});


// =====================================================
// CURRENT DATA API
// =====================================================

app.get("/api/data", (req, res) => {

    res.json(sensorData);

});


// =====================================================
// STATUS API
// =====================================================

app.get("/api/status", (req, res) => {

    res.json({

        system: "Smart Mining IoT",

        status: sensorData.status,

        temperature: sensorData.temperature,

        gas: sensorData.gas,

        oxygen: sensorData.oxygen,

        latitude: sensorData.latitude,

        longitude: sensorData.longitude,

        alert: sensorData.alert,

        timestamp: sensorData.timestamp,

        backend: "ONLINE"

    });

});


// =====================================================
// HISTORY API
// =====================================================

app.get("/api/history", (req, res) => {

    res.json({

        success: true,

        totalRecords: sensorHistory.length,

        history: sensorHistory

    });

});


// =====================================================
// CLEAR HISTORY
// =====================================================

app.delete("/api/history", (req, res) => {

    sensorHistory = [];

    res.json({

        success: true,

        message: "Sensor history cleared."

    });

});


// =====================================================
// SOCKET.IO CONNECTION
// =====================================================

io.on("connection", (socket) => {

    console.log("Dashboard connected.");

    // Send current data
    socket.emit("sensorData", sensorData);


    socket.on("disconnect", () => {

        console.log("Dashboard disconnected.");

    });

});


// =====================================================
// START SERVER
// =====================================================

server.listen(PORT, () => {

    console.log("--------------------------------------");
    console.log("SMART MINING IoT SYSTEM");
    console.log("--------------------------------------");

    console.log(`Open: http://localhost:${PORT}`);

    console.log("--------------------------------------");

    console.log("APIs:");
    console.log(`Status  : http://localhost:${PORT}/api/status`);
    console.log(`Data    : http://localhost:${PORT}/api/data`);
    console.log(`History : http://localhost:${PORT}/api/history`);

    console.log("--------------------------------------");

});