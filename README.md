# CourseKit Vue Template

A minimal React 17 template for a CourseKit frontend site.

Live demo: [https://coursekit-react-template.netlify.app](https://coursekit-react-template.netlify.app)

## Installation

```bash
npm install
```

## Connecting school with .env

1. Create an account at [https://coursekit.dev](https://coursekit.dev)

2. In dashboard, go to *Schools* tab and get School ID.

3. Copy .env.example file

```bash
cp .env.example .env
```

4. Set `REACT_APP_SCHOOL_ID=` to your school ID in .env

```
REACT_APP_SCHOOL_ID=sc73jmdoi3
```

## Running server

```bash
npm run start
```

## School URL

By default, the dev server runs on port 3000. If you use a different poty, ensure that the School URL matches the dev server URL so that log in and log out redirects work correctly.
