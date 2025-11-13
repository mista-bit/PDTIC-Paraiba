// app/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCidadaos, createCidadao } from "@/lib/api";
import { ChevronLeft, Landmark, UserRound } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [showCidadaoAuth, setShowCidadaoAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // true = login, false = cadastro

  // Campos de login
  const [cpfLogin, setCpfLogin] = useState("");

  // Campos de cadastro
  const [dadosCadastro, setDadosCadastro] = useState({
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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const cidadaos = await getCidadaos();
      const cpfLimpo = cpfLogin.replace(/\D/g, "");
      const cidadao = cidadaos.find(
        (c) => c.cpf_cidadao.replace(/\D/g, "") === cpfLimpo
      );

      if (cidadao) {
        localStorage.setItem("cidadao", JSON.stringify(cidadao));
        router.push("/cidadao");
      } else {
        setError("CPF não encontrado. Faça seu cadastro primeiro!");
      }
    } catch (err) {
      setError("Erro ao buscar dados. Verifique se o servidor está rodando.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCadastro(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const novoCidadao = await createCidadao(dadosCadastro);
      localStorage.setItem("cidadao", JSON.stringify(novoCidadao));
      router.push("/cidadao");
    } catch (err) {
      setError("Erro ao cadastrar. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handlePrefeituraAccess() {
    router.push("/prefeitura");
  }

  if (showCidadaoAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => {
              setShowCidadaoAuth(false);
              setIsLogin(true);
              setError("");
            }}
            className="text-gray-600 hover:text-gray-800 mb-4"
          >
            <ChevronLeft /> Voltar
          </button>

          {/* Tabs Login/Cadastro */}
          <div className="flex gap-2 mb-6 border-b">
            <button
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
              className={`flex-1 py-3 font-semibold transition-colors ${
                isLogin
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Fazer Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError("");
              }}
              className={`flex-1 py-3 font-semibold transition-colors ${
                !isLogin
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Cadastrar-se
            </button>
          </div>

          {/* FORMULÁRIO DE LOGIN */}
          {isLogin ? (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Acesso do Cidadão
              </h1>
              <p className="text-gray-600 mb-6">Digite seu CPF para acessar</p>

              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpfLogin}
                  onChange={(e) => setCpfLogin(e.target.value)}
                  maxLength={14}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-500 focus:outline-none text-gray-900"
                  required
                />

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {loading ? "Verificando..." : "Entrar"}
                </button>
              </form>
            </>
          ) : (
            /* FORMULÁRIO DE CADASTRO */
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Cadastro de Cidadão
              </h1>
              <p className="text-gray-600 mb-6">
                Preencha seus dados para se cadastrar
              </p>

              <form onSubmit={handleCadastro} className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={dadosCadastro.nome_cidadao}
                    onChange={(e) =>
                      setDadosCadastro({
                        ...dadosCadastro,
                        nome_cidadao: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      CPF *
                    </label>
                    <input
                      type="text"
                      value={dadosCadastro.cpf_cidadao}
                      onChange={(e) =>
                        setDadosCadastro({
                          ...dadosCadastro,
                          cpf_cidadao: e.target.value,
                        })
                      }
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
                      value={dadosCadastro.data_nascimento}
                      onChange={(e) =>
                        setDadosCadastro({
                          ...dadosCadastro,
                          data_nascimento: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={dadosCadastro.email_cidadao}
                      onChange={(e) =>
                        setDadosCadastro({
                          ...dadosCadastro,
                          email_cidadao: e.target.value,
                        })
                      }
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
                      value={dadosCadastro.telefone_cidadao}
                      onChange={(e) =>
                        setDadosCadastro({
                          ...dadosCadastro,
                          telefone_cidadao: e.target.value,
                        })
                      }
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                      required
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      CEP *
                    </label>
                    <input
                      type="text"
                      value={dadosCadastro.cep_cidadao}
                      onChange={(e) =>
                        setDadosCadastro({
                          ...dadosCadastro,
                          cep_cidadao: e.target.value,
                        })
                      }
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
                      value={dadosCadastro.rua_cidadao}
                      onChange={(e) =>
                        setDadosCadastro({
                          ...dadosCadastro,
                          rua_cidadao: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Número *
                    </label>
                    <input
                      type="text"
                      value={dadosCadastro.numero_rua_cidadao}
                      onChange={(e) =>
                        setDadosCadastro({
                          ...dadosCadastro,
                          numero_rua_cidadao: e.target.value,
                        })
                      }
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
                      value={dadosCadastro.bairro_cidadao}
                      onChange={(e) =>
                        setDadosCadastro({
                          ...dadosCadastro,
                          bairro_cidadao: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {loading ? "Cadastrando..." : "Criar Conta e Entrar"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Sistema de Eventos Esportivos
          </h1>
          <p className="text-xl text-gray-600 mb-8">PDTIC Paraíba</p>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Card Cidadão */}
            <button
              onClick={() => setShowCidadaoAuth(true)}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-8 hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="text-6xl mb-4 flex justify-center">
                <UserRound />
              </div>
              <h2 className="text-2xl font-bold mb-2">Sou Cidadão</h2>
              <p className="text-blue-100">Ver eventos e fazer agendamentos</p>
            </button>

            {/* Card Prefeitura */}
            <button
              onClick={handlePrefeituraAccess}
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-8 hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="text-6xl mb-4 flex justify-center">
                <Landmark />
              </div>
              <h2 className="text-2xl font-bold mb-2">Sou da Prefeitura</h2>
              <p className="text-purple-100">Gerenciar eventos e cadastros</p>
            </button>
          </div>
        </div>

        <p className="text-white text-sm opacity-75">
          © 2024 PDTIC Paraíba - Sistema de Gestão de Eventos Esportivos
        </p>
      </div>
    </div>
  );
}
