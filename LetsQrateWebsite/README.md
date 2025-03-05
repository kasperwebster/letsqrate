# LetsQrate - Restaurant QR Code Solution

This is a landing page for LetsQrate, a QR code-based digital menu and customer engagement solution for restaurants.

## Overview

LetsQrate helps restaurants connect with customers through QR codes, providing:
- Digital menus
- Review links
- Social media connections
- Promotions
- Loyalty programs
- Newsletter sign-ups

## Running the Website Locally

Since this is a simple HTML/CSS/JavaScript website, you can run it locally without any special server setup:

### Option 1: Open directly in a browser

1. Simply double-click on the `index.html` file in your file explorer
2. This will open the website in your default web browser

### Option 2: Using Python's built-in HTTP server

If you have Python installed (most macOS and Linux systems do):

1. Open Terminal/Command Prompt
2. Navigate to the project directory:
   ```
   cd path/to/LetsQrateWebsite
   ```
3. Start a simple HTTP server:
   - For Python 3:
     ```
     python -m http.server
     ```
   - For Python 2:
     ```
     python -m SimpleHTTPServer
     ```
4. Open your browser and go to:
   ```
   http://localhost:8000
   ```

### Option 3: Using VS Code Live Server

If you have Visual Studio Code:

1. Install the "Live Server" extension
2. Open the project folder in VS Code
3. Right-click on `index.html`
4. Select "Open with Live Server"

## Missing Images

The website references some images that are placeholders. For a complete experience, you would need to add:

- `images/hero-mockup.png` - A mockup of a phone scanning a QR code
- `images/restaurant1.jpg`, `images/restaurant2.jpg`, `images/restaurant3.jpg` - Images for testimonials

You can replace these with your own images or download free stock photos from sites like Unsplash or Pexels.

## Customization

To customize the website:

- Edit `index.html` to change the content
- Modify `styles.css` to adjust the styling
- Update `script.js` for behavior changes

## Contact

For more information about LetsQrate, contact:
- Email: info@letsqrate.com
- Phone: (555) 123-4567 