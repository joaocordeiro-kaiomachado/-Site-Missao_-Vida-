export type PageKey = "inicio" | "precisam" | "cadastro" | "informacoes" | "criancas";

export type ChildCase = {
  id: string;
  name: string;
  age: number;
  condition: string;
  bloodType: string;
  urgency: "Muito urgente" | "Alta prioridade" | "Urgente";
};

export type InfoSection = {
  id: string;
  title: string;
  items: string[];
};

export type Donor = {
  id: string;
  name: string;
  age: number;
  city: string;
  bloodType: string;
  createdAt: string;
};

export type CampaignDatabase = {
  donors: Donor[];
  childCases: ChildCase[];
  infoSections: InfoSection[];
};

export type DonorInput = {
  name: string;
  age: number;
  city: string;
  bloodType: string;
};

const STORAGE_KEY = "missao-vida-db-v1";

const defaultChildren: ChildCase[] = [
  { id: "c1", name: "Lucas", age: 6, condition: "Leucemia", bloodType: "O-", urgency: "Muito urgente" },
  { id: "c2", name: "Maria", age: 10, condition: "Doença sanguínea", bloodType: "A+", urgency: "Urgente" },
  { id: "c3", name: "Ana Clara", age: 7, condition: "Tratamento oncológico", bloodType: "B+", urgency: "Muito urgente" },
  { id: "c4", name: "João Pedro", age: 9, condition: "Anemia severa", bloodType: "O+", urgency: "Alta prioridade" },
  { id: "c5", name: "Sofia", age: 5, condition: "Cirurgia cardíaca", bloodType: "AB+", urgency: "Urgente" },
  { id: "c6", name: "Miguel", age: 11, condition: "Talassemia", bloodType: "A-", urgency: "Alta prioridade" },
  { id: "c7", name: "Helena", age: 8, condition: "Transplante de medula", bloodType: "B-", urgency: "Urgente" },
  { id: "c8", name: "Davi", age: 12, condition: "Hemofilia", bloodType: "O-", urgency: "Muito urgente" },
  { id: "c9", name: "Lívia", age: 4, condition: "Câncer infantil", bloodType: "AB-", urgency: "Muito urgente" },
  { id: "c10", name: "Enzo", age: 13, condition: "Doença renal crônica", bloodType: "A+", urgency: "Urgente" },
  { id: "c11", name: "Valentina", age: 6, condition: "Anemia falciforme", bloodType: "O+", urgency: "Alta prioridade" },
  { id: "c12", name: "Arthur", age: 7, condition: "Acidente grave", bloodType: "B+", urgency: "Muito urgente" },
  { id: "c13", name: "Isabella", age: 9, condition: "Pós-cirúrgico", bloodType: "A-", urgency: "Urgente" },
  { id: "c14", name: "Theo", age: 5, condition: "Leucemia", bloodType: "O+", urgency: "Muito urgente" },
  { id: "c15", name: "Heloísa", age: 11, condition: "Tratamento imunológico", bloodType: "AB+", urgency: "Urgente" },
  { id: "c16", name: "Benício", age: 8, condition: "Trombocitopenia", bloodType: "B-", urgency: "Alta prioridade" },
  { id: "c17", name: "Rafaela", age: 10, condition: "Anemia aplástica", bloodType: "O-", urgency: "Muito urgente" },
  { id: "c18", name: "Gael", age: 6, condition: "Infecção grave", bloodType: "A+", urgency: "Urgente" },
  { id: "c19", name: "Lorena", age: 7, condition: "Cirurgia de emergência", bloodType: "AB+", urgency: "Muito urgente" },
  { id: "c20", name: "Matheus", age: 12, condition: "Púrpura trombocitopênica", bloodType: "O+", urgency: "Alta prioridade" },
  { id: "c21", name: "Yasmin", age: 5, condition: "Tratamento de câncer", bloodType: "A-", urgency: "Urgente" },
  { id: "c22", name: "Nicolas", age: 9, condition: "Doença hematológica rara", bloodType: "B+", urgency: "Muito urgente" },
  { id: "c23", name: "Cecília", age: 8, condition: "Transfusão contínua", bloodType: "O-", urgency: "Alta prioridade" },
  { id: "c24", name: "Samuel", age: 13, condition: "Trauma grave", bloodType: "AB-", urgency: "Muito urgente" },
];

const defaultInfoSections: InfoSection[] = [
  {
    id: "i1",
    title: "Quem pode doar",
    items: [
      "Ter entre 16 e 69 anos.",
      "Pesar mais de 50 kg.",
      "Estar em boas condições de saúde.",
      "Dormir pelo menos 6 horas na noite anterior.",
      "Levar documento oficial com foto.",
      "Estar hidratado e alimentado.",
    ],
  },
  {
    id: "i2",
    title: "Quando aguardar para doar",
    items: [
      "Gripe, febre, infecção ativa ou mal-estar.",
      "Tatuagem, piercing ou micropigmentação recente.",
      "Pós-cirurgia, conforme avaliação médica.",
      "Uso de medicamentos com restrição temporária.",
      "Consumo de álcool nas últimas 12 horas.",
      "Vacinação recente, dependendo da vacina.",
    ],
  },
  {
    id: "i3",
    title: "Cuidados antes e depois",
    items: [
      "Evite alimentos gordurosos por 3 horas antes.",
      "Beba água antes e depois da doação.",
      "Informe todo histórico de saúde na triagem.",
      "Evite esforço físico intenso no mesmo dia.",
      "Se houver tontura, comunique a equipe.",
      "Faça uma refeição leve após doar.",
    ],
  },
  {
    id: "i4",
    title: "Situações com alta necessidade",
    items: [
      "Leucemia e doenças hematológicas.",
      "Tratamentos oncológicos pediátricos e adultos.",
      "Acidentes com trauma grave.",
      "Partos com hemorragia.",
      "Cirurgias de grande porte.",
      "Transplantes e anemias crônicas.",
    ],
  },
  {
    id: "i5",
    title: "Dúvidas frequentes",
    items: [
      "A doação é segura e usa materiais descartáveis.",
      "O processo completo costuma levar de 40 a 60 minutos.",
      "Após doar, você recebe orientações e pode voltar à rotina leve.",
      "Cada bolsa coletada pode ajudar mais de uma pessoa.",
      "Você pode agendar novas doações conforme o intervalo recomendado.",
    ],
  },
];

const defaultDatabase: CampaignDatabase = {
  donors: [],
  childCases: defaultChildren,
  infoSections: defaultInfoSections,
};

export function getCampaignDatabase(): CampaignDatabase {
  if (typeof window === "undefined") {
    return defaultDatabase;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDatabase));
    return defaultDatabase;
  }

  try {
    const parsed = JSON.parse(stored) as CampaignDatabase;
    return {
      donors: Array.isArray(parsed.donors) ? parsed.donors : [],
      childCases: Array.isArray(parsed.childCases) ? parsed.childCases : defaultChildren,
      infoSections: Array.isArray(parsed.infoSections) ? parsed.infoSections : defaultInfoSections,
    };
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDatabase));
    return defaultDatabase;
  }
}

export function registerDonor(input: DonorInput): CampaignDatabase {
  const current = getCampaignDatabase();
  const donor: Donor = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    age: input.age,
    city: input.city.trim(),
    bloodType: input.bloodType,
    createdAt: new Date().toISOString(),
  };

  const updated: CampaignDatabase = {
    ...current,
    donors: [donor, ...current.donors],
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return updated;
}
