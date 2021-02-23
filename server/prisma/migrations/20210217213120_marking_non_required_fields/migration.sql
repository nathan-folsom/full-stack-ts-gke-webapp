/*
  Warnings:

  - Added the required column `message` to the `ReservationEntity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FriendEntity" ALTER COLUMN "created" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ReservationEntity" ADD COLUMN     "message" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserEntity" ALTER COLUMN "created" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;
