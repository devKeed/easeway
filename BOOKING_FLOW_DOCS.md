# Booking Flow Documentation

## Overview

The booking system has been enhanced with a multi-step flow that includes session type selection with duration-based pricing.

## Features Implemented

### 1. Session Types & Duration

- **New Session**: 40 minutes (£60)

  - Comprehensive initial assessment and treatment planning
  - Full medical history review
  - Treatment plan development

- **Follow-up Session**: 30 minutes (£45)
  - Continued treatment and progress monitoring
  - Treatment adjustment based on progress
  - Ongoing care management

### 2. Multi-Step Booking Flow

#### Step 1: Session Type Selection

- Visual selection between New Session and Follow-up Session
- Duration and pricing information clearly displayed
- Interactive cards with icons and descriptions
- Selection confirmation with visual feedback

#### Step 2: Personal Information

- Full name (required)
- Phone number (required)
- Email address (required)
- Emergency contact (optional)

#### Step 3: Appointment Details

- Service selection from available treatments
- Preferred date (with date validation)
- Preferred time slots
- Session type confirmation display

#### Step 4: Medical Information

- Current condition/reason for visit (required)
- Medical history (optional)
- Current medications (optional)
- Previous physiotherapy experience (optional)

### 3. Interactive Components

#### Session Type Selection Component

- Located: `src/components/booking/SessionTypeSelection.tsx`
- Features:
  - Visual session type cards
  - Duration and pricing display
  - Interactive selection with animations
  - Clear confirmation feedback

#### Step Indicator

- Located: `src/components/booking/StepIndicator.tsx`
- Features:
  - Progress visualization
  - Clickable step navigation
  - Completion status indicators
  - Mobile-responsive design

#### Booking Context

- Located: `src/contexts/BookingContext.tsx`
- Features:
  - Centralized state management
  - Form data persistence across steps
  - Step navigation control
  - Data validation helpers

### 4. User Experience Features

#### Progressive Validation

- Each step validates required fields
- "Next" button disabled until step is complete
- Clear indication of required vs optional fields

#### Visual Feedback

- Animated transitions between steps
- Loading states during submission
- Success/error status messages
- Interactive hover effects

#### Navigation

- Previous/Next buttons for step navigation
- Clickable step indicators for quick navigation
- Breadcrumb-style progress indication

### 5. Technical Implementation

#### State Management

```typescript
interface BookingFormData {
  sessionType: SessionType | null;
  name: string;
  email: string;
  phone: string;
  // ... other fields
}
```

#### Session Type Definition

```typescript
interface SessionType {
  id: "new" | "followup";
  name: string;
  duration: number;
  description: string;
  price?: string;
}
```

#### Context Usage

```typescript
const { bookingData, updateBookingData, currentStep, setCurrentStep } =
  useBooking();
```

### 6. Responsive Design

- Mobile-first approach
- Adaptive layout for different screen sizes
- Touch-friendly interactive elements
- Optimized for tablet and desktop

### 7. Integration Points

#### With Authentication System

- Session data persists for authenticated users
- User information pre-populated when available
- Booking history accessible through user context

#### With Database

- Session type stored with booking
- Duration affects scheduling logic
- Pricing information for billing

### 8. Usage Instructions

#### For Users:

1. Navigate to `/booking`
2. Select session type (New or Follow-up)
3. Fill in personal information
4. Choose appointment details
5. Provide medical information
6. Submit booking request

#### For Developers:

- Session types defined in `SessionTypeSelection.tsx`
- Add new session types by extending the `sessionTypes` array
- Modify step flow by updating the step indicator
- Customize validation in the `canProceedToNextStep()` function

### 9. Future Enhancements

#### Potential Additions:

- **Online Payment Integration**: Process payments based on session type
- **Calendar Integration**: Real-time availability checking
- **Therapist Selection**: Choose preferred therapist
- **Package Deals**: Multiple session booking with discounts
- **Reminder System**: Automated appointment reminders
- **Rescheduling**: Allow users to modify existing bookings

#### Technical Improvements:

- Form field auto-save
- Browser back/forward navigation support
- Keyboard navigation accessibility
- Screen reader compatibility
- Multi-language support

### 10. Testing Scenarios

1. **Complete Flow**: Test entire booking process
2. **Step Navigation**: Verify forward/backward navigation
3. **Validation**: Test required field validation
4. **Session Selection**: Verify session type persistence
5. **Responsive**: Test on different screen sizes
6. **Error Handling**: Test network failures and recovery

This enhanced booking flow provides a professional, user-friendly experience that guides patients through the appointment booking process while capturing all necessary information for effective treatment planning.
