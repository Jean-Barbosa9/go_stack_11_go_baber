import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  user_id: string;
  avatar_filename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    avatar_filename,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenicated users can update avatar!', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(avatar_filename);
    }

    const fileName = await this.storageProvider.saveFile(avatar_filename);
    user.avatar = fileName;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
