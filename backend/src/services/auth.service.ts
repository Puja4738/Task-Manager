import { UserRepository } from '../repositories/user.repository';
import { RegisterDtoType, LoginDtoType } from '../dtos/auth.dto';
import { generateToken } from '../utils/jwt.util';
import { IUser } from '../models/User.model';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(userData: RegisterDtoType): Promise<{ user: IUser; token: string }> {
    const emailExists = await this.userRepository.emailExists(userData.email);
    if (emailExists) {
      throw new Error('Email already registered');
    }

    const user = await this.userRepository.create(userData);
    const token = generateToken(user._id.toString());

    return { user, token };
  }

  async login(credentials: LoginDtoType): Promise<{ user: IUser; token: string }> {
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await user.comparePassword(credentials.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user._id.toString());
    user.password = undefined as any;

    return { user, token };
  }

  async getCurrentUser(userId: string): Promise<IUser> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}