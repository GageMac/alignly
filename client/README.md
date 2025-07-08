# Alignly Frontend

Vue 3 + TypeScript + Tailwind CSS frontend for the Alignly resume optimization tool.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

This will start the development server on `http://localhost:5173` with API proxy to `http://localhost:5000`.

## Features

- Resume and job description input forms
- Real-time API communication with the .NET backend
- Loading states and error handling
- Clean display of optimized resume, extracted sections, and suggestions
- Responsive design with Tailwind CSS

## API Integration

The frontend automatically proxies `/api/*` requests to the backend running on port 5000.

Make sure your .NET API is running on `http://localhost:5000` before testing.
