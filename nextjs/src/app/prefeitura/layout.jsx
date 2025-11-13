"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  House,
  Landmark,
  LogOut,
  ScrollText,
  Speech,
  UsersRound,
  Volleyball,
} from "lucide-react";

export default function PrefeituraLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    {
      nome: "Dashboard",
      icone: <Landmark />,
      link: "/prefeitura",
      exact: true,
    },
    { nome: "Cidadãos", icone: <UsersRound />, link: "/prefeitura/cidadaos" },
    { nome: "CTs", icone: <House />, link: "/prefeitura/cts" },
    {
      nome: "Modalidades",
      icone: <Volleyball />,
      link: "/prefeitura/modalidades",
    },
    { nome: "Instrutores", icone: <Speech />, link: "/prefeitura/instrutores" },
    {
      nome: "Inscrições",
      icone: <ScrollText />,
      link: "/prefeitura/inscricoes",
    },
  ];

  function isActive(link, exact = false) {
    if (exact) {
      return pathname === link;
    }
    return pathname.startsWith(link);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-700 to-purple-900 text-white shadow-xl fixed h-full">
        <div className="p-6">
          <Link href="/prefeitura" className="block">
            <h1 className="text-2xl font-bold mb-1">
              <Landmark />
              PDTIC Paraíba
            </h1>
            <p className="text-purple-200 text-sm">Painel da Prefeitura</p>
          </Link>
        </div>

        <nav className="px-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                isActive(item.link, item.exact)
                  ? "bg-white text-purple-700 shadow-md"
                  : "text-purple-100 hover:bg-purple-800"
              }`}
            >
              <span className="text-xl">{item.icone}</span>
              <span>{item.nome}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-purple-600">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold bg-red-500 hover:bg-red-600 transition-colors text-center justify-center"
          >
            <span>
              <LogOut />
            </span>
            <span>Sair</span>
          </Link>
        </div>
      </aside>

      {/* Conteúdo */}
      <main className="ml-64 flex-1">
        {children}

        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="px-6 py-6 text-center text-gray-600">
            <p>© 2024 PDTIC Paraíba - Painel Administrativo</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
