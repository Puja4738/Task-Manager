import { Task, ITask } from '../models/Task.model';

export class TaskRepository {
  async create(taskData: Partial<ITask>): Promise<ITask> {
    const task = new Task(taskData);
    return await task.save();
  }

  async findById(id: string): Promise<ITask | null> {
    return await Task.findById(id)
      .populate('creatorId', 'name email')
      .populate('assignedToId', 'name email');
  }

  async update(id: string, taskData: Partial<ITask>): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(id, taskData, {
      new: true,
      runValidators: true,
    })
      .populate('creatorId', 'name email')
      .populate('assignedToId', 'name email');
  }

  async delete(id: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(id);
  }

  async findAll(filters: any = {}, sortBy: string = '-createdAt'): Promise<ITask[]> {
    return await Task.find(filters)
      .populate('creatorId', 'name email')
      .populate('assignedToId', 'name email')
      .sort(sortBy);
  }

  async findByAssignee(userId: string): Promise<ITask[]> {
    return await Task.find({ assignedToId: userId })
      .populate('creatorId', 'name email')
      .populate('assignedToId', 'name email')
      .sort('-createdAt');
  }

  async findByCreator(userId: string): Promise<ITask[]> {
    return await Task.find({ creatorId: userId })
      .populate('creatorId', 'name email')
      .populate('assignedToId', 'name email')
      .sort('-createdAt');
  }

  async findOverdue(): Promise<ITask[]> {
    return await Task.find({
      dueDate: { $lt: new Date() },
      status: { $ne: 'Completed' },
    })
      .populate('creatorId', 'name email')
      .populate('assignedToId', 'name email')
      .sort('dueDate');
  }
}