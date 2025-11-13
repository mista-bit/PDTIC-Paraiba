"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getInscricoes } from "@/lib/api";
import { ChevronLeft, ScrollText } from "lucide-react";

export default function InscricoesPage() {
  const [inscricoes, setInscricoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("todos");

  useEffect(() => {
    carregarInscricoes();
  }, []);

  async function carregarInscricoes() {
    try {
      const data = await getInscricoes();
      setInscricoes(data);
    } catch (error) {
      console.error("Erro ao carregar inscrições:", error);
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status) {
    const cores = {
      pendente: "bg-yellow-100 text-yellow-800 border-yellow-300",
      confirmada: "bg-green-100 text-green-800 border-green-300",
      cancelada: "bg-red-100 text-red-800 border-red-300",
      lista_espera: "bg-blue-100 text-blue-800 border-blue-300",
    };
    return cores[status] || "bg-gray-100 text-gray-800";
  }

  const inscricoesFiltradas =
    filtroStatus === "todos"
      ? inscricoes
      : inscricoes.filter((i) => i.status === filtroStatus);

  const stats = {
    total: inscricoes.length,
    pendentes: inscricoes.filter((i) => i.status === "pendente").length,
    confirmadas: inscricoes.filter((i) => i.status === "confirmada").length,
    canceladas: inscricoes.filter((i) => i.status === "cancelada").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            href="/prefeitura"
            className="text-purple-600 hover:text-purple-800 font-semibold flex"
          >
            <ChevronLeft />
            Voltar para Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            <ScrollText />
            Gerenciar Inscrições
          </h1>

          {/* Estatísticas */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-600 font-semibold">Total</p>
              <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-sm text-yellow-600 font-semibold">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-900">
                {stats.pendentes}
              </p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
              <p className="text-sm text-green-600 font-semibold">
                Confirmadas
              </p>
              <p className="text-2xl font-bold text-green-900">
                {stats.confirmadas}
              </p>
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
              <p className="text-sm text-red-600 font-semibold">Canceladas</p>
              <p className="text-2xl font-bold text-red-900">
                {stats.canceladas}
              </p>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex gap-2">
            <button
              onClick={() => setFiltroStatus("todos")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                filtroStatus === "todos"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Todos ({stats.total})
            </button>
            <button
              onClick={() => setFiltroStatus("pendente")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                filtroStatus === "pendente"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Pendentes ({stats.pendentes})
            </button>
            <button
              onClick={() => setFiltroStatus("confirmada")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                filtroStatus === "confirmada"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Confirmadas ({stats.confirmadas})
            </button>
            <button
              onClick={() => setFiltroStatus("cancelada")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                filtroStatus === "cancelada"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Canceladas ({stats.canceladas})
            </button>
          </div>
        </div>

        {/* Lista de Inscrições */}
        {inscricoesFiltradas.length > 0 ? (
          <div className="space-y-4">
            {inscricoesFiltradas.map((inscricao) => (
              <div
                key={inscricao.id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {inscricao.cidadao_nome}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                          inscricao.status
                        )}`}
                      >
                        {inscricao.status_display}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <p>
                        <span className="font-semibold">Modalidade:</span>{" "}
                        {inscricao.modalidade_nome}
                      </p>
                      <p>
                        <span className="font-semibold">CT:</span>{" "}
                        {inscricao.ct_nome}
                      </p>
                      <p>
                        <span className="font-semibold">Protocolo:</span>{" "}
                        <span className="font-mono">
                          {inscricao.numero_protocolo}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">Data:</span>{" "}
                        {new Date(inscricao.data_incricao).toLocaleDateString(
                          "pt-BR"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {inscricao.data_confirmacao && (
                  <p className="text-xs text-gray-500 mt-2">
                    Confirmado em:{" "}
                    {new Date(inscricao.data_confirmacao).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                )}

                {inscricao.motivo_cancelamento && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm text-red-800">
                      <span className="font-semibold">
                        Motivo do cancelamento:
                      </span>{" "}
                      {inscricao.motivo_cancelamento}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg">
              {filtroStatus === "todos"
                ? "Nenhuma inscrição cadastrada."
                : `Nenhuma inscrição com status "${filtroStatus}".`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
