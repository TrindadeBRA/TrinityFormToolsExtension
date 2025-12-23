# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.3.0] - 2025-12-21

### Adicionado
- Token 'empresa' na lógica de geração de nomes
- Novos itens de menu de contexto para IBGE e DDD
- Expansão do matching de tokens de campos de formulário para autopreenchimento
- Melhorias no tratamento de campos numéricos no preenchedor de formulários

### Corrigido
- Merge de pull request #1 do branch master

## [1.2.0] - 2025-12-16

### Adicionado
- Geradores de CNPJ, IBGE, DDD, username e lorem ipsum
- Menus de contexto agrupados e novos geradores de dados
- Dados de cidades brasileiras e expansão dos menus de contexto
- Melhorias na funcionalidade de CNPJ e interações do menu de contexto
- Funcionalidade completa de CNPJ
- Atualização dos menus de contexto para a extensão TrinityForm
- Suporte para múltiplos navegadores (Chrome e Firefox)
- Script de build e package.json para configuração do projeto
- Refatoração do script de background e processo de build para suporte multi-navegador

### Modificado
- Atualização do README para maior clareza e disponibilidade oficial
- Remoção de respostas de privacidade desatualizadas e guias de instalação

## [1.1.0] - 2025-12-11

### Adicionado
- Refatoração para usar Manifest V3 e arquitetura de service worker
- Melhorias no tratamento de entrada de texto no content script
- Atualização do manifest para rebranding e descrição aprimorada
- Funcionalidade para gerar nomes brasileiros aleatórios
- Atualização das opções do menu de contexto

### Modificado
- Atualização do .gitignore e manifest
- Remoção de guias de instalação e publicação

## [1.0.0] - 2025-12-08

### Adicionado
- Commit inicial da extensão TrinityFormTools
- Script de background
- Content script
- Manifest
- Guias de instalação
- README
- Ícones e favicon da extensão
- .gitignore para excluir arquivos temporários e de editor