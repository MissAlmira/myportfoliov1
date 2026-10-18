# Almira R. Bogayan — Portfolio Website

A responsive, single-page portfolio for GitHub Pages built with semantic HTML, CSS, and vanilla JavaScript. No build step, backend, or paid service is required.

## Project structure

```text
almira-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   └── README.md
│   └── Almira-Bogayan-Resume.pdf   # add this PDF yourself
└── README.md
```

## Before publishing

- Confirm the Outlier dates and the Red Chair Advertising internship dates/duties.
- Confirm that the wording of the public profile is accurate and appropriate.
- Add the actual resume PDF at `assets/Almira-Bogayan-Resume.pdf`. Until then, the download button is a documented placeholder.
- Replace the photography placeholder slots with Almira's own images.
- Add LinkedIn or GitHub URLs only after confirming the correct public profiles.
- All merchant support cases and AI evaluation examples are fictional demonstrations. They must remain labelled as such.

## Preview locally

1. Extract the ZIP file.
2. Open `index.html` in a modern browser. Most features work without a server.
3. For the most reliable local preview, use a simple static server such as VS Code's Live Server extension or Python's built-in server:

   ```bash
   python -m http.server 8000
   ```

   Then visit `http://localhost:8000` from the project directory.

## Add the resume PDF

1. Export or save the confirmed resume as a PDF.
2. Name it exactly `Almira-Bogayan-Resume.pdf`.
3. Place it in the `assets/` directory.
4. The existing button in `index.html` points to `assets/Almira-Bogayan-Resume.pdf`.

Do not publish an empty or unrelated file under this name.

## Add personal photographs

See [`assets/images/README.md`](assets/images/README.md). The gallery uses these default paths:

- `assets/images/hiking-trail.jpg`
- `assets/images/landscape.jpg`
- `assets/images/nature-detail.jpg`

Use personal photos or imagery you have permission to publish. If you choose different filenames, update the corresponding `data-image` attributes in `index.html`.

## Update contact details and links

- Email appears in the contact section, footer, and `mailto:` links in `index.html`.
- The phone number from the source resume is intentionally not published.
- LinkedIn and GitHub links are omitted until the correct profile URLs are supplied.
- Navigation labels and destinations are in `index.html`.

## Publish with GitHub Pages

1. Sign in to GitHub and create a new repository. For a project site, a repository name such as `almira-portfolio` is fine.
2. Extract the ZIP and upload the **contents** of the `almira-portfolio` folder to the repository root. The root should contain `index.html`, `css/`, `js/`, and `assets/`—not an extra nested folder.
3. Open the repository's **Settings** tab.
4. Select **Pages** in the sidebar.
5. Under the build and deployment settings, choose **Deploy from a branch**.
6. Select the publishing branch (usually `main`) and the `/ (root)` folder, then save.
7. Wait for GitHub Pages to finish publishing. The URL will be shown in the Pages settings. A project site commonly uses `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.
8. Open the URL and test the menu, case study modals, copy buttons, tabs, gallery, email links, and mobile layout.

No custom GitHub Actions workflow is required for this static site.

## Update the website later

Edit the relevant file, then commit and push the changes (or upload the updated file in GitHub). GitHub Pages will publish the update automatically after the commit is processed.

## Accessibility and privacy notes

- The page includes keyboard-focus states, reduced-motion support, semantic landmarks, and accessible labels.
- Case study dialogs can be closed with Escape; AI demo tabs support arrow-key navigation.
- Contact uses `mailto:` rather than a fake form that suggests messages are submitted by the website.
- Do not add real customer information, confidential support templates, private employer processes, or unapproved company identifiers.
- The examples are not claims of real merchant-account work or actual Outlier deliverables.
