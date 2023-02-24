/*
  Warnings:

  - You are about to drop the column `cleanupEventId` on the `DebrisLocationPost` table. All the data in the column will be lost.
  - You are about to drop the `CleanupEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CleanupEventToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `DebrisLocationPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DebrisLocationPost" DROP CONSTRAINT "DebrisLocationPost_cleanupEventId_fkey";

-- DropForeignKey
ALTER TABLE "_CleanupEventToUser" DROP CONSTRAINT "_CleanupEventToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CleanupEventToUser" DROP CONSTRAINT "_CleanupEventToUser_B_fkey";

-- AlterTable
ALTER TABLE "DebrisLocationPost" DROP COLUMN "cleanupEventId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CleanupEvent";

-- DropTable
DROP TABLE "_CleanupEventToUser";

-- AddForeignKey
ALTER TABLE "DebrisLocationPost" ADD CONSTRAINT "DebrisLocationPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
