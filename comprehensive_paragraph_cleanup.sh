#!/bin/bash

# Comprehensive cleanup for paragraph font standardization
echo "🔧 Comprehensive cleanup of paragraph classes..."

# Function to clean a single file comprehensively
clean_file_comprehensive() {
    local file="$1"
    if [[ -f "$file" ]]; then
        # Use a more comprehensive approach
        perl -i -pe '
            # For paragraph tags, standardize to single text-body and font-uber
            if (/<p className="[^"]*"/) {
                # Remove all existing text size classes
                s/\btext-(?:xs|sm|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b//g;
                s/\btext-(?:button|button-sm|button-lg)\b//g;
                s/\btext-(?:body-xs|body-sm|body-lg)\b//g;
                s/\btext-h[1-6](?:-mobile|-desktop)?\b//g;
                
                # Remove multiple text-body occurrences
                s/\btext-body(?:\s+text-body)+/text-body/g;
                
                # Remove multiple font-uber occurrences
                s/\bfont-uber(?:\s+font-uber)+/font-uber/g;
                
                # Ensure we have text-body if we dont already
                unless (/\btext-body\b/) {
                    s/className="([^"]*)"/className="$1 text-body"/;
                }
                
                # Ensure we have font-uber if we dont already  
                unless (/\bfont-uber\b/) {
                    s/className="([^"]*)"/className="$1 font-uber"/;
                }
                
                # Clean up multiple spaces and positioning
                s/className="\s+/className="/g;
                s/\s+"/"/g;
                s/\s{2,}/ /g;
                s/className="([^"]*)\s+"/className="$1"/g;
                
                # Remove any duplicate responsive text-body classes
                s/\btext-body\s+(?:sm:|md:|lg:|xl:)?text-body/text-body/g;
                
                # Simplify to just text-body (no responsive variants for paragraphs)
                s/\b(?:sm:|md:|lg:|xl:)text-body\b//g;
            }
        ' "$file"
        
        echo "✅ Comprehensively cleaned: $file"
    fi
}

# Export the function
export -f clean_file_comprehensive

# Process all component files
find src app -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" | while read -r file; do
    clean_file_comprehensive "$file"
done

echo ""
echo "🎉 Comprehensive cleanup complete!"
echo "✨ All paragraph tags now use single text-body (16px) and font-uber classes"
