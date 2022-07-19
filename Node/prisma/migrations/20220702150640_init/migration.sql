-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Complete');

-- CreateTable
CREATE TABLE "Mission" (
    "id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "parentId" UUID,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Mission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
