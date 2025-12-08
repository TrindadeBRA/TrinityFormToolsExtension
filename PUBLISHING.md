# 📤 Guia de Publicação - TrinityFormTools

Este guia explica como publicar a extensão TrinityFormTools no Firefox Add-ons (AMO - Add-ons Mozilla).

## 📋 Pré-requisitos

### 1. Criar conta no Firefox Add-ons
1. Acesse: https://addons.mozilla.org/
2. Clique em **"Sign In"** ou **"Register"**
3. Crie uma conta (pode usar email ou conta Firefox)
4. Verifique seu email se necessário

### 2. Preparar arquivos para publicação

#### ✅ Checklist antes de publicar:

- [x] Código revisado e organizado
- [x] Ícones configurados (48x48 e 96x96)
- [x] Manifest.json completo
- [x] README.md atualizado
- [ ] Testar extensão em diferentes sites
- [ ] Verificar se não há erros no console

## 📦 Criar o pacote ZIP

### Opção 1: Via Terminal (Linux/Mac)

```bash
# No diretório do projeto
cd /home/trindadebra/Documentos/TrindadeBRA/TrinityFormTools

# Criar ZIP excluindo arquivos desnecessários
zip -r TrinityFormTools-v1.0.0.zip \
  manifest.json \
  background.js \
  content-script.js \
  icon48.png \
  icon96.png \
  -x "*.git*" "*.md" "*.webp" "*.tmp" ".gitignore"
```

### Opção 2: Via Interface Gráfica

1. Selecione os arquivos necessários:
   - `manifest.json`
   - `background.js`
   - `content-script.js`
   - `icon48.png`
   - `icon96.png`

2. **NÃO inclua:**
   - `.git/`
   - `README.md`
   - `PUBLISHING.md`
   - `.gitignore`
   - `favicon.webp` (opcional, mas não necessário)

3. Crie um arquivo ZIP com esses arquivos

## 🚀 Processo de Publicação

### Passo 1: Acessar o Developer Hub

1. Acesse: https://addons.mozilla.org/developers/
2. Faça login com sua conta
3. Clique em **"Submit a New Add-on"**

### Passo 2: Escolher método de distribuição

Você terá duas opções:

#### Opção A: **On this site** (Recomendado)
- Extensão disponível no site oficial da Mozilla
- Passa por revisão (pode levar alguns dias)
- Mais visibilidade e confiança

#### Opção B: **On your own** (Self-distribution)
- Você distribui o arquivo .xpi manualmente
- Sem revisão da Mozilla
- Menos visibilidade

**Recomendação:** Use "On this site" para maior alcance.

### Passo 3: Enviar o arquivo

1. Selecione o arquivo ZIP criado
2. Aguarde o upload
3. O sistema validará o manifest.json automaticamente

### Passo 4: Preencher informações da extensão

#### Informações básicas:
- **Name:** TrinityFormTools
- **Summary:** Breve descrição (até 250 caracteres)
  - Exemplo: "Ferramentas para preencher formulários: CPF válido, email e telefone com DDD."
- **Description:** Descrição completa (markdown suportado)
  - Use o conteúdo do README.md como base

#### Categorias:
- **Category:** Developer Tools (ou Productivity)
- **Tags:** `form`, `cpf`, `test-data`, `developer-tools`, `brazil`

#### Screenshots (Opcional mas recomendado):
- Tire screenshots da extensão em ação
- Tamanho recomendado: 1280x720 ou 1280x800
- Mostre o menu de contexto e um exemplo de uso

#### Ícones adicionais:
- Se tiver ícones maiores (128x128, 512x512), pode adicionar
- Os ícones 48x48 e 96x96 já estão no manifest

### Passo 5: Informações de privacidade

#### Permissões explicadas:
- **contextMenus:** Necessário para criar o menu de contexto
- **activeTab:** Necessário para inserir dados no campo ativo

**Importante:** Explique claramente que:
- A extensão não coleta dados
- Não envia informações para servidores externos
- Funciona apenas localmente no navegador
- Não acessa informações pessoais

### Passo 6: Revisão e submissão

1. Revise todas as informações
2. Marque que você leu e concorda com os termos
3. Clique em **"Submit Version"**

## ⏳ Processo de Revisão

### O que acontece:

1. **Validação automática** (alguns minutos)
   - Verifica estrutura do manifest
   - Valida permissões
   - Checa por código malicioso básico

2. **Revisão manual** (1-7 dias úteis)
   - Revisores verificam funcionalidade
   - Testam a extensão
   - Verificam políticas de privacidade

3. **Aprovação ou solicitação de mudanças**
   - Se aprovado: extensão publicada automaticamente
   - Se houver problemas: você receberá feedback

### Status possíveis:
- **Awaiting Review:** Aguardando revisão
- **In Review:** Sendo revisada
- **Approved:** Aprovada e publicada
- **Needs Changes:** Precisa de alterações

## 📝 Dicas para aprovação rápida

### ✅ Boas práticas:

1. **Código limpo e comentado** ✅ (já feito)
2. **Descrição clara e honesta**
3. **Privacidade transparente**
4. **Sem código ofuscado**
5. **Sem dependências externas desnecessárias**
6. **Funciona como descrito**

### ❌ Evite:

- Promessas exageradas
- Descrições vagas
- Código ofuscado
- Múltiplas submissões sem necessidade

## 🔄 Atualizações futuras

Para atualizar a extensão:

1. Acesse: https://addons.mozilla.org/developers/
2. Selecione sua extensão
3. Clique em **"Upload New Version"**
4. Atualize o `version` no `manifest.json`
5. Envie o novo ZIP
6. Descreva as mudanças na versão

## 📊 Após publicação

### Monitoramento:
- Acesse o dashboard do desenvolvedor
- Veja estatísticas de downloads
- Responda a reviews e feedbacks
- Monitore relatórios de problemas

### Promoção:
- Compartilhe o link da extensão
- Adicione no seu site/portfólio
- Documente no README do projeto

## 🔗 Links úteis

- **Developer Hub:** https://addons.mozilla.org/developers/
- **Documentação:** https://extensionworkshop.com/
- **Políticas:** https://extensionworkshop.com/documentation/publish/add-on-policies/
- **Suporte:** https://support.mozilla.org/products/add-ons

## ⚠️ Importante

- Mantenha o código atualizado
- Responda a feedbacks dos usuários
- Resolva problemas reportados rapidamente
- Siga as políticas da Mozilla

## 📞 Suporte

Se tiver problemas durante a publicação:
- Consulte a documentação oficial
- Entre em contato com o suporte da Mozilla
- Verifique o fórum de desenvolvedores

---

**Boa sorte com a publicação! 🚀**

