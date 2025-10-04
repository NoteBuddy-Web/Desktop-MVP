#!/bin/bash

# NoteBuddy Development Server Stopper
echo "🛑 Stopping NoteBuddy Development Server..."

# Kill processes on port 8080
echo "🧹 Killing processes on port 8080..."
lsof -ti:8080 | xargs kill -9 2>/dev/null || true

# Kill any vite processes
echo "🧹 Killing Vite processes..."
pkill -f "vite" 2>/dev/null || true

echo "✅ Server stopped successfully!"
