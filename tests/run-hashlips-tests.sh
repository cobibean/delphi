#!/bin/bash

# Start the development server in the background
echo "Starting development server..."
npm run dev &
SERVER_PID=$!

# Wait for the server to start
echo "Waiting for server to start..."
sleep 10

# Run the tests
echo "Running tests..."
node tests/hashlips-api-test.js

# Kill the server
echo "Stopping development server..."
kill $SERVER_PID

echo "Done!" 