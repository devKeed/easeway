#!/bin/bash

# Script to standardize all paragraph tags to use text-body (16px) font size
# This ensures all <p> tags use consistent body font sizing

echo "🔄 Standardizing paragraph font sizes to text-body (16px)..."

# Find all component files that might contain paragraph tags
find src app -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" | while read -r file; do
    if [[ -f "$file" ]]; then
        echo "Processing: $file"
        
        # Create a backup
        cp "$file" "$file.bak"
        
        # Process the file with multiple sed commands
        cat "$file" | \
            # Remove existing font size classes from paragraphs and add text-body
            sed 's/<p className="\([^"]*\)text-xs\([^"]*\)"/<p className="\1text-body\2"/g' | \
            sed 's/<p className="\([^"]*\)text-sm\([^"]*\)"/<p className="\1text-body\2"/g' | \
            sed 's/<p className="\([^"]*\)text-lg\([^"]*\)"/<p className="\1text-body\2"/g' | \
            sed 's/<p className="\([^"]*\)text-xl\([^"]*\)"/<p className="\1text-body\2"/g' | \
            sed 's/<p className="\([^"]*\)text-2xl\([^"]*\)"/<p className="\1text-body\2"/g' | \
            sed 's/<p className="\([^"]*\)text-button-sm\([^"]*\)"/<p className="\1text-body\2"/g' | \
            sed 's/<p className="\([^"]*\)text-button\([^"]*\)"/<p className="\1text-body\2"/g' | \
            sed 's/<p className="\([^"]*\)text-body-sm\([^"]*\)"/<p className="\1text-body\2"/g' | \
            sed 's/<p className="\([^"]*\)text-body-lg\([^"]*\)"/<p className="\1text-body\2"/g' | \
            sed 's/<p className="\([^"]*\)text-body-xs\([^"]*\)"/<p className="\1text-body\2"/g' | \
            \
            # Add text-body to paragraphs that don't have any text size class but preserve other classes
            sed 's/<p className="\([^"]*\)\([^"]*\)"/<p className="\1 text-body \2"/g' | \
            \
            # Clean up any double spaces or text-body duplicates
            sed 's/text-body text-body/text-body/g' | \
            sed 's/  text-body/ text-body/g' | \
            sed 's/text-body  /text-body /g' | \
            sed 's/className=" text-body/className="text-body/g' | \
            sed 's/text-body "/text-body"/g' | \
            \
            # Ensure font-uber is present for paragraph text (body text should use uber font)
            sed 's/<p className="\([^"]*text-body[^"]*\)"/\<p className="\1 font-uber"/g' | \
            sed 's/font-uber font-uber/font-uber/g' | \
            sed 's/  font-uber/ font-uber/g' | \
            sed 's/font-uber  /font-uber /g' | \
            \
            # Final cleanup
            sed 's/className="  /className="/g' | \
            sed 's/  "/">/g' \
        > "$file.tmp"
        
        # Move the processed file back
        mv "$file.tmp" "$file"
        
        # Remove backup if processing was successful
        if [[ $? -eq 0 ]]; then
            rm -f "$file.bak"
            echo "✅ Updated: $file"
        else
            echo "❌ Error processing: $file - restoring backup"
            mv "$file.bak" "$file"
        fi
    fi
done

echo ""
echo "🎉 Paragraph font standardization complete!"
echo "📝 All paragraph tags now use text-body (16px) font size with font-uber"
echo ""
echo "Changes made:"
echo "- Replaced all various text sizes (text-xs, text-sm, text-lg, etc.) with text-body"
echo "- Added text-body to paragraphs that didn't have size classes"
echo "- Ensured font-uber is applied to all paragraph text"
echo "- Cleaned up duplicate classes and spacing"
