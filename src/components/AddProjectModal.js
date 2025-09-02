import React, { useState, useEffect, use } from 'react';
import useTaskStore from '../store/task';
import useProjectStore from '../store/project';
import Input from './Input';
import Button from './Button';
import AddOrEditTaskModal from './AddOrEditTaskModal';

const AddProjectModal = ({ open, onClose, onSuccess, userId }) => {
  const { addTask } = useTaskStore();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);
  const { tasks, fetchTasks } = useTaskStore();
  const { addProject } = useProjectStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && userId) {
      fetchTasks(userId);
    }
  }, [open, userId, fetchTasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newProject = {
      id: Date.now(),
      name,
      description,
      tasks: selectedTasks,
      userId,
    };
    await addProject(newProject);
    setLoading(false);
    setName('');
    setDescription('');
    setSelectedTasks([]);
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
  <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10 ${open ? '' : 'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border border-blue-100">
        <h2 className="text-xl font-bold mb-6 text-blue-700 cursor-pointer">Add Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" value={name} onChange={e => setName(e.target.value)} required className="bg-gray-50" />
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              className="w-full border rounded px-3 py-2 bg-gray-50"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Tasks</label>
            <div className="grid grid-cols-1 gap-2 mb-2">
              {tasks.map(task => (
                <label key={task.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(task.id)}
                    onChange={e => {
                      if (e.target.checked) {
                        setSelectedTasks([...selectedTasks, task.id]);
                      } else {
                        setSelectedTasks(selectedTasks.filter(tid => tid !== task.id));
                      }
                    }}
                  />
                  <span>{task.title}</span>
                </label>
              ))}
            </div>
            <Button type="button" onClick={() => setShowTaskModal(true)} className="mb-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow hover:bg-blue-700 transition">Add Task</Button>
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" onClick={onClose} variant="outlined" className="bg-gray-100 text-gray-700 hover:bg-gray-200">Cancel</Button>
            <Button type="submit" disabled={loading || selectedTasks.length === 0} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow hover:bg-blue-700 transition">{loading ? 'Adding...' : 'Add Project'}</Button>
          </div>
        </form>
        <AddOrEditTaskModal
          open={showTaskModal}
          onClose={() => setShowTaskModal(false)}
          onSubmit={async ({ title, status }) => {
            setTaskLoading(true);
            await addTask({
              id: Date.now(),
              userId,
              title,
              status,
            });
            await fetchTasks(userId); // Wait for tasks to update
            setTaskLoading(false);
            setShowTaskModal(false);
          }}
          loading={taskLoading}
        />
      </div>
    </div>
  );
};

export default AddProjectModal;
