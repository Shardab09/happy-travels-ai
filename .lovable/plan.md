## HappyTravelsAI welcome screen

- Replace the blank homepage with a full-screen, cinematic family-travel hero.
- Use a colorful, splashy palette led by deep teal, coral, turquoise, sunshine yellow, and warm white while preserving strong text contrast.
- Add real destination photography throughout the composition: a full-bleed aspirational background plus a small layered destination-image treatment for extra energy. No placeholder blocks will remain.
- Keep the experience focused: white top-left `HappyTravelsAI` wordmark, the exact centered headline and subheadline, and exactly one large rounded `Start Planning →` CTA.
- Add a subtle family-profile cue through compact avatar-style markers, without introducing booking controls or extra sections.
- Make the layout responsive across desktop and mobile, with restrained image drift and entrance motion plus reduced-motion support.
- Update the homepage title, description, and social metadata to accurately describe HappyTravelsAI.

## Technical details

- Implement within the existing TanStack Start home route and global Tailwind v4 design tokens.
- Generate and import local destination image assets rather than hotlinking or leaving prototype placeholders.
- Verify the rendered screen at desktop and mobile sizes, checking readability, image cropping, CTA visibility, and overflow.