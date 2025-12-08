# 🌐 Instalação no Google Chrome

A extensão TrinityFormTools agora é **compatível com Firefox e Chrome**!

## 📦 Como instalar no Chrome

### Método 1: Modo Desenvolvedor (Recomendado para testes)

1. Abra o Google Chrome
2. Acesse `chrome://extensions/` na barra de endereço
3. Ative o **"Modo do desenvolvedor"** (toggle no canto superior direito)
4. Clique em **"Carregar sem compactação"** (Load unpacked)
5. Selecione a pasta `TrinityFormTools`
6. Pronto! A extensão estará instalada

### Método 2: Publicar na Chrome Web Store

Para distribuir publicamente, você precisará:

1. Criar uma conta de desenvolvedor na Chrome Web Store
2. Pagar taxa única de $5 USD
3. Fazer upload do pacote ZIP
4. Aguardar revisão (geralmente 1-3 dias)

**Link:** https://chrome.google.com/webstore/devconsole

## ✅ Compatibilidade

A extensão foi adaptada para funcionar em:
- ✅ **Firefox** (via Firefox Add-ons)
- ✅ **Google Chrome** (via Chrome Web Store ou modo desenvolvedor)
- ✅ **Microsoft Edge** (baseado em Chromium)
- ✅ **Opera** (baseado em Chromium)
- ✅ **Brave** (baseado em Chromium)

## 🔧 O que foi adaptado?

- Uso de polyfill para compatibilidade entre `browser.*` (Firefox) e `chrome.*` (Chrome)
- Código funciona automaticamente em ambos os navegadores
- Mesma funcionalidade em todas as plataformas

## 🚀 Testando

Após instalar, teste em qualquer formulário:

1. Clique com botão direito em um campo de texto
2. Veja as opções: "Inserir CPF válido", "Inserir Email", "Inserir Telefone com DDD"
3. Clique em uma opção e veja o valor sendo inserido

## 📝 Notas

- O manifest.json atual (v2) funciona em ambos os navegadores
- Para Chrome Web Store, você pode precisar de manifest v3 no futuro
- Por enquanto, manifest v2 ainda é suportado

