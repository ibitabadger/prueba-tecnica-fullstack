import { useState } from 'react';
import { useRouter } from 'next/router';
import { ChevronLeft, Loader2, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAuth } from "@/lib/auth/getSession";
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await requireAuth(ctx, "create");
};

export default function NewMovementPage() {
  const router = useRouter();
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  // Inicializar la fecha de hoy en formato YYYY-MM-DD
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
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
          date: new Date(date).toISOString() // Enviar la fecha en formato ISO
        })
      });

      if (res.ok) router.push('/movements/movements');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-8">
        <h1 className="text-3xl pb-10 underline">Ingresos y Egresos</h1>
      <div className="flex flex-col items-center p-8">
        <div className="w-full max-w-lg space-y-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Nuevo Movimiento de dinero</CardTitle>
              <CardDescription>Registra el nuevo movimiento.</CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSave}>

              <CardContent className="space-y-4">
                  <div className="space-y-2">
                      <Label htmlFor="amount">Monto ($)</Label>
                      <Input 
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      />
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="concept">Concepto</Label>
                      <Input 
                      id="concept"
                      placeholder="Ej. Venta de productos"
                      value={concept}
                      onChange={(e) => setConcept(e.target.value)}
                      required
                      />
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="date">Fecha del Movimiento</Label>
                      <Input 
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      />
                  </div>
              </CardContent>
              
              <CardFooter>
                <Button type="submit" className="w-full mr-4" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Guardando..." : "Confirmar Registro"}
                </Button>

                <Button type="button" variant="outline" className="w-full" onClick={() => router.back()}>
                  Cancelar
                </Button>
              </CardFooter>

            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}