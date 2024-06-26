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

export async function UpdateClientRequest(id: number, data: NewClientFormSchemaType) { 
  try {
    const response = await db.client.update({where: {id}, data: {...data}});
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

export async function DeleteClientById(id:number) {
  try {
    const response = await db.client.delete({where: {id}});
    return response
  } catch (error) {
    console.log(error);
  }
}

export async function GetAllClient() {
  try {
    const response = await db.client.findMany();
    return response
  } catch (error) {
    console.log(error);
  }
}