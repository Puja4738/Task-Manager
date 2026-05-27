import { UserRepository } from '../repositories/user.repository';
import { UpdateUserDtoType } from '../dtos/user.dto';
import { IUser } from '../models/User.model';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(userId: string): Promise<IUser> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(userId: string, userData: UpdateUserDtoType): Promise<IUser> {
    if (userData.email) {
      const emailExists = await this.userRepository.emailExists(userData.email);
      const currentUser = await this.userRepository.findById(userId);

      if (emailExists && currentUser?.email !== userData.email) {
        throw new Error('Email already in use');
      }
    }

    const updatedUser = await this.userRepository.update(userId, userData);
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }

    return updatedUser;
  }
}