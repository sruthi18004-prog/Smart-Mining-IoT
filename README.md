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