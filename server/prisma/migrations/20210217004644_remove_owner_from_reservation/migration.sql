-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "userUserId" TEXT;

-- AddForeignKey
ALTER TABLE "Reservation" ADD FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
