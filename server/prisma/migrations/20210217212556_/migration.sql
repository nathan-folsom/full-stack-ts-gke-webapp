/*
  Warnings:

  - You are about to drop the `Friend` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_userId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userUserId_fkey";

-- CreateTable
CREATE TABLE "UserEntity" (
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "FriendEntity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservationEntity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "userEntityUserId" TEXT,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "Friend";

-- DropTable
DROP TABLE "Reservation";

-- DropTable
DROP TABLE "User";

-- CreateIndex
CREATE UNIQUE INDEX "UserEntity.username_unique" ON "UserEntity"("username");

-- AddForeignKey
ALTER TABLE "FriendEntity" ADD FOREIGN KEY ("userId") REFERENCES "UserEntity"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationEntity" ADD FOREIGN KEY ("userEntityUserId") REFERENCES "UserEntity"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
