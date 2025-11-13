"use client";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function CidadaoHeader({ nomeCidadao }) {
  return (
    <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90 mb-1">Bem vindo(a),</p>
          <h1 className="text-2xl font-bold">{nomeCidadao}</h1>
        </div>
        <div className="flex gap-3">
          <Link
            href="/cidadao/agendamentos"
            className="bg-white text-blue-600 px-3 py-4 rounded-lg font-semibold transition-colors shadow-md flex"
          >
            <Calendar /> Meus agendamentos
          </Link>
          <Link
            href="/"
            className="bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold hover:ng-blue-900 transition-colors"
          ></Link>
        </div>
      </div>
    </div>
  );
}
