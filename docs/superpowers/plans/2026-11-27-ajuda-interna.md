# Ampliar as dúvidas na Ajuda interna

- Conferir as telas e o catálogo de navegação usados pelo índice de Ajuda.
- Adicionar perguntas de uso diário no índice existente, usando os destinos autorizados para cada organização e papel.
- Atualizar as verificações de links, conteúdo, idioma e permissões. Registrar as verificações realizadas.

A Ajuda recebe conteúdo de `lib/ajuda/hub.ts` e o contexto do menu de `destinosDaInterface`. As perguntas levam às telas de operação já existentes. O índice é de leitura e usa a mesma porta de navegação, sem configuração ou eventos próprios.

## Resultado

- Dez perguntas e respostas foram acrescentadas ao índice, com atalhos sujeitos ao catálogo existente.
- As quatro suítes focadas passaram, com 32 testes. TypeScript e `git diff --check` passaram. A verificação em navegador autenticado ficou pendente, pois esta cópia não tem o ambiente local de autenticação e dados preparado.

## Revisão de cobertura

1. Comparar todos os destinos do catálogo com o índice anterior. Revisar ainda as ações que vivem dentro de telas, em especial Inbox, Contatos, propostas, campanhas e Webhooks.
2. Preencher lacunas de operação por área, incluindo módulos opcionais e restrições de papel. Documentar os destinos restantes e o motivo da seleção.
3. Verificar existência das rotas, conteúdo, disponibilidade dos atalhos e procura por termos usuais no próprio índice.

### Inventário comparado

O catálogo do app tinha 76 destinos no commit-base `9ada417`. A primeira versão
da branch orientava sobre 19 deles e oferecia um atalho de atualização fora do
catálogo. O cruzamento deixou 56 destinos de produto sem orientação. A Ajuda é
o próprio destino restante.

| Área | Lacunas identificadas e cobertas |
| --- | --- |
| Atendimento e agenda | Lista de espera, avisos, tipos de agendamento, painel por número e distribuição de atendimento. |
| Prospecção, vendas e tarefas | Prospecção, campanhas, empresas, pessoas, produtos, importações, tarefas e planos, propostas, modelos e etiquetas. |
| Telefonia e e-mail | Histórico de chamadas, Cold Call, provedor SIP, operação e configuração de cadências. |
| IA | Credenciais, provedores, memória, skills, alertas, avisos, revisão de melhorias, execuções, evolução e controle de IA nas automações. |
| Indicadores, anúncios e financeiro | Atividades, metas, Meta Ads, conversões, comandas, faturamento, configuração financeira e honorários. |
| Conta, empresa e integrações | Perfil, segurança, notificações, app no celular, recursos opcionais, organização, marca, cobrança, auditoria, LGPD, Ouvidoria, API, MCP, dados externos e extensões. |

A comparação usa `lib/navigation/catalogo.ts` e `lib/ajuda/hub.ts`. As telas
e componentes de Inbox, Contatos, Conexões, Campanhas, Propostas, Importações,
Agentes e Webhooks também foram usados para confirmar ações internas e revisar
as respostas correspondentes. As páginas de detalhe e os controles dentro
delas podem ter mais ações do que o catálogo de destinos descreve.

O teste de cobertura compara os destinos de produto do catálogo com os da
Ajuda e acusa tanto ausência quanto duplicata. A busca usa o conteúdo já
filtrado pela interface e busca por todos os termos, sem exigir acentos.

A revisão passou nos 33 testes da Ajuda, na checagem TypeScript e em
`git diff --check`. O navegador autenticado ainda depende de uma instalação
com dados e credenciais de teste.

### Validação autenticada concluída

O Chromium passou com login pelo app em uma instalação local com Supabase Auth
e o baseline do produto. O gerente abriu a Ajuda pelo menu e seguiu o resultado
da busca até Execuções. O perfil somente leitura recebeu estado vazio para esse
termo e encontrou Agenda. Desktop e celular passaram sem transbordamento
horizontal. Roteiro e capturas em `evidence/2026-11-27-ajuda-interna/`.
O ESLint passou nos arquivos de código alterados.
