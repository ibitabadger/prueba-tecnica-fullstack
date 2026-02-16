import { useState } from 'react';
import { useRouter } from 'next/router';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldLabel } from '@/components/ui/field';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";
import { requireAuth } from '@/lib/auth/getSession';
import { GetServerSideProps } from 'next';


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await requireAuth(ctx, 'create');
};

export default function NewMovementPage() {
  const router = useRouter();
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/movements/movement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept,
          amount: parseFloat(amount),
          date,
        }),
      });

      if (res.ok){
        toast.success("Registro Creado Correctamente.");
        router.push('/movements/movements');
      } else {
        toast.error("Error creando el registro.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='mb-8'>
      <Link href='/movements/movements'><h1 className='text-2xl text-left underline underline-offset-[12px] pb-10'>Ingresos y Egresos</h1></Link>
      <div className='flex flex-col items-center p-8'>
        <div className='w-full max-w-lg space-y-4'>
          <Card className='shadow-lg'>
            <CardHeader>
              <CardTitle>Nuevo Movimiento de dinero</CardTitle>
              <CardDescription>Registra el nuevo movimiento.</CardDescription>
            </CardHeader>

            <form onSubmit={handleSave}>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='amount'>Monto ($)</Label>
                  <Input
                    id='amount'
                    type='number'
                    step='0.01'
                    placeholder='0.00'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='concept'>Concepto</Label>
                  <Input
                    id='concept'
                    placeholder='Ej. Venta de productos'
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Field>
                    <FieldLabel htmlFor='date'>Fecha del Movimiento</FieldLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          id='date'
                          className='justify-start font-normal'
                        >
                          {date
                            ? date.toLocaleDateString()
                            : 'Selecciona fecha'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className='w-auto overflow-hidden p-0'
                        align='start'
                      >
                        <Calendar
                          mode='single'
                          selected={date}
                          defaultMonth={date}
                          captionLayout='dropdown'
                          onSelect={(date) => {
                            setDate(date);
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </Field>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full mr-2'
                  onClick={() => router.back()}
                >
                  Cancelar
                </Button>
                <Button
                  type='submit'
                  className='w-full mr-4'
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className='h-4 w-4 animate-spin' />
                  )}
                  {isSubmitting ? 'Guardando...' : 'Confirmar Registro'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
