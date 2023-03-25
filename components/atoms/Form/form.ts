import { z } from 'zod'

const firstThreeDigitsSchema = z.string().regex(/^\d{3}$/, { message: '3桁の数値を入力してください。' })
/** 郵便番号の下四桁（町域番号） */
const lastFourDigitsSchema = z.string().regex(/^\d{4}$/, { message: '4桁の数値を入力してください。' })

export const zipCodeSchema = z
  .object({
    firstThreeDigits: firstThreeDigitsSchema,
    lastFourDigits: lastFourDigitsSchema,
  })
  // 7桁の郵便番号を生成
  .transform(({ firstThreeDigits, lastFourDigits }) => firstThreeDigits + lastFourDigits)

const nameSchema = z.string().min(1, { message: 'Required' }).max(10, { message: 'need less than 10 chars' })
const ageSchema = z.number().min(10)

export const schema = z.object({
  name: nameSchema,
  age: ageSchema,
  firstThreeDigits: firstThreeDigitsSchema,
  lastFourDigits: lastFourDigitsSchema,
})

export const schemaJoin = z
  .object({
    name: nameSchema,
    age: ageSchema,
    firstThreeDigits: firstThreeDigitsSchema,
    lastFourDigits: lastFourDigitsSchema,
  })
  .transform(({ name, age, firstThreeDigits, lastFourDigits }) => {
    return {
      name: name,
      age: age,
      zipCode: firstThreeDigits + lastFourDigits,
    }
  })

export type InputSchema = z.input<typeof zipCodeSchema> // transform前で推論
export type OutputSchema = z.output<typeof zipCodeSchema> // transform後で推論
export type Schema = z.infer<typeof schema>
