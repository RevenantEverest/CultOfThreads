#!/bin/bash

cd "$(dirname "$0")/.."

echo $(pwd)

# Define the directories to target
TARGETS=("node_modules" "dist" ".turbo" ".next")

echo "Cleaning up workspace..."

for target in "${TARGETS[@]}"; do
    # Find and delete all instances of the target directories
    # 'type d' ensures we only target directories
    # '-prune' prevents the script from looking inside a folder it's currently deleting
    find . -name "$target" -type d -prune -exec rm -rf {} +
    echo "Removed all $target directories."
done

echo "Cleanup complete."