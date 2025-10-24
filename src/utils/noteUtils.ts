import { Note } from '../types/Note';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const createNote = (title: string, content: string, tags: string[] = []): Note => {
  const now = new Date();
  return {
    id: generateId(),
    title: title.trim(),
    content: content.trim(),
    createdAt: now,
    updatedAt: now,
    tags: tags.filter(tag => tag.trim() !== '')
  };
};

export const updateNote = (note: Note, updates: Partial<Pick<Note, 'title' | 'content' | 'tags'>>): Note => {
  return {
    ...note,
    ...updates,
    updatedAt: new Date()
  };
};

export const searchNotes = (notes: Note[], query: string): Note[] => {
  if (!query.trim()) return notes;
  
  const lowercaseQuery = query.toLowerCase();
  return notes.filter(note => 
    note.title.toLowerCase().includes(lowercaseQuery) ||
    note.content.toLowerCase().includes(lowercaseQuery) ||
    note.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const sortNotesByDate = (notes: Note[], ascending: boolean = false): Note[] => {
  return [...notes].sort((a, b) => {
    const dateA = new Date(a.updatedAt).getTime();
    const dateB = new Date(b.updatedAt).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

