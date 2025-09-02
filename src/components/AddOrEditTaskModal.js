import React, { useState } from 'react';
import Button from './Button';

const statusOptions = [
  { title: 'Todo', value: 'todo' },
  { title: 'In Progress', value: 'in_progress' },
  { title: 'Done', value: 'done' },
];

const AddOrEditTaskModal = ({ open, onClose, onSubmit, initialTitle = '', initialStatus = 'todo', loading = false }) => {
  const [title, setTitle] = useState(initialTitle);
  const [status, setStatus] = useState(initialStatus);

  React.useEffect(() => {
    if (open) {
      setTitle(initialTitle);
      setStatus(initialStatus);
    }
  }, [open, initialTitle, initialStatus]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, status });
  };

  return (
    <div className="fixed inset-0  backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border border-blue-100">
          <h2 className="text-xl font-bold mb-6 text-blue-700">{initialTitle ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={status}
              onChange={e => setStatus(e.target.value)}
              required
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.title}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" onClick={onClose} variant="outlined">Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow hover:bg-blue-700 transition">{loading ? 'Saving...' : (initialTitle ? 'Save' : 'Add Task')}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrEditTaskModal;
