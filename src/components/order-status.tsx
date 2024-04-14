import { Order } from '@/api/get-orders'

export type OrderStatusProps = {
  status: Order['status']
}

const orderStatusMap: Record<
  OrderStatusProps['status'],
  { label: string; color: string }
> = {
  pending: { label: 'Pendente', color: 'bg-slate-400' },
  canceled: { label: 'Cancelado', color: 'bg-rose-400' },
  delivered: { label: 'Entregue', color: 'bg-emerald-400' },
  delivering: { label: 'Em entrega', color: 'bg-amber-400' },
  processing: { label: 'Em preparo', color: 'bg-amber-400' },
}

export function OrderStatus({ status }: OrderStatusProps) {
  const { label, color } = orderStatusMap[status]

  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span className="font-medium text-muted-foreground">{label}</span>
    </div>
  )
}
