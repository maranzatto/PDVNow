// Habilitando logs detalhados
console.log('Preload script carregado');

// Expondo APIs do Node.js para o processo de renderização
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM carregado no preload');
  
  // Exemplo de como expor uma API:
  // const { contextBridge, ipcRenderer } = require('electron');
  // 
  // contextBridge.exposeInMainWorld('electronAPI', {
  //   doSomething: () => ipcRenderer.send('do-something')
  // });
});
