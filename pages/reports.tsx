import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ChevronLeft, Loader2, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAuth } from "@/lib/auth/getSession";
import { GetServerSideProps } from 'next';

interface ChartData {
  date: string;
  total: number;
  fill?: string; 
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await requireAuth(ctx, "reports");
};

export default function ReportsPage() {
  const router = useRouter();
  const [data, setData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState({ total: 0, positive: 0, negative: 0 });

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const res = await fetch('/api/movements/report');
        const json = await res.json();
        
        if (res.ok) {
          // Inyectamos el color 'fill' directamente en cada objeto para evitar el error de <Cell>
          const dataWithColors = json.map((item: any) => ({
            ...item,
            fill: item.total >= 0 ? '#10b981' : '#ef4444', 
          }));

          // Calculamos totales rápidos para las mini-tarjetas
          const totals = json.reduce((acc: any, curr: any) => {
            acc.total += curr.total;
            if (curr.total > 0) acc.positive += curr.total;
            else acc.negative += curr.total;
            return acc;
          }, { total: 0, positive: 0, negative: 0 });

          setData(dataWithColors);
          setSummary(totals);
        }
      } catch (err) {
        console.error("Error cargando reporte:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const downloadCSV = () => {
    if (data.length === 0) return;

    // Definir los encabezados
    const headers = ["Fecha", "Monto Total"];
    
    // Transformar los datos del gráfico a filas de texto
    const rows = data.map(item => `${item.date},${item.total}`);
    
    // Unir todo con saltos de línea
    const csvContent = [headers.join(","), ...rows].join("\n");
    
    // Crear el archivo y disparar la descarga
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", `reporte_movimientos_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    };

  return (
    <div className="flex flex-col items-start p-8 max-w-6xl mx-auto space-y-8">
      {/* Navegación y Título */}
      <div className="w-full space-y-4">
        <Button variant="ghost" size="lg" onClick={() => router.back()} className="hover:bg-slate-100">
          <ChevronLeft className="h-4 w-4" /> Volver
        </Button>
        <h1 className="text-2xl text-left underline underline-offset-[12px] pb-4">
          Reporte de Movimientos
        </h1>

        <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadCSV}
            className="border-primary text-primary hover:bg-primary hover:text-white "
        >
            Descargar CSV
        </Button>
      </div>

      {/* Mini Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <Card className="bg-slate-50 border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Balance Total</CardDescription>
            <CardTitle className="text-2xl">${summary.total.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-emerald-50 border-none shadow-sm text-emerald-700">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardDescription className="text-emerald-600">Total Ingresos</CardDescription>
              <TrendingUp className="h-4 w-4" />
            </div>
            <CardTitle className="text-2xl">${summary.positive.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-rose-50 border-none shadow-sm text-rose-700">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardDescription className="text-rose-600">Total Gastos</CardDescription>
              <TrendingDown className="h-4 w-4" />
            </div>
            <CardTitle className="text-2xl">${Math.abs(summary.negative).toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Gráfico Principal */}
      <Card className="w-full shadow-2xl border-none ring-1 ring-slate-200">
        <CardHeader className="border-b mb-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Análisis de Flujo</CardTitle>
              <CardDescription>Histórico de transacciones acumuladas por día</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    padding: '12px'
                  }}
                />
                <ReferenceLine y={0} stroke="#cbd5e1" strokeWidth={2} />
                <Bar 
                  dataKey="total" 
                  radius={[4, 4, 0, 0]} 
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}