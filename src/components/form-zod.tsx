import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ioTsResolver } from '@hookform/resolvers/io-ts';
// @ts-ignore
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'it is Required' }),
  age: z.number().min(10),
});
const FormZod = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <input {...register('name')} />
      {errors.name?.message && <p>{`${errors.name?.message}`}</p>}
      <input type="number" {...register('age', { valueAsNumber: true })} />
      {errors.age?.message && <p>{`${errors.age?.message}`}</p>}
      <input type="submit" />
    </form>
  );
};
export default FormZod;