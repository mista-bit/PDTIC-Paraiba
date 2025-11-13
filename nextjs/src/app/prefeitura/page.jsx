"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getEstatisticas } from "@/lib/api";
import StatCard from "@/components/StatCard";
import {
  House,
  MousePointer,
  ScrollText,
  Speech,
  User,
  Users,
  Volleyball,
} from "lucide-react";

export default function PrefeituraDashboard() {
  const [stats, setStats] = useState({
    totalEventos: 0,
    totalInscricoes: 0,
    totalParticipantes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarStats() {
      try {
        const data = await getEstatisticas();
        setStats(data);
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarStats();
  }, []);

  const menus = [
    {
      titulo: "Cidadãos",
      icone: <Users />,
      link: "/prefeitura/cidadaos",
      cor: "blue",
    },
    {
      titulo: "Centros de Treinamento",
      icone: <House />,
      link: "/prefeitura/cts",
      cor: "purple",
    },
    {
      titulo: "Modalidades",
      icone: <Volleyball />,
      link: "/prefeitura/modalidades",
      cor: "green",
    },
    {
      titulo: "Instrutores",
      icone: <Speech />,
      link: "/prefeitura/instrutores",
      cor: "orange",
    },
    {
      titulo: "Inscrições",
      icone: <ScrollText />,
      link: "/prefeitura/inscricoes",
      cor: "red",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-lg p-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Bem-vindo ao Painel</h1>
            <p className="text-purple-100">
              Sistema de Gestão de Eventos Esportivos
            </p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            titulo="Total de Eventos"
            valor={stats.totalEventos}
            icone={<MousePointer />}
            cor="blue"
          />
          <StatCard
            titulo="Total de Inscrições"
            valor={stats.totalInscricoes}
            icone={<ScrollText />}
            cor="green"
          />
          <StatCard
            titulo="Cidadãos Cadastrados"
            valor={stats.totalParticipantes}
            icone={<User />}
            cor="purple"
          />
        </div>

        {/* Menu de Gerenciamento */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Gerenciamento
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menus.map((menu) => (
              <Link
                key={menu.titulo}
                href={menu.link}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-purple-500"
              >
                <div className="text-5xl mb-4">{menu.icone}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {menu.titulo}
                </h3>
                <p className="text-gray-600">
                  Gerenciar {menu.titulo.toLowerCase()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
