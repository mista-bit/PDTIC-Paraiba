const API_BASE_URL = "http://127.0.0.1:8000/api";

// CIDADÃOS
export async function getCidadaos() {
  const res = await fetch(`${API_BASE_URL}/cidadaos/`);
  if (!res.ok) throw new Error("Erro ao buscar cidadãos");
  return res.json();
}

export async function getCidadao(id) {
  const res = await fetch(`${API_BASE_URL}/cidadaos/${id}/`);
  if (!res.ok) throw new Error("Erro ao buscar cidadão");
  return res.json();
}

export async function createCidadao(dados) {
  const res = await fetch(`${API_BASE_URL}/cidadaos/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
    const error = await res.json();
    const errorMsg = Object.entries(error)
      .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
      .join(' | ');
    throw new Error(errorMsg || "Erro ao criar cidadão");
  }
  return res.json();
}

export async function updateCidadao(id, dados) {
  const res = await fetch(`${API_BASE_URL}/cidadaos/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao atualizar cidadão");
  return res.json();
}

export async function deleteCidadao(id) {
  const res = await fetch(`${API_BASE_URL}/cidadaos/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar cidadão");
}

// CTs
export async function getCts() {
  const res = await fetch(`${API_BASE_URL}/ct/`);
  if (!res.ok) throw new Error("Erro ao buscar CTs");
  return res.json();
}

export async function getCt(id) {
  const res = await fetch(`${API_BASE_URL}/ct/${id}/`);
  if (!res.ok) throw new Error("Erro ao buscar CT");
  return res.json();
}

export async function createCt(dados) {
  const res = await fetch(`${API_BASE_URL}/ct/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao criar CT");
  return res.json();
}

export async function updateCt(id, dados) {
  const res = await fetch(`${API_BASE_URL}/ct/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao atualizar CT");
  return res.json();
}

export async function deleteCt(id) {
  const res = await fetch(`${API_BASE_URL}/ct/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar CT");
}

// MODALIDADES
export async function getModalidades() {
  const res = await fetch(`${API_BASE_URL}/modalidades/`);
  if (!res.ok) throw new Error("Erro ao buscar modalidades");
  return res.json();
}

export async function getModalidade(id) {
  const res = await fetch(`${API_BASE_URL}/modalidades/${id}/`);
  if (!res.ok) throw new Error("Erro ao buscar modalidade");
  return res.json();
}

export async function createModalidade(dados) {
  const res = await fetch(`${API_BASE_URL}/modalidades/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao criar modalidade");
  return res.json();
}

export async function updateModalidade(id, dados) {
  const res = await fetch(`${API_BASE_URL}/modalidades/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao atualizar modalidade");
  return res.json();
}

export async function deleteModalidade(id) {
  const res = await fetch(`${API_BASE_URL}/modalidades/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar modalidade");
}

// CT-MODALIDARES
export async function getCtModalidades() {
  const res = await fetch(`${API_BASE_URL}/ct_modalidades/`);
  if (!res.ok) throw new Error("Erro ao buscar CT-Modalidades");
  return res.json();
}

export async function createCtModalidade(dados) {
  const res = await fetch(`${API_BASE_URL}/ct_modalidades/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao vincular modalidade ao CT");
  return res.json();
}

// INSTRUTORES
export async function getInstrutores() {
  const res = await fetch(`${API_BASE_URL}/instrutores/`);
  if (!res.ok) throw new Error("Erro ao buscar instrutores");
  return res.json();
}

export async function getInstrutor(id) {
  const res = await fetch(`${API_BASE_URL}/instrutores/${id}/`);
  if (!res.ok) throw new Error("Erro ao buscar instrutor");
  return res.json();
}

export async function createInstrutor(dados) {
  const res = await fetch(`${API_BASE_URL}/instrutores/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao criar instrutor");
  return res.json();
}

export async function updateInstrutor(id, dados) {
  const res = await fetch(`${API_BASE_URL}/instrutores/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao atualizar instrutor");
  return res.json();
}

export async function deleteInstrutor(id) {
  const res = await fetch(`${API_BASE_URL}/instrutores/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar instrutor");
}

// INSCRIÇÕES
export async function getInscricoes() {
  const res = await fetch(`${API_BASE_URL}/inscricoes/`);
  if (!res.ok) throw new Error("Erro ao buscar inscrições");
  return res.json();
}

export async function getInscricao(id) {
  const res = await fetch(`${API_BASE_URL}/inscricoes/${id}/`);
  if (!res.ok) throw new Error("Erro ao buscar inscrição");
  return res.json();
}

export async function getInscricoesCidadao(cidadaoId) {
  const res = await fetch(`${API_BASE_URL}/inscricoes/?cidadao=${cidadaoId}`);
  if (!res.ok) throw new Error("Erro ao buscar inscrições do cidadão");
  return res.json();
}

export async function createInscricao(dados) {
  const res = await fetch(`${API_BASE_URL}/inscricoes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Erro ao criar inscrição");
  }
  return res.json();
}

export async function createInscricaoPorCPF(cpf, ctId, modalidadeId) {
  const res = await fetch(`${API_BASE_URL}/inscricoes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cpf_cidadao: cpf,
      ct: ctId,
      modalidade: modalidadeId,
    }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(
      error.cpf_cidadao?.[0] ||
        error.non_field_errors?.[0] ||
        "Erro ao criar inscrição"
    );
  }
  return res.json();
}

export async function deleteInscricao(id) {
  const res = await fetch(`${API_BASE_URL}/inscricoes/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao cancelar inscrição");
}

// ============== ESTATÍSTICAS ==============
export async function getEstatisticas() {
  try {
    const [modalidades, inscricoes, cidadaos] = await Promise.all([
      getCtModalidades(),
      getInscricoes(),
      getCidadaos(),
    ]);

    return {
      totalEventos: modalidades.length,
      totalInscricoes: inscricoes.length,
      totalParticipantes: cidadaos.length,
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return {
      totalEventos: 0,
      totalInscricoes: 0,
      totalParticipantes: 0,
    };
  }
}

export async function getEstatisticasCidadao(cidadaoId) {
  try {
    const [inscricoes, modalidades] = await Promise.all([
      getInscricoesCidadao(cidadaoId),
      getCtModalidades(),
    ]);

    return {
      totalEventos: modalidades.length,
      meusAgendamentos: inscricoes.length,
      totalParticipantes: await getCidadaos().then((c) => c.length),
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas do cidadão:", error);
    return {
      totalEventos: 0,
      meusAgendamentos: 0,
      totalParticipantes: 0,
    };
  }
}