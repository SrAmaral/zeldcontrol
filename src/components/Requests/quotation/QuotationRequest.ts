/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use server';
import { db } from "~/server/db";

export async function GetQuotationById(id: number) {
  try {
    const response = await db.productRequest.findUnique({
      where: { id },
    });
    return response
  } catch (error) {
    console.log(error);
  }
}
export async function GetQuotations() {
  try {
    const response = await db.productRequest.findMany({
      where: { OR: [{ status: "requestQuotation" }, { status: "quotationApproved" }, { status: "quotationReproved" }] },
    });
    return response
  } catch (error) {
    console.log(error);
  }
}

export async function AproveQuotation(id: number,) {
  try {
    const response = await db.productRequest.update({ where: { id }, data: { status: "quotationApproved" } });
    return response
  } catch (error) {
    console.log(error);
  }
}

export async function ReopenQuotation(id: number,) {
  try {
    const response = await db.productRequest.update({ where: { id }, data: { status: "requestQuotation" } });
    return response
  } catch (error) {
    console.log(error);
  }
}

export async function ReproveQuotation(id: number) {
  try {
    const response = await db.productRequest.update({ where: { id }, data: { status: "quotationReproved" } });
    return response
  } catch (error) {
    console.log(error);
  }
}