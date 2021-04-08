/*
  Warnings:

  - You are about to drop the column `userEntityUserId` on the `ReservationEntity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReservationEntity" DROP CONSTRAINT "ReservationEntity_userEntityUserId_fkey";

-- AlterTable
ALTER TABLE "ReservationEntity" DROP COLUMN "userEntityUserId";

-- AddForeignKey
ALTER TABLE "ReservationEntity" ADD FOREIGN KEY ("userId") REFERENCES "UserEntity"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
