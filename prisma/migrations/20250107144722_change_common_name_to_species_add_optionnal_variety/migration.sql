/*
  Warnings:

  - You are about to drop the column `taxonomicName` on the `Plant` table. All the data in the column will be lost.
  - Added the required column `species` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Plant_taxonomicName_key";

-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "taxonomicName",
ADD COLUMN     "species" VARCHAR(255) NOT NULL,
ADD COLUMN     "variety" VARCHAR(255);
