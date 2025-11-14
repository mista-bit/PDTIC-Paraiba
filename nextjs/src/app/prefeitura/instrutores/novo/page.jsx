"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createInstrutor, getCts, getModalidades } from "@/lib/api";
import { Plus, ChevronLeft } from "lucide-react";

export default function NovoInstrutor() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [cts, setCts] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [dados, setDados] = useState({
    nome_instrutor: "",
    cpf_instrutor: "",
    email_instrutor: "",
    telefone_instrutor: "",
    // Dados do evento
    ct_id: "",
    modalidade_id: "",
    vagas_disponiveis: 35,
    horarios: "",
    dias_semana: "",
  });

  useEffect(() => {
    async function carregarDados() {
      try {
        const [ctsData, modalidadesData] = await Promise.all([
          getCts(),
          getModalidades(),
        ]);
        setCts(ctsData);
        setModalidades(modalidadesData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    carregarDados();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await createInstrutor(dados);
      router.push("/prefeitura/instrutores");
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/prefeitura/instrutores"
          className="text-purple-600 hover:text-purple-800 font-semibold mb-6 inline-block"
        >
          <ChevronLeft /> Voltar
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            <Plus /> Novo Instrutor + Evento
          </h1>

          {erro && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* DADOS DO INSTRUTOR */}
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Dados do Instrutor
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={dados.nome_instrutor}
                    onChange={(e) =>
                      setDados({ ...dados, nome_instrutor: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      CPF *
                    </label>
                    <input
                      type="text"
                      value={dados.cpf_instrutor}
                      onChange={(e) =>
                        setDados({ ...dados, cpf_instrutor: e.target.value })
                      }
                      maxLength={14}
                      required
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      value={dados.telefone_instrutor}
                      onChange={(e) =>
                        setDados({ ...dados, telefone_instrutor: e.target.value })
                      }
                      maxLength={15}
                      required
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={dados.email_instrutor}
                    onChange={(e) =>
                      setDados({ ...dados, email_instrutor: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* DADOS DO EVENTO */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Criar Evento Automaticamente
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Centro de Treinamento
                    </label>
                    <select
                      value={dados.ct_id}
                      onChange={(e) =>
                        setDados({ ...dados, ct_id: e.target.value })
                      }
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                    >
                      <option value="">Selecione um CT (opcional)</option>
                      {cts.map((ct) => (
                        <option key={ct.id_ct} value={ct.id_ct}>
                          {ct.nome_ct}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Modalidade
                    </label>
                    <select
                      value={dados.modalidade_id}
                      onChange={(e) =>
                        setDados({ ...dados, modalidade_id: e.target.value })
                      }
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                    >
                      <option value="">Selecione uma modalidade (opcional)</option>
                      {modalidades.map((mod) => (
                        <option key={mod.id_modalidade} value={mod.id_modalidade}>
                          {mod.nome_modalidade}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Vagas Disponíveis
                    </label>
                    <input
                      type="number"
                      value={dados.vagas_disponiveis}
                      onChange={(e) =>
                        setDados({ ...dados, vagas_disponiveis: e.target.value })
                      }
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Horários
                    </label>
                    <input
                      type="text"
                      value={dados.horarios}
                      onChange={(e) =>
                        setDados({ ...dados, horarios: e.target.value })
                      }
                      placeholder="Ex: 14h - 16h"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Dias da Semana
                    </label>
                    <input
                      type="text"
                      value={dados.dias_semana}
                      onChange={(e) =>
                        setDados({ ...dados, dias_semana: e.target.value })
                      }
                      placeholder="Ex: Seg, Qua, Sex"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                    />
                  </div>
                </div>

                <p className="text-sm text-gray-600 italic">
                  * Se CT e Modalidade forem selecionados, um evento será criado
                  automaticamente para inscrições de cidadãos.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Cadastrando..." : "Cadastrar Instrutor"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
