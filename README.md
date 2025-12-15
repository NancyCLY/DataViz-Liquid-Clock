# Liquid Refill Clock DataViz

An abstract clock visualization built with p5.js and deployed via GitHub Pages.

## Concept

This clock treats time as a tiny dataset with three values and maps each value to the fill level of a vessel:

- **Hours (0–23)** → fill level of the left vessel  
- **Minutes (0–59)** → fill level of the middle vessel  
- **Seconds (0–59)** → fill level of the right vessel  
- **Seconds also animate** the liquid surface amplitude (gentle wave motion)

The sketch is designed to be abstract but still readable within ~15 minutes of accuracy.

## Requirements Compliance

- Uses p5.js `hour()`, `minute()`, and `second()`
- Encodes hour/minute/second distinctly and legibly (three separate vessels)
- Prints `minute()` to the JavaScript console **only when the minute changes**
- Hosted as a static site (GitHub Pages)

## Run Locally

Option A: open the file directly  
- Open `index.html` in your browser.

Option B: use a simple local server (recommended)  
If you have Python installed:

```bash
python -m http.server 8000

