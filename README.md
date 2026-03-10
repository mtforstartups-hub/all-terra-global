# All Terra Global

A modern investment platform website built with Next.js, showcasing high-yield opportunities across African markets.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: GSAP with ScrollTrigger
- **Runtime**: Bun

## Project Structure

```
app/
├── page.tsx              # Homepage
├── about/                # About page
├── contact/              # Contact page with inquiry form
├── opportunities/        # Investment opportunities listing
│   ├── mining/           # Mining investment details
│   ├── real-estate/      # Real estate investment details
│   └── vendor-financing/ # Vendor financing details
├── team/                 # Leadership & team page
└── not-found.tsx         # Custom 404 page

components/
├── shared/               # Reusable components
│   ├── PageHero.tsx      # Shared hero section with parallax
│   └── PageCta.tsx       # Shared CTA section with variants
├── homepage/             # Homepage-specific sections
├── about/                # About page sections
├── contact/              # Contact page sections
├── opportunities/        # Opportunities page sections
└── team/                 # Team page sections
```

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build

# Start production server
bun start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, sectors, statistics, and more |
| `/about` | Company mission, values, timeline, and global presence |
| `/opportunities` | Investment opportunities listing |
| `/opportunities/[id]` | Individual opportunity details |
| `/team` | Leadership, directors, and team members |
| `/contact` | Contact form and office locations |

## Shared Components

### PageHero
Reusable hero section with parallax background and animated text reveal.

```tsx
<PageHero
  label="About Us"
  title="Page Title"
  description="Page description..."
  backgroundImage="https://..."
  imageAlt="Alt text"
/>
```

### PageCta
Flexible CTA section with configurable buttons and variants.

```tsx
<PageCta
  title="CTA Title"
  description="CTA description..."
  variant="green" // or "dark"
  primaryButton={{ text: "Button", href: "/link", showArrow: true }}
  secondaryButton={{ text: "Secondary", href: "/link" }}
  highlightedText="Optional highlighted text"
/>
```

## Brand Colors

- **Primary Green**: `#1C5244`
- **Accent Gold**: `#F8AB1D`
- **Dark**: `#333333`
