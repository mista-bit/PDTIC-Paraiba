// app/prefeitura/cidadaos/page.jsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCidadaos, deleteCidadao } from "@/lib/api";
import { ChevronLeft, Trash, Users, Plus } from "lucide-react";

export default function CidadaosPage() {
  const [cidadaos, setCidadaos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    carregarCidadaos();
  }, []);

  async function carregarCidadaos() {
    try {
      const data = await getCidadaos();
      setCidadaos(data);
    } catch (error) {
      setMensagem(`Erro ao carregar: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletar(id, nome) {
    if (!confirm(`Tem certeza que deseja deletar ${nome}?`)) return;

    try {
      await deleteCidadao(id);
      setMensagem("Cidadão deletado com sucesso");
      carregarCidadaos();
      setTimeout(() => setMensagem(""), 3000);
    } catch (error) {
      setMensagem(`Erro ao deletar: ${error.message}`);
      setTimeout(() => setMensagem(""), 5000);
    }
  }

  const cidadaosFiltrados = cidadaos.filter(
    (c) =>
      c.nome_cidadao.toLowerCase().includes(busca.toLowerCase()) ||
      c.cpf_cidadao.includes(busca)
  );

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
            <ChevronLeft /> Voltar para Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                <Users />
                Gerenciar Cidadãos
              </h1>
              <p className="text-gray-600">
                {cidadaos.length} cidadão(s) cadastrado(s)
              </p>
            </div>
            <Link
              href="/prefeitura/cidadaos/novo"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex gap-2"
            >
              <Plus />
              Novo Cidadão
            </Link>
          </div>

          <input
            type="text"
            placeholder="Buscar por nome ou CPF..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
          />
        </div>

        {mensagem && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              mensagem.includes("sucesso")
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
          >
            {mensagem}
          </div>
        )}

        {cidadaosFiltrados.length > 0 ? (
          <div className="grid gap-4">
            {cidadaosFiltrados.map((cidadao) => (
              <div
                key={cidadao.id_cidadao}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {cidadao.nome_cidadao}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <p>
                        <span className="font-semibold">CPF:</span>{" "}
                        {cidadao.cpf_cidadao}
                      </p>
                      <p>
                        <span className="font-semibold">Email:</span>{" "}
                        {cidadao.email_cidadao}
                      </p>
                      <p>
                        <span className="font-semibold">Telefone:</span>{" "}
                        {cidadao.telefone_cidadao}
                      </p>
                      <p>
                        <span className="font-semibold">Nascimento:</span>{" "}
                        {new Date(cidadao.data_nascimento).toLocaleDateString(
                          "pt-BR"
                        )}
                      </p>
                      <p className="col-span-2">
                        <span className="font-semibold">Endereço:</span>{" "}
                        {cidadao.rua_cidadao}, {cidadao.numero_rua_cidadao} -{" "}
                        {cidadao.bairro_cidadao}, CEP: {cidadao.cep_cidadao}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() =>
                        handleDeletar(cidadao.id_cidadao, cidadao.nome_cidadao)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash />
                      Deletar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg">
              {busca
                ? "Nenhum cidadão encontrado com esse filtro."
                : "Nenhum cidadão cadastrado."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
