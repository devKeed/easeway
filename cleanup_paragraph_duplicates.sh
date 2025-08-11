#!/bin/bash

# Script to clean up duplicate classes created during paragraph standardization
echo "🔧 Cleaning up duplicate classes in paragraph tags..."

# Find all component files that might contain paragraph tags
find src app -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" | while read -r file; do
    if [[ -f "$file" ]]; then
        echo "Cleaning: $file"
        
        # Create a backup
        cp "$file" "$file.bak"
        
        # Clean up duplicates
        cat "$file" | \
            # Remove duplicate text-body classes
            sed 's/text-body text-body/text-body/g' | \
            sed 's/text-body text-body text-body/text-body/g' | \
            sed 's/text-body[[:space:]]\+text-body/text-body/g' | \
            \
            # Remove duplicate font-uber classes  
            sed 's/font-uber font-uber/font-uber/g' | \
            sed 's/font-uber font-uber font-uber/font-uber/g' | \
            sed 's/font-uber[[:space:]]\+font-uber/font-uber/g' | \
            \
            # Clean up spacing issues
            sed 's/className="[[:space:]]\+/className="/g' | \
            sed 's/[[:space:]]\+"/"/g' | \
            sed 's/[[:space:]]\+[[:space:]]\+/ /g' | \
            \
            # Remove any trailing spaces in className
            sed 's/className="\([^"]*\)[[:space:]]\+"/className="\1"/g' | \
            \
            # Ensure proper spacing between classes
            sed 's/text-bodyfont-uber/text-body font-uber/g' | \
            sed 's/font-ubertext-body/font-uber text-body/g' \
        > "$file.tmp"
        
        # Move the processed file back
        mv "$file.tmp" "$file"
        
        # Remove backup if processing was successful
        if [[ $? -eq 0 ]]; then
            rm -f "$file.bak"
            echo "✅ Cleaned: $file"
        else
            echo "❌ Error cleaning: $file - restoring backup"
            mv "$file.bak" "$file"
        fi
    fi
done

echo ""
echo "🎉 Cleanup complete!"
echo "✨ Removed all duplicate classes and fixed spacing"
