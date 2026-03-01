/** @format */

import { prisma } from "../config/prisma";

export class SysUserRepository {
  async getAllSysUsers() {
    return prisma.sysUser.findMany({
      select: {
        createdAt: true,
        email: true,
        isActive: true,
        id: true,
        name: true,
        phone: true,
        lastLogin: true,
        sysUserRole: {
          select: {
            id: true,
            name: true,
          },
        },
        updatedAt: true,
      },
    });
  }

  async getUserById(id: string) {
    return prisma.sysUser.findUnique({
      where: {
        id,
      },
    });
  }
}
