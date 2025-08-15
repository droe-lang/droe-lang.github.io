---
layout: guide.njk
title: UI Components
description: Build user interfaces with Droelang's cross-platform UI component system for web, Android, and iOS.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: UI Components
prev:
  title: Mobile Development
  url: /guide/mobile/
next:
  title: Framework Support
  url: /guide/frameworks/
---

Droelang provides a comprehensive UI component system that generates native interfaces for web (HTML/JavaScript), Android (Kotlin), and iOS (Swift) from a single, consistent syntax.

## Layout System

### Basic Layouts

Layouts define the structure and organization of UI components:

```droe
layout MainScreen
    column class "main-container"
        title "My Application" class "app-title"

        column class "content-section"
            text "Welcome to the app!" class "welcome-text"
            button "Get Started" action startApp class "primary-btn"
        end column
    end column
end layout
```

### Layout Types

```droe
// Vertical column layout
layout VerticalLayout
    column class "container"
        text "Item 1"
        text "Item 2"
        text "Item 3"
    end column
end layout

// Horizontal row layout (future feature)
layout HorizontalLayout
    row class "container"
        button "Left" action leftAction
        button "Center" action centerAction
        button "Right" action rightAction
    end row
end layout
```

### Layout Attributes

- `class` - CSS class for web, styling hints for mobile
- Automatic responsive design for different screen sizes
- Platform-specific layout generation

## Text Components

### Static Text

```droe
// Basic text display
text "Hello World" class "greeting"

// Title text
title "Page Title" class "page-header"

// Paragraph text
text "This is a longer paragraph of text that will wrap appropriately on different screen sizes." class "paragraph"
```

### Dynamic Text with Data Binding

```droe
// Bind to variables
text bind UserProfile.displayName class "user-name"

// Bind with fallback
text bind UserProfile.displayName or "Guest User" class "user-name"

// Conditional text
when UserProfile.isLoggedIn then
    text "Welcome back, [UserProfile.name]!" class "welcome-message"
otherwise
    text "Please log in to continue" class "login-prompt"
end when
```

## Input Components

### Text Input

```droe
// Basic text input
input id username_field text placeholder "Enter username" bind UserProfile.userName validate required class "form-input"

// Email input with validation
input id email_field email placeholder "your@email.com" bind UserProfile.email validate email class "form-input"

// Password input
input id password_field password placeholder "Password" bind LoginForm.password validate required class "form-input"

// Phone number input
input id phone_field phone placeholder "Phone Number" bind UserProfile.phone validate phone class "form-input"
```

### Input Validation

```droe
// Required field validation
input id name_field text placeholder "Name" bind UserProfile.name validate required class "form-input"

// Email format validation
input id email_field email placeholder "Email" bind UserProfile.email validate email class "form-input"

// Custom pattern validation
input id code_field text placeholder "Product Code" bind ProductForm.code validate pattern "^[A-Z]{3}-[0-9]{4}$" class "form-input"

// Length validation
input id description_field text placeholder "Description" bind ProductForm.description validate minlength 10 maxlength 500 class "form-input"
```

### Input Types

| Type       | Purpose            | Platform Support  |
| ---------- | ------------------ | ----------------- |
| `text`     | General text input | Web, Android, iOS |
| `email`    | Email address      | Web, Android, iOS |
| `password` | Password field     | Web, Android, iOS |
| `phone`    | Phone number       | Web, Android, iOS |
| `number`   | Numeric input      | Web, Android, iOS |
| `url`      | URL input          | Web, Android, iOS |
| `search`   | Search field       | Web, Android, iOS |

## Button Components

### Basic Buttons

```droe
// Action button
button "Submit" action submitForm class "submit-btn primary"

// Button with conditional enabling
button "Save" action saveData enabled when form is valid class "save-btn"

// Button with confirmation
button "Delete" action deleteItem confirm "Are you sure?" class "delete-btn danger"
```

### Mobile-Specific Buttons

```droe
// Camera button (mobile only)
button "Take Photo" type camera action capturePhoto permissions "camera, storage" class "camera-btn"

// Location button (mobile only)
button "Get Location" type location action getLocation permissions "location" accuracy high class "location-btn"

// Share button (mobile only)
button "Share" type share action shareContent class "share-btn"
```

