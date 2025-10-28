# Implementation Details

This document describes the implementation of the marketing landing page with forms and trust elements.

## Features Implemented

### 1. CTA Form Block (Gradient #2)
- **Location**: `#cta-form` section
- **Features**:
  - Name field (2-50 characters validation)
  - Phone field with Russian mask (+7 format)
  - Hidden UTM fields (utm_source, utm_medium, utm_campaign, utm_content, utm_term)
  - Vibration hover effect on submit button (CSS animation)
  - Success state toast notification
  - Network request with mock API fallback
  - Submit button disabled until all fields are valid
  - Inline error messages

### 2. Contacts Section
- **Location**: `#contacts` section
- **Features**:
  - Phone link with tel: protocol (+7 800 500-12-34)
  - WhatsApp button (opens WhatsApp chat)
  - Telegram button (opens Telegram chat)
  - Yandex Map embedded (lazy loaded via Intersection Observer)
  - Static SVG fallback image for no-script scenarios
  - "Открыть в навигаторе" button using geo: URI scheme
  - Footer with Privacy Policy, INN, and License information

### 3. Process Steps Section ("Как мы работаем")
- **Location**: `#how-we-work` section
- **Features**:
  - 4-step timeline showing the work process
  - Animated connecting line (CSS transform, triggered on scroll)
  - Staggered fade-in animations for each step
  - Intersection Observer for scroll-triggered animations

### 4. Anonymity Section ("Гарантия анонимности")
- **Location**: `#anonymity` section
- **Features**:
  - Dark background with gradient overlay
  - Shield emblem with glow animation (CSS @keyframes)
  - Reassurance copy with bullet points
  - Full-width overlay effect

### 5. UX Marketing Features

#### Inactivity Timer
- **File**: `js/inactivity-timer.js`
- **Duration**: 15 minutes (900000ms)
- **Features**:
  - Countdown timer displayed in CTA section
  - Resets on any user interaction (mouse, keyboard, touch, scroll)
  - Shows toast with call-to-action after timeout
  - Dismissible with sessionStorage persistence
  - Respects user dismissal

#### Popup Dialog
- **File**: `js/popup.js`
- **Delay**: 30 seconds after page load
- **Features**:
  - Quick callback form (phone only)
  - Modal overlay with backdrop
  - Keyboard accessible (ESC to close)
  - Click outside to dismiss
  - Focus trap on first input
  - Dismissible with sessionStorage persistence

#### Parallax Icons
- **File**: `js/parallax.js`
- **Features**:
  - Cursor-following micro-animations
  - Multiple depth layers
  - Respects prefers-reduced-motion
  - Subtle and non-intrusive

#### Sticky Mobile Button
- **File**: `js/sticky-button.js`
- **Features**:
  - Fixed position "Позвонить" button
  - Visible only on mobile (< 768px)
  - Accessible via keyboard (focus-visible outline)
  - Does not obscure content (z-index: 2200)

### 6. Form Validation (react-hook-form-like + Zod)
- **File**: `js/forms.js`, `js/zod.js`
- **Features**:
  - Custom lightweight Zod-like validation library
  - Schema-based validation for different form types
  - Phone mask enforcement (+7 XXX XXX-XX-XX)
  - Real-time validation on input
  - Inline error messages
  - Submit button disabled until valid
  - Clear errors on input change

### 7. Analytics Integration
- **File**: `js/analytics.js`
- **Features**:
  - GTM dataLayer push placeholders
  - Event tracking for:
    - Page views
    - Form submissions (submit, success, error)
    - Phone clicks
    - Messenger clicks
    - Popup interactions
    - Inactivity toast interactions
  - Console logging for development

## Technical Details

### Accessibility Features
- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus management in modals
- prefers-reduced-motion support
- Tel links for phone numbers
- Alt text on images
- Screen reader friendly

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px, 1440px
- Flexible grid layouts
- Touch-friendly target sizes
- Sticky button only on mobile
- Adjusted toast positioning on mobile

### Performance Optimizations
- Lazy loading for Yandex Maps (Intersection Observer)
- ES6 modules for code splitting
- CSS animations with GPU acceleration (transform, opacity)
- Passive event listeners for scroll/touch
- Debounced/throttled interactions where appropriate

### Browser Compatibility
- Modern browsers (ES6+ required)
- CSS Grid and Flexbox
- ES Modules support required
- Intersection Observer API
- localStorage/sessionStorage

## Testing

### Manual Testing Checklist

1. **Forms**
   - [ ] Name field validates min/max length
   - [ ] Phone field auto-formats to +7 (XXX) XXX-XX-XX
   - [ ] Submit disabled until all fields valid
   - [ ] Inline errors display correctly
   - [ ] Success toast appears on submit
   - [ ] Form resets after successful submit

2. **Inactivity Timer**
   - [ ] Countdown displays in CTA section
   - [ ] Timer resets on user interaction
   - [ ] Toast appears after 15 minutes
   - [ ] Dismissal persists in sessionStorage
   - [ ] Timer restarts after dismissal

3. **Popup**
   - [ ] Appears 30 seconds after page load
   - [ ] Can be dismissed with ESC key
   - [ ] Can be dismissed by clicking backdrop
   - [ ] Focus moves to phone input
   - [ ] Dismissal persists in sessionStorage

4. **Animations**
   - [ ] Button vibrates on hover
   - [ ] Process line animates on scroll
   - [ ] Steps fade in sequentially
   - [ ] Glow animation on emblem
   - [ ] Parallax works with cursor movement
   - [ ] Animations disabled with prefers-reduced-motion

5. **Mobile**
   - [ ] Sticky call button appears
   - [ ] Responsive layouts work
   - [ ] Touch targets are adequate
   - [ ] Toast positioning correct

6. **Map**
   - [ ] Yandex Map loads when scrolled into view
   - [ ] Fallback image shows on error
   - [ ] No-script fallback displays

## API Endpoints (Mock)

The application expects these endpoints but falls back to mock API:

- `POST /api/submit-form` - Main CTA form submission
- `POST /api/callback-request` - Quick callback form submission

Mock API simulates 1.2s delay and returns success response.

## Files Structure

```
/
├── index.html              # Main HTML file
├── script.js               # Main entry point
├── styles.css              # Global styles
├── package.json            # Project metadata
├── js/
│   ├── analytics.js        # Analytics tracking
│   ├── forms.js            # Form validation & masking
│   ├── zod.js              # Validation library
│   ├── inactivity-timer.js # Countdown & toast
│   ├── popup.js            # 30s popup dialog
│   ├── parallax.js         # Cursor effects
│   ├── sticky-button.js    # Mobile call button
│   ├── yandex-map.js       # Map integration
│   ├── scroll-animations.js# Scroll-triggered animations
│   └── mock-api.js         # Development API mock
└── assets/
    ├── icons/              # Icon files
    └── images/
        └── map-fallback.svg # Static map image
```

## Development

```bash
# Start local server
npm run dev

# Visit
http://localhost:8000
```

## Notes

- All sessionStorage keys are namespaced to avoid conflicts
- Phone numbers are for demonstration only
- Yandex Maps API key should be added for production
- GTM container ID should be added for production analytics
