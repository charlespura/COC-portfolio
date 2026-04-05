# COC Portfolio

A Clash of Clans-inspired 3D portfolio built with React, Vite, and Three.js.  
This project presents a personal portfolio as an explorable village where each building opens a different section such as Home, About, Skills, Certificates, Projects, and Contact.

## Overview

Instead of a standard portfolio layout, this project uses an interactive village scene as the main navigation layer. Users can:

- rotate the camera by dragging
- zoom the village view with scroll
- click buildings to enter section screens
- switch between dark and light themes
- move across all portfolio sections from the top navigation inside each section

The overall goal is to make the portfolio feel more like a game environment than a conventional website.

## Features

- 3D village scene built with `@react-three/fiber` and `three`
- custom section buildings with different shapes and front icons
- enter animation when a building is selected
- dedicated inside pages for:
  - Home
  - About
  - Skills
  - Certificates
  - Projects
  - Contact
- dark and light theme toggle
- top navigation for switching sections from inside the page
- section-specific hero graphics and clue/example content
- responsive layout for desktop and mobile

## Tech Stack

- React 19
- Vite 7
- Three.js
- `@react-three/fiber`
- plain CSS

## Project Structure

```text
COCportfolio/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── src/
│   ├── App.jsx
│   ├── Scene.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── portfolioData.js
│   └── sections/
│       ├── About.jsx
│       ├── Certificates.jsx
│       ├── Contact.jsx
│       ├── Home.jsx
│       ├── Projects.jsx
│       ├── SectionLayout.jsx
│       └── Skills.jsx
└── README.md
```

## How It Works

### Village View

The main screen is the 3D village. Each building represents a portfolio section.

- `Home` acts as the central base
- `About` uses a castle-style building
- `Skills` uses a camp-style structure
- `Certificates` uses a lab-like structure
- `Projects` uses a workshop-style structure
- `Contact` uses a tower-style structure

Users can interact with the village through the scene controls:

- drag to rotate
- scroll to zoom
- click a building to enter that section

### Section View

After a building is clicked, the app plays a short entering animation and then opens the selected section screen.

Each section screen includes:

- a back button to return to the village
- a theme toggle
- top section navigation
- a hero area
- overview content
- a feature panel
- section stats
- section-specific clue/example cards

## Section Content

Portfolio content is currently stored in:

- `src/portfolioData.js`

This file defines:

- section order
- building labels
- titles
- subtitles
- paragraph content
- stat cards

If you want to replace placeholder text with real information, this is the first file to update.

## Customization Guide

### 1. Update Your Personal Content

Edit `src/portfolioData.js` and replace the current placeholder values with your own:

- name
- intro
- about text
- skills
- certificates
- projects
- contact details

### 2. Change Section Layout Content

Each section component inside `src/sections/` contains extra content such as:

- hero labels
- showcase items
- SVG graphics

Files:

- `src/sections/Home.jsx`
- `src/sections/About.jsx`
- `src/sections/Skills.jsx`
- `src/sections/Certificates.jsx`
- `src/sections/Projects.jsx`
- `src/sections/Contact.jsx`

Use these files to customize what each section visually represents.

### 3. Change the 3D Buildings

The 3D village scene is defined in:

- `src/Scene.jsx`

This file contains:

- camera controls
- enter animation camera behavior
- ground, walls, clouds, and trees
- building shape definitions
- per-section building positions and colors
- click-to-enter behavior

If you want different building models, icons, positions, or colors, this is the main file to edit.

### 4. Change Styling and Themes

Global styles and theme variables are defined in:

- `src/index.css`

This file controls:

- dark and light theme colors
- hero layout
- section screen styling
- navigation buttons
- animation overlays
- responsive behavior

## Installation

Make sure you have Node.js installed.

```bash
npm install
```

## Running the Project

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

In `package.json`:

- `npm run dev`  
  Starts the Vite development server.

- `npm run build`  
  Creates a production build in `dist/`.

- `npm run preview`  
  Serves the production build locally for testing.

## Current Notes

- The project currently uses placeholder portfolio content in several sections.
- The production build shows a large bundle warning from Vite because the app includes the 3D scene in the main bundle.
- This is a warning only, not a build failure.

## Suggested Next Improvements

- replace placeholder text with real portfolio content
- add real project links and screenshots
- add real certificate names and dates
- add contact links and social profiles
- optimize bundle size with code splitting
- add sound effects or richer scene interactions
- add more detailed building interiors if needed

## Development Notes

- The app uses component-based section screens with a shared `SectionLayout`.
- Theme state is managed in `src/App.jsx`.
- The 3D view and building entry behavior are handled in `src/Scene.jsx`.
- SVG graphics are embedded directly in the section components for portability.

## License

This project currently has no explicit license file. Add one if you plan to publish or distribute it.
