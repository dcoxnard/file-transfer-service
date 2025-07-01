#!/usr/bin/env bash

# Load NVM (assumes standard install location)
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
else
  echo "❌ NVM not found at $NVM_DIR. Is it installed?"
  exit 1
fi

# Check for .nvmrc and read version
if [ -f ".nvmrc" ]; then
  NODE_VERSION=$(cat .nvmrc)
  echo "📄 Found .nvmrc file: Node.js version $NODE_VERSION"
else
  echo "⚠️  No .nvmrc file found. Using system default Node version..."
  exit 1
fi

# Install and use the Node version
echo "🔧 Ensuring Node.js v$NODE_VERSION is installed..."
nvm install "$NODE_VERSION"

echo "🔄 Switching to Node.js v$NODE_VERSION..."
nvm use "$NODE_VERSION"

# Optional: install node_modules
if [ -f "package.json" ]; then
  echo "📦 Installing project dependencies..."
  npm install
fi

echo "✅ Node.js is set up with v$(node -v)"
