---
layout: guide.njk
title: Mobile Development
description: Build cross-platform mobile applications for Android and iOS with Droelang's mobile DSL.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Mobile Development
prev:
  title: API Endpoints
  url: /guide/api-endpoints/
next:
  title: UI Components
  url: /guide/ui-components/
---

Droelang provides comprehensive mobile development capabilities, allowing you to create native Android and iOS applications from a single codebase using mobile-specific UI components and device features.

## Mobile Project Setup

### Configuration

Configure mobile targets in `droeconfig.json`:

```json
{
  "target": "mobile",
  "mobile": {
    "enabled": true,
    "platforms": ["android", "ios"],
    "package": "com.example.myapp",
    "appName": "My Mobile App",
    "version": "1.0.0",
    "permissions": {
      "camera": true,
      "location": true,
      "storage": true,
      "notifications": true
    },
    "features": {
      "offline": true,
      "cloudSync": true,
      "analytics": false
    }
  }
}
```

### Project Structure

```
my-mobile-app/
├── droeconfig.json
├── src/
│   ├── main.droe
│   ├── screens/
│   │   ├── login.droe
│   │   └── profile.droe
│   └── components/
│       └── user_card.droe
├── assets/
│   ├── images/
│   └── icons/
└── build/
    ├── android/          // Generated Android project
    └── ios/              // Generated iOS project
```

## Mobile-Specific Metadata

Use file-level metadata annotations for app information (mobile target is configured in `droeconfig.json`):

```droe
@name "PhotoShare"
@description "Cross-platform photo sharing application"
@package "com.example.photoapp"

module photo_app
    // Mobile app content
end module
```

**Note:** The `@targets` annotation is not implemented. Use `droeconfig.json` configuration instead.

## Device Capabilities

### Camera Integration

```droe
// Camera button component
button "Take Photo" type camera action capturePhoto permissions "camera, storage" class "camera-btn"

// Camera action with permission handling
action capturePhoto
    when device has camera permission then
        show message "Opening camera..."
        run native camera capture
        set capturedImage to camera result

        when capturedImage is not empty then
            display "Photo captured successfully"
            set UserProfile.profilePicture to capturedImage
        end when
    otherwise
        show alert "Camera permission required" with title "Permission Needed"
    end when
end action
```

### Location Services

```droe
// Location button component
button "Get Location" type location action getLocation permissions "location" accuracy high class "location-btn"

// Location action
action getLocation
    when device has location permission then
        show message "Getting location..."
        run native location service with accuracy high
        set currentLocation to location result

        display "Location: [currentLocation.latitude], [currentLocation.longitude]"
        set UserProfile.lastLocation to currentLocation
    otherwise
        show alert "Location permission required" with title "Permission Needed"
    end when
end action

// Background location tracking
action startLocationTracking
    when device has background_location permission then
        run native location tracking with interval 60 seconds
    end when
end action
```

### Push Notifications

```droe
// Show notifications
action sendNotification with title which is text, message which is text
    show notification message with title title sound default
end action

action scheduleReminder with message which is text, delay which is int
    schedule notification message after delay minutes
end action

// Request notification permissions on app start
action initializeApp
    request notification permissions

    when notifications_enabled then
        display "Notifications enabled"
    otherwise
        display "Notifications disabled"
    end when
end action
```

### Device Sensors

```droe
// Motion detection
action setupMotionDetection
    when device has motion sensor then
        run native motion detection with sensitivity medium

        when motion_detected then
            display "Motion detected!"
            run action capturePhoto
        end when
    end when
end action

// Accelerometer data
action getAccelerometerData
    when device has accelerometer then
        set acceleration to native accelerometer data
        display "X: [acceleration.x], Y: [acceleration.y], Z: [acceleration.z]"
    end when
end action
```

### Hardware Features

```droe
// Vibration
action vibrate with pattern which is text
    when pattern equals "short" then
        run native vibration with duration 100
    otherwise when pattern equals "long" then
        run native vibration with duration 500
    otherwise
        run native vibration with pattern [100, 200, 100, 200]
    end when
end action

// Audio playback
action playSound with soundFile which is text
    run native audio playback with soundFile
end action

// Flashlight control
action toggleFlashlight
    when flashlight is on then
        run native flashlight off
        set flashlight to off
    otherwise
        run native flashlight on
        set flashlight to on
    end when
end action
```

## Data Persistence

### Local Storage

```droe
// Save user data locally
action saveUserData
    store UserProfile in local database with key "user_profile"

    when online then
        sync UserProfile with cloud storage
    end when

    display "User data saved"
end action

// Load user data
action loadUserData
    set userData from local database with key "user_profile"

    when userData is not empty then
        set UserProfile to userData
        display "User data loaded"
    otherwise
        display "No saved user data found"
    end when
end action

// Clear all local data
action clearLocalData
    clear local database
    display "Local data cleared"
end action
```

