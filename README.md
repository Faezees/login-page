# Task Login

A minimal Next.js + Tailwind + Redux Toolkit project reproducing the login + dashboard UI from the provided mockups.

## technology

1. Next.js
2. Redux
3. tailwind
4. Mock API
5. Role-based responses: Returns different user roles (admin, owner) based on hardcoded credentials

## Features

- Mock login API (`/api/auth/login`) with scenarios:
  - `admin@faeze.com` / `123456` -> success (admin) / 5  bookings
  - `owner@faeze.com` / `123456` -> success (owner) / 10 bookings
  - `error@faeze.com` -> server error (500)
  - others -> 401 invalid
- Mock bookings API (`/api/bookings`) with modes:
  - `?mode=empty` -> empty array
  - `?mode=error` -> 500 error
  - default -> 2 sample bookings
- Tailwind CSS for styling
- Redux Toolkit for auth + bookings state

## Run

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

## Notes

- Feel free to tweak styles in `styles/globals.css` and Tailwind config for pixel-perfect match.
- Add images into `public/assets/` and reference them in components for a closer visual match.

## Dribbble

 dashboard : `https://dribbble.com/shots/25404102-Dashboard-design-simple-modern-dashboard-with-side-navbar`
 login : `https://dribbble.com/shots/26632001-MUI-Simple-Login`

## social

email : `faeze1377.es@gmail.com`
