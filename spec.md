# Zia ur Rehman – Portfolio Website

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full personal portfolio website for Zia ur Rehman (Graphic & UI/UX Designer)
- Hero section with headline, subheadline, and two CTA buttons (View My Work, Hire Me)
- About Me section with experience summary and key skills narrative
- Skills section split into Graphic Design and UI/UX Design categories
- Portfolio section with grid layout, category filter (Graphic / UI UX), and case study style previews
- Testimonials section with 5-star client reviews
- Contact section with a contact form, email display, and social media links
- Backend to store contact form submissions
- Smooth scroll navigation with sticky header
- Fully responsive layout

### Modify
N/A

### Remove
N/A

## Implementation Plan

### Backend
- `ContactMessage` type: id, name, email, message, timestamp
- `submitContactMessage(name, email, message)` -- stores contact form submissions
- `getContactMessages()` -- admin retrieval of messages (optional)

### Frontend
- Sticky top navigation bar with logo/name and smooth scroll links
- Hero: full-viewport section, headline, subheadline, two CTA buttons
- About Me: two-column layout (text + stats/highlights)
- Skills: two-column card grid (Graphic Design | UI/UX Design) with individual skill items
- Portfolio: filterable image grid (All / Graphic / UI UX), each card shows project title, category, and a hover overlay with "View Case Study" CTA
- Testimonials: horizontal card layout with star ratings, client name, and quote
- Contact: left side (email + social links), right side (form with name, email, message fields and submit button)
- Footer with copyright
- Smooth entrance animations on scroll
- Mobile-responsive with hamburger nav
