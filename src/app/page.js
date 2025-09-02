"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../store/auth';
import useProjectStore from '../store/project';
import Loader from '../components/Loader';
import Card from '../components/Card';
import Button from '../components/Button';
import PageContainer from '../components/PageContainer';
import AddProjectModal from '../components/AddProjectModal';
import AddOrEditTaskModal from '@/components/AddOrEditTaskModal';

const DashboardPage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { projects, fetchProjects, loading: projectsLoading } = useProjectStore();
  const { tasks, fetchTasks, loading: tasksLoading, addTask } = require('../store/task').default();
  const [showModal, setShowModal] = React.useState(false);
  const [showTaskModal, setShowTaskModal] = React.useState(false);
  const handleAddProjectSuccess = () => {
    fetchProjects(user.uid);
  };
  const handleAddTaskSuccess = async (task) => {
    await addTask({
      ...task,
      id: Date.now(),
      userId: user.uid,
    });
    await fetchTasks(user.uid);
  };

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      fetchProjects(user.uid);
      fetchTasks(user.uid);
    }
  }, [user, fetchProjects, fetchTasks, router]);

  if (!user) return <Loader />;

  return (
    <PageContainer onLogout={logout} title="Dashboard">
      {/* Projects Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-700">Projects</h2>
          <Button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow hover:bg-blue-700 transition" onClick={() => setShowModal(true)}>Add Project</Button>
        </div>
        {projectsLoading ? <Loader /> : (
          <ul className="space-y-4">
            {projects.length === 0 ? (
              <p className="text-gray-500">No projects found.</p>
            ) : (
              projects.map(project => (
                <li key={project.id}>
                  <Card
                    name={project.name}
                    description={project.description}
                    className="cursor-pointer bg-white border border-blue-100 rounded-lg shadow hover:bg-blue-50 transition"
                    onClick={() => router.push(`/project/${project.id}`)}
                  />
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      {/* Tasks Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-700">Tasks</h2>
          <Button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow hover:bg-blue-700 transition" onClick={() => setShowTaskModal(true)}>Add Task</Button>
        </div>
        {tasksLoading ? <Loader /> : (
          <ul className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-gray-500">No tasks found.</p>
            ) : (
              tasks.map(task => (
                <li key={task.id}>
                  <Card
                    name={task.title}
                    description={task.status}
                    className="cursor-pointer bg-white border border-blue-100 rounded-lg shadow hover:bg-blue-50 transition"
                    onClick={() => router.push(`/task/${task.id}`)}
                  />
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      {/* AddProjectModal integration */}
      {showModal && (
        <React.Suspense fallback={null}>
          <AddProjectModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onSuccess={handleAddProjectSuccess}
            userId={user.uid}
          />
        </React.Suspense>
      )}
      {/* AddOrEditTaskModal integration */}
      {showTaskModal && (
        <React.Suspense fallback={null}>
          <AddOrEditTaskModal
            open={showTaskModal}
            onClose={() => setShowTaskModal(false)}
            onSubmit={async ({ title, status }) => {
              await handleAddTaskSuccess({ title, status });
              setShowTaskModal(false);
            }}
            loading={tasksLoading}
          />
        </React.Suspense>
      )}
    </PageContainer>
  );
};

export default DashboardPage;
