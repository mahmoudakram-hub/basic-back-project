/** @format */

import type { SystemPermissionsCreateManyInput } from "../../generated/prisma/models";
import { prisma } from "../config/prisma";

export class SystemPermissionsRepository {
  async createPermissions(data: SystemPermissionsCreateManyInput) {
    return prisma.systemPermissions.createMany({
      data,
    });
  }
}
