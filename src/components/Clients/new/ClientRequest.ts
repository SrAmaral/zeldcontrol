'use server';
import { db } from "~/server/db";
import { type NewClientFormSchemaType } from "./NewClientsTypes";

export async function CreateClientRequest(data: NewClientFormSchemaType) {
  try {
    const response = await db.client.create({data: {...data}});
    return response
  } catch (error) {
    console.log(error);
  }
}

export async function GetClientRequest(id: number) {
  try {
    const response = await db.client.findUnique({where: {id}});
    return response
  } catch (error) {
    console.log(error);
  }
}