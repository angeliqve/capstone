import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request-type';

const userService = require('../services/user-service');

// create user
exports.create = async (req: Request, res: Response) => {
  const input = req.body;

  try {
    // validasi sederhana
    if (!input.name || !input.email || !input.password) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Name, email, dan password wajib diisi!',
      });
    }

    const newUser = await userService.createUser(input);

    return res.status(201).json({
      statusCode: 201,
      message: 'Berhasil membuat user!',
      data: newUser,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// mendapatkan list users
exports.index = async (req: Request, res: Response) => {
  try {
    const userData = await userService.getAllUsers(); 

    if (!userData || userData.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data user kosong!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Sukses mendapatkan user!',
      data: userData,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// update user berdasarkan id
exports.update = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const input = req.body;

  try {
    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan!',
      });
    }

    const updatedUser = await userService.updateUser(user, input);
    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil update data user!',
      data: updatedUser,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// hapus user berdasarkan id nya
exports.deleteById = async (req: AuthenticatedRequest, res: Response) => {
  const userId = Number(req.params.id); 

  try {
    // cek apakah user ada
    const user = await userService.findUserById(userId); 
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan!',
      });
    }

    // hapus user
    const deletedUser = await userService.deleteUser(user); 
    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil hapus user!',
      data: deletedUser,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};
