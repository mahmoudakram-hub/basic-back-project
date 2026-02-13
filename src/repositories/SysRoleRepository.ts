/** @format */

import type {
  SysRoleCreateInput,
  SysRoleUpdateInput,
} from "../../generated/prisma/models";
import { prisma } from "../config/prisma";

export class SysRoleRepository {
  async createRole(data: SysRoleCreateInput) {
    return prisma.sysRole.create({
      data,
    });
  }

  async updateRole(id: string, data: SysRoleUpdateInput) {
    return prisma.sysRole.update({ where: { id }, data });
  }

  async deleteRole(id: string) {
    return prisma.sysRole.delete({ where: { id } });
  }

  async getAll() {
    return prisma.sysRole.findMany();
  }

  async getRoleById(id: string) {
    return prisma.sysRole.findUnique({ where: { id } });
  }
}
