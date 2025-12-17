
import { MPSData } from '../../types';

// --- MPS-FLEX-100: Livscykelhantering av Styrbara Enheter ---
export const mpsFlex100: MPSData = {
  id: "MPS-FLEX-100",
  title: "Hantering av Styrbara Enheter (CU)",
  domain: "Domän 1: Master Data",
  purpose: "Att beskriva de processer som krävs för att registrera, uppdatera och förvalta tekniska resurser (CUs) i registret. Inkluderar även informationsinhämtning.",
  trigger: "SP initierar registrering eller ändring, alternativt systemhändelse.",
  scenarios: [
    {
      id: "MPS-FLEX-100-Sc1",
      title: "Nyregistrering av CU",
      description: "Processen för att registrera en ny resurs och koppla den till en mätpunkt.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-100-Sc1: Nyregistrering av CU
    participant SP as SP
    participant FIS as FIS
    participant DHV as Datahubben (DHV)

    Note over SP: Affärshändelse: Ny teknisk resurs ska anslutas
    SP->>FIS: Registrering (BRS-FLEX-101)
    activate FIS
    FIS->>DHV: Validera Mätpunkt
    DHV-->>FIS: OK (Mätpunkt existerar)
    FIS->>FIS: Skapa resurs (CU)
    FIS-->>SP: Kvittens med CU-ID
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-100-Sc1.1", role: "SP", action: "Registrering", 
          description: "SP skickar begäran om att registrera en ny CU.", 
          refBRS: "BRS-FLEX-101", refRule: "BRSFLEX101-1" 
        },
        { 
          stepId: "MPS-FLEX-100-Sc1.2", role: "FIS", action: "Skapa Resurs", 
          description: "FIS validerar och registrerar den nya styrbara enheten.", 
          refBRS: "BRS-FLEX-101", refRule: "BRSFLEX101-2" 
        },
        { 
          stepId: "MPS-FLEX-100-Sc1.3", role: "FIS", action: "Kvittens", 
          description: "FIS skickar kvittens med den nya enhetens ID till SP.", 
          refBRS: "BRS-FLEX-101", refRule: "BRSFLEX101-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-100-Sc2",
      title: "Uppdatering av CU",
      description: "Processen för att ändra attribut på en befintlig resurs (t.ex. justera effekt).",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-100-Sc2: Uppdatering av CU-attribut
    participant SP as SP
    participant FIS as FIS

    Note over SP: Affärshändelse: Tekniska specifikationer har ändrats
    SP->>FIS: Uppdatering (BRS-FLEX-102)
    activate FIS
    FIS->>FIS: Validera och spara ny version
    FIS-->>SP: Bekräftat
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-100-Sc2.1", role: "SP", action: "Uppdatering", 
          description: "SP begär uppdatering av CU-information.", 
          refBRS: "BRS-FLEX-102", refRule: "BRSFLEX102-1" 
        },
        { 
          stepId: "MPS-FLEX-100-Sc2.2", role: "FIS", action: "Spara ändring", 
          description: "FIS uppdaterar attributen och skapar ny version.", 
          refBRS: "BRS-FLEX-102", refRule: "BRSFLEX102-2" 
        },
        { 
          stepId: "MPS-FLEX-100-Sc2.3", role: "FIS", action: "Versionshistorik", 
          description: "FIS arkiverar den tidigare versionen i historiken.", 
          refBRS: "BRS-FLEX-102", refRule: "BRSFLEX102-3" 
        },
        { 
          stepId: "MPS-FLEX-100-Sc2.4", role: "FIS", action: "Kvittens", 
          description: "FIS bekräftar uppdateringen till SP.", 
          refBRS: "BRS-FLEX-102", refRule: "BRSFLEX102-13" 
        }
      ]
    },
    {
      id: "MPS-FLEX-100-Sc3",
      title: "Systemuppdatering av CU",
      description: "Process där systemet tvingande uppdaterar en CU baserat på externa händelser i Datahubben.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-100-Sc3: Systemdriven Statusändring
    participant DHV as Datahubben (DHV)
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Systemtrigger: Mätpunkt inaktiverad i Datahubben
    DHV->>FIS: Notifiering (Mätpunkt inaktiv)
    activate FIS
    FIS->>FIS: Sätt resurs till 'Inactive'
    FIS->>SP: Skicka notifiering om statusändring
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-100-Sc3.1", role: "System", action: "Trigger", 
          description: "En extern händelse (t.ex. mätpunkten avaktiveras i DHV) identifieras.", 
          refBRS: "BRS-FLEX-1040", refRule: "BRSFLEX1040-1",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-100-Sc3.2", role: "FIS", action: "Uppdatera Status", 
          description: "FIS uppdaterar den styrbara enhetens status (t.ex. till Inactive).", 
          refBRS: "BRS-FLEX-1040", refRule: "BRSFLEX1040-2" 
        },
        { 
          stepId: "MPS-FLEX-100-Sc3.3", role: "FIS", action: "Notifiera SP", 
          description: "FIS skickar notifiering till SP om att resursen uppdaterats av systemet.", 
          refBRS: "BRS-FLEX-1040", refRule: "BRSFLEX1040-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-100-Sc4",
      title: "Begäran om CU-information",
      description: "Aktör hämtar teknisk data om en resurs.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-100-Sc4: Informationsutbyte
    participant User as SP / Systemoperatör
    participant FIS as FIS

    Note over User: Behov: Hämta aktuell masterdata för resurs
    User->>FIS: Begär information (BRS-FLEX-103)
    activate FIS
    FIS->>FIS: Validera åtkomstbehörighet
    FIS-->>User: Leverera data (Status, Kapacitet, Nätposition)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-100-Sc4.1", role: "Aktör", action: "Förfrågan", 
          description: "Behörig aktör begär information om en eller flera CU.", 
          refBRS: "BRS-FLEX-103", refRule: "BRSFLEX103-1" 
        },
        { 
          stepId: "MPS-FLEX-100-Sc4.2", role: "FIS", action: "Svar", 
          description: "FIS validerar behörighet och returnerar data.", 
          refBRS: "BRS-FLEX-103", refRule: "BRSFLEX103-3" 
        }
      ]
    }
  ]
};

