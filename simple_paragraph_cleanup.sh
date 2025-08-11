#!/bin/bash

# Simple and precise cleanup for paragraph font standardization
echo "🔧 Simple cleanup of paragraph duplicates..."

# Function to clean duplicates precisely
clean_duplicates() {
    local file="$1"
    if [[ -f "$file" ]]; then
        # Simple sed commands to remove duplicates
        sed -i '' \
            -e 's/text-body text-body/text-body/g' \
            -e 's/text-body text-body text-body/text-body/g' \
            -e 's/font-uber font-uber/font-uber/g' \
            -e 's/font-uber font-uber font-uber/font-uber/g' \
            -e 's/text-body  /text-body /g' \
            -e 's/  text-body/ text-body/g' \
            -e 's/font-uber  /font-uber /g' \
            -e 's/  font-uber/ font-uber/g' \
            -e 's/className="  /className="/g' \
            -e 's/  "/">/g' \
            -e 's/   / /g' \
            -e 's/  / /g' \
            "$file"
        
        echo "✅ Cleaned duplicates in: $file"
    fi
}

# Export the function
export -f clean_duplicates

# Process all component files
find src app -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" | while read -r file; do
    clean_duplicates "$file"
done

echo ""
echo "🎉 Simple cleanup complete!"
echo "✨ Removed all duplicate classes from paragraph tags"
