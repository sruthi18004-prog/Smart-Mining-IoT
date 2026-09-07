# Smart Mining IoT Safety System

A software-based IoT prototype designed to monitor mining-environment parameters and provide safety alerts based on predefined threshold values.

## Project Overview

The Smart Mining IoT Safety System simulates real-time monitoring of important mining conditions such as:

- Temperature
- Gas concentration
- Oxygen level
- Worker/Mine GPS location

The system evaluates the entered values and displays appropriate safety conditions such as **Safe, Warning, or Danger**.

> Note: This is a software-only prototype. The sensor values are simulated manually for demonstration purposes.


## Project Workflow

The Smart Mining IoT Safety System follows the workflow below:

1. **Data Input**
   - Temperature, gas level, oxygen level, latitude, and longitude values are entered through the web dashboard.
   - The project uses simulated sensor values for demonstration.

2. **Data Transmission**
   - The dashboard sends the entered data to the Node.js backend through an HTTP POST request.
   - The backend receives the data through the `/api/update` endpoint.

3. **Data Validation**
   - The server checks whether all required values are present and valid.
   - Invalid values are rejected with an appropriate error message.

4. **Safety Evaluation**
   - The backend evaluates temperature, gas, and oxygen values against predefined demonstration thresholds.
   - The system determines the current safety condition.

5. **Safety Classification**
   - **SAFE:** All monitored parameters are within the normal range.
   - **WARNING:** One or more parameters have reached warning levels.
   - **DANGER:** One or more parameters have reached critical levels.

6. **Alert Generation**
   - The system generates a safety message based on the detected condition.
   - For danger conditions, the alert identifies the critical parameter such as high temperature, high gas level, or low oxygen.

7. **Real-Time Update**
   - Socket.IO broadcasts the updated sensor data and safety status to the connected dashboard.
   - The dashboard updates the displayed values without requiring a page refresh.

8. **Monitoring**
   - The user can view temperature, gas level, oxygen level, GPS coordinates, IoT connection status, timestamp, and safety alerts through the dashboard.

### Workflow Diagram

```text
User enters simulated sensor data
              ↓
       Web Dashboard
          index.html
              ↓
     HTTP POST /api/update
              ↓
       Node.js + Express
          server.js
              ↓
        Data Validation
              ↓
       Safety Evaluation
              ↓
    ┌─────────┼─────────┐
    ↓         ↓         ↓
   SAFE    WARNING    DANGER
    └─────────┼─────────┘
              ↓
       Generate Alert
              ↓
        Socket.IO
              ↓
      Real-Time Dashboard
              ↓
   Display Status & Sensor Data

## Features

- Real-time parameter monitoring
- Temperature monitoring
- Gas-level monitoring
- Oxygen-level monitoring
- GPS/location input
- Safe, Warning, and Danger status detection
- Simple web-based interface
- Node.js backend
- Manual testing support

## Technologies Used

- HTML
- JavaScript
- Node.js
- Express.js
- Git & GitHub

## Project Structure

```text
Smart-Mining-IoT/
│
├── public/
│   ├── index.html
│   └── backend.html
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js