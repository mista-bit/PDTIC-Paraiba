"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createCt } from "@/lib/api";
import { Plus, ChevronLeft } from "lucide-react";

export default function NovoCt() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [dados, setDados] = useState({
    nome_ct: "",
    capacidade_ct: "",
    cep: "",
    rua: "",
    numero_rua: "",
    bairro: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await createCt(dados);
      router.push("/prefeitura/cts");
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
          href="/prefeitura/cts"
          className="text-purple-600 hover:text-purple-800 font-semibold mb-6 inline-block"
        >
          <ChevronLeft />
          Voltar
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            <Plus /> Novo Centro de Treinamento
          </h1>

          {erro && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nome do CT *
              </label>
              <input
                type="text"
                value={dados.nome_ct}
                onChange={(e) =>
                  setDados({ ...dados, nome_ct: e.target.value })
                }
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Capacidade *
              </label>
              <input
                type="number"
                value={dados.capacidade_ct}
                onChange={(e) =>
                  setDados({ ...dados, capacidade_ct: e.target.value })
                }
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  CEP
                </label>
                <input
                  type="text"
                  value={dados.cep}
                  onChange={(e) => setDados({ ...dados, cep: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Rua
                </label>
                <input
                  type="text"
                  value={dados.rua}
                  onChange={(e) => setDados({ ...dados, rua: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Número
                </label>
                <input
                  type="text"
                  value={dados.numero_rua}
                  onChange={(e) =>
                    setDados({ ...dados, numero_rua: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Bairro
                </label>
                <input
                  type="text"
                  value={dados.bairro}
                  onChange={(e) =>
                    setDados({ ...dados, bairro: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Cadastrando..." : "Cadastrar CT"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
