#!/bin/bash

# Clean up and properly standardize paragraph font sizes
echo "🧹 Cleaning up and standardizing paragraph font sizes..."

# Fix Info.tsx - the original example you mentioned
echo "📝 Fixing Info.tsx..."
cat > src/components/home/Info.tsx << 'EOF'
import RevealOnScroll from "../animations/Reveal";

const Info = () => {
  return (
    <div className="py-12 sm:py-14 md:py-16 lg:py-20 items-center flex flex-col gap-6 sm:gap-8 md:gap-10 justify-center text-center">
      <div className="mx-auto text-center text-button-sm sm:text-button font-uber md:text-body-lg lg:text-body-lg px-4 sm:px-6 md:px-8 lg:px-0 max-w-4xl lg:w-1/2">
        <RevealOnScroll>
          <p className="text-body leading-relaxed font-uber">
            At Easeway Medicare Physiotherapy Clinic, we believe that everyone
            deserves to live without pain and move freely. Our dedicated team
            provides personalized, evidence-based treatments that address the
            root cause of your condition.
          </p>
        </RevealOnScroll>
      </div>
      <RevealOnScroll>
        <button
          onClick={() =>
            document
              .getElementById("services")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-[#0E2127] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-medium text-button-sm sm:text-button font-uber transition-all duration-300 hover:bg-[#1a2d35] hover:scale-105"
        >
          Learn More About Our Services
        </button>
      </RevealOnScroll>
    </div>
  );
};

export default Info;
EOF

echo "✅ Fixed Info.tsx"

# Function to clean up specific files with manual fixes
fix_contact() {
    echo "📝 Fixing Contact.tsx..."
    sed -i '' 's/text-body-sm md:text-body lg:text-body-lg text-gray-600 max-w-2xl mx-auto text-body leading-relaxed font-light/text-body-sm md:text-body lg:text-body-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light font-uber/g' src/components/home/Contact.tsx
    echo "✅ Fixed Contact.tsx"
}

fix_blog() {
    echo "📝 Fixing Blog.tsx..."
    # Restore proper formatting and add font-uber to the paragraph
    sed -i '' 's/mb-8 w-full md:w-1\/2 text-center$/mb-8 w-full md:w-1\/2 text-center text-body font-uber/g' src/components/home/Blog.tsx
    echo "✅ Fixed Blog.tsx"
}

fix_reviews() {
    echo "📝 Fixing Reviews.tsx..."
    # Fix the hard-coded text-[16px] to use body size
    sed -i '' 's/text-left text-\[16px\] italic/text-left text-body italic font-uber/g' src/components/home/Reviews.tsx
    echo "✅ Fixed Reviews.tsx"
}

fix_service_card() {
    echo "📝 Fixing ServiceCard.tsx..."
    # Fix text-md to text-body
    sed -i '' 's/text-md mt-2/text-body mt-2 font-uber/g' src/components/home/ServiceCard.tsx
    # Fix small text sizes
    sed -i '' 's/text-\[11px\]/text-body-xs/g' src/components/home/ServiceCard.tsx
    sed -i '' 's/text-\[14px\]/text-body-sm/g' src/components/home/ServiceCard.tsx
    echo "✅ Fixed ServiceCard.tsx"
}

fix_book_appointment() {
    echo "📝 Fixing BookAppointment.tsx..."
    # Fix text-xl to text-body-lg
    sed -i '' 's/text-xl text-gray-600/text-body-lg text-gray-600 font-uber/g' src/components/home/BookAppointment.tsx
    echo "✅ Fixed BookAppointment.tsx"
}

# Apply the fixes
fix_contact
fix_blog
fix_reviews
fix_service_card
fix_book_appointment

echo ""
echo "✨ Paragraph font standardization complete!"
echo "📝 All paragraph tags now use consistent body font sizes:"
echo "   • text-body (16px) - Standard body text"
echo "   • text-body-lg (18px) - Large body text"
echo "   • text-body-sm (14px) - Small body text"
echo "   • text-body-xs (12px) - Extra small body text"
echo "   • font-uber - Consistent font family for body text"
echo ""
