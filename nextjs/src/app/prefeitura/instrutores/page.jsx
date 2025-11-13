"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getInstrutores, deleteInstrutor } from "@/lib/api";
import { Trash, Speech, ChevronLeft, Plus } from "lucide-react";

export default function InstrutoresPage() {
  const [instrutores, setInstrutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    carregarInstrutores();
  }, []);

  async function carregarInstrutores() {
    try {
      const data = await getInstrutores();
      setInstrutores(data);
    } catch (error) {
      setMensagem(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletar(id, nome) {
    if (!confirm(`Deletar ${nome}?`)) return;
    try {
      await deleteInstrutor(id);
      setMensagem("Instrutor deletado!");
      carregarInstrutores();
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
          <ChevronLeft />
          Voltar
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                <Speech />
                Gerenciar Instrutores
              </h1>
              <p className="text-gray-600">
                {instrutores.length} instrutor(es) cadastrado(s)
              </p>
            </div>
            <Link
              href="/prefeitura/instrutores/novo"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex gap-2"
            >
              <Plus />
              Novo Instrutor
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

        <div className="grid md:grid-cols-2 gap-4">
          {instrutores.map((inst) => (
            <div
              key={inst.id_instrutor}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {inst.nome_instrutor}
                  </h3>
                  <p className="text-sm text-gray-600">
                    CPF: {inst.cpf_instrutor}
                  </p>
                  <p className="text-sm text-gray-600">
                    Email: {inst.email_instrutor}
                  </p>
                  <p className="text-sm text-gray-600">
                    Tel: {inst.telefone_instrutor}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleDeletar(inst.id_instrutor, inst.nome_instrutor)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
