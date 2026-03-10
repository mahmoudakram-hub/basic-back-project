/** @format */

import type {
  SysUserCreateInput,
  SysUserUpdateInput,
} from "../../generated/prisma/models";
import { prisma } from "../config/prisma";
import type { Pagination } from "../types/global-types";

type UpdateUserWithoutPassword = Omit<SysUserUpdateInput, "password">;

export class SysUserRepository {
  async getAllSysUsers(pagination: Pagination) {
    const where = pagination.query
      ? {
          OR: [
            {
              name: {
                contains: pagination.query,
              },
            },
            {
              email: {
                contains: pagination.query,
              },
            },
          ],
        }
      : {};

    const usersQueiry = {
      where,
      orderBy: {
        [pagination.orderby]: pagination.order,
      },
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
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
    };

    const [users, total] = await Promise.all([
      prisma.sysUser.findMany(usersQueiry),
      prisma.sysUser.count({ where }),
    ]);

    const pages = Math.ceil(total / pagination.limit);

    return {
      data: users,
      meta: {
        total,
        pages,
        page: pagination.page,
        limit: pagination.limit,
      },
    };
  }

  async getUserById(id: string) {
    return prisma.sysUser.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteUser(id: string) {
    return prisma.sysUser.delete({
      where: { id },
    });
  }

  async deletManyUser(data: []) {
    return prisma.sysUser.deleteMany({
      where: {
        id: {
          in: data,
        },
      },
    });
  }

  async editeUserById(id: string, data: UpdateUserWithoutPassword) {
    return prisma.sysUser.update({
      where: {
        id,
      },
      data,
    });
  }

  async createUser(data: SysUserCreateInput) {
    return prisma.sysUser.create({
      data,
    });
  }

  async updateUserPassword(id: string, hashedPassword: string) {
    return prisma.sysUser.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });
  }
}
