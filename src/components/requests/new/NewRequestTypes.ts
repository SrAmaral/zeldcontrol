import { z } from "zod";


export type NewRequestFormSchemaType = z.infer<typeof NewRequestFormSchema>;

export const NewRequestFormSchema = z.object({
  items: z.array(z.object({
    description: z.string().optional(),
    serviceType: z.string().optional(),
    priority: z.string().optional(),
    qty: z.string().optional(),
  })),
  deadLine: z
    .string()
    .optional(),
});

export type RequestDataType = {
  id: string
  status: string
  createdAt: string
  updatedAt: string
  deadLine: string
  clientId: number
  items: {
    description: string
    serviceType: string
    priority: string
    qty: string
  }
}