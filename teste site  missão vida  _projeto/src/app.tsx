import {
  Baby,
  Calendar,
  Database,
  Droplets,
  Heart,
  HeartHandshake,
  Hospital,
  Info,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { type FormEvent, type ReactNode, useMemo, useState } from "react";

import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import {
  type CampaignDatabase,
  type ChildCase,
  type DonorInput,
  type InfoSection,
  type PageKey,
  getCampaignDatabase,
  registerDonor,
} from "./lib/campaign-database";

const navItems: Array<{ key: PageKey; label: string; icon: LucideIcon }> = [
  { key: "inicio", label: "Início", icon: Sparkles },
  { key: "precisam", label: "Precisam", icon: Users },
  { key: "cadastro", label: "Cadastrar", icon: UserPlus },
  { key: "informacoes", label: "Informações", icon: Info },
  { key: "criancas", label: "Crianças", icon: Baby },
];

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const urgencyStyles: Record<ChildCase["urgency"], "destructive" | "secondary" | "outline"> = {
  "Muito urgente": "destructive",
  "Alta prioridade": "secondary",
  Urgente: "outline",
};

function App() {
  const [activePage, setActivePage] = useState<PageKey>("inicio");
  const [database, setDatabase] = useState<CampaignDatabase>(() => getCampaignDatabase());
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    bloodType: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const stats = useMemo(
    () => ({
      donors: database.donors.length,
      donationsMonth: 690 + database.donors.length,
      urgentCases: database.childCases.filter((item) => item.urgency === "Muito urgente").length,
    }),
    [database],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    const payload: DonorInput = {
      name: formData.name.trim(),
      age: Number(formData.age),
      city: formData.city.trim(),
      bloodType: formData.bloodType,
    };

    if (!payload.name || !payload.city || !payload.bloodType || Number.isNaN(payload.age)) {
      setFormError("Preencha todos os campos para concluir o cadastro.");
      return;
    }

    if (payload.age < 16 || payload.age > 69) {
      setFormError("A idade permitida para doação é entre 16 e 69 anos.");
      return;
    }

    const updated = registerDonor(payload);
    setDatabase(updated);
    setFormData({ name: "", age: "", city: "", bloodType: "" });
    setFormSuccess("Cadastro realizado com sucesso. Obrigado por fazer parte da campanha.");
  };

  const page = useMemo(() => {
    if (activePage === "inicio") {
      return (
        <>
          <section className="mx-auto grid w-full max-w-6xl gap-6 rounded-3xl border border-white/45 bg-white/85 p-5 shadow-xl backdrop-blur-xl md:grid-cols-[1.2fr_1fr] md:p-8">
            <div>
              <Badge className="rounded-full bg-primary/12 px-4 py-1 text-primary" variant="outline">
                <Sparkles className="h-3.5 w-3.5" />
                Campanha moderna e conectada
              </Badge>
              <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
                Doe sangue, <span className="text-primary">salve vidas</span>, e acelere o cuidado.
              </h1>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
                Agora o site usa banco de dados local conectado. Cadastros, casos infantis e orientações ficam salvos e
                organizados para um atendimento mais rápido.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="rounded-full px-6" onClick={() => setActivePage("cadastro")}>
                  Quero doar agora
                </Button>
                <Button className="rounded-full px-6" onClick={() => setActivePage("informacoes")} variant="outline">
                  Ver orientações
                </Button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <StatCard label="Doadores no banco" value={`${stats.donors}`} />
                <StatCard label="Doações no mês" value={`${stats.donationsMonth}`} />
                <StatCard label="Casos críticos" value={`${stats.urgentCases}`} />
              </div>
            </div>

            <Card className="relative overflow-hidden border-primary/25 bg-gradient-to-br from-white via-rose-50/70 to-sky-100/60 py-0 shadow-lg">
              <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-primary/20 blur-2xl" />
              <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-sky-300/30 blur-2xl" />
              <CardContent className="relative flex min-h-[320px] items-center justify-center p-6 md:p-8">
                <div className="absolute left-6 top-6 rounded-full border border-primary/20 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <Heart className="h-3.5 w-3.5" />
                    Símbolo amigável
                  </span>
                </div>
                <div className="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-xl backdrop-blur">
                  <img alt="Mascote da campanha em pixel art" className="mx-auto h-48 w-48 object-contain md:h-56 md:w-56" src="./mascote-pixel.svg" />
                </div>
              </CardContent>
            </Card>
          </section>

          <PageContainer title="Como funciona" subtitle="Fluxo simples, rápido e com dados conectados.">
            <div className="grid gap-4 md:grid-cols-4">
              <InfoCard icon={UserPlus} title="1. Cadastre-se" subtitle="Seu cadastro entra no banco em segundos." />
              <InfoCard icon={Database} title="2. Banco conectado" subtitle="Informações salvas com persistência local." />
              <InfoCard icon={Calendar} title="3. Agende" subtitle="Escolha seu melhor dia para doar." />
              <InfoCard icon={HeartHandshake} title="4. Impacte vidas" subtitle="Sua doação ajuda crianças e adultos." />
            </div>
          </PageContainer>
        </>
      );
    }

    if (activePage === "precisam") {
      return (
        <PageContainer
          title="Quem está precisando agora"
          subtitle="Lista ativa alimentada pelo banco de dados da campanha."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard icon={Baby} title="Pediatria em foco" subtitle={`${database.childCases.length} crianças em acompanhamento ativo.`} />
            <InfoCard icon={Droplets} title="Tipo O- em alerta" subtitle="Estoque crítico para urgências e cirurgias." />
            <InfoCard icon={Hospital} title="Hospitais parceiros" subtitle="Rede conectada para resposta mais rápida." />
            <InfoCard icon={Shield} title="Triagem segura" subtitle="Todos os cadastros passam por avaliação clínica." />
            <InfoCard icon={Users} title="Doadores cadastrados" subtitle={`${database.donors.length} pessoas já conectadas ao sistema.`} />
            <InfoCard icon={Heart} title="Prioridade máxima" subtitle={`${stats.urgentCases} casos infantis em estado muito urgente.`} />
          </div>
        </PageContainer>
      );
    }

    if (activePage === "cadastro") {
      return (
        <PageContainer
          title="Cadastro de doadores"
          subtitle="Formulário conectado ao banco de dados local da campanha."
        >
          <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            <Card className="py-4">
              <CardContent className="pt-2">
                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <Input
                    onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                    placeholder="Nome completo"
                    type="text"
                    value={formData.name}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      min={16}
                      max={69}
                      onChange={(event) => setFormData((prev) => ({ ...prev, age: event.target.value }))}
                      placeholder="Idade"
                      type="number"
                      value={formData.age}
                    />
                    <Input
                      onChange={(event) => setFormData((prev) => ({ ...prev, city: event.target.value }))}
                      placeholder="Cidade"
                      type="text"
                      value={formData.city}
                    />
                  </div>

                  <Select
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, bloodType: value }))}
                    value={formData.bloodType}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o tipo sanguíneo" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {formError ? <p className="text-sm font-medium text-destructive">{formError}</p> : null}
                  {formSuccess ? <p className="text-sm font-medium text-primary">{formSuccess}</p> : null}

                  <Button className="w-fit rounded-full px-6" type="submit">
                    Salvar no banco
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="py-4">
              <CardHeader>
                <CardTitle className="text-lg">Últimos cadastrados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {database.donors.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Ainda não há cadastros.</p>
                ) : (
                  database.donors.slice(0, 5).map((donor) => (
                    <div className="rounded-xl border border-border/70 p-3" key={donor.id}>
                      <p className="text-sm font-semibold">{donor.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {donor.city} • {donor.age} anos • {donor.bloodType}
                      </p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      );
    }

    if (activePage === "informacoes") {
      return (
        <PageContainer
          title="Informações completas para doação"
          subtitle="Conteúdo ampliado e organizado a partir do banco da campanha."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {database.infoSections.map((section) => (
              <InfoListCard items={section.items} key={section.id} title={section.title} />
            ))}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <InfoCard icon={Calendar} title="Intervalo entre doações" subtitle="Homens: 60 dias • Mulheres: 90 dias" />
            <InfoCard icon={Phone} title="Atendimento diário" subtitle="Suporte para dúvidas e agendamento." />
            <InfoCard icon={Hospital} title="Rede hospitalar" subtitle="Parcerias com hemocentros e hospitais locais." />
          </div>
        </PageContainer>
      );
    }

    return (
      <PageContainer
        title="Crianças que precisam de você"
        subtitle="Lista conectada ao banco de dados com casos pediátricos priorizados."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {database.childCases.map((child) => (
            <Card className="gap-3 py-4" key={child.id}>
              <CardContent className="px-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold md:text-lg">
                    {child.name}, {child.age} anos
                  </h3>
                  <Badge variant={urgencyStyles[child.urgency]}>{child.urgency}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{child.condition}</p>
                <p className="mt-2 text-sm font-semibold">Tipo sanguíneo: {child.bloodType}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="mt-6 rounded-full px-6" onClick={() => setActivePage("cadastro")}>
          Quero ajudar agora
        </Button>
      </PageContainer>
    );
  }, [activePage, database, formData, formError, formSuccess, stats.urgentCases]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_20%_0%,#fff_0%,#fde7eb_30%,#fbcfe8_58%,#bfdbfe_100%)] px-4 py-6 md:px-8 md:py-8">
      <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-sky-300/30 blur-3xl" />

      <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/45 bg-white/85 p-4 shadow-xl backdrop-blur-xl">
        <div>
          <p className="text-xl font-black text-primary">Missão Vida</p>
          <p className="text-xs text-muted-foreground">Agora com banco de dados conectado para cadastros e casos.</p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/85 px-3 py-2">
          <MapPin className="h-4 w-4 text-primary" />
          <p className="text-xs font-medium">Hemocentros em toda a região</p>
        </div>

        <img alt="Mascote pixel retrô" className="h-14 w-14 rounded-lg border border-border bg-white p-1" src="./mascote-pixel.svg" />
      </header>

      <nav className="mx-auto mt-4 flex w-full max-w-6xl flex-wrap gap-2 rounded-2xl border border-white/45 bg-white/80 p-3 shadow-md backdrop-blur-xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.key;

          return (
            <Button
              className="rounded-xl"
              key={item.key}
              onClick={() => setActivePage(item.key)}
              size="sm"
              variant={isActive ? "default" : "secondary"}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="mx-auto mt-4 flex w-full max-w-6xl items-center justify-between rounded-2xl border border-primary/20 bg-white/75 px-4 py-3 shadow-sm backdrop-blur">
        <span className="flex items-center gap-2 text-sm font-medium">
          <Database className="h-4 w-4 text-primary" />
          Banco conectado
        </span>
        <span className="text-xs text-muted-foreground">{database.donors.length} cadastros salvos</span>
      </div>

      <div className="mt-4 space-y-4">{page}</div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="gap-2 border-primary/20 py-4">
      <CardContent className="px-4">
        <p className="text-xl font-bold text-primary">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

function PageContainer({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-6xl rounded-3xl border border-white/45 bg-white/85 p-5 shadow-xl backdrop-blur-xl md:p-8">
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-2 max-w-4xl text-sm text-muted-foreground md:text-base">{subtitle}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function InfoCard({ icon: Icon, title, subtitle }: { icon: LucideIcon; title: string; subtitle: string }) {
  return (
    <Card className="gap-3 py-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="px-4">
        <div className="mb-2 inline-flex rounded-xl bg-primary/10 p-2 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="text-base font-semibold md:text-lg">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function InfoListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="gap-3 py-4">
      <CardHeader className="pb-1">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default App;
