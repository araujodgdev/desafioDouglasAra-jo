-- CreateEnum
CREATE TYPE "CarCategory" AS ENUM ('Compact Hatch', 'Medium Hatch', 'Sedan', 'Van', 'Pickup');

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "model_year" INTEGER NOT NULL,
    "category" "CarCategory" NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);
