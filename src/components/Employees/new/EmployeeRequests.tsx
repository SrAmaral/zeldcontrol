"use server";
import { db } from "~/server/db";
import {
  type EmployeeFileType,
  type NewEmployeeFormSchemaType,
} from "./NewEmployeesTypes";

export async function CreateEmployeeRequest(data: NewEmployeeFormSchemaType) {
  try {
    const response = await db.employee.create({ data: { ...data } });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function CreateEmployeeFile(data: EmployeeFileType) {
  try {
    const response = await db.employeeFile.create({ data: { ...data } });
    return response;
  } catch (error) {
    console.log(error);
  }
}
