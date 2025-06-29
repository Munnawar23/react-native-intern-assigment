// 📂 ALL CODE IS IN `dev` BRANCH
// -------------------------------------------------------------------
// MEME GENERATOR APP - INTERVIEW EXPLANATION
// Built using React Native (Expo) + TypeScript

// -------------------------
// 📱 CORE FEATURES
// -------------------------
- Pick an image (via gallery or URL)
- Add meme text (top & bottom)
- Save meme locally using ViewShot + FileSystem
- List all memes in "My Memes"
- Mark as Favorite ❤️
- Share using native share 📤
- Delete meme 🗑️
- View only favorites in "Favorites" tab
- Auto light/dark theme support
- Offline support using NetInfo

// -------------------------
// 🏗️ TECH STACK & TOOLS
// -------------------------
React Native (Expo) + TypeScript  
Navigation: @react-navigation/native  
Image Picker: expo-image-picker  
Capture view: react-native-view-shot  
Offline check: @react-native-community/netinfo  
Sharing: expo-sharing  
Storage: AsyncStorage (via custom utils)  
File access: expo-file-system  
Themeing: custom useTheme hook with context

// -------------------------
// 🧠 HOW APP WORKS
// -------------------------

// 1. HomeScreen
User selects image from:
  - 📁 Device gallery (via ImagePicker)
  - 🔗 Paste image URL
Then navigates to CreateScreen with the selected image

// 2. CreateScreen
Displays image with editable top/bottom text  
  - Uses <ViewShot> to render image + text  
  - On "Save", captures image & stores in AsyncStorage as a new meme

// 3. MyMemesScreen
Displays all saved memes in 2-column FlatList  
Tapping a meme opens MemeActionsModal:
  - Toggle Favorite
  - Share (via Sharing API)
  - Delete

// 4. FavoritesScreen
Filters all memes with isFavorite === true  
Tapping a meme opens modal to remove from favorites

// 5. ConnectionBanner
Displayed at top of list if device is offline (via NetInfo)

// -------------------------
// 📁 STORAGE STRUCTURE (AsyncStorage)
Each meme object:
{
  id: string,
  imageUri: string,
  topText: string,
  bottomText: string,
  isFavorite: boolean
}

// Storage helpers in utils/memeStorage.ts:
// - saveMeme()
// - getMemes()
// - deleteMeme()
// - toggleFavoriteStatus()

// -------------------------
// 🌈 THEMES
useTheme() returns colors based on system preference  
- background, text, card, border, etc.  
All styles generated using createStyles(theme)

// -------------------------
// ⚙️ PLUGINS IN app.json
"plugins": [
  ["expo-image-picker", {
    "photosPermission": "The app accesses your photos to let you select an image for your meme."
  }]
]

// -------------------------
// 🖼️ REQUIRED ASSETS (in src/assets)
icon.png           // App icon  
splash.png         // Splash screen  
adaptive-icon.png  // Android adaptive icon  
favicon.png        // Web favicon

// -------------------------
// 📦 HOW TO RUN LOCALLY
npm install  
npx expo start

// -------------------------
// 👤 DEVELOPER INFO
Munnawar Hussain  
GitHub: https://github.com/Munnawar23  
LinkedIn: https://linkedin.com/in/munnawar-hussain-aa544b227  
Email: munawwarh48@gmail.com

// -------------------------
// ✅ APP STATUS
Ready for deployment and submission.  
Works offline. Built with modular structure.  
Includes clean UI and theme support.
