/** @format */

import { prisma } from "../config/prisma";

export class RolePermissionRepository {
  async assignPermissionToRole(roleId: string, permissionId: string) {
    await this.validatePermissionId(permissionId);
    await this.validateRoleId(roleId);
    return prisma.rolePermission.create({
      data: {
        sysPermissionId: permissionId,
        sysUserRoleId: roleId,
      },
    });
  }

  async removePermissionFromRole(roleId: string, permissionId: string) {
    await this.validatePermissionId(permissionId);
    await this.validateRoleId(roleId);

    return prisma.rolePermission.delete({
      where: {
        sysPermissionId_sysUserRoleId: {
          sysPermissionId: permissionId,
          sysUserRoleId: roleId,
        },
      },
    });
  }

  async getPermissionsByRole(roleId: string) {
    await this.validateRoleId(roleId);

    return prisma.rolePermission.findMany({
      where: {
        sysUserRoleId: roleId,
      },
      include: {
        user_permissions: true,
      },
    });
  }

  async getRolesInPermission(permissionId: string) {
    await this.validatePermissionId(permissionId);

    return prisma.rolePermission.findMany({
      where: {
        sysPermissionId: permissionId,
      },
      include: {
        user_role: true,
      },
    });
  }

  async isPermissionAssignedToRole(roleId: string, permissionId: string) {
    await this.validatePermissionId(permissionId);
    await this.validateRoleId(roleId);
    const isAssigned = await prisma.rolePermission.findUnique({
      where: {
        sysPermissionId_sysUserRoleId: {
          sysPermissionId: permissionId,
          sysUserRoleId: roleId,
        },
      },
    });
    return !!isAssigned;
  }

  private async validatePermissionId(id: string) {
    const permissionIdExist = await prisma.systemPermissions.findUnique({
      where: { id },
    });

    if (!permissionIdExist) {
      throw new Error(`permission ${id} does not exist`);
    }
  }
  private async validateRoleId(id: string) {
    const roleExist = await prisma.sysRole.findUnique({ where: { id } });

    if (!roleExist) {
      throw new Error(`Role ${id} does not exist`);
    }
  }
}
