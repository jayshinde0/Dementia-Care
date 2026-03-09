#!/bin/bash

echo "=========================================="
echo "Dementia Care System - Setup Script"
echo "=========================================="
echo ""

# Check prerequisites
echo "Checking prerequisites..."

# Check Python
if ! command -v python &> /dev/null; then
    echo "❌ Python not found. Please install Python 3.8+"
    exit 1
fi
echo "✓ Python found: $(python --version)"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 16+"
    exit 1
fi
echo "✓ Node.js found: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm"
    exit 1
fi
echo "✓ npm found: $(npm --version)"

echo ""
echo "=========================================="
echo "Setting up Backend..."
echo "=========================================="
cd backend

# Create virtual environment
echo "Creating virtual environment..."
python -m venv venv

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Install dependencies
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Create .env file
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "✓ .env file created. Please update with your configuration."
fi

cd ..

echo ""
echo "=========================================="
echo "Setting up Dashboard..."
echo "=========================================="
cd dashboard

echo "Installing dashboard dependencies..."
npm install --legacy-peer-deps

cd ..

echo ""
echo "=========================================="
echo "Setting up Mobile App..."
echo "=========================================="
cd mobile

echo "Installing mobile app dependencies..."
npm install

cd ..

echo ""
echo "=========================================="
echo "✓ Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Start MongoDB (if using local): mongod"
echo "2. Update backend/.env with your configuration"
echo "3. Start backend: cd backend && python main.py"
echo "4. Start dashboard: cd dashboard && npm start"
echo "5. Start mobile: cd mobile && npm start"
echo ""
echo "See QUICKSTART.md for detailed instructions."
