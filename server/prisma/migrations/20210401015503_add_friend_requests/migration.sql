-- CreateTable
CREATE TABLE "FriendRequestEntity" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequestEntity.senderId_recipientId_unique" ON "FriendRequestEntity"("senderId", "recipientId");
