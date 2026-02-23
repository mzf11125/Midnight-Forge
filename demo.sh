#!/bin/bash
# Demo script for Midnight Forge

set -e

FORGE="./target/release/midnight-forge"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║         Midnight Forge - Phase 1 MVP Demo                 ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo

# Check if binary exists
if [ ! -f "$FORGE" ]; then
    echo "Building Midnight Forge..."
    cargo build --release
    echo
fi

echo "1️⃣  Version Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
$FORGE --version
echo

echo "2️⃣  Help System"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
$FORGE help init
echo

echo "3️⃣  Create New Project"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd /tmp
rm -rf demo-project
$FORGE init demo-project
echo

echo "4️⃣  Project Structure"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
tree demo-project || find demo-project -type f
echo

echo "5️⃣  Configuration File"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat demo-project/forge.toml
echo

echo "6️⃣  Example Contract"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat demo-project/src/Counter.compact
echo

echo "7️⃣  Security Scan"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd demo-project
../$FORGE scan src/ || true
echo

echo "8️⃣  Scan Example Project"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd /home/zidan/Documents/Github/Midnight-Forge/examples/simple-counter
$FORGE scan Counter.compact || true
echo

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    Demo Complete! ✅                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo
echo "Features Demonstrated:"
echo "  ✅ CLI with version and help"
echo "  ✅ Project initialization"
echo "  ✅ Template generation"
echo "  ✅ Security scanning"
echo "  ✅ Colored output"
echo "  ✅ Multiple severity levels"
echo
echo "Try it yourself:"
echo "  cd /tmp/demo-project"
echo "  $FORGE scan src/"
echo "  $FORGE test  # (requires compact compiler)"
