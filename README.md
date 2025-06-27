# 📱 Meme Generator App — Intern Task

## 🧩 Overview

This assignment is based on a simple image-based React Native (Expo) app. The core functionality includes:
- Choosing an image from local storage or a URL
- Adding top and bottom text to create a meme
- Viewing or downloading the final result

Your goal is to take this prototype and make it production-ready—stable, offline-capable, and more polished in terms of UX and features.

---

## 🎯 What You Need to Do

You’ll fork this repo, build out the enhancements listed below, and open a pull request with your final version.

---

### Phase 1: Image Caching
- Store loaded images locally to avoid re-fetching on repeat use.
- Ensure cached images remain available across app restarts and in offline mode.

> Bonus points if you build the caching logic yourself instead of relying entirely on third-party tools.

---

### Phase 2: Offline Access
- Persist all meme-related data (image source, overlay text, timestamp, etc.).
- Build a "Saved Memes" screen that lists generated memes.
- The list should be usable offline, including viewing images and text.

---

### Phase 3: UX Improvements
- Add pull-to-refresh to all list views.
- Detect internet connectivity changes and inform users through banners or notifications.
- Make sure any features that require internet gracefully handle offline scenarios.

---

### Phase 4: Meme Management
- Let users delete saved memes (with confirmation).
- Add a way to favorite/star memes and view them in a separate tab or screen.
- Optionally: implement a way to edit an existing meme (pre-filled editor).

---

### Phase 5: Customization and Preferences
- Let users choose font styles, text colors, and basic image filters.
- Store user preferences across app sessions.
- Add support for light/dark mode, based on system theme.

---

### Bonus (Optional, but appreciated)
- Add a share button to export memes outside the app.
- Allow memes to be saved to the gallery or local filesystem.
- Add transitions or subtle animations when generating or switching memes.

---

## 🧪 Deliverables

- A GitHub Pull Request with your final submission
- An updated `README.md` with setup steps and a summary of what you built
- A short demo video (screen recording is fine) showing:
  - Meme creation
  - Offline mode in action
  - Any other features you added (e.g. favorites, themes, etc.)

---

## 🧰 Tech Notes

You can use any tool, utility, or library that works with Expo and React Native.  
If you implement core functionality (caching, storage, transitions) manually instead of relying on prebuilt packages, that’s a big plus.

---

## ✅ What We'll Look At

| Area               | What It Means                                                 |
|--------------------|---------------------------------------------------------------|
| Functionality       | Core features should work end-to-end without crashes         |
| Code Structure      | Clean, modular, and readable                                 |
| Persistence         | Meme data and settings are reliably stored and restored      |
| UX & UI            | Smooth, responsive, and clean UI/UX                          |
| Completeness        | All main features are done; bonus items are a plus           |
| Documentation       | README is clear, code is well commented                      |

---

## 📝 How to Submit

1. Fork this repo  
2. Complete the task in your fork  
3. Open a pull request with your final work  
4. In your PR description, summarize what you implemented (in third person)

---

## ❓ Need Help?

Tag the maintainers in the issue tracker.
