import { getPositiveIntegerNumberSchema, getPositiveNumberSchema } from "@/lib/numberSchemas"
import { z } from 'zod'

export const unitsSchema = getPositiveIntegerNumberSchema('Las unidades').refine((value) => value <= 1_000_000, 'Las unidades deben ser menor o igual a 1.000.000')
export const priceSchema = getPositiveNumberSchema('El precio')
  .refine((value) => value > 0, 'El precio debe ser mayor a 0')
  .refine((value) => value <= 1_000_000, 'Las unidades deben ser menor o igual a 1.000.000')


export const ProductFormSchema = z.object({
  nameProduct: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(50, "El nombre no puede ser de más de 50 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres").max(500, "La descripción no puede ser de más de 500 caracteres"),
  // link: z.string().url("El link debe ser una url"),
  units: unitsSchema,
  price: priceSchema,
  typeProduct: z.string().min(1, "El tipo de producto es requerido")

})