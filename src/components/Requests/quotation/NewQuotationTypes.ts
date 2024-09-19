import { z } from "zod";


export type NewQuotationFormSchemaType = z.infer<typeof NewQuotationFormSchema>;

export const NewQuotationFormSchema = z.object({
  items: z.array(z.object({
    description: z.string().optional(),
    serviceType: z.object({
      name: z.string().optional(),
      code: z.string().optional(),
    }).optional(),
    priority: z.object({
      name: z.string().optional(),
      code: z.string().optional(),
    }).optional(),
    qty: z.string().optional(),
    price: z.number().optional()
  })),
  deadLine: z
    .string()
    .optional(),
});

export interface QuotationDataType {
  id: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deadLine: string | null;
  clientId: number | null;
  items: {
    description: string;
    serviceType: string;
    priority: string;
    qty: string;
    price: number;
  }[];
}

export type QuotationItemsType = {
  description?: string | undefined;
  serviceType?: {
      code?: string | undefined;
      name?: string | undefined;
  } | undefined;
  priority?: {
      code?: string | undefined;
      name?: string | undefined;
  } | undefined;
  qty?: string | undefined;
  price?: number | undefined;
}