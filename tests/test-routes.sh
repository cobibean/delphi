#!/bin/bash
# Delphi Route Testing Script

echo "=== Delphi Routing Test ==="
echo "Testing routes to ensure proper redirects and status codes..."
echo ""

# Determine the port number by checking what's in use
PORT=3000
for p in {3000..3010}; do
  if nc -z localhost $p 2>/dev/null; then
    PORT=$p
    break
  fi
done

echo "Found Next.js server running on port $PORT"
echo ""

# Function to test a route and show the result
test_route() {
  local route=$1
  local expected_status=${2:-200}
  local description=${3:-""}
  local redirect_expected=${4:-false}
  
  echo -n "Testing $route... "
  
  # Use curl to test the route, following redirects (-L flag follows redirects)
  response=$(curl -s -L -o /dev/null -w "%{http_code},%{redirect_url}" "http://localhost:$PORT$route")
  status=$(echo $response | cut -d',' -f1)
  redirect=$(echo $response | cut -d',' -f2)
  
  # Get redirect status without following redirects
  redirect_status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT$route")
  
  # Check if status matches expected after following redirects
  if [[ "$status" == "$expected_status" ]]; then
    if [[ "$redirect_expected" == "true" && "$redirect_status" =~ ^3[0-9][0-9]$ ]]; then
      # Redirect was expected and occurred
      echo -e "\033[0;32mOK\033[0m (Redirected with $redirect_status, final $status)"
      echo "  → Redirected to: $redirect"
    elif [[ "$redirect_expected" == "true" && ! "$redirect_status" =~ ^3[0-9][0-9]$ ]]; then
      # Redirect was expected but didn't occur
      echo -e "\033[0;33mWARNING\033[0m ($status, but no redirect occurred)"
    else
      # No redirect expected, status matches
      echo -e "\033[0;32mOK\033[0m ($status)"
    fi
    
    if [[ ! -z "$description" ]]; then
      echo "  → $description"
    fi
  else
    echo -e "\033[0;31mFAILED\033[0m (Got $status, expected $expected_status)"
    if [[ ! -z "$redirect" ]]; then
      echo "  → Redirected to: $redirect"
    fi
    if [[ ! -z "$description" ]]; then
      echo "  → $description"
    fi
  fi
}

echo "--- Testing Main Routes ---"
# Test main pages
test_route "/" 200 "Home page (should redirect to marketplace)" true
test_route "/features/marketplace" 200 "Marketplace page"
test_route "/features/profile" 200 "Profile page"
test_route "/features/profile/my-listings" 200 "My listings page"
test_route "/features/profile/my-nfts" 200 "My NFTs page"
test_route "/features/create" 200 "Create page"
test_route "/features/create/auction" 200 "Create auction page"
test_route "/features/create/direct-listing" 200 "Create direct listing page"
test_route "/features/stats" 200 "Stats page"
test_route "/features/debug" 200 "Debug page"

echo ""
echo "--- Testing Redirect Routes ---"
# Test old routes that should redirect to new feature-based routes
test_route "/nft/1" 200 "NFT detail page (old path)" true
test_route "/profile" 200 "Profile page (old path)" true
test_route "/my-listings" 200 "My listings page (old path)" true
test_route "/my-nfts" 200 "My NFTs page (old path)" true
test_route "/create" 200 "Create page (old path)" true
test_route "/create/auction" 200 "Create auction page (old path)" true
test_route "/create/direct-listing" 200 "Create direct listing page (old path)" true
test_route "/stats" 200 "Stats page (old path)" true
test_route "/debug" 200 "Debug page (old path)" true

echo ""
echo "--- Testing 404 Handling ---"
# Test non-existent routes
test_route "/non-existent-route" 404 "Non-existent route (should return 404)"
test_route "/features/non-existent" 404 "Non-existent feature (should return 404)"

echo ""
echo "=== Routing Test Complete ===" 