### Button States

```droe
// Conditional button states
button "Process" action processData
    enabled when data is valid
    loading when processing is true
    class "process-btn"

// Button with multiple states
button "Download" action downloadFile
    enabled when not downloading
    loading when downloading is true
    text when downloading then "Downloading..." otherwise "Download"
    class "download-btn"
```

## Selection Components

### Toggle Switches

```droe
// Basic toggle
toggle id notifications_toggle "Enable Notifications" bind UserSettings.notificationsEnabled default off class "toggle-field"

// Toggle with conditional behavior
toggle id dark_mode_toggle "Dark Mode" bind UserSettings.darkMode default off class "toggle-field"
    on change action updateTheme

// Toggle with description
toggle id auto_save_toggle "Auto Save" bind AppSettings.autoSave default on class "toggle-field"
    description "Automatically save changes every 30 seconds"
```

### Dropdown Selection

```droe
dropdown id quality_dropdown bind UserSettings.photoQuality default "Medium Quality" class "dropdown-field"
    option "High Quality"
    option "Medium Quality"
    option "Low Quality"
end dropdown

// Dropdown with values
dropdown id language_dropdown bind UserSettings.language default "en" class "dropdown-field"
    option value "en" text "English"
    option value "es" text "Spanish"
    option value "fr" text "French"
end dropdown

// Conditional dropdown options
dropdown id country_dropdown bind UserProfile.country class "dropdown-field"
    when region equals "north_america" then
        option "United States"
        option "Canada"
        option "Mexico"
    otherwise when region equals "europe" then
        option "United Kingdom"
        option "Germany"
        option "France"
    end when
end dropdown
```

### Radio Button Groups

```droe
radio id theme_radio group "appTheme" bind UserSettings.appTheme default "System Default" class "radio-group"
    option "Light Theme"
    option "Dark Theme"
    option "System Default"
end radio

// Radio with descriptions
radio id payment_radio group "paymentMethod" bind OrderForm.paymentMethod class "radio-group"
    option value "card" text "Credit Card" description "Pay with credit or debit card"
    option value "paypal" text "PayPal" description "Pay with your PayPal account"
    option value "apple" text "Apple Pay" description "Pay with Touch ID or Face ID"
end radio
```

## Image Components

### Static Images

```droe
// Basic image
image source "logo.png" alt "Company Logo" class "logo-image"

// Image with sizing
image source "banner.jpg" alt "Welcome Banner" class "banner-image" width 800 height 200

// Placeholder image
image source "placeholder.png" alt "No Image Available" class "placeholder-image"
```

### Dynamic Images

```droe
// Data-bound image
image source bind UserProfile.profilePicture alt "Profile Picture" class "profile-pic"

// Conditional image
image source bind ProductInfo.imageUrl or "default-product.png" alt "Product Image" class "product-image"

// Image gallery
for each photo in PhotoGallery.photos
    image source bind photo.url alt bind photo.caption class "gallery-image"
        on click action viewFullImage with photo
end for
```

## Form Components

### Complete Forms

```droe
form RegistrationForm
    column class "form-container"
        title "Create Account" class "form-title"

        column class "form-fields"
            input id name_field text placeholder "Full Name" bind UserProfile.fullName validate required class "form-input"
            input id email_field email placeholder "Email Address" bind UserProfile.email validate email class "form-input"
            input id password_field password placeholder "Password" bind UserProfile.password validate minlength 8 class "form-input"

            toggle id terms_toggle "I accept the terms and conditions" bind UserProfile.acceptedTerms default off class "toggle-field"

            dropdown id country_dropdown bind UserProfile.country default "United States" class "dropdown-field"
                option "United States"
                option "Canada"
                option "United Kingdom"
                option "Australia"
            end dropdown

            button "Create Account" action createAccount enabled when form is valid class "submit-btn primary"
        end column
    end column
end form
```

### Form Validation

