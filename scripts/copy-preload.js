import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcPath = join(__dirname, '../electron/preload.js');
const destPath = join(__dirname, '../dist-electron/preload.js');

// Cria o diretório de destino se não existir
if (!existsSync(dirname(destPath))) {
  mkdirSync(dirname(destPath), { recursive: true });
}

// Copia o arquivo
copyFileSync(srcPath, destPath);
console.log('Arquivo preload.js copiado com sucesso!');
