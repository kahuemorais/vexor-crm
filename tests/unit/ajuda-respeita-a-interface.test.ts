import { describe, expect, it } from "vitest";

import { blocosVisiveis } from "@/lib/ajuda/hub";
import type { Role } from "@/lib/auth/types";
import { combinarInterfaces, destinosDaInterface } from "@/lib/navigation/interface";

const atalhosEssenciais = [
  "/app/settings/aplicativo",
  "/app/settings/notifications",
  "/app/settings/profile",
  "/app/settings/security",
];

const instalacao = "/app/settings/atualizacao";

function blocos(role: Role, settings?: unknown, plataforma = false, suporte = false) {
  return blocosVisiveis(
    plataforma,
    destinosDaInterface(settings, plataforma && !suporte, role, [], []),
  );
}
function hrefs(value: ReturnType<typeof blocosVisiveis>) {
  return value.flatMap((bloco) => bloco.itens.map((item) => item.href)).sort();
}

describe("Ajuda respeita a mesma interface do menu", () => {
  it.each(["viewer", "agent", "manager", "admin"] as const)(
    "%s recebe uma pergunta para cada destino permitido pelo catálogo",
    (role) => {
      const esperados = destinosDaInterface(undefined, false, role, [], [])
        .map((destino) => destino.href)
        .filter((href) => href !== "/app/ajuda")
        .sort();
      expect(hrefs(blocos(role))).toEqual(esperados);
    },
  );

  it("a escolha da empresa e do vínculo continua sendo interseção", () => {
    const settings = combinarInterfaces(
      { preset: "completa", destinos: ["/app/ajuda", "/app/inbox", "/app/contacts"] },
      { preset: "completa", destinos: ["/app/ajuda", "/app/inbox", "/app/kanban"] },
    );
    expect(hrefs(blocos("agent", settings))).toEqual(["/app/inbox", ...atalhosEssenciais]);
  });

  it("uma escolha explícita não reabre a configuração escondida para o manager", () => {
    expect(hrefs(blocos("manager", {
      preset: "completa", destinos: ["/app/ajuda", "/app/contacts"],
    }))).toEqual(["/app/contacts", ...atalhosEssenciais]);
  });

  it("a seleção que contém só a Ajuda mantém os atalhos essenciais", () => {
    expect(hrefs(blocos("viewer", { preset: "completa", destinos: ["/app/ajuda"] })))
      .toEqual(atalhosEssenciais);
  });

  it("o bloco de IA desaparece quando nenhum dos seus destinos é visível", () => {
    expect(blocos("viewer").map((bloco) => bloco.titulo)).not.toContain("Agente de IA");
  });

  it("a pergunta sobre roteiros acompanha o módulo de fluxos de atendimento", () => {
    const fluxos = "/app/ai/atendimento";
    expect(hrefs(blocos("manager"))).not.toContain(fluxos);
    const destinosComModulo = destinosDaInterface(
      undefined, false, "manager", ["fluxos_atendimento"], [],
    );
    expect(hrefs(blocosVisiveis(false, destinosComModulo))).toContain(fluxos);
  });

  it("admin de tenant não ganha a porta da instalação", () => {
    expect(hrefs(blocos("admin"))).not.toContain(instalacao);
  });

  it("a porta de instalação preserva o gate próprio de plataforma", () => {
    expect(hrefs(blocos("viewer", undefined, true))).toContain(instalacao);
  });

  it("suporte usa o papel do vínculo para atalhos e mantém a leitura de instalação existente", () => {
    expect(hrefs(blocos("viewer", undefined, true, true))).toEqual([
      ...hrefs(blocos("viewer")), instalacao,
    ].sort());
  });
});
