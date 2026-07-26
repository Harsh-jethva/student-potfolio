# Student Portfolio

This portfolio app now uses the GitHub REST API to display the user's repositories on the Projects section.

## Features
- Fetches repositories from GitHub on mount
- Shows a loading spinner while the request is in progress
- Displays an error message and retry button if the request fails
- Includes a search box to filter repositories by name
- Shows each repository's star count and a direct link to the repo

## Setup
1. Install dependencies with `npm install`
2. Run the app with `npm run dev`
3. Open the local Vite URL shown in the terminal

## API Used
- GitHub REST API: `https://api.github.com/users/Harsh-jethva/repos`
