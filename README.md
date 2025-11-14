# PDTIC-Paraiba
📘 Projeto acadêmico de Planejamento Estratégico de TI: Sistema de Gestão do Esporte Municipal

# 🏃‍♂️ PDTIC Paraíba - Sistema de Gestão de Eventos Esportivos

Sistema web para gerenciamento de inscrições em eventos esportivos municipais, desenvolvido como parte do Programa de Desenvolvimento Tecnológico em TIC da Paraíba.

## 📋 Sobre o Projeto

O SGEM (Sistema de Gestão de Eventos Esportivos) permite que cidadãos se inscrevam em atividades esportivas oferecidas em Centros de Treinamento (CTs) municipais, enquanto a prefeitura gerencia os eventos, modalidades, instrutores e inscrições.

## ✨ Funcionalidades

### 👥 Área do Cidadão
- ✅ Cadastro de cidadãos
- ✅ Login via CPF
- ✅ Visualização de eventos esportivos disponíveis
- ✅ Inscrição em modalidades esportivas
- ✅ Acompanhamento de inscrições (pendentes, confirmadas, canceladas)
- ✅ Protocolo de inscrição

### 🏛️ Área da Prefeitura
- ✅ Gerenciamento de Centros de Treinamento (CTs)
- ✅ Cadastro de modalidades esportivas
- ✅ Cadastro de instrutores (com criação automática de eventos)
- ✅ Gestão de cidadãos cadastrados
- ✅ Visualização de inscrições
- ✅ Dashboard com estatísticas

## 🛠️ Tecnologias Utilizadas

### Backend
- **Django 5.2.8** - Framework web Python
- **Django REST Framework** - API RESTful
- **SQLite** - Banco de dados
- **django-cors-headers** - Configuração CORS

### Frontend
- **Next.js 16.0.1** - Framework React
- **React 19.2.0** - Biblioteca UI
- **Tailwind CSS 3.4** - Estilização
- **Lucide React** - Ícones

## 📁 Estrutura do Projeto

```
PDTIC-Paraiba/
├── SGEM/                    # Backend Django
│   ├── config/              # Configurações do Django
│   ├── cidadaos/            # App de cidadãos
│   ├── ct/                  # App de centros de treinamento
│   ├── modalidades/         # App de modalidades esportivas
│   ├── instrutores/         # App de instrutores
│   ├── inscricao/           # App de inscrições
│   ├── manage.py            # Script de gerenciamento Django
│   └── requirements.txt     # Dependências Python
│
└── nextjs/                  # Frontend Next.js
    ├── src/
    │   ├── app/             # Páginas e rotas
    │   ├── components/      # Componentes reutilizáveis
    │   └── lib/             # Funções auxiliares (API)
    ├── public/              # Arquivos estáticos
    └── package.json         # Dependências Node.js
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Python 3.13+
- Node.js 18+
- npm ou yarn

### 1️⃣ Backend (Django)

```bash
# Navegue até a pasta do backend
cd SGEM

# Crie e ative um ambiente virtual (opcional, mas recomendado)
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Instale as dependências
pip install -r requirements.txt

# Execute as migrações
python manage.py migrate

# Inicie o servidor
python manage.py runserver
```

O backend estará disponível em: `http://127.0.0.1:8000`

### 2️⃣ Frontend (Next.js)

```bash
# Em outro terminal, navegue até a pasta do frontend
cd nextjs

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em: `http://localhost:3000`

## 🔗 Endpoints da API

### Cidadãos
- `GET /api/cidadaos/` - Listar todos os cidadãos
- `POST /api/cidadaos/` - Criar novo cidadão
- `GET /api/cidadaos/{id}/` - Buscar cidadão específico
- `PUT /api/cidadaos/{id}/` - Atualizar cidadão
- `DELETE /api/cidadaos/{id}/` - Deletar cidadão

### Centros de Treinamento
- `GET /api/ct/` - Listar CTs
- `POST /api/ct/` - Criar CT
- `PUT /api/ct/{id}/` - Atualizar CT
- `DELETE /api/ct/{id}/` - Deletar CT

### Modalidades
- `GET /api/modalidades/` - Listar modalidades
- `POST /api/modalidades/` - Criar modalidade
- `GET /api/ct_modalidades/` - Listar eventos (CT + Modalidade)
- `POST /api/ct_modalidades/` - Criar evento

### Instrutores
- `GET /api/instrutores/` - Listar instrutores
- `POST /api/instrutores/` - Criar instrutor (cria evento automaticamente)

### Inscrições
- `GET /api/inscricoes/` - Listar inscrições
- `POST /api/inscricoes/` - Criar inscrição
- `GET /api/inscricoes/?cidadao={id}` - Inscrições de um cidadão
- `DELETE /api/inscricoes/{id}/` - Cancelar inscrição

## 📊 Modelos de Dados

### Cidadão
- Nome completo
- CPF (único)
- Data de nascimento
- Email
- Telefone
- Endereço (CEP, rua, número, bairro)

### Centro de Treinamento (CT)
- Nome
- Capacidade
- Endereço

### Modalidade
- Nome
- Regras

### CT_Modalidade (Evento)
- CT
- Modalidade
- Vagas disponíveis
- Horários oferecidos
- Dias da semana

### Inscrição
- Cidadão
- CT
- Modalidade
- Status (pendente, confirmada, cancelada, lista de espera)
- Número de protocolo (gerado automaticamente)
- Datas (inscrição, confirmação, cancelamento)

### Instrutor
- Nome
- CPF
- Email
- Telefone

## 🔒 Segurança

- CORS configurado para desenvolvimento (permitindo requisições do frontend)
- Validação de dados no backend (serializers)
- Campos únicos (CPF, email, protocolo)
- Proteção contra duplicação de inscrições

## 🎨 Interface

### Telas Principais
- **Home**: Escolha entre acesso de cidadão ou prefeitura
- **Cadastro de Cidadão**: Formulário completo com validação
- **Dashboard do Cidadão**: Visualização de eventos e inscrições
- **Dashboard da Prefeitura**: Gerenciamento completo do sistema

### Componentes Reutilizáveis
- `StatCard`: Cards de estatísticas
- `EventCard`: Cards de eventos esportivos
- `CidadaoHeader`: Cabeçalho da área do cidadão

## 🐛 Problemas Conhecidos

- Sistema atualmente sem autenticação real (login apenas por CPF)
- Não há sistema de notificações implementado
- Relatórios e exportações não disponíveis

## 🚧 Melhorias Futuras

- [ ] Implementar autenticação JWT
- [ ] Sistema de notificações por email
- [ ] Geração de relatórios em PDF
- [ ] Painel administrativo aprimorado
- [ ] Aplicativo mobile
- [ ] Sistema de presença
- [ ] Avaliações de instrutores


