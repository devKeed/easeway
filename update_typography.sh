#!/bin/bash

# Typography consistency update script
echo "Starting typography consistency updates..."

# Define the directory
COMPONENTS_DIR="/Users/mac/Documents/github/fortune/val/easeway_medicare_physiotherapy_clinic/src/components"

# Function to update font classes
update_typography() {
    local file="$1"
    echo "Updating $file..."
    
    # Update heading classes
    sed -i '' 's/text-xl font-semibold/text-h4-mobile md:text-h3-desktop font-axiforma/g' "$file"
    sed -i '' 's/text-2xl font-bold/text-h3-mobile md:text-h2-desktop font-axiforma/g' "$file"
    sed -i '' 's/text-lg font-semibold/text-h5-mobile md:text-h4-desktop font-axiforma/g' "$file"
    sed -i '' 's/text-lg font-medium/text-h5-mobile md:text-h4-desktop font-axiforma/g' "$file"
    sed -i '' 's/text-base font-medium/text-body-sm font-axiforma/g' "$file"
    sed -i '' 's/text-base font-semibold/text-body-sm font-axiforma/g' "$file"
    sed -i '' 's/text-base font-medium/text-body-xs font-axiforma/g' "$file"
    
    # Update body text classes
    sed -i '' 's/text-base text-gray-600/text-body-sm text-gray-600 font-uber/g' "$file"
    sed -i '' 's/text-base text-gray-600/text-body-xs text-gray-600 font-uber/g' "$file"
    sed -i '' 's/text-base text-gray-600/text-body text-gray-600 font-uber/g' "$file"
    
    # Update button text
    sed -i '' 's/text-base sm:text-base/text-button-sm sm:text-button font-uber/g' "$file"
    sed -i '' 's/text-base transition-colors/text-button-sm font-uber transition-colors/g' "$file"
    
    echo "Updated $file"
}

# Find and update all relevant files
find "$COMPONENTS_DIR" -name "*.tsx" -type f | while read -r file; do
    update_typography "$file"
done

echo "Typography updates completed!"
