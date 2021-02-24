-- CreateTable
CREATE TABLE "SessionEntity" (
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("token")
);
