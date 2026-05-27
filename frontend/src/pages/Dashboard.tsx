import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { OverdueTasks } from '../components/dashboard/OverdueTasks';
import { TaskList } from '../components/tasks/TaskList';
import { Modal } from '../components/common/Modal';
import { TaskForm } from '../components/tasks/TaskForm';
import { Button } from '../components/common/Button';
import {
  useMyAssignedTasks,
  useMyCreatedTasks,
  useOverdueTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from '../hooks/useTasks';
import { Task, CreateTaskDto } from '../types';
import { Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { data: assignedTasks = [], isLoading: loadingAssigned } =
    useMyAssignedTasks();

  const { data: createdTasks = [], isLoading: loadingCreated } =
    useMyCreatedTasks();

  const { data: overdueTasks = [], isLoading: loadingOverdue } =
    useOverdueTasks();

  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const handleCreateTask = async (data: CreateTaskDto) => {
    try {
      await createTaskMutation.mutateAsync(data);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Create task error:', error);
    }
  };

  const handleUpdateTask = async (data: CreateTaskDto) => {
    if (!selectedTask) return;

    try {
      await updateTaskMutation.mutateAsync({
        id: selectedTask._id,
        data,
      });
      setIsEditModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Update task error:', error);
    }
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTaskMutation.mutateAsync(id);
      } catch (error) {
        console.error('Delete task error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's your task overview.
            </p>
          </div>

          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center"
          >
            <Plus size={20} className="mr-2" />
            New Task
          </Button>
        </div>

        <DashboardStats
          assignedTasks={assignedTasks}
          createdTasks={createdTasks}
          overdueTasks={overdueTasks}
        />

       {loadingOverdue ? (
  <p className="text-gray-500 mb-6">Loading overdue tasks...</p>
) : (
  <OverdueTasks
    tasks={overdueTasks}
    onEdit={handleEditClick}
    onDelete={handleDeleteTask}
  />
)}


        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            My Assigned Tasks ({assignedTasks.length})
          </h2>
          <TaskList
            tasks={assignedTasks}
            isLoading={loadingAssigned}
            onEdit={handleEditClick}
            onDelete={handleDeleteTask}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tasks I Created ({createdTasks.length})
          </h2>
          <TaskList
            tasks={createdTasks}
            isLoading={loadingCreated}
            onEdit={handleEditClick}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Task"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={createTaskMutation.isPending}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        }}
        title="Edit Task"
      >
        <TaskForm
          task={selectedTask || undefined}
          onSubmit={handleUpdateTask}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedTask(null);
          }}
          isLoading={updateTaskMutation.isPending}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
