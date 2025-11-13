"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CidadaoHeader from "@/components/CidadaoHeader";
import EventCard from "@/components/EventCard";
import StatCard from "@/components/StatCard";
import {
  getCtModalidades,
  createInscricao,
  getEstatisticasCidadao,
} from "@/lib/api";
import {
  Calendar,
  MousePointer,
  MousePointer2,
  UsersRound,
} from "lucide-react";

export default function CidadaoDashboard() {
  const router = useRouter();
  const [cidadao, setCidadao] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [stats, setStats] = useState({
    totalEventos: 0,
    meusAgendamentos: 0,
    totalParticipantes: 0,
  });
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

    async function carregarDados() {
      try {
        const [eventosData, statsData] = await Promise.all([
          getCtModalidades(),
          getEstatisticasCidadao(cidadaoObj.id_cidadao),
        ]);

        setEventos(eventosData);
        setStats(statsData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [router]);

  async function handleAgendar(evento) {
    if (!cidadao) return;

    try {
      setMensagem("");
      await createInscricao({
        cidadao: cidadao.id_cidadao,
        ct: evento.ct,
        modalidade: evento.modalidade,
      });

      setMensagem("Inscrição realizada com sucesso!");

      // Atualiza estatísticas
      const statsData = await getEstatisticasCidadao(cidadao.id_cidadao);
      setStats(statsData);

      setTimeout(() => setMensagem(""), 5000);
    } catch (error) {
      setMensagem(error.message);
      setTimeout(() => setMensagem(""), 5000);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-2xl text-gray-700">Carregando...</div>
      </div>
    );
  }

  if (!cidadao) return null;

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
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

        {/* Estatísticas */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            titulo="Eventos Disponíveis"
            valor={stats.totalEventos}
            icone={<MousePointer />}
            cor="blue"
          />
          <StatCard
            titulo="Meus Agendamentos"
            valor={stats.meusAgendamentos}
            icone={<Calendar />}
            cor="green"
          />
          <StatCard
            titulo="Participantes Locais"
            valor={stats.totalParticipantes}
            icone={<UsersRound />}
            cor="purple"
          />
        </div>

        {/* Lista de Eventos */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {<MousePointer2 />} Eventos Disponíveis
          </h2>

          {eventos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventos.map((evento) => (
                <EventCard
                  key={evento.id}
                  evento={evento}
                  onAgendar={handleAgendar}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 text-lg">
                Nenhum evento disponível no momento.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
