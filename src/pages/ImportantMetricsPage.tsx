const METRICS = [
  'Total de Arquivos Enviados',
  'Total de Arquivos Acessados',
  'Total de Acessos na Plataforma',
  'Total de Usuários',
]

function MetricField({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="h-12 rounded-xl bg-gray-100" />
    </div>
  )
}

export default function ImportantMetricsPage() {
  return (
    <div className="p-8 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Métricas Importantes
      </h1>

      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-gray-900 text-center">Semanal</h2>
          {METRICS.map((label) => (
            <MetricField key={`semanal-${label}`} label={label} />
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-gray-900 text-center">Total</h2>
          {METRICS.map((label) => (
            <MetricField key={`total-${label}`} label={label} />
          ))}
        </div>
      </div>
    </div>
  )
}