```droe
form ContactForm
    column class "contact-form"
        input id name_field text placeholder "Your Name" bind ContactInfo.name validate required class "form-input"
            on invalid show message "Name is required"

        input id email_field email placeholder "Your Email" bind ContactInfo.email validate required email class "form-input"
            on invalid show message "Please enter a valid email address"

        input id subject_field text placeholder "Subject" bind ContactInfo.subject validate required maxlength 100 class "form-input"
            on invalid show message "Subject is required (max 100 characters)"

        input id message_field textarea placeholder "Your Message" bind ContactInfo.message validate required minlength 20 maxlength 1000 class "form-textarea"
            on invalid show message "Message must be between 20 and 1000 characters"

        button "Send Message" action sendMessage enabled when form is valid class "submit-btn"
    end column
end form
```

## Data Binding

### Variable Binding

```droe
// Bind to simple variables
text bind userName
input text bind userEmail

// Bind to object properties
text bind UserProfile.displayName
input text bind UserProfile.email
image source bind UserProfile.avatar
```

### Two-Way Data Binding

```droe
// Input automatically updates bound variable
input id name_field text bind UserProfile.name

// Changes to UserProfile.name automatically update UI
action updateName with newName which is text
    set UserProfile.name to newName
    // UI automatically reflects the change
end action
```

### Conditional Binding

```droe
// Show different content based on state
when UserProfile.isLoggedIn then
    text "Welcome back, [UserProfile.name]!"
    button "Logout" action logoutUser
otherwise
    text "Please log in to continue"
    button "Login" action showLogin
end when

// Conditional enabling
button "Submit" action submitForm
    enabled when formIsValid and not isSubmitting
```

## Event Handling

### Click Events

```droe
// Button click
button "Click Me" action handleClick class "btn"

// Image click
image source "photo.jpg" alt "Photo" class "clickable-image"
    on click action viewLargeImage

// Text click (for links)
text "Click here for more info" class "link-text"
    on click action showMoreInfo
```

### Input Events

```droe
// Input change events
input id search_field text placeholder "Search..." bind searchTerm class "search-input"
    on change action performSearch
    on focus action highlightSearchArea
    on blur action hideSearchSuggestions

// Toggle change events
toggle id notifications_toggle "Notifications" bind notificationsEnabled class "toggle"
    on change action updateNotificationSettings
```

### Form Events

```droe
form UserForm
    // Form submission
    on submit action submitForm

    // Form validation
    on validate action validateForm

    // Form change
    on change action autoSave

    // Input fields...
end form
```

## Styling and Theming

### CSS Classes

```droe
// Component styling
text "Styled Text" class "large-text bold red-color"
button "Styled Button" action doSomething class "primary-btn rounded shadow"

// Responsive classes
column class "container mobile-stack tablet-row desktop-grid"
    text "Content adapts to screen size"
end column
```

### Platform-Specific Styling

```droe
// Different styles per platform
button "Platform Button" action handleClick
    class when platform equals "web" then "web-btn"
    class when platform equals "android" then "material-btn"
    class when platform equals "ios" then "ios-btn"
```

### Theme Support

```droe
// Theme-aware components
text "Themed Text" class "text-primary"
button "Themed Button" action doSomething class "btn-primary"

// Dark/light theme switching
when UserSettings.darkMode then
    layout class "dark-theme"
otherwise
    layout class "light-theme"
end when
```

## Platform Output Examples

### Web (HTML/JavaScript)

```html
<!-- Generated HTML -->
<div class="main-container">
  <h1 class="app-title">My Application</h1>
  <div class="content-section">
    <p class="welcome-text">Welcome to the app!</p>
    <button class="primary-btn" onclick="startApp()">Get Started</button>
  </div>
</div>

<form class="form-container">
  <input
    type="email"
    placeholder="Email"
    class="form-input"
    onchange="updateUserEmail(this.value)"
    required
  />
  <input
    type="checkbox"
    class="toggle-field"
    onchange="toggleNotifications(this.checked)"
  />
  <button type="submit" class="submit-btn">Submit</button>
</form>
```

### Android (Kotlin/XML)

