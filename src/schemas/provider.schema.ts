import { z } from 'zod'

export const ProviderSchema = z.object({

  name: z.string().min(5, 'El nombre debe tener al menos 5 caracteres').max(50, 'El nombre no puede ser de más de 50 caracteres'),
  note: z.string().min(10, 'La nota debe tener al menos 10 caracteres').max(255, 'La nota no puede ser de más de 255 caracteres'),
  typeProvider: z.string().min(1, 'El tipo de proveedor es requerido')
})