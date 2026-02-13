/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropTable
DROP TABLE `post`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `SysRole` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SysRole_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolePermission` (
    `sysPermissions` VARCHAR(191) NOT NULL,
    `sysUserRoleId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`sysPermissions`, `sysUserRoleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SystemPermissions` (
    `id` VARCHAR(191) NOT NULL,
    `model` ENUM('user') NOT NULL,
    `action` ENUM('CREATE', 'READ', 'UPDATE', 'DELETE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SystemPermissions_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `lastLogin` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `sysUserRoleId` VARCHAR(191) NULL,

    UNIQUE INDEX `sys_user_id_key`(`id`),
    UNIQUE INDEX `sys_user_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_sysUserRoleId_fkey` FOREIGN KEY (`sysUserRoleId`) REFERENCES `SysRole`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_sysPermissions_fkey` FOREIGN KEY (`sysPermissions`) REFERENCES `SystemPermissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_user` ADD CONSTRAINT `sys_user_sysUserRoleId_fkey` FOREIGN KEY (`sysUserRoleId`) REFERENCES `SysRole`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
