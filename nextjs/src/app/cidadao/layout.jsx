"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Calendar, LogOut, Menu } from "lucide-react";

export default function CidadaoLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [cidadao, setCidadao] = useState(null);

  useEffect(() => {
    const cidadaoData = localStorage.getItem("cidadao");
    if (!cidadaoData) {
      router.push("/");
      return;
    }
    setCidadao(JSON.parse(cidadaoData));
  }, [router]);

  if (!cidadao) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/cidadao"
                className="text-2xl font-bold text-blue-600"
              >
                PDTIC Paraíba
              </Link>
              <nav className="flex gap-4">
                <Link
                  href="/cidadao"
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    pathname === "/cidadao"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Menu />
                  Início
                </Link>
                <Link
                  href="/cidadao/agendamentos"
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    pathname === "/cidadao/agendamentos"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Calendar />
                  Meus Agendamentos
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Logado como:</p>
                <p className="font-semibold text-gray-900">
                  {cidadao.nome_cidadao}
                </p>
              </div>
              <Link
                href="/"
                onClick={() => localStorage.removeItem("cidadao")}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                <LogOut />
                Sair
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-600">
          <p>© 2024 PDTIC Paraíba - Sistema de Eventos Esportivos</p>
        </div>
      </footer>
    </div>
  );
}
