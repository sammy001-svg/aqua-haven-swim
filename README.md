# Aqua Haven Swim

Welcome to the frontend repository for **Aqua Haven Swim**, a premium training facility website designed for athletes of all levels. This project is a multi-page static website built to showcase our Olympic-level pools, high-performance gym, and wellness recovery zones.

## Features

- **Modern & Responsive UI:** Fully responsive design that looks stunning on mobile, tablet, and desktop devices.
- **Dynamic CSS Styling:** Built with out-of-the-box CSS utilizing customized utility classes for consistent and scalable design.
- **Interactive Carousel:** A custom-built hero image carousel on the home page.
- **Multi-step Booking Modal:** An interactive, multi-step booking and checkout flow to manage user reservations and payments (simulated).
- **Dedicated Pages:**
  - `index.html` (Home)
  - `about.html` (Our Story & Mission)
  - `facilities.html` (Detailed Facility Breakdown)
  - Individual program pages (e.g., `water-safety.html`, `stroke-improvement.html`)

## Tech Stack

This project is built purely with web fundamentals:

- **HTML5** (Semantic structuring)
- **CSS3** (Custom properties, Flexbox, Grid)
- **Vanilla JavaScript** (DOM manipulation for modals, carousels, and navigation)
- **Font Awesome** (Icons)
- **Google Fonts** (Inter & Outfit)

## Running the Project Locally

Because this is a static site, you don't need a complex build process to run it.

1. Clone the repository:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   ```
2. Navigate into the project directory:
   ```bash
   cd "Aqua Haven Swim"
   ```
3. Run a local server to view the site (recommended to avoid CORS issues with features like the mega-menu or modal):
   - Using Node.js `live-server`:
     ```bash
     npx live-server
     ```
   - Using Python:
     ```bash
     python3 -m http.server
     ```
4. Open your browser and navigate to the provided localhost URL (e.g., `http://127.0.0.1:8080`).

## Development Note

This project uses a centralized `style.css` file. All pages are built dynamically by mapping standard utility classes to ensure a unified design language across the entire `.service-hero`, `.about-grid`, and `.cards-grid` structures.
