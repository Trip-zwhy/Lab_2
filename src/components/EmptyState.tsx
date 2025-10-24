import React from 'react';
import { FileText, Plus } from 'lucide-react';

interface EmptyStateProps {
  onCreateNote: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateNote }) => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <FileText className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        Start creating your first note to capture your thoughts and ideas
      </p>
      <button
        onClick={onCreateNote}
        className="btn-primary inline-flex items-center gap-2"
      >
        <Plus size={20} />
        Create Note
      </button>
    </div>
  );
};
