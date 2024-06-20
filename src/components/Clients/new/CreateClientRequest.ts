'use server';
import { api } from "~/trpc/server";
import { type NewClientFormSchemaType } from "./NewClientsTypes";

export async function CreateClientRequest(data: NewClientFormSchemaType) {
  try {
    const response = await api.zen.client.create({ data: { ...data } });
    return response
  } catch (error) {
    console.log(error);
  }
}