/**
 * O ÍNDICE DA AJUDA DENTRO DO PRODUTO (issue #3567, fatia F1).
 *
 * ─── Por que é dado, e não JSX ─────────────────────────────────────────────
 *
 * Tudo aqui é verificável sem renderizar React: cada `href` interno tem de
 * existir em `app/app/**` (uma tela renomeada deixaria o link morto em
 * silêncio) e todo texto tem de ter espanhol no dicionário — o teste
 * `tests/unit/ajuda-leva-a-telas-que-existem` cobra os dois. Conteúdo escrito
 * direto no JSX não teria como ser cobrado sem abrir a tela.
 *
 * ─── Por que SEM prosa longa, e por que SEM link externo ───────────────────
 *
 * F1 é o ÍNDICE, não a enciclopédia: cada item responde "onde eu clico" e leva
 * para a tela onde a dúvida acontece. O texto longo — com capturas, passo a
 * passo e versão — é a fatia F3, e vai morar em markdown versionado.
 *
 * Link para os guias públicos ficou de fora de propósito, por duas razões
 * medidas: `deskcomm.com.br/en/guias` responde 404 hoje (o guia em inglês não
 * existe), e a varredura de marca de `tests/unit/branding.test.ts` cobre
 * `lib/`, então escrever o domínio aqui criaria uma dívida de whitelabel para
 * resolver um link que a F3 vai substituir por conteúdo local.
 *
 * ─── A audiência do instalador é o platform admin ──────────────────────────
 *
 * `/app/settings/atualizacao` está na allowlist de navegação justamente porque
 * o papel que a usa (`is_platform_admin`, o dono do servidor) não é modelado
 * pelo catálogo de menus. Aqui ele é: o bloco inteiro só aparece para quem tem
 * a linha em `platform_admins`.
 */

import type { NavMetadata } from "@/lib/navigation/catalogo";

export interface ItemDeAjuda {
  /** Texto do link. É a CHAVE do dicionário — o português é a chave. */
  texto: string;
  /** Rota interna (`/app/...`). O teste confere que a tela existe. */
  href: string;
  /** Uma linha dizendo QUANDO procurar isto — não o que a tela é. */
  detalhe: string;
}

export interface BlocoDeAjuda {
  titulo: string;
  itens: readonly ItemDeAjuda[];
  /** Só aparece para o dono do servidor (`platform_admins`). */
  soParaQuemInstala?: boolean;
}

