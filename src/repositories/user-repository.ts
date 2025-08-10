import { User } from '../models/user-model';

// get all users
exports.getAllUsers = async (): Promise<User[]> => {
  return await User.query();
};

// find by id
exports.findById = async (id: number): Promise<User | undefined> => {
  return await User.query().findById(id);
};

// update
exports.updateById = async (id: number, data: Partial<User>) => {
  return await User.query().patchAndFetchById(id, data);
};

// delete
exports.deleteById = async (id: number) => {
  return await User.query().deleteById(id);
};
