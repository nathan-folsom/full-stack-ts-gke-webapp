/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[userId]` on the table `SessionEntity`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SessionEntity.userId_unique" ON "SessionEntity"("userId");