// --- MPS-FLEX-110: Hantering av Aggregeringsstrukturer ---
export const mpsFlex110: MPSData = {
  id: "MPS-FLEX-110",
  title: "Etablering av Aggregeringsstrukturer",
  domain: "Domän 1: Master Data",
  purpose: "Att hantera skapandet av logiska grupper (SPU och SPG) som används för aggregering.",
  trigger: "Behov av ny aggregeringsnivå.",
  scenarios: [
    {
      id: "MPS-FLEX-110-Sc1",
      title: "Registrering av SPU (Technical Unit)",
      description: "Skapande av en ny teknisk aggregeringsenhet.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-110-Sc1: Etablering av SPU
    participant SP as SP
    participant FIS as FIS

    Note over SP: Beslut: Ny teknisk gruppering behövs
    SP->>FIS: Registrera SPU (BRS-FLEX-110)
    activate FIS
    FIS->>FIS: Skapa logiskt objekt
    FIS-->>SP: Bekräftat (SPU-ID)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-110-Sc1.1", role: "SP", action: "Registrering", 
          description: "SP begär registrering av a ny SPU.", 
          refBRS: "BRS-FLEX-110", refRule: "BRSFLEX110-1" 
        },
        { 
          stepId: "MPS-FLEX-110-Sc1.2", role: "FIS", action: "Skapa SPU", 
          description: "FIS skapar SPU-objektet i systemet.", 
          refBRS: "BRS-FLEX-110", refRule: "BRSFLEX110-2" 
        },
        { 
          stepId: "MPS-FLEX-110-Sc1.3", role: "FIS", action: "Kvittens", 
          description: "FIS skickar kvittens med SPU-ID till SP.", 
          refBRS: "BRS-FLEX-110", refRule: "BRSFLEX110-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-110-Sc2",
      title: "Registrering av SPG (Market Group)",
      description: "Skapande av en ny marknadsgrupp för budgivning.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-110-Sc2: Etablering av SPG
    participant SP as SP
    participant FIS as FIS

    Note over SP: Beslut: Ny marknadsportfölj för elområde behövs
    SP->>FIS: Registrera SPG (BRS-FLEX-120)
    activate FIS
    FIS->>FIS: Skapa marknadsobjekt
    FIS-->>SP: Bekräftat (SPG-ID)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-110-Sc2.1", role: "SP", action: "Registrering", 
          description: "SP begär registrering av en ny SPG.", 
          refBRS: "BRS-FLEX-120", refRule: "BRSFLEX120-1" 
        },
        { 
          stepId: "MPS-FLEX-110-Sc2.2", role: "FIS", action: "Skapa SPG", 
          description: "FIS skapar SPG-objektet i systemet.", 
          refBRS: "BRS-FLEX-120", refRule: "BRSFLEX120-2" 
        },
        { 
          stepId: "MPS-FLEX-110-Sc2.3", role: "FIS", action: "Kvittens", 
          description: "FIS skickar kvittens med SPG-ID till SP.", 
          refBRS: "BRS-FLEX-120", refRule: "BRSFLEX120-3" 
        }
      ]
    }
  ]
};

