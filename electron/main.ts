import { app, BrowserWindow, ipcMain, session } from 'electron';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do ambiente
const isDev = process.env.NODE_ENV === 'development';

// Configuração de segurança para o Electron
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  console.log('Iniciando aplicação Electron...');
  
  // Configurações da janela principal
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false, // Não mostrar até que o conteúdo esteja pronto
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  // Eventos da janela
  mainWindow.on('ready-to-show', () => {
    if (mainWindow) {
      console.log('Janela pronta para ser exibida');
      mainWindow.show();
      mainWindow.focus();
      
      // Abre as ferramentas de desenvolvedor em modo de desenvolvimento
      if (isDev) {
        mainWindow.webContents.openDevTools();
      }
    }
  });

  // Tratamento de erros de carregamento
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error(`Falha ao carregar: ${errorCode} - ${errorDescription}`);
  });

  // Log de navegação
  mainWindow.webContents.on('did-start-loading', () => {
    console.log('Carregando conteúdo...');  
  });

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Conteúdo carregado com sucesso!');
  });

  // Desativa CORS em desenvolvimento
  if (isDev) {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Access-Control-Allow-Origin': ['*']
        }
      });
    });
  }

  // Carrega a aplicação
  try {
    const url = isDev 
      ? 'http://localhost:5173' 
      : `file://${path.join(__dirname, '../dist/index.html')}`;
    
    console.log(`Carregando aplicação de: ${url}`);
    await mainWindow.loadURL(url);
    
  } catch (error) {
    console.error('Erro ao carregar a aplicação:', error);
  }
};

// Inicialização do Electron
app.whenReady().then(async () => {
  console.log('Electron está pronto, criando janela...');
  await createWindow();
});

// Encerramento da aplicação
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.log('Encerrando aplicação...');
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    console.log('Recriando janela...');
    createWindow();
  }
});

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('Erro não capturado:', error);});

// Log de erros de rejeição de promessas não tratadas
process.on('unhandledRejection', (reason, promise) => {
  console.error('Promessa rejeitada não tratada em:', promise, 'motivo:', reason);
});
