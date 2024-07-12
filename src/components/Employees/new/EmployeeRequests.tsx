"use server";
import { db } from "~/server/db";
import { type NewEmployeeFormSchemaType } from "./NewEmployeesTypes";

export async function CreateEmployeeRequest(data: NewEmployeeFormSchemaType) {
  try {
    const response = await db.employee.create({
      data: {
        ...data,
        image: {
          create: {
            filename: "",
            url: "",
            type: "",
          },
        },
        files: {
          create: [
            {
              filename: "",
              url: "",
              type: "",
            },
          ],
        },
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function GetAllEmployee() {
  try {
    const response = await db.employee.findMany();
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function GetEmployeeRequest(id: number) {
  try {
    const response = await db.employee.findUnique({ where: { id: id } });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateEmployeeRequest(
  id: number,
  data: NewEmployeeFormSchemaType,
) {
  try {
    const response = await db.employee.update({
      where: { id },
      data: {
        ...data,
        image: {
          update: {
            filename: "",
            url: "",
            type: "",
          },
        },
        files: {
          update: [
            {
              where: {
                id: 1,
              },
              data: {
                filename: "",
                url: "",
                type: "",
              },
            },
          ],
        },
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function DeleteEmployeeById(id: number) {
  try {
    await db.employeeImage.deleteMany({ where: { employeeId: id } });
    await db.employeeFile.deleteMany({ where: { employeeId: id } });
    const response = await db.employee.deleteMany({ where: { id } });
    return response;
  } catch (error) {
    console.log(error);
  }
}
