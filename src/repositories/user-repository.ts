import { User } from '../models/user-model';

exports.createUser = async (input: Partial<User>): Promise<User> => {
  return await User.query().insert(input);
};

exports.getAllUsers = async (): Promise<User[]> => {
  return await User.query();
};

exports.findUserById = async (id: number): Promise<User | undefined> => {
  return await User.query().findById(id);
};

exports.updateUser = async (id: number, data: Partial<User>) => {
  return await User.query().patchAndFetchById(id, data);
};

exports.deleteUser = async (id: number) => {
  return await User.query().deleteById(id);
};
