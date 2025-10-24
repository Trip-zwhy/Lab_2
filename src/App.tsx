import React, { useState } from 'react';
import { Note, NoteFormData } from './types/Note';
import { useLocalStorage } from './hooks/useLocalStorage';
import { createNote, updateNote, searchNotes, sortNotesByDate } from './utils/noteUtils';
import { NoteCard } from './components/NoteCard';
import { NoteForm } from './components/NoteForm';
import { SearchBar } from './components/SearchBar';
import { EmptyState } from './components/EmptyState';
import { Plus, Search, FileText } from 'lucide-react';

function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  const filteredNotes = sortNotesByDate(searchNotes(notes, searchQuery));

  const handleCreateNote = () => {
    setEditingNote(undefined);
    setShowForm(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleSubmitNote = (formData: NoteFormData) => {
    if (editingNote) {
      // 更新现有笔记
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === editingNote.id
            ? updateNote(note, formData)
            : note
        )
      );
    } else {
      // 创建新笔记
      const newNote = createNote(formData.title, formData.content, formData.tags);
      setNotes(prevNotes => [newNote, ...prevNotes]);
    }
    setShowForm(false);
    setEditingNote(undefined);
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm('确定要删除这篇笔记吗？')) {
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingNote(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Note Taking App</h1>
            </div>
            <button
              onClick={handleCreateNote}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={20} />
              New Note
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search notes by title, content, or tags..."
          />
        </div>

        {/* Notes Grid */}
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        ) : (
          <EmptyState onCreateNote={handleCreateNote} />
        )}

        {/* Search Results Empty State */}
        {searchQuery && filteredNotes.length === 0 && notes.length > 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No matching notes found</h3>
            <p className="text-gray-500 mb-6">
              Try using different keywords to search, or create a new note
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="btn-secondary mr-4"
            >
              Clear Search
            </button>
            <button
              onClick={handleCreateNote}
              className="btn-primary"
            >
              Create Note
            </button>
          </div>
        )}
      </main>

      {/* Note Form Modal */}
      {showForm && (
        <NoteForm
          note={editingNote}
          onSubmit={handleSubmitNote}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
}

export default App;
