"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../store/auth';
import useProjectStore from '../../store/project';
import Loader from '../../components/Loader';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ErrorMessage from '../../components/ErrorMessage';
import PageContainer from '../../components/PageContainer';

const ProjectPage = ({ params }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { projects, fetchProjects, updateProject, deleteProject, loading } = useProjectStore();
  const [project, setProject] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchProjects();
  }, [user, fetchProjects, router]);

  useEffect(() => {
    if (projects && params?.slug) {
      const found = projects.find(p => p.id === params.slug);
      setProject(found);
      setName(found?.name || '');
      setDescription(found?.description || '');
    }
  }, [projects, params]);

  if (!user || loading) return <Loader />;
  if (!project) return (
    <PageContainer>
      <ErrorMessage message="Project not found." />
      <Button onClick={() => router.push('/')}>Back to Dashboard</Button>
    </PageContainer>
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await updateProject(project.id, { name, description });
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
      await deleteProject(project.id);
      router.push('/');
    } catch (err) {
      setError(err.message || 'Delete failed');
    }
    setSaving(false);
  };

  return (
    <PageContainer>
      <div className="w-full max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6">Project Details</h1>
        {editMode ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <Input label="Name" value={name} onChange={e => setName(e.target.value)} required />
            <Input label="Description" value={description} onChange={e => setDescription(e.target.value)} required />
            {error && <ErrorMessage message={error} />}
            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
              <Button type="button" onClick={() => setEditMode(false)} variant="outlined">Cancel</Button>
            </div>
          </form>
        ) : (
          <Card title={project.name} description={project.description}>
            <div className="flex gap-2 mt-4">
              <Button onClick={() => setEditMode(true)}>Edit</Button>
              <Button onClick={handleDelete} variant="danger">Delete</Button>
              <Button onClick={() => router.push('/')}>Back</Button>
            </div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default ProjectPage;
