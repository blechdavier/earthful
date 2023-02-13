-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CleanupEvent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CleanupEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DebrisLocationPost" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "debrisType" INTEGER NOT NULL,

    CONSTRAINT "DebrisLocationPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CleanupEventToDebrisLocationPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CleanupEventToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CleanupEventToDebrisLocationPost_AB_unique" ON "_CleanupEventToDebrisLocationPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CleanupEventToDebrisLocationPost_B_index" ON "_CleanupEventToDebrisLocationPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CleanupEventToUser_AB_unique" ON "_CleanupEventToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CleanupEventToUser_B_index" ON "_CleanupEventToUser"("B");

-- AddForeignKey
ALTER TABLE "_CleanupEventToDebrisLocationPost" ADD CONSTRAINT "_CleanupEventToDebrisLocationPost_A_fkey" FOREIGN KEY ("A") REFERENCES "CleanupEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CleanupEventToDebrisLocationPost" ADD CONSTRAINT "_CleanupEventToDebrisLocationPost_B_fkey" FOREIGN KEY ("B") REFERENCES "DebrisLocationPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CleanupEventToUser" ADD CONSTRAINT "_CleanupEventToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "CleanupEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CleanupEventToUser" ADD CONSTRAINT "_CleanupEventToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
