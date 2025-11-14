"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getInscricoesCidadao, deleteInscricao } from "@/lib/api";
import { Calendar, Mail, ChevronLeft, Pin } from "lucide-react";

export default function MeusAgendamentos() {
  const router = useRouter();
  const [cidadao, setCidadao] = useState(null);
  const [inscricoes, setInscricoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const cidadaoData = localStorage.getItem("cidadao");
    if (!cidadaoData) {
      router.push("/");
      return;
    }

    const cidadaoObj = JSON.parse(cidadaoData);
    setCidadao(cidadaoObj);

    carregarInscricoes(cidadaoObj.id_cidadao);
  }, [router]);

  async function carregarInscricoes(cidadaoId) {
    try {
      const data = await getInscricoesCidadao(cidadaoId);
      setInscricoes(data);
    } catch (error) {
      console.error("Erro ao carregar inscrições:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelar(inscricaoId) {
    if (!confirm("Tem certeza que deseja cancelar esta inscrição?")) return;

    try {
      await deleteInscricao(inscricaoId);
      setMensagem("✅ Inscrição cancelada com sucesso!");
      carregarInscricoes(cidadao.id_cidadao);
      setTimeout(() => setMensagem(""), 3000);
    } catch (error) {
      setMensagem(`❌ Erro ao cancelar: ${error.message}`);
      setTimeout(() => setMensagem(""), 5000);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link
            href="/cidadao"
            className="text-blue-600 hover:text-blue-800 font-semibold flex"
          >
            <ChevronLeft />
            Voltar para Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <Calendar />
            Meus Agendamentos
          </h1>
          <p className="text-gray-600">{cidadao?.nome_cidadao}</p>
        </div>

        {mensagem && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              mensagem.includes("✅")
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
          >
            {mensagem}
          </div>
        )}

        {inscricoes.length > 0 ? (
          <div className="space-y-4">
            {inscricoes.map((inscricao) => (
              <div
                key={inscricao.id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {inscricao.modalidade_nome}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      <Pin />
                      {inscricao.ct_nome}
                    </p>
                    <p className="text-sm text-gray-500">
                      Protocolo:{" "}
                      <span className="font-mono">
                        {inscricao.numero_protocolo}
                      </span>
                    </p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                      inscricao.status
                    )}`}
                  >
                    {inscricao.status_display}
                  </span>
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <p>
                      Inscrito em:{" "}
                      {new Date(inscricao.data_incricao).toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                    {inscricao.data_confirmacao && (
                      <p>
                        Confirmado em:{" "}
                        {new Date(
                          inscricao.data_confirmacao
                        ).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </div>

                  {inscricao.status !== "cancelada" && (
                    <button
                      onClick={() => handleCancelar(inscricao.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Cancelar Inscrição
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-6xl mb-4">
              <Mail />
            </div>
            <p className="text-gray-600 text-lg mb-4">
              Você ainda não tem agendamentos.
            </p>
            <Link
              href="/cidadao"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Ver Eventos Disponíveis
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
