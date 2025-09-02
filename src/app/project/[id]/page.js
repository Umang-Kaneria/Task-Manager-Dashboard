"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import useAuthStore from '../../../store/auth';
import useProjectStore from '../../../store/project';
import useTaskStore from '../../../store/task';
import Loader from '../../../components/Loader';
import Card from '../../../components/Card';
import PageContainer from '../../../components/PageContainer';

const ProjectDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const user = useAuthStore((state) => state.user);
  const { projects, fetchProjects, loading: projectsLoading } = useProjectStore();
  const { tasks, fetchTasks, loading: tasksLoading } = useTaskStore();
  const [project, setProject] = useState(null);
  const [projectTasks, setProjectTasks] = useState([]);

  useEffect(() => {
    if (user && id) {
      fetchProjects(user.uid);
      fetchTasks(user.uid);
    }
  }, [user, fetchProjects, fetchTasks]);

  useEffect(() => {
    if (projects && id) {
      const found = projects.find(p => String(p.id) === String(id));
      setProject(found);
      if (found && found.tasks && tasks) {
        setProjectTasks(tasks.filter(t => found.tasks.includes(t.id)));
      }
    }
  }, [projects, tasks, id]);

  if (projectsLoading || tasksLoading) return <Loader />;
  if (!project) return (
    <PageContainer title="Project Details" showBack={true} onBack={() => router.push('/')} onLogout={() => router.push('/login')}>
      <Card name="Project not found" description="No project with this ID exists." />
    </PageContainer>
  );

  return (
    <PageContainer title="Project Details" showBack={true} onBack={() => router.push('/')} onLogout={() => router.push('/login')}> 
      <Card name={project.name} description={project.description}>
        <h4 className="font-semibold mt-4 mb-2">Tasks</h4>
        {projectTasks.length === 0 ? (
          <p className="text-gray-500">No tasks associated with this project.</p>
        ) : (
          <ul className="list-disc pl-5">
            {projectTasks.map(task => (
              <li key={task.id}>
                <button
                  className="font-medium text-blue-600 hover:underline"
                  onClick={() => router.push(`/task/${task.id}`)}
                >
                  {task.title}
                </button>
                {' '} - {task.status}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </PageContainer>
  );
};

export default ProjectDetailPage;
