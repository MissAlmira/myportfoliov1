/* STREAMING_CHUNK:Defining design tokens and base CSS variables... */
:root {
  --color-navy-900: #0B132B;
  --color-navy-800: #1C2541;
  --color-navy-700: #2A3459;
  --color-offwhite: #F8F9FA;
  --color-teal-accent: #14B8A6;
  --color-teal-hover: #38BDF8;
  --color-teal-light: rgba(20, 184, 166, 0.15);
  --border-glass: rgba(255, 255, 255, 0.08);
  --border-glass-hover: rgba(20, 184, 166, 0.4);
  --shadow-glass: 0 12px 30px -10px rgba(20, 184, 166, 0.15);
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-mono: 'JetBrains Mono', monospace;
}

/* STREAMING_CHUNK:Configuring core typography and layout resets... */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-family: var(--font-sans);
  background-color: var(--color-navy-900);
  color: var(--color-offwhite);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-navy-900);
  color: var(--color-offwhite);
  line-height: 1.6;
}

::selection {
  background-color: var(--color-teal-accent);
  color: var(--color-navy-900);
}

/* STREAMING_CHUNK:Styling custom webkit scrollbar... */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-navy-900);
}

::-webkit-scrollbar-thumb {
  background: var(--color-navy-700);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-teal-accent);
}

/* STREAMING_CHUNK:Creating reusable glassmorphic components and gradient utilities... */
.glass-card {
  background: rgba(28, 37, 65, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-glass);
  border-radius: 1rem;
}

.glass-card-hover {
  transition: var(--transition-smooth);
}

.glass-card-hover:hover {
  transform: translateY(-4px);
  border-color: var(--border-glass-hover);
  box-shadow: var(--shadow-glass);
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-offwhite) 0%, var(--color-teal-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* STREAMING_CHUNK:Styling navigation header and interactive state controls... */
header {
  position: sticky;
  top: 0;
  z-index: 40;
  width: 100%;
  background: rgba(11, 19, 43, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-glass);
  transition: var(--transition-smooth);
}

header a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--color-teal-accent);
  outline-offset: 2px;
}

/* STREAMING_CHUNK:Styling accordion panels and interactive toggle triggers... */
.accordion-header {
  transition: var(--transition-smooth);
  cursor: pointer;
}

.accordion-header:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

/* STREAMING_CHUNK:Styling AI evaluation tab interfaces and state switches... */
.tab-btn {
  transition: var(--transition-smooth);
  cursor: pointer;
}

.tab-btn:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.tab-btn.active {
  background-color: var(--color-teal-accent);
  color: var(--color-navy-900);
}

/* STREAMING_CHUNK:Styling photography gallery items and lightbox controls... */
.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
}

.gallery-item img {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-item:hover img {
  transform: scale(1.08);
}

#lightbox {
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

#lightbox.hidden {
  display: none;
  opacity: 0;
  pointer-events: none;
}

/* STREAMING_CHUNK:Styling back-to-top floating control and toast notifications... */
#back-to-top {
  box-shadow: 0 10px 25px -5px rgba(20, 184, 166, 0.3);
}

#toast {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
}

/* STREAMING_CHUNK:Configuring accessibility rules for reduced motion support... */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .glass-card-hover:hover {
    transform: none;
  }
  
  .gallery-item:hover img {
    transform: none;
  }
}

/* STREAMING_CHUNK:Applying mobile screen layout safeguards and responsive rules... */
@media (max-width: 640px) {
  .glass-card {
    border-radius: 0.75rem;
  }
  
  h1 {
    font-size: 2.25rem !important;
    line-height: 2.5rem !important;
  }
}