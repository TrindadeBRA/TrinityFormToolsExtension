# Respostas para Práticas de Privacidade - Chrome Web Store

## 1. Descrição do Único Propósito (Single Purpose Description)

**Resposta:**
A extensão TrinityForm tem um único propósito: permitir que desenvolvedores web preencham rapidamente campos de formulário com dados de teste brasileiros válidos (CPF, nome, e-mail e telefone) através do menu de contexto (botão direito). Toda a funcionalidade está focada exclusivamente neste objetivo.

---

## 2. Justificativa para `activeTab`

**Resposta:**
A permissão `activeTab` é necessária para que a extensão possa inserir dados de teste em campos de formulário na aba ativa quando o usuário seleciona uma opção do menu de contexto. A extensão apenas acessa a aba quando o usuário interage explicitamente com o menu de contexto em um campo editável, garantindo que não há acesso não autorizado a páginas.

**Uso específico:**
- Quando o usuário clica com botão direito em um campo editável e seleciona uma opção (CPF, nome, e-mail ou telefone)
- A extensão envia uma mensagem para o content script na aba ativa para inserir o valor gerado
- Não acessa abas sem interação do usuário

---

## 3. Justificativa para `contextMenus`

**Resposta:**
A permissão `contextMenus` é essencial para o funcionamento da extensão, pois é a única forma de interação do usuário com a ferramenta. Sem esta permissão, a extensão não poderia oferecer as opções de inserção de dados no menu de contexto (botão direito).

**Uso específico:**
- Cria 4 itens no menu de contexto que aparecem apenas em campos editáveis:
  - "Inserir CPF"
  - "Inserir Email"
  - "Inserir Telefone"
  - "Inserir Nome"
- Os itens aparecem apenas no contexto "editable" (campos de input e textarea)

---

## 4. Justificativa para `host_permissions` (<all_urls>)

**Resposta:**
A permissão `host_permissions` com `<all_urls>` é necessária porque a extensão precisa funcionar em qualquer site onde desenvolvedores estejam testando formulários. Como os formulários podem estar em qualquer domínio (localhost, sites de desenvolvimento, produção, etc.), a extensão precisa ter acesso universal para ser útil para desenvolvedores.

**Uso específico:**
- O content script precisa ser injetado em todas as páginas para poder receber mensagens do service worker
- Não coletamos dados, não fazemos requisições HTTP, não rastreamos usuários
- Apenas injeta um script que escuta mensagens do service worker quando o usuário interage com o menu de contexto
- Todo processamento é local, sem comunicação externa

---

## 5. Justificativa para Código Remoto (Remote Code)

**Resposta:**
Esta extensão **NÃO utiliza código remoto**. Todo o código está incluído localmente nos arquivos:
- `background.js` (service worker)
- `content-script.js` (script de conteúdo)
- `manifest.json` (configuração)

Não há:
- Nenhuma requisição para servidores externos
- Nenhum código carregado dinamicamente de URLs externas
- Nenhuma comunicação com servidores remotos
- Nenhum script injetado de fontes externas

Todas as operações (geração de CPF, nomes, e-mails e telefones) são realizadas localmente no navegador do usuário.

---

## 6. Uso de Dados (Data Usage)

**Resposta:**
A extensão TrinityForm **NÃO coleta, armazena, transmite ou compartilha dados pessoais**.

### O que NÃO fazemos:
- ❌ Não coletamos dados pessoais dos usuários
- ❌ Não coletamos dados de navegação
- ❌ Não coletamos dados de formulários
- ❌ Não fazemos requisições HTTP para servidores externos
- ❌ Não armazenamos dados em servidores
- ❌ Não rastreamos usuários
- ❌ Não usamos analytics ou ferramentas de rastreamento
- ❌ Não compartilhamos dados com terceiros

### O que fazemos:
- ✅ Todas as operações são realizadas localmente no navegador
- ✅ Os dados gerados (CPF, nome, e-mail, telefone) são criados localmente usando algoritmos JavaScript
- ✅ Os dados são inseridos apenas no campo que o usuário selecionou
- ✅ Não há comunicação com servidores externos

### Permissões e seu uso:
- `activeTab`: Apenas para inserir dados quando o usuário interage com o menu de contexto
- `contextMenus`: Apenas para criar opções no menu de contexto
- `host_permissions`: Apenas para permitir que o content script seja injetado em qualquer página (necessário para funcionar em qualquer site de desenvolvimento)

---

## 7. Política de Privacidade

**URL da Política de Privacidade:** (Você precisa fornecer uma URL ou criar uma página)

**Texto sugerido para a Política de Privacidade:**

```markdown
# Política de Privacidade - TrinityForm

**Última atualização:** [DATA ATUAL]

## Coleta de Dados

A extensão TrinityForm **NÃO coleta, armazena, transmite ou compartilha dados pessoais** dos usuários.

## Funcionamento

Todas as operações são realizadas localmente no navegador do usuário:

- Geração de dados de teste (CPF, nome, e-mail, telefone) acontece localmente usando algoritmos JavaScript
- Inserção de dados em campos de formulário é feita apenas quando o usuário interage explicitamente
- Não há comunicação com servidores externos
- Não há armazenamento de dados
- Não há rastreamento ou analytics

## Permissões

A extensão requer as seguintes permissões:

- **contextMenus**: Para criar opções no menu de contexto (botão direito)
- **activeTab**: Para inserir dados no campo ativo quando o usuário seleciona uma opção
- **host_permissions (<all_urls>)**: Para permitir funcionamento em qualquer site onde desenvolvedores estejam testando formulários

## Privacidade Garantida

- ✅ Não coletamos dados pessoais
- ✅ Não fazemos requisições HTTP
- ✅ Não armazenamos dados
- ✅ Não rastreamos usuários
- ✅ Não compartilhamos dados

## Contato

Para dúvidas sobre privacidade: [SEU EMAIL]

Desenvolvido por Trinity Web
```

---

## 8. Checklist para Preenchimento na Chrome Web Store

### Na guia "Práticas de Privacidade":

1. **Descrição do Único Propósito:**
   - Use a resposta da seção 1 acima

2. **Justificativa para `activeTab`:**
   - Use a resposta da seção 2 acima

3. **Justificativa para `contextMenus`:**
   - Use a resposta da seção 3 acima

4. **Justificativa para `host_permissions`:**
   - Use a resposta da seção 4 acima

5. **Código Remoto:**
   - Marque "Não" - Não usamos código remoto
   - Use a resposta da seção 5 acima como explicação se solicitado

6. **Uso de Dados:**
   - Marque todas as opções indicando que NÃO coletamos dados
   - Use a resposta da seção 6 acima

7. **Política de Privacidade:**
   - Forneça URL da política de privacidade ou use o texto sugerido da seção 7

### Na guia "Conta":

1. **E-mail de Contato:**
   - Insira seu e-mail de contato
   - Verifique o e-mail clicando no link enviado

---

## Notas Importantes

- Mantenha as respostas claras e concisas
- Foque no fato de que toda operação é local
- Enfatize que não há coleta ou transmissão de dados
- Certifique-se de ter uma URL de política de privacidade antes de submeter
