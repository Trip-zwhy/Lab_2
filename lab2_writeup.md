# Note Taking App

A modern note-taking application built with React + TypeScript + Tailwind CSS, featuring local storage and search functionality.

## Features

- ✨ Create, edit, and delete notes
- 🔍 Real-time search (title, content, tags)
- 🏷️ Tag system
- 💾 Local storage
- 📱 Responsive design
- 🎨 Modern UI interface

## Tech Stack

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:5173`

## Build and Deploy

1. Build the project:
```bash
npm run build
```

2. Preview the build:
```bash
npm run preview
```

## Deploy to Vercel

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Vercel will automatically detect this as a Vite project and deploy it

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Usage

1. **Create Note**: Click the "New Note" button in the top right corner
2. **Edit Note**: Click the edit icon on a note card
3. **Delete Note**: Click the delete icon on a note card
4. **Search Notes**: Use the search bar to search by title, content, or tags
5. **Add Tags**: Add tags when editing a note for categorization

## Project Structure

```
src/
├── components/          # React components
│   ├── NoteCard.tsx    # Note card component
│   ├── NoteForm.tsx    # Note form component
│   ├── SearchBar.tsx   # Search bar component
│   └── EmptyState.tsx  # Empty state component
├── hooks/              # Custom Hooks
│   └── useLocalStorage.ts
├── types/              # TypeScript type definitions
│   └── Note.ts
├── utils/              # Utility functions
│   └── noteUtils.ts
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```
