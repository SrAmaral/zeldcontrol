-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "rg" TEXT,
    "cpf" TEXT,
    "pis" TEXT,
    "ctps" TEXT,
    "contactNumber" TEXT,
    "contactEmail" TEXT,
    "address" JSONB,
    "typeHiring" TEXT,
    "hiringDate" TEXT,
    "position" TEXT,
    "salary" TEXT,
    "workLoad" TEXT,
    "comment" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeFile" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "EmployeeFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeImage" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "EmployeeImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeImage_employeeId_key" ON "EmployeeImage"("employeeId");

-- AddForeignKey
ALTER TABLE "EmployeeFile" ADD CONSTRAINT "EmployeeFile_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeImage" ADD CONSTRAINT "EmployeeImage_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
