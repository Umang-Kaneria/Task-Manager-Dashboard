"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import useAuthStore from '../../../store/auth';
import useTaskStore from '../../../store/task';
import Loader from '../../../components/Loader';
import Card from '../../../components/Card';
import PageContainer from '../../../components/PageContainer';

const TaskDetailPage = () => {
  const { updateTask } = useTaskStore();
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editStatus, setEditStatus] = useState('todo');
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const user = useAuthStore((state) => state.user);
  const { tasks, fetchTasks, loading } = useTaskStore();
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (user) {
      fetchTasks(user.uid);
    }
  }, [user, fetchTasks]);

  useEffect(() => {
    if (tasks && id) {
      const found = tasks.find(t => String(t.id) === String(id));
      setTask(found);
    }
  }, [tasks, id]);

  useEffect(() => {
    if (editMode && task) {
      setEditTitle(task.title);
      setEditStatus(task.status);
    }
  }, [editMode, task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask({
      ...task,
      title: editTitle,
      status: editStatus,
    });
    setEditMode(false);
    if (user) {
      await fetchTasks(user.uid);
    }
  };

  if (loading) return <Loader />;
  if (!task) return (
    <PageContainer title="Task Details" showHeader={true} showBack={true} onBack={() => router.push('/')} onLogout={() => router.push('/login')}>
      <Card name="Task not found" description="No task with this ID exists." />
    </PageContainer>
  );

  return (
    <PageContainer title="Task Details" showHeader={true} showBack={true} onBack={() => router.push('/')} onLogout={() => router.push('/login')}>
      {editMode ? (
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Title</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Status</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={editStatus}
                onChange={e => setEditStatus(e.target.value)}
                required
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="flex gap-2 justify-end">
              <button type="button" className="px-4 py-2 border rounded" onClick={() => setEditMode(false)}>Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            </div>
          </form>
        </Card>
      ) : (
        <Card name={task.title} description={task.status}>
          <button className="mt-4 text-blue-500" onClick={() => setEditMode(true)}>Edit</button>
        </Card>
      )}
    </PageContainer>
  );
};

export default TaskDetailPage;
