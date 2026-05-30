interface InfoCardProps {
  title: string
  lines: string[]
}

function InfoCard({ title, lines }: InfoCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col gap-2">
      <p className="text-sm font-bold text-gray-900">{title}</p>
      {lines.map((line) => (
        <p key={line} className="text-sm text-gray-500">{line}</p>
      ))}
    </div>
  )
}

const DATA_STRUCTURE_CARDS: InfoCardProps[] = [
  {
    title: 'Estrutura mapping',
    lines: [
      'Entidade(Id documento)',
      'return Escritor, URL do documento',
    ],
  },
  {
    title: 'Estrutura para postar',
    lines: [
      'Id e Escritor – Gerado automaticamente',
      'Entidade e URL – Informamos',
    ],
  },
  {
    title: 'Estrutura para pesquisar',
    lines: [
      'Entidade e ID – Informamos',
      'Escritor e URL – Retorna',
    ],
  },
]

const ACCESS_LEVEL_CARDS: InfoCardProps[] = [
  {
    title: 'Níveis de acesso',
    lines: [
      'None,',
      'ReadTemporary,',
      'ReadPermanent,',
      'ReadWriteTemporary,',
      'ReadWritePermanent,',
      'Admin',
    ],
  },
  {
    title: 'Conceder acessos',
    lines: ['Apenas o usuário Admin pode conceder acessos'],
  },
  {
    title: 'Acessos temporários',
    lines: [
      'Ao conceder acessos temporários é necessário informar o tempo de acesso (Em blocos)',
    ],
  },
]

export default function ContractDataPage() {
  return (
    <div className="p-8 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Dados do contrato inteligente
      </h1>

      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-900 text-center">Estrutura dos dados</h2>
          {DATA_STRUCTURE_CARDS.map((card) => (
            <InfoCard key={card.title} {...card} />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-900 text-center">Níveis de acesso</h2>
          {ACCESS_LEVEL_CARDS.map((card) => (
            <InfoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </div>
  )
}
