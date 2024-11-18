/*
  Warnings:

  - A unique constraint covering the columns `[model,model_year]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rent_weekday_price` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rent_weekday_price_loyalty` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rent_weekend_price` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rent_weekend_price_loyalty` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "rent_weekday_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rent_weekday_price_loyalty" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rent_weekend_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rent_weekend_price_loyalty" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Car_model_model_year_key" ON "Car"("model", "model_year");
