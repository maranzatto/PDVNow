# Guia de Desenvolvimento e Deploy - Aplicação PDV com Electron

## 🚀 Como Rodar em Desenvolvimento

### Pré-requisitos
- Node.js 16 ou superior
- npm ou yarn
- Git

### Configuração Inicial

1. **Clonar o repositório** (se aplicável)
   ```bash
   git clone <seu-repositorio>
   cd pdv
   ```

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Iniciar o ambiente de desenvolvimento**

   Em **dois terminais separados**, execute:

   **Terminal 1 - Servidor de Desenvolvimento Vite**
   ```bash
   npm run dev
   ```

   **Terminal 2 - Electron**
   ```bash
   $env:NODE_ENV="development"; electron .
   ```

## 🏗️ Estrutura do Projeto

```
pdv/
├── dist/                  # Build de produção do frontend
├── dist-electron/         # Arquivos compilados do Electron
├── electron/              # Código-fonte do Electron
│   ├── main.ts           # Ponto de entrada do Electron
│   └── preload.js        # Script de preload para comunicação entre processos
├── public/               # Arquivos estáticos
└── src/                  # Código-fonte da aplicação Vue
```

## 🔧 Comandos Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento Vite
- `npm run build` - Gera a build de produção
- `npm run electron:dev` - Inicia o Electron em modo desenvolvimento
- `npm run electron:build` - Gera o executável do aplicativo
- `npm run electron:start` - Executa o aplicativo a partir dos arquivos compilados

## 📦 Deploy e Geração do Executável

### 1. Build de Produção

```bash
# Build do frontend
npm run build

# Compilar o código TypeScript do Electron
npx tsc -p electron/tsconfig.json

# Copiar arquivos necessários
npx copyfiles -f electron/preload.js dist-electron/
```

### 2. Criar o Executável

```bash
npx electron-builder
```

Os arquivos de instalação serão gerados na pasta `dist_electron/`.

## 🌐 Configuração para Produção

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NODE_ENV=production
VITE_API_URL=https://sua-api.com
```

## 🔒 Considerações de Segurança

1. **Context Isolation**
   - Mantenha `contextIsolation` ativado em produção
   - Use o `preload` script para expor apenas as APIs necessárias

2. **Node Integration**
   - Considere desativar `nodeIntegration` e usar `contextBridge` para maior segurança

## 🚨 Solução de Problemas Comuns

### Tela Branca no Electron
1. Verifique os logs no console do Electron (Ctrl+Shift+I)
2. Confirme se o servidor de desenvolvimento está rodando
3. Verifique se o caminho do `preload.js` está correto

### Erros de Compilação
1. Limpe a cache: `rm -rf node_modules/.vite`
2. Reinstale as dependências: `npm install`

## 📚 Recursos Úteis

- [Documentação do Electron](https://www.electronjs.org/docs)
- [Guia do Vite](https://vitejs.dev/guide/)
- [Documentação do Vue 3](https://v3.vuejs.org/guide/introduction.html)

## 📞 Suporte

Em caso de problemas, verifique:

1. Logs do console do Electron
2. Logs do terminal onde o servidor está rodando
3. Arquivos de log em `%APPDATA%\{app-name}\logs` (Windows)

Para relatar problemas, inclua:
- Sistema Operacional e versão
- Versão do Node.js (`node -v`)
- Versão do Electron (`npx electron -v`)
- Passos para reproduzir o problema
- Mensagens de erro completas
