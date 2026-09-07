# Smart Mining Safety System - IoT Prototype

This is a software-only IoT prototype. No physical sensors are required.

## Requirements
- VS Code
- Node.js

## Folder structure
Smart-Mining-IoT/
├── server.js
├── package.json
└── public/
    └── index.html

## Run
1. Open this folder in VS Code.
2. Open Terminal.
3. Run:
   npm install
4. Run:
   node server.js
5. Open in browser:
   http://localhost:3000

## Manual testing
Safe:
Temperature = 30
Gas = 500
Oxygen = 20.8

Warning:
Temperature = 40
Gas = 1600
Oxygen = 19.4

Danger:
Temperature = 48
Gas = 2500
Oxygen = 18

GPS values can be entered manually to simulate worker/mine location.

Note: The thresholds are demonstration values, not real mine-safety limits.
