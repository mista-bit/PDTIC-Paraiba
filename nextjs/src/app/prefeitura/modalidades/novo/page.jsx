"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createModalidade } from "@/lib/api";
import { ChevronLeft, Plus } from "lucide-react";

export default function NovaModalidade() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [dados, setDados] = useState({
    nome_modalidade: "",
    regras_modalidade: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await createModalidade(dados);
      router.push("/prefeitura/modalidades");
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
          href="/prefeitura/modalidades"
          className="text-purple-600 hover:text-purple-800 font-semibold mb-6 inline-block"
        >
          <ChevronLeft />
          Voltar
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            <Plus />
            Nova Modalidade
          </h1>

          {erro && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nome da Modalidade *
              </label>
              <input
                type="text"
                value={dados.nome_modalidade}
                onChange={(e) =>
                  setDados({ ...dados, nome_modalidade: e.target.value })
                }
                placeholder="Ex: Futebol, Vôlei, Natação"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Regras / Descrição
              </label>
              <textarea
                value={dados.regras_modalidade}
                onChange={(e) =>
                  setDados({ ...dados, regras_modalidade: e.target.value })
                }
                rows={5}
                placeholder="Descreva as regras, requisitos ou informações importantes..."
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Cadastrando..." : "Cadastrar Modalidade"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
