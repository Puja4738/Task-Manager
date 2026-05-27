import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { TaskFilters } from '../components/tasks/TaskFilters';
import { TaskList } from '../components/tasks/TaskList';
import { Modal } from '../components/common/Modal';
import { TaskForm } from '../components/tasks/TaskForm';
import { Button } from '../components/common/Button';
import {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from '../hooks/useTasks';
import { Task, CreateTaskDto } from '../types';
import { Plus } from 'lucide-react';

const Tasks: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<{
    status?: string;
    priority?: string;
    sortBy?: string;
  }>({});

  const { data: tasks = [], isLoading } = useTasks(filters);
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
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">All Tasks</h1>
            <p className="text-gray-600 mt-1">Manage and organize all your tasks</p>
          </div>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center"
          >
            <Plus size={20} className="mr-2" />
            New Task
          </Button>
        </div>

        {/* Filters */}
        <TaskFilters filters={filters} onFilterChange={setFilters} />

        {/* Tasks Display */}
        <div className="mt-6">
          <TaskList
            tasks={tasks}
            isLoading={isLoading}
            onEdit={handleEditClick}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>

      {/* Create Modal */}
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

      {/* Edit Modal */}
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

export default Tasks;