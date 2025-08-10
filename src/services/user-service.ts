import { User } from '../models/user-model';

const userRepository = require('../repositories/user-repository');
const filesystem = require('../utilities/filesystem');

exports.getAllUsers = async (): Promise<User[]> => {
  return await userRepository.getAllUsers();
};

exports.getUserById = async (id: number) => {
  return await userRepository.getUserById(id);
};

exports.createUser = async (data: Partial<User>) => {
  if (data.files && data.files.length > 0) {
    const avatar = data.files.filter((file: any) => file.fieldname === 'avatar');
    const avatarPath = await filesystem.upload(avatar[0], 'users');
    data.avatar = avatarPath;
  }
  delete data.files;

  return await userRepository.createUser(data);
};

exports.updateUser = async (existingUser: User, data: Partial<User>) => {
  if (data.files && data.files.length > 0) {
    const avatar = data.files.filter((file: any) => file.fieldname === 'avatar');
    const avatarPath = await filesystem.update(existingUser.avatar, avatar[0], 'users');
    data.avatar = avatarPath;
  }
  delete data.files;

  return await userRepository.updateUser(existingUser.id, data);
};

exports.deleteUser = async (existingUser: User) => {
  if (existingUser.avatar) {
    await filesystem.remove(existingUser.avatar);
  }
  return await userRepository.deleteUser(existingUser.id);
};
