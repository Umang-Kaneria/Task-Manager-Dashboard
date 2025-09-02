"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/auth';
import { useTaskStore } from '../../store/task';
import Loader from '../../components/Loader';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import ErrorMessage from '../../components/ErrorMessage';
import PageContainer from '../../components/PageContainer';

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const TaskPage = ({ params }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { tasks, fetchTasks, updateTask, deleteTask, loading } = useTaskStore();
  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchTasks();
  }, [user, fetchTasks, router]);

  useEffect(() => {
    if (tasks && params?.slug) {
      const found = tasks.find(t => t.id === params.slug);
      setTask(found);
      setTitle(found?.title || '');
      setDescription(found?.description || '');
      setStatus(found?.status || 'todo');
    }
  }, [tasks, params]);

  if (!user || loading) return <Loader />;
  if (!task) return (
    <PageContainer showHeader={true} onLogout={() => router.push('/login')} title="Task Details" showBack={true} onBack={() => router.push('/')}> 
      <ErrorMessage message="Task not found." />
    </PageContainer>
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await updateTask(task.id, { title, description, status });
      setEditMode(false);
    } catch (err) {
      setError(err.message || 'Update failed');
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    setSaving(true);
    setError('');
    try {
      await deleteTask(task.id);
      router.push('/');
    } catch (err) {
      setError(err.message || 'Delete failed');
    }
    setSaving(false);
  };

  return (
    <PageContainer showHeader={true} onLogout={() => router.push('/login')} title="Task Details" showBack={true} onBack={() => router.push('/')}> 
      <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-md p-8 border border-gray-100">
        {editMode ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <Input label="Title" value={title} onChange={e => setTitle(e.target.value)} required className="bg-gray-50" />
            <Input label="Description" value={description} onChange={e => setDescription(e.target.value)} required className="bg-gray-50" />
            <Select label="Status" value={status} onChange={e => setStatus(e.target.value)} options={statusOptions} className="bg-gray-50" />
            {error && <ErrorMessage message={error} />}
            <div className="flex gap-2">
              <Button type="submit" disabled={saving} className="bg-blue-100 text-blue-700 hover:bg-blue-200">{saving ? 'Saving...' : 'Save'}</Button>
              <Button type="button" onClick={() => setEditMode(false)} variant="outlined" className="bg-gray-100 text-gray-700 hover:bg-gray-200">Cancel</Button>
            </div>
          </form>
        ) : (
          <Card title={task.title} description={task.description} className="bg-gray-50 border border-gray-100 rounded-lg p-6">
            <div className="mt-2 text-sm text-blue-500">Status: {task.status}</div>
            <div className="flex gap-2 mt-4">
              <Button onClick={() => setEditMode(true)} className="bg-blue-100 text-blue-700 hover:bg-blue-200">Edit</Button>
              <Button onClick={handleDelete} variant="danger" className="bg-red-100 text-red-700 hover:bg-red-200">Delete</Button>
              <Button onClick={() => router.push('/')} className="bg-gray-100 text-gray-700 hover:bg-gray-200">Back</Button>
            </div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default TaskPage;