```kotlin
// Generated MainActivity.kt
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            MyAppTheme {
                MainScreen()
            }
        }
    }
}

@Composable
fun MainScreen() {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "My Application",
            style = MaterialTheme.typography.h4
        )

        Text(
            text = "Welcome to the app!",
            style = MaterialTheme.typography.body1
        )

        Button(
            onClick = { startApp() }
        ) {
            Text("Get Started")
        }
    }
}
```

### iOS (SwiftUI)

```swift
// Generated ContentView.swift
struct ContentView: View {
    @State private var email = ""
    @State private var notificationsEnabled = false

    var body: some View {
        VStack(spacing: 20) {
            Text("My Application")
                .font(.largeTitle)

            Text("Welcome to the app!")
                .font(.body)

            Button("Get Started") {
                startApp()
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }

    private func startApp() {
        // Handle button action
    }
}

struct RegistrationForm: View {
    @State private var email = ""
    @State private var notificationsEnabled = false

    var body: some View {
        Form {
            TextField("Email", text: $email)
                .keyboardType(.emailAddress)

            Toggle("Enable Notifications", isOn: $notificationsEnabled)

            Button("Submit") {
                submitForm()
            }
            .disabled(!isFormValid)
        }
    }
}
```

## Advanced UI Patterns

### Lists and Collections

```droe
// Dynamic list
layout UserList
    column class "list-container"
        for each user in UserList.users
            column class "user-item"
                text bind user.name class "user-name"
                text bind user.email class "user-email"
                button "Edit" action editUser with user class "edit-btn"
            end column
        end for
    end column
end layout

// Empty state handling
when UserList.users is empty then
    column class "empty-state"
        text "No users found" class "empty-message"
        button "Add User" action showAddUserForm class "add-btn"
    end column
otherwise
    // Show user list
end when
```

### Modal Dialogs

```droe
// Modal dialog
when showConfirmDialog is true then
    dialog class "confirm-dialog"
        title "Confirm Action" class "dialog-title"
        text "Are you sure you want to delete this item?" class "dialog-message"

        row class "dialog-buttons"
            button "Cancel" action hideConfirmDialog class "cancel-btn"
            button "Delete" action confirmDelete class "delete-btn danger"
        end row
    end dialog
end when
```

### Loading States

```droe
// Loading indicator
when isLoading is true then
    column class "loading-container"
        spinner class "loading-spinner"
        text "Loading..." class "loading-text"
    end column
otherwise
    // Show content
    layout MainContent
end when

// Button loading state
button "Submit" action submitForm class "submit-btn"
    text when isSubmitting then "Submitting..." otherwise "Submit"
    enabled when not isSubmitting
    loading when isSubmitting
```

## Best Practices

### 1. Use Semantic Components

```droe
// Good: Semantic structure
form LoginForm
    title "Login" class "form-title"
    input email bind credentials.email validate required
    input password bind credentials.password validate required
    button "Sign In" action authenticate class "primary-btn"
end form

// Avoid: Generic layout only
column
    text "Login"
    input text bind email
    input text bind password
    button "Submit" action submit
end column
```

### 2. Handle All States

```droe
// Good: Handle loading, error, and success states
when dataState equals "loading" then
    spinner class "loading"
otherwise when dataState equals "error" then
    text "Error loading data" class "error-message"
    button "Retry" action retryLoad class "retry-btn"
otherwise when dataState equals "empty" then
    text "No data available" class "empty-message"
otherwise
    // Show data
end when
```

### 3. Validate User Input

```droe
// Good: Comprehensive validation
input id email_field email bind userEmail validate required email class "form-input"
    on invalid show message "Please enter a valid email address"

input id password_field password bind userPassword validate required minlength 8 class "form-input"
    on invalid show message "Password must be at least 8 characters"
```

## Next Steps

- **[Framework Support](/guide/frameworks/)** - Framework-specific UI generation
- **[Mobile Development](/guide/mobile/)** - Mobile-specific UI features
- **[Styling Guide](/guide/styling/)** - Advanced styling and theming

UI Components in Droelang provide a declarative way to build user interfaces that work consistently across web, Android, and iOS platforms while maintaining platform-appropriate look and behavior.
