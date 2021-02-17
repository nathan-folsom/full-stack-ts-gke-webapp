/*
  Warnings:

  - You are about to drop the column `userUserId` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userUserId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "userUserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
