#!/bin/bash

# Script to standardize all paragraph font sizes to use body typography system
# This will update all <p> tags to use consistent body font sizes

echo "🔧 Standardizing paragraph font sizes across the application..."

# Function to update files
update_file() {
    local file="$1"
    local description="$2"
    
    if [ -f "$file" ]; then
        echo "📝 Updating $description..."
        # Use a temporary file for safer editing
        local temp_file="$file.tmp"
        cp "$file" "$temp_file"
        
        # Apply the sed replacements to the temp file
        while IFS= read -r line; do
            echo "$line"
        done < "$file" | \
        # Fix inconsistent font sizes in paragraphs
        sed 's/text-md/text-body/g' | \
        sed 's/text-lg\([^-]\|$\)/text-body-lg\1/g' | \
        sed 's/text-xl/text-body-lg/g' | \
        sed 's/text-sm\([^-]\|$\)/text-body-sm\1/g' | \
        sed 's/text-xs\([^-]\|$\)/text-body-xs\1/g' | \
        sed 's/text-\[16px\]/text-body/g' | \
        sed 's/text-\[14px\]/text-body-sm/g' | \
        sed 's/text-\[11px\]/text-body-xs/g' | \
        # Add body font size to paragraphs without text sizing
        sed 's/<p className="\([^"]*\)\(leading-relaxed\)/<p className="\1text-body \2/g' | \
        sed 's/<p className="leading-relaxed/<p className="text-body leading-relaxed/g' | \
        # Fix double text- issues that might occur
        sed 's/text-text-/text-/g' | \
        # Ensure font-uber is used for body text
        sed 's/\(<p className="[^"]*text-body[^"]*\)\(">[^<]*<\/p>\)/\1 font-uber\2/g' | \
        # Clean up double font-uber
        sed 's/font-uber font-uber/font-uber/g' | \
        # Clean up double spaces in class names
        sed 's/  */ /g' | \
        sed 's/ "/"/' > "$temp_file"
        
        # Only replace the original if the temp file is different
        if ! cmp -s "$file" "$temp_file"; then
            mv "$temp_file" "$file"
            echo "✅ Updated $description"
        else
            rm "$temp_file"
            echo "⚪ No changes needed for $description"
        fi
    else
        echo "❌ File not found: $file"
    fi
}

# Update all component files
echo "🎯 Updating component files..."

# Home components
update_file "src/components/home/Info.tsx" "Info component"
update_file "src/components/home/AboutUs.tsx" "AboutUs component"
update_file "src/components/home/Blog.tsx" "Blog component"
update_file "src/components/home/BlogCard.tsx" "BlogCard component"
update_file "src/components/home/BookAppointment.tsx" "BookAppointment component"
update_file "src/components/home/Contact.tsx" "Contact component"
update_file "src/components/home/HeroSection.tsx" "HeroSection component"
update_file "src/components/home/Reviews.tsx" "Reviews component"
update_file "src/components/home/ServiceCard.tsx" "ServiceCard component"
update_file "src/components/home/Services.tsx" "Services component"
update_file "src/components/home/Testimonials.tsx" "Testimonials component"
update_file "src/components/home/WhyChooseUs.tsx" "WhyChooseUs component"

# Shared components
update_file "src/components/shared/Header.tsx" "Header component"
update_file "src/components/shared/Footer.tsx" "Footer component"

# Admin components
update_file "src/components/admin/BookingManagement.tsx" "BookingManagement component"
update_file "src/components/admin/CalendarSchedule.tsx" "CalendarSchedule component"

# Booking components
update_file "src/components/booking/SessionTypeSelection.tsx" "SessionTypeSelection component"
update_file "src/components/booking/StepIndicator.tsx" "StepIndicator component"
update_file "src/components/booking/TimeSlotSelector.tsx" "TimeSlotSelector component"

# UI components
update_file "src/components/ui/ErrorState.tsx" "ErrorState component"
update_file "src/components/ui/Toast.tsx" "Toast component"

# Reusable components
update_file "src/components/reusables/NewsLetterForm.tsx" "NewsLetterForm component"

# App pages
update_file "app/admin/page.tsx" "Admin page"
update_file "app/admin/dashboard/page.tsx" "Admin dashboard page"
update_file "app/auth/error/page.tsx" "Auth error page"
update_file "app/auth/signin/page.tsx" "Auth signin page"
update_file "app/booking/page.tsx" "Booking page"

echo ""
echo "✨ Font standardization complete!"
echo "📋 Summary of changes:"
echo "   • Converted text-md → text-body"
echo "   • Converted text-lg → text-body-lg"
echo "   • Converted text-xl → text-body-lg"
echo "   • Converted text-sm → text-body-sm"
echo "   • Converted text-xs → text-body-xs"
echo "   • Added text-body to paragraphs without font sizing"
echo "   • Ensured font-uber is used for body text"
echo ""
echo "🔍 Next steps:"
echo "   1. Review the changes"
echo "   2. Test the application"
echo "   3. Run 'npm run build' to ensure no TypeScript errors"
echo ""
