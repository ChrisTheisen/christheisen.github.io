# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository Overview

This is a personal GitHub Pages website (`www.christheisen.com`) hosting multiple web-based games and interactive tools. The repository follows a static site architecture where each project is contained in its own directory with standalone HTML/CSS/JavaScript files.

## Architecture and Structure

### Portfolio Website Structure
- **Root level**: Main portfolio site with navigation (`index.html`, `index.js`, `index.css`)
- **Project directories**: Each contains a complete standalone web application
- **Deployment**: Direct GitHub Pages hosting - files are served directly from the repository

### Project Categories
**Tools**:
- `QuickMaths/` - Math training application with keyboard input handling
- `GW2ItemTracker/` - Game item tracking tool with data persistence

**Games**:
- `MOMTEST/` - "Multitudes of Minions" - Complex idle/strategy game with modular architecture
- `MOMRC/` - Release candidate version of the above
- `QuarksJS/` - Particle physics simulation game (vanilla JS)
- `Quarks/` - TypeScript/React version using mutraction-dom framework
- `Absorb/`, `Ballsplosion/`, `Sol/` - Simple canvas-based games

**Learning Projects**:
- `Drawing/`, `OrgChart/`, `SpiderChart/` - Canvas API experiments
- Various small projects for exploring web technologies

### Key Architectural Patterns

**Modular JavaScript Architecture** (MOMTEST/MOMRC):
- Component-based file structure (`Hero.js`, `Minion.js`, `Boss.js`, etc.)
- Global state management through `GlobalVariables.js`
- Configuration-driven balance through `Balance.js`
- Separation of UI logic (`ManageUI.js`) from game logic
- Theme system with multiple CSS files for different visual modes

**Canvas-based Games**:
- Dual-layer rendering (background/foreground canvases)
- Event-driven input handling
- Animation loop patterns for real-time updates

**Modern TypeScript Project** (Quarks):
- TypeScript compilation with babel transformation
- ESBuild bundling for production
- JSX with custom pragma for mutraction-dom
- Source -> compiled output -> bundled distribution workflow

## Common Development Tasks

### Building Projects

**For TypeScript projects (Quarks)**:
```bash
cd Quarks
npm install
npm run build
```
This runs: TypeScript compilation → Babel transformation → ESBuild bundling

**For vanilla JS projects**:
No build step required - edit files directly as they're served statically.

### Testing

**QuarksJS has basic testing**:
```bash
# Open test file in browser
open QuarksJS/test/test.html
```

**Manual testing**:
Most projects require manual testing by opening `index.html` files in a browser.

### Development Workflow

**Local development**:
```bash
# Serve locally (any static server works)
python3 -m http.server 8000
# OR
npx serve .
```

**Deployment**:
- Push to `main` branch
- GitHub Pages automatically deploys changes
- No CI/CD pipeline - direct file serving

### Project-Specific Development Notes

**MOMTEST/MOMRC Game Architecture**:
- Game loop runs in browser with requestAnimationFrame
- Save/load system uses localStorage
- Hotkey system (see `Hotkeys.js`) provides keyboard shortcuts
- Achievement system tracks player progress
- Modular stat system allows for complex character builds

**Quarks Framework Usage**:
- Uses Tom Theisen's `mutraction-dom` reactive framework
- JSX compilation with custom pragma
- Build output goes: `src/` → `out/` → `out2/` → `dist/`

**Canvas Projects**:
- Most use HTML5 Canvas API directly
- Mouse/touch event handling for interactivity
- Responsive design considerations for different screen sizes

## Repository Management

**File Organization**:
- Each project is completely self-contained
- No shared dependencies between projects (except Quarks npm deps)
- CSS follows either inline styles or separate `.css` files per project

**Version Control Patterns**:
- Main branch serves as production
- Feature branches for larger changes (see recent commit history)
- Manual deployment by pushing to GitHub

**Code Style**:
- Mix of ES5 and modern JavaScript depending on project age
- TypeScript for newer projects (Quarks)
- Minimal external dependencies to keep projects lightweight