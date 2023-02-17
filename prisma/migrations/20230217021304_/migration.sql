/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CleanupEventToDebrisLocationPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cleanupEventId` to the `DebrisLocationPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CleanupEventToDebrisLocationPost" DROP CONSTRAINT "_CleanupEventToDebrisLocationPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CleanupEventToDebrisLocationPost" DROP CONSTRAINT "_CleanupEventToDebrisLocationPost_B_fkey";

-- DropForeignKey
ALTER TABLE "_CleanupEventToUser" DROP CONSTRAINT "_CleanupEventToUser_B_fkey";

-- AlterTable
ALTER TABLE "DebrisLocationPost" ADD COLUMN     "cleanupEventId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_CleanupEventToUser" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_CleanupEventToDebrisLocationPost";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "active_expires" BIGINT NOT NULL,
    "idle_expires" BIGINT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "key" (
    "id" TEXT NOT NULL,
    "hashed_password" TEXT,
    "user_id" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL,

    CONSTRAINT "key_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "session_id_key" ON "session"("id");

-- CreateIndex
CREATE INDEX "session_user_id_idx" ON "session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "key_id_key" ON "key"("id");

-- CreateIndex
CREATE INDEX "key_user_id_idx" ON "key"("user_id");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key" ADD CONSTRAINT "key_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebrisLocationPost" ADD CONSTRAINT "DebrisLocationPost_cleanupEventId_fkey" FOREIGN KEY ("cleanupEventId") REFERENCES "CleanupEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CleanupEventToUser" ADD CONSTRAINT "_CleanupEventToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
