"use client";

export default function EventCard({ evento, onAgendar }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {evento.modalidade_nome || evento.nome_modalidade}
        </h3>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Local:</span> {evento.ct_nome}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Horários:</span>{" "}
          {evento.horarios_oferecidos}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Dias:</span> {evento.dias_na_semana}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Vagas:</span>{" "}
          <span
            className={
              evento.vagas_disponiveisMod > 10
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {evento.vagas_disponiveisMod} disponíveis
          </span>
        </p>
      </div>
      {evento.regras_modalidade && (
        <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
          <p className="text-xs text-gray-700 line-clamp-3">
            <span className="font-semibold ">Regras:</span>{" "}
            {evento.regras_modalidade}
          </p>
        </div>
      )}

      <button
        onClick={() => onAgendar(evento)}
        disabled={evento.vagas_disponiveisMod <= 0}
        className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
          evento.vagas_disponiveisMod > 0
            ? "bg-blue-600 text-white hover:brightness-90"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {evento.vagas_disponiveisMod > 0 ? "Agendar" : "Sem vagas"}
      </button>
    </div>
  );
}
