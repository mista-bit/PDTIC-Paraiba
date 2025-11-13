"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createCidadao } from "@/lib/api";
import { Plus } from "lucide-react";

export default function NovoCidadao() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [dados, setDados] = useState({
    nome_cidadao: "",
    cpf_cidadao: "",
    data_nascimento: "",
    email_cidadao: "",
    telefone_cidadao: "",
    cep_cidadao: "",
    rua_cidadao: "",
    numero_rua_cidadao: "",
    bairro_cidadao: "",
  });

  function handleChange(e) {
    setDados({ ...dados, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      await createCidadao(dados);
      router.push("/prefeitura/cidadaos");
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            <Plus />
            Cadastrar Novo Cidadão
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
                name="nome_cidadao"
                value={dados.nome_cidadao}
                onChange={handleChange}
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
                  name="cpf_cidadao"
                  value={dados.cpf_cidadao}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Data de Nascimento *
                </label>
                <input
                  type="date"
                  name="data_nascimento"
                  value={dados.data_nascimento}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email_cidadao"
                  value={dados.email_cidadao}
                  onChange={handleChange}
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
                  name="telefone_cidadao"
                  value={dados.telefone_cidadao}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  CEP *
                </label>
                <input
                  type="text"
                  name="cep_cidadao"
                  value={dados.cep_cidadao}
                  onChange={handleChange}
                  placeholder="00000-000"
                  maxLength={9}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Rua *
                </label>
                <input
                  type="text"
                  name="rua_cidadao"
                  value={dados.rua_cidadao}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Número *
                </label>
                <input
                  type="text"
                  name="numero_rua_cidadao"
                  value={dados.numero_rua_cidadao}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Bairro *
                </label>
                <input
                  type="text"
                  name="bairro_cidadao"
                  value={dados.bairro_cidadao}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {loading ? "Cadastrando..." : "Cadastrar Cidadão"}
              </button>
              <Link
                href="/prefeitura/cidadaos"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
