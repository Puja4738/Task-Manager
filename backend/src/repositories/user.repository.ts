import { User, IUser } from '../models/User.model';

export class UserRepository {
  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).select('+password');
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });
  }

  async findAll(): Promise<IUser[]> {
    return await User.find().select('name email');
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await User.findOne({ email });
    return !!user;
  }
}