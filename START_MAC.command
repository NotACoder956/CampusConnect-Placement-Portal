#!/bin/bash
cd "$(dirname "$0")"
echo "CampusConnect setup"
if ! command -v node >/dev/null 2>&1; then echo "Node.js 20+ is required."; exit 1; fi
npm install
npm run install:all
npm run seed
npm run dev
