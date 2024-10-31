import { z } from 'zod'

export const getNumberSchema = (fieldName: string) => {
  return z.string()
    .refine((val) => !val.includes('e'), {
      message: "Caracter inválido",
    })
    .refine((val) => {
      const num = Number(val);
      return !isNaN(num);
    }, {
      message: `${fieldName} deben de ser un número válido`,
    })
    .transform((val) => Number(val))
}

export const getPositiveNumberSchema = (fieldName: string) => {
  return z.string()
    .refine((val) => !val.includes('e'), {
      message: "Caracter inválido",
    })
    .refine((val) => {
      const num = Number(val);
      return !isNaN(num);
    }, {
      message: `${fieldName} deben de ser un número válido`,
    })
    .refine((val) => {
      const num = Number(val);
      return num >= 0;
    }, {
      message: `${fieldName} deben de ser un número positivo`,
    })
    .transform(value => Number(value))

}

export const getPositiveIntegerNumberSchema = (fieldName: string) => {
  return z.string()
    .refine((val) => !val.includes('e'), {
      message: "Caracter inválido",
    })
    .refine((val) => {
      const num = Number(val);
      return !isNaN(num);
    }, {
      message: `${fieldName} deben de ser un número válido`,
    })
    .refine((val) => {
      const num = Number(val);
      return num >= 0;
    }, {
      message: `${fieldName} deben de ser un número positivo`,
    })
    .refine((val) => {
      const num = Number(val);
      return Number.isInteger(num);
    }, {
      message: `${fieldName} deben de ser un número entero`,
    })
    .transform((val) => Number(val))
}