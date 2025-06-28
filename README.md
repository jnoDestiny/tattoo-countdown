# Chainsaw Tattoo Countdown

A static website that displays a 365-day countdown until getting a chainsaw tattoo. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 365-day countdown timer
- Cycling background images with slow panning animation
- Chainsaw Man inspired font (Orbitron)
- Fully static - can be hosted on GitHub Pages
- Responsive design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add your background images to the `public/images/` folder:
   - `background1.jpg`
   - `background2.jpg` 
   - `background3.jpg`

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Deployment

This project is configured for static export and can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

The build output will be in the `out/` directory.

## Customization

- Update the countdown target date in `src/app/page.tsx`
- Modify the background images in `src/components/BackgroundSlider.tsx`
- Adjust the font and styling in `tailwind.config.js` and `src/app/globals.css`

## Font

The project uses the Orbitron font, inspired by Chainsaw Man's futuristic aesthetic. The font is loaded from Google Fonts and applied throughout the application.
