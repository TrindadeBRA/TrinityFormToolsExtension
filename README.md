# TrinityFormTools - Extensão Multi-navegador

Extensão compatível com **Firefox e Chrome** que adiciona opções no menu de contexto (botão direito) para inserir dados de teste em campos de formulário durante o desenvolvimento.

## 🎉 Disponível nas Lojas Oficiais!

A extensão foi aprovada e está disponível nas lojas oficiais! 🚀

### 📥 Baixar Agora

👉 **[Chrome Web Store](https://chromewebstore.google.com/detail/trinityform/bhoeijmhignchgoclonfnooogiebijao)**  
👉 **[Firefox Add-ons](https://addons.mozilla.org/pt-BR/firefox/addon/trinityform/)**

**💙 Se puder, baixe e deixe uma avaliação para dar aquela força! 🙏**

---

## 🌐 Compatibilidade

- ✅ **Google Chrome** (via Chrome Web Store)
- ✅ **Firefox** (via Firefox Add-ons)
- ✅ **Microsoft Edge** (baseado em Chromium)
- ✅ **Opera** (baseado em Chromium)
- ✅ **Brave** (baseado em Chromium)

## 🚀 Como usar

1. Vá para qualquer página com formulário
2. Clique com o botão direito em um campo de texto editável
3. Selecione uma das opções disponíveis:
   - **Inserir CPF válido** - Gera um CPF válido sem pontuação
   - **Inserir Email** - Gera um email aleatório
   - **Inserir Telefone com DDD** - Gera um telefone no formato (XX) XXXXX-XXXX
   - **Inserir Nome** - Gera um nome brasileiro aleatório
4. O valor será gerado e inserido automaticamente no campo

## ✨ Funcionalidades

### CPF válido
- Gera CPFs válidos com dígitos verificadores corretos
- Formato: apenas números, sem pontuação (ex: `12345678901`)
- Algoritmo de validação completo

### Email
- Gera emails aleatórios com formatos realistas
- Exemplos: `usuario1234@gmail.com`, `teste5678@hotmail.com`
- Múltiplos domínios e prefixos

### Telefone com DDD
- Gera telefones com DDD válidos do Brasil
- Formato: `(XX) XXXXX-XXXX`
- DDDs incluídos: 11, 21, 31, 41, 47, 48, 51, 61, 71, 81, 85

### Nome
- Gera nomes brasileiros aleatórios realistas
- Formato: Primeiro Nome + Sobrenome (às vezes com segundo sobrenome)
- Exemplos: `Maria Silva`, `João Santos Oliveira`, `Ana Paula Ferreira`
- Lista extensa de nomes e sobrenomes comuns no Brasil

## 📦 Instalação

### Instalação Oficial (Recomendado)

A forma mais fácil é instalar diretamente das lojas oficiais:

- **[Chrome Web Store](https://chromewebstore.google.com/detail/trinityform/bhoeijmhignchgoclonfnooogiebijao)**
- **[Firefox Add-ons](https://addons.mozilla.org/pt-BR/firefox/addon/trinityform/)**

### Instalação Manual (Desenvolvimento)

#### Firefox

1. Abra o Firefox
2. Acesse `about:debugging#/runtime/this-firefox` na barra de endereço
3. Clique em **"Carregar Add-on Temporário"** (Load Temporary Add-on)
4. Selecione o arquivo `manifest.json` dentro desta pasta

#### Chrome / Edge / Opera / Brave

1. Abra o navegador
2. Acesse `chrome://extensions/` (ou `edge://extensions/` no Edge)
3. Ative o **"Modo do desenvolvedor"** (toggle no canto superior direito)
4. Clique em **"Carregar sem compactação"** (Load unpacked)
5. Selecione a pasta `TrinityFormTools`

## 🔧 Características técnicas

- ✅ Funciona com campos `input` e `textarea`
- ✅ Dispara eventos de input e change para compatibilidade com frameworks (React, Vue, etc.)
- ✅ A extensão só aparece em campos editáveis (contextos "editable")
- ✅ Compatível com todos os sites (matches: `<all_urls>`)
- ✅ Código organizado seguindo padrões profissionais
- ✅ Código em inglês, interface em português
- ✅ **Compatível com Firefox e Chrome** (polyfill automático)

## 📁 Estrutura de arquivos

```
TrinityFormTools/
├── manifest.json              # Configuração da extensão (Chrome)
├── manifest.firefox.json      # Configuração da extensão (Firefox)
├── background.js              # Gerencia o menu de contexto
├── content-script.js          # Gera e insere os valores nos campos
├── build.js                   # Script de build para ambas as plataformas
├── icon48.png                 # Ícone 48x48
├── icon96.png                 # Ícone 96x96
├── icon128.png                # Ícone 128x128
└── README.md                  # Documentação principal
```

## 🛠️ Desenvolvimento

### Padrões de código
- Código escrito em inglês (variáveis, funções, comentários)
- Interface do usuário em português (títulos do menu, descrições)
- JSDoc comments para documentação
- Constantes organizadas no topo dos arquivos
- Funções com responsabilidades únicas

### Estrutura
- `background.js`: Gerencia criação do menu de contexto e comunicação
- `content-script.js`: Contém lógica de geração de dados e inserção em campos
- Separação clara de responsabilidades
- Fácil manutenção e extensão

### Build

```bash
# Build para Chrome
npm run build:chrome

# Build para Firefox
npm run build:firefox

# Build para ambas as plataformas
npm run build
```

## 📝 Licença

Desenvolvido por **Trinity Web**

---

**⭐ Gostou da extensão? Deixe uma avaliação nas lojas oficiais! ⭐**
