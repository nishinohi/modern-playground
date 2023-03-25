import { Schema, schemaJoin } from '@/components/atoms/Form/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schemaJoin), // zodResolver + schema
  })
  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <input className="border-2 border-solid" {...register('name')} />
      {errors.name?.message && <p>{errors.name?.message}</p>}
      <input className="border-2 border-solid" type="number" {...register('age', { valueAsNumber: true })} />
      {errors.age?.message && <p>{errors.age?.message}</p>}
      <input type="text" maxLength={3} {...register('firstThreeDigits')} />
      {errors.firstThreeDigits?.message && <p>{errors.firstThreeDigits?.message}</p>}
      -
      <input type="text" maxLength={4} {...register('lastFourDigits')} />
      {errors.lastFourDigits?.message && <p>{errors.lastFourDigits?.message}</p>}
      <input className="bg-cyan-400" type="submit" />
    </form>
  )
}
