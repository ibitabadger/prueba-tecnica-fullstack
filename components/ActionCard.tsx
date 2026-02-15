import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface ActionCardProps {
  title: string
  icon: LucideIcon
  onClick?: () => void
}

export function ActionCard({ title, icon: Icon, onClick }: ActionCardProps) {
  return (
    <Card 
      onClick={onClick}
      className="group cursor-pointer border-none overflow-hidden transition-all duration-300 hover:scale-[1.03]"
    >
      <CardContent className="p-0">
        <div className="flex flex-col items-center justify-center h-64 gap-4 bg-zinc-300 shadow-[0_10px_30px_-10px_rgba(47,87,150,0.5)] group-hover:shadow-[0_20px_40px_-10px_rgba(47,87,150,0.7)] transition-shadow">
          <div className="p-4 bg-white/20 rounded-full">
            <Icon className="w-10 h-10 text-[#0a0a0a]" />
          </div>
          <h1 className="text-2xl " >
            {title}
          </h1>
        </div>
      </CardContent>
    </Card>
  )
}