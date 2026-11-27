# Ampliar as dúvidas na Ajuda interna

- Conferir as telas e o catálogo de navegação usados pelo índice de Ajuda.
- Adicionar perguntas de uso diário no índice existente, usando os destinos autorizados para cada organização e papel.
- Atualizar as verificações de links, conteúdo, idioma e permissões. Registrar as verificações realizadas.

A Ajuda recebe conteúdo de `lib/ajuda/hub.ts` e o contexto do menu de `destinosDaInterface`. As perguntas levam às telas de operação já existentes. O índice é de leitura e usa a mesma porta de navegação, sem configuração ou eventos próprios.

## Resultado

- Dez perguntas e respostas foram acrescentadas ao índice, com atalhos sujeitos ao catálogo existente.
- As quatro suítes focadas passaram, com 32 testes. TypeScript e `git diff --check` passaram. A verificação em navegador autenticado ficou pendente, pois esta cópia não tem o ambiente local de autenticação e dados preparado.