// --- MPS-FLEX-130: Teknisk Portföljhantering (SPU) ---
export const mpsFlex130: MPSData = {
  id: "MPS-FLEX-130",
  title: "Portföljhantering SPU",
  domain: "Domän 1: Master Data",
  purpose: "Att hantera innehållet i en SPU genom att lägga till eller ta bort resurser. Inkluderar både SP-initierade ändringar och systemtvingande åtgärder.",
  trigger: "Förändring i den tekniska portföljen.",
  scenarios: [
    {
      id: "MPS-FLEX-130-Sc1",
      title: "Koppla CU till SPU",
      description: "Lägga till en resurs i en teknisk enhet.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-130-Sc1: Inkludering i teknisk aggregering
    participant SP as SP
    participant FIS as FIS

    Note over SP: Beslut: Resurs ska ingå i teknisk gruppering
    SP->>FIS: Koppla CU (BRS-FLEX-130)
    activate FIS
    FIS->>FIS: Etablera teknisk relation
    FIS->>FIS: Beräkna ny SPU-kapacitet
    FIS-->>SP: Bekräftat
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-130-Sc1.1", role: "SP", action: "Begäran", 
          description: "SP begär koppling av CU till SPU.", 
          refBRS: "BRS-FLEX-130", refRule: "BRSFLEX130-1" 
        },
        { 
          stepId: "MPS-FLEX-130-Sc1.2", role: "FIS", action: "Koppla", 
          description: "FIS upprättar relationen mellan CU och SPU.", 
          refBRS: "BRS-FLEX-130", refRule: "BRSFLEX130-2" 
        },
        { 
          stepId: "MPS-FLEX-130-Sc1.3", role: "FIS", action: "Statusuppdatering", 
          description: "FIS uppdaterar SPU:ns status (t.ex. till Active).", 
          refBRS: "BRS-FLEX-130", refRule: "BRSFLEX130-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-130-Sc2",
      title: "Ta bort CU från SPU",
      description: "Koppla bort en resurs från en teknisk enhet.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-130-Sc2: Exkludering från teknisk aggregering
    participant SP as SP
    participant FIS as FIS

    Note over SP: Beslut: Resurs ska tas bort från teknisk gruppering
    SP->>FIS: Koppla bort (BRS-FLEX-131)
    activate FIS
    FIS->>FIS: Avsluta relation
    FIS->>FIS: Reducera SPU-kapacitet
    FIS-->>SP: Bekräftat
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-130-Sc2.1", role: "SP", action: "Begäran", 
          description: "SP begär bortkoppling av CU från SPU.", 
          refBRS: "BRS-FLEX-131", refRule: "BRSFLEX131-1" 
        },
        { 
          stepId: "MPS-FLEX-130-Sc2.2", role: "FIS", action: "Bortkoppling", 
          description: "FIS tar bort kopplingen mellan resurs and SPU.", 
          refBRS: "BRS-FLEX-131", refRule: "BRSFLEX131-2" 
        },
        { 
          stepId: "MPS-FLEX-130-Sc2.3", role: "FIS", action: "Omräkning", 
          description: "FIS räknar om SPU:ns totala kapacitet.", 
          refBRS: "BRS-FLEX-131", refRule: "BRSFLEX131-3" 
        }
      ]
    }
  ]
};

// --- MPS-FLEX-140: Kommersiell Portföljhantering (SPG) ---
export const mpsFlex140: MPSData = {
  id: "MPS-FLEX-140",
  title: "Portföljhantering SPG",
  domain: "Domän 1: Master Data",
  purpose: "Att hantera innehållet i en SPG för budgivning.",
  trigger: "Optimering av marknadsportfölj.",
  scenarios: [
    {
      id: "MPS-FLEX-140-Sc1",
      title: "Koppla CU till SPG",
      description: "Inkludera en resurs i en budgivningsgrupp.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-140-Sc1: Marknadskoppling av resurs
    participant SP as SP
    participant FIS as FIS

    Note over SP: Beslut: Resurs ska inkluderas i marknadsbudgivning
    SP->>FIS: Koppla till SPG (BRS-FLEX-140)
    activate FIS
    FIS->>FIS: Etablera marknadsrelation
    FIS-->>SP: Bekräftat
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-140-Sc1.1", role: "SP", action: "Begäran", 
          description: "SP begär koppling av CU till SPG.", 
          refBRS: "BRS-FLEX-140", refRule: "BRSFLEX140-1" 
        },
        { 
          stepId: "MPS-FLEX-140-Sc1.2", role: "FIS", action: "Koppla", 
          description: "FIS skapar kopplingen.", 
          refBRS: "BRS-FLEX-140", refRule: "BRSFLEX140-2" 
        },
        { 
          stepId: "MPS-FLEX-140-Sc1.3", role: "FIS", action: "Statusuppdatering", 
          description: "FIS uppdaterar SPG:ns status vid behov.", 
          refBRS: "BRS-FLEX-140", refRule: "BRSFLEX140-3" 
        }
      ]
    }
  ]
};
