/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use server';
import { db } from "~/server/db";
import { type NewRequestFormSchemaType } from "./NewRequestTypes";

export async function CreateRequest(data: NewRequestFormSchemaType) {
  try {
    const response = await db.productRequest.create({data: {...data, status: "open",}});
    return response
  } catch (error) {
    console.log(error);
  }
}


export async function GetRequestById(id: number) {
  try {
    const response = await db.productRequest.findUnique({
      where: { id },
    });
    return response
  } catch (error) {
    console.log(error);
  }
}


export async function UpdateRequest(id: number, data: NewRequestFormSchemaType) { 
  try {
    const response = await db.productRequest.update({where: {id}, data: {...data}});
    return response
  } catch (error) {
    console.log(error);
  }
}


export async function DeleteRequestById(id:number) {
  try {
    const response = await db.productRequest.delete({where: {id}});
    return response
  } catch (error) {
    console.log(error);
  }
}