export const BLOCOS_DE_AJUDA: readonly BlocoDeAjuda[] = [
  {
    titulo: "Começar a usar",
    itens: [
      {
        texto: "Abrir as conversas",
        href: "/app/inbox",
        detalhe: "No Inbox, veja a fila e abra o histórico. Se tiver permissão para atender, use Assumir para responder ou Transferir para encaminhar.",
      },
      {
        texto: "Mover um negócio no funil",
        href: "/app/kanban",
        detalhe: "Em que etapa cada oportunidade está e o que falta para fechar.",
      },
      {
        texto: "Cadastrar quem fala com você",
        href: "/app/contacts",
        detalhe: "Em Contatos, consulte o histórico e as etiquetas. Use Importar CSV para trazer uma lista de contatos.",
      },
      {
        texto: "Conectar um canal",
        href: "/app/connections",
        detalhe: "Em Conexões, confira o estado do canal e acesse as opções de conexão ou reconexão. Para WhatsApp, há conexão por QR ou pelo canal oficial da Meta.",
      },
      {
        texto: "Como vejo quais conversas ficaram sem resposta?",
        href: "/app/radar",
        detalhe: "Abra o Radar para ver as conversas abertas que esfriaram e decidir quais retomar.",
      },
      {
        texto: "Onde vejo os agendamentos da equipe?",
        href: "/app/agenda",
        detalhe: "Abra a Agenda para consultar os horários marcados e quem vai atender.",
      },
      {
        texto: "Como salvo uma mensagem que uso com frequência?",
        href: "/app/templates",
        detalhe: "Cadastre uma resposta rápida para reutilizar o texto ao responder no Inbox.",
      },
    ],
  },
  {
    titulo: "Agente de IA",
    itens: [
      {
        texto: "Criar ou ajustar um agente",
        href: "/app/ai/agents",
        detalhe: "Em Agentes, abra o agente e salve o ajuste como rascunho. Confira na aba Teste e publique a versão quando estiver pronta.",
      },
      {
        texto: "Ensinar o que ele deve saber",
        href: "/app/ai/knowledge/sources",
        detalhe: "Os documentos e páginas que alimentam as respostas dele.",
      },
      {
        texto: "Ver onde ele não deu conta",
        href: "/app/ai/cases",
        detalhe: "As conversas em que a IA pediu ajuda — é daí que sai a correção.",
      },
      {
        texto: "Como configuro uma retomada automática?",
        href: "/app/ai/followups",
        detalhe: "Em Follow-ups, configure quando o agente deve retomar uma conversa que esfriou.",
      },
      {
        texto: "Como escolho qual agente atende cada tipo de conversa?",
        href: "/app/ai/routers",
        detalhe: "Em Roteadores, defina para qual agente vai cada tipo de conversa e quando encaminhar para uma pessoa.",
      },
      {
        texto: "Como faço a IA seguir um roteiro de perguntas?",
        href: "/app/ai/atendimento",
        detalhe: "Em Fluxos de atendimento, monte as perguntas que a IA vai fazer e guardar na ficha do cliente.",
      },
      {
        texto: "Onde vejo o consumo de IA e defino um limite?",
        href: "/app/ai/usage",
        detalhe: "Abra Uso e orçamento para conferir o consumo e ajustar o teto mensal da organização.",
      },
    ],
  },
  {
    titulo: "Sua empresa",
    itens: [
      {
        texto: "Chamar a equipe",
        href: "/app/team",
        detalhe: "Quem trabalha aqui, com qual papel e quanta conversa cada um aguenta.",
      },
      {
        texto: "Renomear as etapas e criar campos",
        href: "/app/settings/tenant/pipelines",
        detalhe: "O vocabulário que a sua operação usa, no lugar do padrão.",
      },
      {
        texto: "Como recebo leads do meu site ou automatizo uma ação?",
        href: "/app/webhooks",
        detalhe: "Em Webhooks, crie e teste uma fonte de captação ou configure uma regra. Na aba Atividade, confira os resultados de cada execução.",
      },
      {
        texto: "Como trago pedidos da minha loja para o CRM?",
        href: "/app/integrations/nuvemshop",
        detalhe: "Conecte a Nuvemshop para trazer pedidos e clientes da loja para o CRM.",
      },
      {
        texto: "Onde acompanho o desempenho da equipe?",
        href: "/app/metrics",
        detalhe: "Abra Desempenho para acompanhar os números do funil e do atendimento.",
      },
    ],
  },
  {
    titulo: "Atendimento e agenda",
    itens: [
      {
        texto: "Onde vejo quem está esperando uma vaga?",
        href: "/app/agenda/lista-de-espera",
        detalhe: "Quem aceitou ser avisado quando abrir um horário, na ordem da fila.",
      },
      {
        texto: "Onde ajusto a duração e os responsáveis pelos agendamentos?",
        href: "/app/settings/tenant/agenda",
        detalhe: "O que se pode marcar, quanto dura, onde acontece e quem atende.",
      },
      {
        texto: "Como recebo avisos de agendamento no WhatsApp?",
        href: "/app/agenda/avisos",
        detalhe: "Receber no WhatsApp cada horário marcado, remarcado ou cancelado, e o resumo das 7h.",
      },
      {
        texto: "Onde vejo a fila de atendimento por número?",
        href: "/app/painel",
        detalhe: "Quem espera resposta, quem está em atendimento e quem foi atendido hoje, por número.",
      },
      {
        texto: "Como defino quem recebe os novos atendimentos?",
        href: "/app/settings/atendimento",
        detalhe: "Quem recebe cada cliente novo, e o que cada atendente enxerga.",
      },
    ],
  },
  {
    titulo: "Prospecção, vendas e tarefas",
    itens: [
      {
        texto: "Onde busco empresas para prospectar?",
        href: "/app/prospecting",
        detalhe: "Busque empresas e conduza abordagens graduais com IA.",
      },
      {
        texto: "Como envio uma campanha para uma lista de contatos?",
        href: "/app/campaigns",
        detalhe: "Em Campanhas, escolha Nova campanha, defina os contatos e selecione o número de envio. Abra a campanha para acompanhar os envios ou pausar.",
      },
      {
        texto: "Onde cadastro o CNPJ e os decisores de uma empresa?",
        href: "/app/companies",
        detalhe: "Cadastro B2B — razão social, CNPJ e decisores.",
      },
      {
        texto: "Onde encontro as pessoas vinculadas às empresas?",
        href: "/app/people",
        detalhe: "Decisores e contatos ligados a empresas, com vários telefones.",
      },
      {
        texto: "Como importo empresas e pessoas de uma planilha?",
        href: "/app/imports",
        detalhe: "Em Importações, envie um CSV ou XLSX com dados de empresas, pessoas e telefones. Para uma lista simples, use Importar CSV em Contatos.",
      },
      {
        texto: "Onde cadastro os produtos e preços que a IA consulta?",
        href: "/app/products",
        detalhe: "O catálogo da loja, com o preço que o atendente de IA responde.",
      },
      {
        texto: "Onde vejo minhas tarefas pendentes ou vencidas?",
        href: "/app/tasks",
        detalhe: "O que ficou combinado, com prazo — e o que já venceu sem ninguém fazer.",
      },
      {
        texto: "Como reutilizo uma sequência de tarefas em vários negócios?",
        href: "/app/tasks/planos",
        detalhe: "Sequências reutilizáveis de tarefas — montar uma vez e aplicar a cada negócio.",
      },
      {
        texto: "Como preparo e envio uma proposta comercial?",
        href: "/app/proposals",
        detalhe: "Em Propostas, abra o rascunho, revise os itens e use Enviar ao cliente. Acompanhe o andamento na própria proposta.",
      },
      {
        texto: "Onde configuro a validade padrão das propostas?",
        href: "/app/settings/tenant/proposals",
        detalhe: "Configure a validade padrão e condições para propostas comerciais.",
      },
      {
        texto: "Como crio um modelo reutilizável de proposta?",
        href: "/app/settings/tenant/proposals/modelos",
        detalhe: "Personalize os modelos da plataforma ou crie os da sua empresa, inclusive a partir de uma proposta que você já usa.",
      },
      {
        texto: "Onde renomeio ou junto etiquetas duplicadas?",
        href: "/app/settings/tags",
        detalhe: "O vocabulário de etiquetas da empresa: onde cada uma é usada e como renomear, juntar ou excluir.",
      },
    ],
  },
  {
    titulo: "Telefonia e e-mail",
    itens: [
      {
        texto: "Onde leio a transcrição de uma ligação da IA?",
        href: "/app/calls",
        detalhe: "Histórico de ligações (voz por IA) com transcrição.",
      },
      {
        texto: "Como organizo uma lista para ligações de prospecção?",
        href: "/app/cold-call",
        detalhe: "Ligue para uma lista de leads, um por vez, com roteiro e resultado de cada ligação.",
      },
      {
        texto: "Onde configuro o provedor SIP de telefonia?",
        href: "/app/settings/voip-trunk",
        detalhe: "Credenciais do provedor SIP para chamadas de voz por IA.",
      },
      {
        texto: "Onde monto uma sequência de e-mails por negócio?",
        href: "/app/cadencias",
        detalhe: "Sequências de e-mail por negócio, com descadastro.",
      },
      {
        texto: "Onde ativo as cadências de e-mail da empresa?",
        href: "/app/settings/cadencias",
        detalhe: "Ativar as cadências de e-mail nesta empresa.",
      },
    ],
  },
  {
    titulo: "Configuração e diagnóstico da IA",
    itens: [
      {
        texto: "Onde cadastro a chave do provedor de IA?",
        href: "/app/ai/credentials",
        detalhe: "A chave do provedor de IA que os agentes usam para pensar.",
      },
      {
        texto: "Como escolho qual IA atende cada parte do sistema?",
        href: "/app/ai/providers",
        detalhe: "Ligue o Jev para decisões rápidas e escolha qual inteligência atende cada parte do sistema.",
      },
      {
        texto: "Onde vejo o que o agente aprendeu com a operação?",
        href: "/app/ai/memory",
        detalhe: "O que o agente já aprendeu sobre a sua operação e reaproveita.",
      },
      {
        texto: "Onde vejo quais ações o agente pode executar durante o atendimento?",
        href: "/app/ai/skills",
        detalhe: "As ações que o agente pode executar sozinho durante o atendimento.",
      },
      {
        texto: "Onde vejo alertas da IA que pedem minha decisão?",
        href: "/app/ai/inbox",
        detalhe: "O que a IA encontrou e precisa de uma decisão sua.",
      },
      {
        texto: "Como recebo um aviso quando a IA abre um caso?",
        href: "/app/ai/cases/avisos",
        detalhe: "Receber no WhatsApp quando o assistente abrir um caso.",
      },
      {
        texto: "Onde reviso as melhorias que a IA sugeriu para si mesma?",
        href: "/app/ai/proposals",
        detalhe: "Melhorias que a IA sugere para si mesma, esperando sua decisão.",
      },
      {
        texto: "Onde investigo por que uma execução da IA falhou?",
        href: "/app/ai/runs",
        detalhe: "O que a IA fez — e, quando falhou, o que aconteceu e o que fazer.",
      },
      {
        texto: "Como acompanho se o agente está melhorando?",
        href: "/app/ai/evolution",
        detalhe: "Se o agente está melhorando, onde ele erra e o que falta ensinar.",
      },
      {
        texto: "Onde controlo o uso de IA nas decisões das automações?",
        href: "/app/settings/automacoes",
        detalhe: "O freio único do passo em que a IA escolhe entre as opções de uma regra, para a empresa inteira.",
      },
    ],
  },
  {
    titulo: "Indicadores, anúncios e financeiro",
    itens: [
      {
        texto: "Onde confiro o que a equipe e a IA fizeram no período?",
        href: "/app/activities",
        detalhe: "Relatório do que a equipe e os agentes fizeram no período: quanto, quem e de que tipo.",
      },
      {
        texto: "Onde defino a meta mensal de vendas?",
        href: "/app/settings/metas",
        detalhe: "Quanto a empresa quer vender no mês, para o Desempenho medir o progresso.",
      },
      {
        texto: "Onde vejo quanto custaram os resultados dos anúncios?",
        href: "/app/ads/meta",
        detalhe: "Quanto custou cada resultado das campanhas que trazem gente para cá.",
      },
      {
        texto: "Onde conecto minha conta de anúncios da Meta?",
        href: "/app/settings/meta-ads",
        detalhe: "Conectar a conta de anúncios para ler o desempenho das campanhas.",
      },
      {
        texto: "Onde configuro a origem dos leads e o envio de conversões?",
        href: "/app/settings/conversoes",
        detalhe: "Devolver ao anúncio as vendas que ele trouxe, e marcar a origem de quem chega pelo site.",
      },
      {
        texto: "Onde confiro os serviços de uma comanda?",
        href: "/app/comandas",
        detalhe: "O que foi feito, por quem, e quanto o cliente paga.",
      },
      {
        texto: "Onde vejo quanto entrou e quanto cada pessoa tem a receber?",
        href: "/app/faturamento",
        detalhe: "Quanto entrou, de que forma, e quanto cada pessoa tem a receber.",
      },
      {
        texto: "Onde ajusto contas e formas de pagamento?",
        href: "/app/settings/tenant/financeiro",
        detalhe: "Contas, formas de pagamento e como cada lançamento é classificado.",
      },
      {
        texto: "Onde acompanho os honorários e as parcelas de um caso?",
        href: "/app/honorarios",
        detalhe: "O modelo de cobrança de cada caso e o calendário de parcelas.",
      },
    ],
  },
  {
    titulo: "Conta, empresa e integrações",
    itens: [
      {
        texto: "Como altero meu nome ou fuso horário?",
        href: "/app/settings/profile",
        detalhe: "Seu nome, idioma, fuso horário e avatar.",
      },
      {
        texto: "Onde configuro a verificação em duas etapas?",
        href: "/app/settings/security",
        detalhe: "Verificação em duas etapas, códigos de recuperação e sessões.",
      },
      {
        texto: "Como escolho quais notificações recebo?",
        href: "/app/settings/notifications",
        detalhe: "Por onde e sobre o quê você quer ser avisado.",
      },
      {
        texto: "Como coloco o CRM na tela inicial do celular?",
        href: "/app/settings/aplicativo",
        detalhe: "Instale o sistema na tela de início do celular e receba os avisos.",
      },
      {
        texto: "Onde vejo quais recursos opcionais estão ligados?",
        href: "/app/settings/recursos",
        detalhe: "Tudo o que se liga e desliga, se está ligado e onde se ajusta.",
      },
      {
        texto: "Onde atualizo os dados da empresa e a retenção de dados?",
        href: "/app/settings/tenant",
        detalhe: "Dados da empresa, retenção de dados e encarregado de LGPD.",
      },
      {
        texto: "Onde ajusto a marca exibida no app?",
        href: "/app/settings/marca",
        detalhe: "O nome e a cor que sua empresa mostra dentro do sistema.",
      },
      {
        texto: "Onde vejo o plano, o pagamento e as faturas do CRM?",
        href: "/app/settings/billing",
        detalhe: "Pagamento, troca de plano e faturas da sua empresa.",
      },
      {
        texto: "Onde vejo quem fez uma alteração e quando?",
        href: "/app/audit",
        detalhe: "Quem fez o quê, quando — o histórico que não se apaga.",
      },
      {
        texto: "Onde acompanho pedidos de exportação ou exclusão de dados?",
        href: "/app/lgpd/requests",
        detalhe: "Pedidos de exportação e exclusão de dados feitos por clientes.",
      },
      {
        texto: "Onde acompanho reclamações e outros protocolos da Ouvidoria?",
        href: "/app/ouvidoria",
        detalhe: "Reclamações, denúncias e elogios recebidos pela empresa, com protocolo.",
      },
      {
        texto: "Onde crio uma chave para integrar outro sistema pela API?",
        href: "/app/settings/api-tokens",
        detalhe: "Chaves para outro sistema conversar com o seu CRM.",
      },
      {
        texto: "Onde configuro um servidor MCP externo para a IA?",
        href: "/app/settings/servidor-mcp-externo",
        detalhe: "O endereço e a chave do sistema de fora que a IA da empresa pode consultar.",
      },
      {
        texto: "Onde conecto um banco de dados externo para a IA consultar?",
        href: "/app/integracao-dados",
        detalhe: "Conecte um banco de dados de outro sistema para o agente consultar em tempo real.",
      },
      {
        texto: "Onde vejo os guias instalados e suas permissões?",
        href: "/app/extensions",
        detalhe: "Guias instalados para orientar o trabalho no CRM, com permissões e estado visíveis.",
      },
    ],
  },
  {
    titulo: "Para quem instala e mantém",
    soParaQuemInstala: true,
    itens: [
      {
        texto: "Atualizar esta instalação",
        href: "/app/settings/atualizacao",
        detalhe: "A versão que roda aqui, a que já existe e o que muda ao atualizar.",
      },
    ],
  },
];

/** Os atalhos regulares são uma projeção da MESMA interface do menu. A porta
 * de instalação tem o gate próprio da página, fora do catálogo do tenant. */
export function blocosVisiveis(
  ehDonoDoServidor: boolean,
  destinos: readonly Pick<NavMetadata, "href">[],
): readonly BlocoDeAjuda[] {
  const visiveis = new Set(destinos.map((destino) => destino.href));
  return BLOCOS_DE_AJUDA.flatMap((bloco) => {
    if (bloco.soParaQuemInstala) return ehDonoDoServidor ? [bloco] : [];
    const itens = bloco.itens.filter((item) => visiveis.has(item.href));
    return itens.length ? [{ ...bloco, itens }] : [];
  });
}
