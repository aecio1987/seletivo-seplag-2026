# SIGPET – Sistema de Gestão de Pets

Projeto Front-End desenvolvido como parte do Processo Seletivo SEPLAG 2026, com foco em usabilidade, acessibilidade, validações, organização de código e boas práticas em React com TypeScript.

O sistema simula um ambiente de gestão de pets, permitindo ao tutor visualizar e gerenciar seus dados, alterar senha e acessar informações de forma clara e segura.

---

## 🎯 Objetivo do Projeto

- Desenvolvimento Front-End com React + TypeScript
- Organização de código em camadas
- Experiência do usuário (UX)
- Validações e prevenção de erros
- Feedback visual claro
- Acessibilidade básica
- Código legível, manutenível e bem estruturado

---

## ⚙️ Funcionalidades Implementadas

### 🐾 Meus Pets
- Visualização dos pets vinculados ao tutor
- Consumo de dados via camada de fachada (PetFacade)

### 👤 Meus Dados
- Visualização e edição dos dados do tutor
- Máscara e validação de CPF
- Busca automática de endereço a partir do CEP (ViaCEP)
- Validações de formulário com mensagens visíveis
- Feedback visual de sucesso e erro
- Prevenção de salvamento com dados inválidos

### 🔒 Segurança
- Alteração de senha do usuário
- Validação de campos obrigatórios
- Confirmação de nova senha
- Mensagens claras de erro e sucesso

---

## ♿ Acessibilidade

- Uso de aria-label na navegação
- Contraste adequado entre texto e fundo
- Estados visuais distintos para erro e sucesso
- Feedback textual e visual nos formulários

---

## 🧠 Decisões Técnicas

- React + TypeScript para maior segurança de tipos
- Fachada (PetFacade) centralizando regras de negócio
- Services isolados para consumo de APIs externas
- Layouts reutilizáveis para padronização visual
- Separação clara entre componentes, páginas, serviços e tipos

---

## 🗂️ Estrutura de Pastas

src/
├─ api/
├─ assets/
├─ components/
│  ├─ LoginForm.tsx
│  ├─ PetForm.tsx
│  └─ RegisterForm.tsx
├─ core/
│  └─ pet.facade.ts
├─ layout/
│  ├─ AppLayout.tsx
│  ├─ AuthLayout.tsx
│  ├─ LayoutShell.tsx
│  └─ LoginLayout.tsx
├─ pages/
│  ├─ AuthPage.tsx
│  ├─ MeusDadosPage.tsx
│  └─ PetsPage.tsx
├─ services/
│  ├─ cep.service.ts
│  └─ location.service.ts
├─ types/
│  ├─ pet.types.ts
│  └─ tutor.types.ts
├─ App.tsx
├─ main.tsx
└─ index.css

---

## ▶️ Como Executar o Projeto

### 📌 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes)

Verifique com:

node -v  
npm -v  

---

### 🚀 Passos para execução

1. Clone o repositório:
git clone https://github.com/aecio1987/seletivo-seplag-2026.git

2. Acesse a pasta do projeto:
cd seletivo-seplag-2026

3. Instale as dependências:
npm install

4. Execute o projeto:
npm run dev

---

### 🌐 Acesso no navegador

Após iniciar o projeto, acesse:

http://localhost:5173

---

## 👤 Autor

Aécio Luis Moreira Fernandes  

📧 E-mail para contato:  
aecioluismoreira@gmail.com
