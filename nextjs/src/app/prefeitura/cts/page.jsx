"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCts, deleteCt } from "@/lib/api";
import { Check, Plus, ChevronLeft, House, Trash } from "lucide-react";

export default function CtsPage() {
  const [cts, setCts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    carregarCts();
  }, []);

  async function carregarCts() {
    try {
      const data = await getCts();
      setCts(data);
    } catch (error) {
      setMensagem(<X />, `Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletar(id, nome) {
    if (!confirm(`Deletar ${nome}?`)) return;
    try {
      await deleteCt(id);
      setMensagem(<Check />, "CT deletado!");
      carregarCts();
      setTimeout(() => setMensagem(""), 3000);
    } catch (error) {
      setMensagem(<X />, `${error.message}`);
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
                <House />
                Gerenciar CTs
              </h1>
              <p className="text-gray-600">{cts.length} CT(s) cadastrado(s)</p>
            </div>
            <Link
              href="/prefeitura/cts/novo"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex gap-2 hover:bg-blue-700"
            >
              <Plus />
              Novo CT
            </Link>
          </div>
        </div>

        {mensagem && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              mensagem.includes(<Check />)
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {mensagem}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {cts.map((ct) => (
            <div key={ct.id_ct} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {ct.nome_ct}
                  </h3>
                  <p className="text-gray-600">
                    Capacidade: {ct.capacidade_ct}
                  </p>
                  <p className="text-sm text-gray-600">
                    {ct.rua}, {ct.numero_rua} - {ct.bairro}
                  </p>
                  <p className="text-sm text-gray-600">CEP: {ct.cep}</p>
                </div>
                <button
                  onClick={() => handleDeletar(ct.id_ct, ct.nome_ct)}
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
