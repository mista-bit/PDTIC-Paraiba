"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getModalidades, deleteModalidade } from "@/lib/api";
import { Volleyball, Trash, ChevronLeft, Plus } from "lucide-react";

export default function ModalidadesPage() {
  const [modalidades, setModalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    carregarModalidades();
  }, []);

  async function carregarModalidades() {
    try {
      const data = await getModalidades();
      setModalidades(data);
    } catch (error) {
      setMensagem(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletar(id, nome) {
    if (!confirm(`Deletar ${nome}?`)) return;
    try {
      await deleteModalidade(id);
      setMensagem("Modalidade deletada!");
      carregarModalidades();
      setTimeout(() => setMensagem(""), 3000);
    } catch (error) {
      setMensagem(error.message);
    }
  }

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Carregando...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/prefeitura"
          className="text-purple-600 hover:text-purple-800 font-semibold mb-6 flex"
        >
          <ChevronLeft /> Voltar
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                <Volleyball />
                Gerenciar Modalidades
              </h1>
              <p className="text-gray-600">
                {modalidades.length} modalidade(s) cadastrada(s)
              </p>
            </div>
            <Link
              href="/prefeitura/modalidades/novo"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex gap-2"
            >
              <Plus />
              Nova Modalidade
            </Link>
          </div>
        </div>

        {mensagem && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              mensagem.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {mensagem}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modalidades.map((mod) => (
            <div
              key={mod.id_modalidade}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900">
                  {mod.nome_modalidade}
                </h3>
                <button
                  onClick={() =>
                    handleDeletar(mod.id_modalidade, mod.nome_modalidade)
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  <Trash />
                </button>
              </div>
              {mod.regras_modalidade && (
                <p className="text-sm text-gray-600 line-clamp-3">
                  {mod.regras_modalidade}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
