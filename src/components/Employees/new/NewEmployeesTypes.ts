import { z } from "zod";


export type NewEmployeeFormSchemaType = z.infer<typeof NewEmployeeFormSchema>;

export const NewEmployeeFormSchema = z.object({
  firstName: z.string().min(1, { message: "Por favor digite o nome da empresa" }),
  lastName: z
  .string()
  .optional(),
  rg: z
    .string()
    .optional(), 
  cpf: z
    .string()
    .optional(), 
  pis: z
    .string()
    .optional(), 
  ctps: z
    .string()
    .optional(), 
  address: z.object({
    streetType: z.string().optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
  }),
  contactNumber: z
    .string()
    .optional(),
  contactEmail: z
    .string()
    .optional(),
  typeHiring: z
  .string()
  .optional(),
  hiringDate: z
  .string()
  .optional(),
  position: z
  .string()
  .optional(),
  salary: z
  .string()
  .optional(),
  workLoad: z
  .string()
  .optional(),
  comment: z
  .string()
  .optional(),
  files: z.any()
});

export type EmployeeDataType = {
  id: number;
  firstName: string;
  lastName: string; 
  rg: string; 
  cpf: string; 
  pis: string; 
  ctps: string; 
  address: {
    streetType: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  } | null;
  contactNumber: string | null;
  contactEmail: string | null;
  typeHiring: string;
  hitingDate: string;
  position: string;
  salary: string;
  workLoad: string;
  comment: string;
  files: File[];
  createdAt: string;
  updatedAt: string;
}
