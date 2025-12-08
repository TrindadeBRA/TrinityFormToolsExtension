# 🔄 Guia de Atualização - TrinityForm

## Processo de Atualização

Sim, você atualiza manualmente pelo Developer Hub. Aqui está o passo a passo completo:

## 📋 Passo a Passo

### 1. Atualizar o Código Localmente

Antes de fazer upload, atualize os arquivos:

```bash
# Edite os arquivos necessários
# Exemplo: content-script.js, background.js, etc.
```

### 2. Atualizar a Versão no manifest.json

**IMPORTANTE:** Sempre atualize o número da versão antes de fazer upload!

```json
{
  "version": "1.0.1",  // ← Incremente aqui (1.0.0 → 1.0.1 → 1.0.2, etc.)
  ...
}
```

**Convenção de versionamento:**
- `1.0.0` → `1.0.1` (correções de bugs)
- `1.0.1` → `1.1.0` (novas funcionalidades menores)
- `1.1.0` → `2.0.0` (mudanças maiores/breaking changes)

### 3. Criar Novo Pacote ZIP

```bash
# No diretório do projeto
cd /home/trindadebra/Documentos/TrindadeBRA/TrinityFormTools

# Criar novo ZIP com a versão atualizada
zip -r TrinityForm-v1.0.1.zip \
  manifest.json \
  background.js \
  content-script.js \
  icon48.png \
  icon96.png \
  -x "*.git*" "*.md" "*.webp" "*.tmp" ".gitignore"
```

**Arquivos a incluir:**
- ✅ `manifest.json` (com versão atualizada)
- ✅ `background.js`
- ✅ `content-script.js`
- ✅ `icon48.png`
- ✅ `icon96.png`

**Arquivos a NÃO incluir:**
- ❌ `.git/`
- ❌ `README.md`, `PUBLISHING.md`, etc.
- ❌ `.gitignore`
- ❌ `favicon.webp`

### 4. Acessar o Developer Hub

1. Acesse: **https://addons.mozilla.org/developers/addons**
2. Faça login na sua conta
3. Encontre a extensão **TrinityForm** na lista
4. Clique no nome da extensão

### 5. Fazer Upload da Nova Versão

1. Na página da extensão, procure o botão **"Upload New Version"** ou **"Nova Versão"**
2. Clique no botão
3. Selecione o novo arquivo ZIP (`TrinityForm-v1.0.1.zip`)
4. Aguarde o upload

### 6. Preencher Informações da Versão

Você precisará preencher:

#### Release Notes (Notas da Versão)
Descreva o que mudou nesta versão:

**Exemplo para correção de bug:**
```
Correções:
- Corrigido problema ao inserir CPF em campos com máscara
- Melhorada compatibilidade com React 18
```

**Exemplo para nova funcionalidade:**
```
Novidades:
- Adicionada opção para gerar CNPJ válido
- Melhorada geração de nomes com mais variações

Correções:
- Corrigido problema de inserção em campos readonly
```

#### Source Code (Código Fonte)
- Se o código for open source, você pode fazer upload do código fonte
- Se não, pode deixar em branco (mas alguns revisores podem pedir)

### 7. Submeter para Revisão

1. Revise todas as informações
2. Clique em **"Submit Version"** ou **"Enviar Versão"**
3. Aguarde a validação automática

## ⏳ Processo de Revisão

### Validação Automática
- Alguns minutos
- Verifica estrutura do manifest
- Valida permissões
- Checa por problemas básicos

### Revisão Manual
- **1-7 dias úteis** (geralmente mais rápido para atualizações)
- Revisores testam as mudanças
- Verificam se as notas da versão estão corretas

### Status Possíveis
- ✅ **Approved** - Aprovada e publicada automaticamente
- ⚠️ **Needs Changes** - Precisa de correções (você receberá feedback)
- 🔄 **In Review** - Sendo revisada

## 📝 Dicas Importantes

### ✅ Boas Práticas

1. **Sempre atualize a versão** no manifest.json
2. **Descreva claramente** as mudanças nas Release Notes
3. **Teste localmente** antes de fazer upload
4. **Mantenha o changelog** atualizado
5. **Responda rapidamente** a feedbacks dos revisores

### ❌ Evite

1. **Não pule versões** (1.0.0 → 1.0.5 sem 1.0.1-1.0.4)
2. **Não faça upload** sem testar primeiro
3. **Não esqueça** de atualizar a versão
4. **Não envie** múltiplas versões ao mesmo tempo

## 🔍 Verificar Status

Após submeter:

1. Acesse o Developer Hub
2. Vá para sua extensão
3. Veja a aba **"Versions"** ou **"Versões"**
4. Verifique o status da nova versão

## 📊 Histórico de Versões

Mantenha um registro das mudanças:

```
v1.0.0 - Versão inicial
- CPF válido
- Nome brasileiro
- Email
- Telefone com DDD

v1.0.1 - Correções
- Corrigido problema X
- Melhorada compatibilidade Y

v1.1.0 - Novas funcionalidades
- Adicionado CNPJ
- Melhorada geração de nomes
```

## 🚨 Problemas Comuns

### Erro: "Version already exists"
- **Solução:** Atualize o número da versão no manifest.json

### Erro: "Manifest validation failed"
- **Solução:** Verifique se o manifest.json está correto
- Use o validador: https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/

### Revisão demorada
- **Normal:** Pode levar até 7 dias úteis
- **Acelerar:** Responda rapidamente a feedbacks
- **Verificar:** Veja se há problemas reportados

## 🔗 Links Úteis

- **Developer Hub:** https://addons.mozilla.org/developers/addons
- **Documentação:** https://extensionworkshop.com/
- **Validador de Manifest:** https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/

---

**Resumo:** Sim, é manual pelo site. Sempre atualize a versão no manifest.json antes de fazer upload!