### Cloud Synchronization

```droe
action syncWithCloud
    when online then
        // Upload local changes
        set local_changes from local database where synced equals false

        for each change in local_changes
            call cloud_api_endpoint method POST with change into response
            when response.status equals 200 then
                mark change as synced in local database
            end when
        end for

        // Download remote changes
        call cloud_api_endpoint method GET into remote_data
        merge remote_data with local database

        display "Sync completed"
    otherwise
        display "No internet connection - sync postponed"
    end when
end action
```

## Cross-Platform UI Components

### Mobile Layouts

```droe
layout MainScreen
    column class "main-container"
        title "My Mobile App" class "app-title"

        column class "content-section"
            text "Welcome to the mobile app!" class "welcome-text"

            // Mobile-specific button types
            button "Take Photo" type camera action capturePhoto class "camera-btn"
            button "Get Location" type location action getLocation class "location-btn"

            // Regular buttons
            button "Settings" action openSettings class "settings-btn"
        end column
    end column
end layout
```

### Forms for Mobile

```droe
form UserRegistration
    column class "form-container"
        title "Create Account" class "form-title"

        column class "form-fields"
            input id name_field text placeholder "Full Name" bind UserProfile.fullName validate required class "mobile-input"
            input id email_field email placeholder "Email Address" bind UserProfile.email validate email class "mobile-input"
            input id phone_field phone placeholder "Phone Number" bind UserProfile.phone validate phone class "mobile-input"

            toggle id notifications_toggle "Enable Push Notifications" bind UserSettings.pushNotifications default on class "mobile-toggle"

            button "Create Account" action createAccount class "primary-btn mobile-btn"
        end column
    end column
end form
```

### Navigation

```droe
layout TabNavigation
    tabs class "bottom-navigation"
        tab "Home" screen HomeScreen icon "home" selected
        tab "Profile" screen ProfileScreen icon "user"
        tab "Settings" screen SettingsScreen icon "settings"
        tab "Camera" action capturePhoto icon "camera"
    end tabs
end layout
```

## Platform-Specific Features

### Android-Specific

```droe
// Android-specific features
when platform equals "android" then
    // Use Android-specific components
    button "Share via Android" action shareViaAndroid type android_share

    // Access Android intents
    run android_intent with action "android.intent.action.VIEW" data share_url
end when

action shareViaAndroid
    run native android share with content share_content
end action
```

### iOS-Specific

```droe
// iOS-specific features
when platform equals "ios" then
    // Use iOS-specific components
    button "Share via iOS" action shareViaiOS type ios_share

    // Access iOS frameworks
    run ios_framework CoreLocation with method getCurrentLocation
end when

action shareViaiOS
    run native ios share with content share_content
end action
```

## Permission Management

### Requesting Permissions

```droe
// Request multiple permissions
action requestPermissions
    request permissions "camera, location, notifications, storage"

    when all_permissions_granted then
        display "All permissions granted"
        run action initializeApp
    otherwise
        display "Some permissions denied"
        show alert "App requires permissions to function properly"
    end when
end action

// Check individual permissions
action checkCameraPermission
    when device has camera permission then
        enable camera_button
    otherwise
        disable camera_button
        show permission_request_dialog for camera
    end when
end action
```

### Permission Handling by Component

```droe
// Components automatically handle permissions
button "Take Photo" type camera permissions "camera, storage"
    on permission_denied show alert "Camera access required for photos"
    action capturePhoto

button "Get Location" type location permissions "location" accuracy high
    on permission_denied show alert "Location access required for this feature"
    action getLocation
```

## Complete Mobile App Example

