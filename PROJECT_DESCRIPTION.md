# MeetScribe AI

MeetScribe AI is a powerful Chrome extension designed to enhance your Google Meet experience by providing automatic transcript extraction and AI-powered analysis. This tool is perfect for professionals, students, and anyone who wants to maximize the value of their virtual meetings.

Key Features:
1. Real-time transcript extraction from Google Meet sessions
2. AI-powered summary generation
3. Key points and action items identification
4. Integration with Obsidian note-taking and project management tools

MeetScribe AI aims to revolutionize the way we conduct and follow up on virtual meetings, making information retrieval and meeting productivity easier than ever before.

## Project Structure

The project is organized as follows:

```
meetscribe-ai/
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
├── options.html
├── options.js
├── styles/
│   ├── popup.css
│   └── options.css
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

- `manifest.json`: The manifest file that defines the extension's properties and permissions.
- `background.js`: The JavaScript file that handles the extension's background script.
- `content.js`: The JavaScript file that handles the extension's content script.
- `popup.html`: The HTML page that displays the extension's popup.
- `popup.js`: The JavaScript file that handles the extension's popup.
- `options.html`: The HTML page that displays the extension's options.
- `options.js`: The JavaScript file that handles the extension's options.
- `styles/`: The directory that contains the extension's CSS files.
