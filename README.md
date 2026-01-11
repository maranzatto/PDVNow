# PDV - Sistema de Ponto de Venda

Um sistema moderno de ponto de venda desenvolvido com Vue 3, TypeScript e Tauri, oferecendo uma experiência desktop nativa com tecnologias web.

## 🚀 Tecnologias

### Frontend
- **Vue 3.5.25** - Framework JavaScript progressivo
- **TypeScript 5.9** - Tipagem estática e desenvolvimento seguro
- **Vite 7.2.4** - Build tool rápido e moderno
- **Pinia 3.0.4** - Gerenciamento de estado oficial do Vue
- **Vue Router 4.6.3** - Roteamento de aplicação

### UI & Styling
- **PrimeVue 4.5.3** - Biblioteca de componentes UI
- **Tailwind CSS 4.1.18** - Framework CSS utility-first
- **PrimeFlex 4.0.0** - Sistema de grid flexível
- **PrimeIcons 7.0.0** - Conjunto de ícones

### Desktop
- **Tauri 2.9.5** - Framework para aplicações desktop
- **Rust 1.77.2** - Backend nativo e seguro

### Ferramentas
- **ESLint 9.39.1** - Linting e qualidade de código
- **Orval 7.17.2** - Geração de cliente API
- **Axios 1.13.2** - Cliente HTTP

## 📋 Pré-requisitos

- Node.js ^20.19.0 || >=22.12.0
- Rust 1.77.2+
- npm ou yarn

## 🛠️ Instalação

```bash
# Clonar o repositório
git clone <repository-url>
cd pdv

# Instalar dependências
npm install

# Instalar dependências do Tauri
cd src-tauri
cargo build
cd ..
```

## 🚀 Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento web
npm run dev

# Iniciar aplicação desktop em modo desenvolvimento
npm run tauri:dev
```

## 📦 Build

```bash
# Build para produção (web)
npm run build

# Build da aplicação desktop
npm run tauri:build

# Verificar tipos TypeScript
npm run type-check

# Lint e correção automática
npm run lint
```

## 🏗️ Estrutura do Projeto

```
src/
├── assets/              # Recursos estáticos
│   ├── Icons/          # Ícones customizados
│   ├── base.css        # Estilos base e tokens
│   └── main.css        # Estilos principais
├── components/         # Componentes compartilhados (prefixo M)
│   ├── MButton.vue
│   ├── MInputText.vue
│   └── ...
├── modules/            # Módulos da aplicação
│   ├── admin/          # Módulo administrativo
│   │   ├── components/
│   │   ├── layout/
│   │   └── views/
│   ├── auth/           # Módulo de autenticação
│   └── pdv/            # Módulo de ponto de venda
│       ├── components/
│       └── views/
├── stores/             # Stores Pinia
├── services/           # Serviços de API
├── types/              # Definições de tipo
├── utils/              # Utilitários
├── volt/               # Componentes Volt (DataTable, etc.)
├── App.vue             # Componente raiz
└── main.ts             # Ponto de entrada
```

## 🎯 Funcionalidades

### Módulo Administrativo
- **Dashboard** - Visão geral do sistema
- **Usuários** - Gerenciamento de usuários
- **Produtos** - Cadastro e controle de estoque
- **Fornecedores** - Gestão de fornecedores
- **Caixas** - Controle de caixas
- **Configurações** - Configurações do sistema

### Módulo PDV
- **Vendas** - Processamento de vendas
- **Carrinho** - Gerenciamento de itens
- **Pagamentos** - Múltiplas formas de pagamento
- **Descontos** - Aplicação de descontos
- **Busca** - Pesquisa rápida de produtos

## 🎨 Padrões de Código

### Vue
- Apenas `<script setup lang="ts">`
- Composition API obrigatório
- Props e emits tipados obrigatoriamente
- Uso de computed e composables sobre lógica inline

### TypeScript
- Modo strict, `any` proibido
- Tipos explícitos apenas em `/types`

### Estado
- Pinia apenas em `/stores`
- Estrutura: state + getters + actions
- Componentes nunca chamam API diretamente

### CSS
- Proibido `style=""` e `:style=""`
- Proibido Tailwind inline nos templates
- Uso obrigatório de classes semânticas
- Cores apenas de `base.css` ou `tailwind.config.js`

### Componentes
- Componentes compartilhados com prefixo "M"
- Uso obrigatório de `src/volt/DataTable.vue` para tabelas
- Verificar existência antes de criar novos componentes

## 🔧 Configuração

### Variáveis de Ambiente
Configure as variáveis de ambiente no arquivo `.env`:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=PDV
```

### Tauri Configuration
As configurações do Tauri estão em `src-tauri/tauri.conf.json`.

## 📝 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build
- `npm run type-check` - Verificação de tipos
- `npm run lint` - Lint e correção
- `npm run tauri:dev` - App desktop em dev
- `npm run tauri:build` - Build do app desktop

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 🆘 Suporte

Para suporte, abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento.
