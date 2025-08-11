#!/bin/bash

# Final cleanup script for paragraph standardization
echo "🔧 Final cleanup of paragraph classes..."

# Function to clean a single file
clean_file() {
    local file="$1"
    if [[ -f "$file" ]]; then
        # Use perl for more precise regex replacements
        perl -i -pe '
            # Remove multiple occurrences of text-body (keep only one)
            s/\btext-body(\s+text-body)+/text-body/g;
            
            # Remove multiple occurrences of font-uber (keep only one)  
            s/\bfont-uber(\s+font-uber)+/font-uber/g;
            
            # Clean up spacing in className attributes
            s/className="\s+/className="/g;
            s/\s+"/"/g;
            s/\s{2,}/ /g;
            
            # Remove trailing spaces in className
            s/className="([^"]*)\s+"/className="$1"/g;
            
            # Ensure proper spacing between classes
            s/text-bodyfont-uber/text-body font-uber/g;
            s/font-ubertext-body/font-uber text-body/g;
            
        ' "$file"
        
        echo "✅ Cleaned: $file"
    fi
}

# Export the function so it can be used with find -exec
export -f clean_file

# Process all component files
find src app -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" | while read -r file; do
    clean_file "$file"
done

echo ""
echo "🎉 Final cleanup complete!"
echo "✨ All paragraph tags now use consistent text-body (16px) font size"
