"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createInstrutor } from "@/lib/api";
import { Plus } from "lucide-react";

export default function NovoInstrutor() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [dados, setDados] = useState({
    nome_instrutor: "",
    cpf_instrutor: "",
    email_instrutor: "",
    telefone_instrutor: "",
  });

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
          ← Voltar
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            <Plus /> Novo Instrutor
          </h1>

          {erro && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <X />
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