```droe
@name "PhotoShare"
@description "Cross-platform photo sharing application"
@package "com.example.photoshare"

// droeconfig.json should contain:
// {
//   "target": "mobile",
//   "mobile": {
//     "platforms": ["android", "ios"],
//     "package": "com.example.photoshare"
//   }
// }

module photoshare

    // Data models
    data Photo
        id is text required
        imagePath is text required
        location is text optional
        timestamp is date required
        userName is text required
        isShared is flag default false
    end data

    // Main application layout
    layout MainScreen
        column class "main-container"
            title "PhotoShare App" class "app-title"

            column class "form-container"
                input id name_field text placeholder "Enter your name" bind UserProfile.userName validate required class "form-input"

                // Mobile-specific components
                button "Take Photo" type camera action capturePhoto permissions "camera, storage" class "camera-btn"
                button "Get Location" type location action getLocation permissions "location" accuracy high class "location-btn"

                image source "placeholder.jpg" alt "Your captured photo" bind UserProfile.capturedImage class "photo-preview"

                button "Share Photo" action sharePhoto enabled when capturedImage is not empty class "share-btn primary"
            end column
        end column
    end layout

    // Settings form
    form SettingsForm
        column class "settings-container"
            title "App Settings" class "form-title"

            column class "form-fields"
                toggle id notifications_toggle "Enable Push Notifications" bind UserSettings.notificationsEnabled default off class "toggle-field"

                dropdown id quality_dropdown bind UserSettings.photoQuality default "Medium Quality" class "dropdown-field"
                    option "High Quality"
                    option "Medium Quality"
                    option "Low Quality"
                end dropdown

                button "Save Settings" action saveSettings class "save-btn primary"
            end column
        end column
    end form

    // Actions with platform-specific implementations
    action capturePhoto
        when device has camera permission then
            show message "Opening camera..."
            run native camera capture
            set capturedImage to camera result

            when capturedImage is not empty then
                save capturedImage to local storage
                display "Photo captured successfully"
            end when
        otherwise
            show alert "Camera permission required"
        end when
    end action

    action getLocation
        when device has location permission then
            show message "Getting location..."
            run native location service with accuracy high
            set currentLocation to location result

            when currentLocation is not empty then
                set UserProfile.lastLocation to currentLocation
                display "Location obtained: [currentLocation.latitude], [currentLocation.longitude]"
            end when
        otherwise
            show alert "Location permission required"
        end when
    end action

    action sharePhoto
        when capturedImage is not empty then
            show message "Sharing photo..."

            // Create photo record
            db create Photo with
                imagePath is capturedImage,
                location is UserProfile.lastLocation,
                userName is UserProfile.userName,
                timestamp is current_time

            // Share via platform
            when platform equals "android" then
                run android_intent share with content capturedImage
            otherwise when platform equals "ios" then
                run ios_share with content capturedImage
            end when

            show notification "Photo shared successfully!"
        otherwise
            show alert "Please take a photo first"
        end when
    end action

    // Data persistence
    action saveSettings
        store UserSettings in local database
        when online then
            sync UserSettings with cloud storage
        end when
        show notification "Settings saved successfully!"
    end action

    // App initialization
    action initializeApp
        request permissions "camera, location, notifications, storage"
        load UserSettings from local database

        when first_launch then
            show welcome_tutorial
        end when
    end action

end module
```

## Generated Platform Code

### Android Output (Kotlin)

```kotlin
// Generated MainActivity.kt
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            PhotoShareTheme {
                MainScreen()
            }
        }

        // Request permissions
        requestPermissions(
            arrayOf(
                Manifest.permission.CAMERA,
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.WRITE_EXTERNAL_STORAGE
            ),
            PERMISSION_REQUEST_CODE
        )
    }

    private fun capturePhoto() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
            == PackageManager.PERMISSION_GRANTED) {
            // Open camera
            val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
            startActivityForResult(intent, CAMERA_REQUEST_CODE)
        }
    }
}
```

### iOS Output (Swift)

```swift
// Generated ContentView.swift
struct ContentView: View {
    @StateObject private var locationManager = LocationManager()
    @State private var showingCamera = false
    @State private var capturedImage: UIImage?

    var body: some View {
        VStack(spacing: 20) {
            Text("PhotoShare App")
                .font(.title)

            TextField("Enter your name", text: $userName)
                .textFieldStyle(RoundedBorderTextFieldStyle())

            Button("Take Photo") {
                showingCamera = true
            }
            .sheet(isPresented: $showingCamera) {
                CameraView(image: $capturedImage)
            }

            Button("Get Location") {
                locationManager.requestLocation()
            }
        }
        .onAppear {
            requestPermissions()
        }
    }

    private func requestPermissions() {
        // Request camera and location permissions
        AVCaptureDevice.requestAccess(for: .video) { granted in
            // Handle camera permission
        }

        locationManager.requestWhenInUseAuthorization()
    }
}
```

## Best Practices

### 1. Handle Permissions Gracefully

```droe
// Good: Always check permissions before using features
action useCamera
    when device has camera permission then
        run native camera capture
    otherwise
        show permission_explanation for camera
        request camera permission
    end when
end action
```

### 2. Provide Offline Functionality

```droe
// Good: Handle offline scenarios
action saveData
    store data in local database

    when online then
        sync with cloud storage
    otherwise
        display "Saved locally - will sync when online"
        add to sync_queue
    end when
end action
```

### 3. Use Platform-Appropriate UI

```droe
// Good: Platform-specific styling
button "Share" action shareContent class "primary-btn"
    when platform equals "android" then
        class "material-btn"
    otherwise when platform equals "ios" then
        class "ios-btn"
    end when
```

## Next Steps

- **[UI Components](/guide/ui-components/)** - Detailed UI component reference
- **[Framework Support](/guide/frameworks/)** - Mobile framework generation
- **[Deployment](/guide/deployment/)** - Publishing mobile apps

Mobile development in Droelang provides a unified way to create native applications for both Android and iOS platforms while leveraging device-specific features and maintaining platform-appropriate user experiences.
