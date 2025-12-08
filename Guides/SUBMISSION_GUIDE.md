# 📝 Guia de Preenchimento - Submissão Firefox Add-ons

## 1. Name (Nome)
```
TrinityForm
```
*(Já preenchido - use o mesmo nome do manifest.json)*

## 2. Add-on URL
```
trinityform
```
*(O sistema gerará: https://addons.mozilla.org/.../trinityform)*

## 3. Summary (Resumo) - 130 caracteres
```
Preencha formulários rapidamente com dados de teste realistas: CPF válido, nome, e-mail e telefone brasileiro (com DDD).
```
*(Já está perfeito - 130 caracteres)*

## 4. Description (Descrição) - Mínimo 250 caracteres
```
# TrinityForm - Ferramenta para Desenvolvedores

TrinityForm é uma extensão que acelera o desenvolvimento web ao permitir preencher formulários rapidamente com dados de teste realistas e válidos.

## ✨ Funcionalidades

### CPF Válido
Gera CPFs brasileiros válidos com dígitos verificadores corretos, sem pontuação (apenas números).

### Nome Brasileiro
Gera nomes completos realistas com primeiro nome e sobrenome(s), seguindo padrões comuns brasileiros.

### E-mail
Cria endereços de e-mail aleatórios com formatos realistas para testes.

### Telefone com DDD
Gera números de telefone brasileiros no formato (XX) XXXXX-XXXX com DDDs válidos.

## 🚀 Como Usar

1. Clique com o botão direito em qualquer campo de formulário editável
2. Selecione uma das opções no menu de contexto:
   - Inserir CPF
   - Inserir Nome
   - Inserir Email
   - Inserir Telefone
3. O valor será inserido automaticamente no campo

## 🔒 Privacidade

Esta extensão **não coleta, armazena ou transmite dados pessoais**. Todas as operações são realizadas localmente no seu navegador. Não há comunicação com servidores externos.

## 💻 Compatibilidade

- Firefox
- Chrome/Edge/Opera/Brave (via modo desenvolvedor)

## 🛠️ Para Desenvolvedores

Ideal para:
- Testes de formulários durante desenvolvimento
- Preenchimento rápido de campos em ambientes de desenvolvimento
- Validação de formulários com dados realistas

Desenvolvido por Trinity Web.
```

## 5. This add-on is experimental
```
☐ NÃO marque
```
*(Deixe desmarcado - sua extensão está completa e funcional)*

## 6. This add-on requires payment...
```
☐ NÃO marque
```
*(Deixe desmarcado - é gratuita)*

## 7. Categories (Categorias) - Selecione até 3
```
☑ Web Development
```
*(Essa é a categoria principal - você pode adicionar mais se quiser, mas Web Development é a mais adequada)*

## 8. Support email
```
seu-email@trinityweb.com.br
```
*(Use um email válido onde você possa receber suporte)*

## 9. Support website
```
https://thetrinityweb.com.br
```
*(Ou deixe em branco se não tiver)*

## 10. License (Licença) - OBRIGATÓRIO
```
MIT License
```
*(Recomendado para projetos open source. Se preferir outra, escolha:)*

**Opções recomendadas:**
- **MIT License** - Mais permissiva, popular
- **Mozilla Public License 2.0** - Alinhada com Firefox
- **All Rights Reserved** - Se não quiser código aberto

## 11. This add-on has a Privacy Policy
```
☑ SIM - Marque esta opção
```

## 12. Privacy Policy URL
```
https://thetrinityweb.com.br/privacy-policy
```
*(Ou crie uma página simples explicando que não coleta dados)*

**Se não tiver URL, crie um texto simples:**

Você pode criar uma página simples ou usar este texto:

```
# Política de Privacidade - TrinityForm

## Coleta de Dados

A extensão TrinityForm **NÃO coleta, armazena ou transmite dados pessoais** do usuário.

## Funcionamento

- Todas as operações são realizadas localmente no navegador
- Não há comunicação com servidores externos
- Não há armazenamento de dados
- Não há rastreamento ou analytics

## Permissões

A extensão requer apenas:
- `contextMenus`: Para criar o menu de contexto (botão direito)
- `activeTab`: Para inserir dados no campo ativo

## Contato

Para dúvidas sobre privacidade: seu-email@trinityweb.com.br

Última atualização: [Data atual]
```

## 13. Notes to Reviewer (Notas para Revisores)
```
Esta extensão gera dados de teste para formulários durante o desenvolvimento web.

Funcionalidades:
- Gera CPFs válidos (com algoritmo de validação correto)
- Gera nomes brasileiros aleatórios
- Gera emails aleatórios
- Gera telefones brasileiros com DDD

A extensão funciona apenas via menu de contexto (botão direito) em campos editáveis.
Não há interface popup ou outras interações.

Todas as operações são locais - não há coleta de dados ou comunicação externa.
O manifest.json inclui data_collection_permissions declarando que não coletamos dados.

Para testar:
1. Instale a extensão
2. Vá para qualquer página com formulário
3. Clique com botão direito em um campo de texto
4. Selecione uma das opções do menu
5. Verifique se o valor foi inserido

A extensão é compatível com Firefox e Chrome (via polyfill).
```

---

## ✅ Checklist Final

Antes de submeter, verifique:

- [ ] Summary tem no máximo 130 caracteres
- [ ] Description tem pelo menos 250 caracteres
- [ ] Categoria selecionada (Web Development)
- [ ] Licença selecionada
- [ ] Privacy Policy marcada e URL fornecida
- [ ] Support email válido
- [ ] Notes to Reviewer preenchidas
- [ ] Manifest.json atualizado com ID e data_collection_permissions

---

## 📦 Após Submissão

1. Aguarde validação automática (alguns minutos)
2. Aguarde revisão manual (1-7 dias úteis)
3. Verifique o status no dashboard
4. Responda a qualquer feedback dos revisores rapidamente

Boa sorte! 🚀

