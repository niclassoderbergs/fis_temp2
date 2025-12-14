
import { BRSData } from './types';
import { content7110Input, content7110Output } from './content-definitions';

export const brsFlex7110: BRSData = {
  id: "BRS-FLEX-7110",
  title: "FIS verifierar aktiverat energibud",
  purpose: "En intern verifieringsprocess för att fastställa om en aktiverad resurs har levererat enligt bud. Processen ställer systemets beräknade leverans mot den budade volymen (System Diff). Dessutom jämförs systemets beräkning mot SP:s egenrapporterade data för de CUs som rapporterats (Verifikationsdiff).",
  actors: [
    { role: "Initiator", description: "System (Time Trigger)" },
    { role: "Utförare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-7110: FIS verifierar aktiverat energibud
    participant FIS as FIS Engine
    participant DB as Databas

    Note over FIS: Trigger: Rapporteringsfrist för 611 passerad
    activate FIS
    FIS->>DB: Hämta Budvolym (från 711/712/713)
    FIS->>DB: Identifiera ingående CUs
    
    par Hämta underlag
        FIS->>DB: Hämta Systemberäknad Volym (6110) för alla CUs
        FIS->>DB: Hämta SP-rapporterad Volym (611) för inkomna CUs
    end

    FIS->>FIS: Beräkna Diff 1: System(Total) vs Budvolym
    FIS->>FIS: Identifiera snittmängd (CUs med både 6110 & 611)
    FIS->>FIS: Beräkna Diff 2: System(Snitt) vs SP(Snitt)
    
    alt Diff 1 Inom tolerans
        FIS->>FIS: Status = Verified
    else Avvikelse
        FIS->>FIS: Status = Deviation
    end

    FIS->>DB: Spara Resultat (Status, Diffar, Antal CUs)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX7110-1", description: "Processen initieras automatiskt när tidsfristen för SP att rapportera leveransdata (BRS-FLEX-611) har löpt ut." },
    { id: "BRSFLEX7110-2", description: "FIS identifierar det aktiverade budet och hämtar 'Budad Volym' från ursprungsregistreringen (711, 712 eller 713)." },
    { id: "BRSFLEX7110-3", description: "FIS identifierar samtliga CUs som ingick i budet." },
    { id: "BRSFLEX7110-4", description: "FIS hämtar den systemberäknade leveransvolymen (Total Systemvolym) från resultatet av BRS-FLEX-6110." },
    { id: "BRSFLEX7110-5", description: "FIS beräknar 'Diff (System)' genom att jämföra Total Systemvolym mot Budad Volym. Detta ligger till grund för verifieringsstatus." },
    { id: "BRSFLEX7110-6", description: "FIS hämtar inkomna rapporter från BRS-FLEX-611 och identifierar snittmängden av CUs (där både systemdata och SP-data finns)." },
    { id: "BRSFLEX7110-7", description: "FIS beräknar 'Diff (SP-Check)' genom att jämföra summan av SP-rapporterad volym mot summan av Systemvolym för enbart snittmängden." },
    { id: "BRSFLEX7110-8", description: "FIS sammanställer resultatet, inklusive antalet rapporterande CUs kontra totalt antal CUs i budet." },
    { id: "BRSFLEX7110-9", description: "Status sätts till 'Verified' eller 'Deviation' baserat på Diff (System)." },
    { id: "BRSFLEX7110-10", description: "Resultatet sparas." }
  ],
  preConditions: [
    { id: "BRSFLEX7110-PRE-1", description: "BRS-FLEX-711 har exekverats (TSO-bud)." },
    { id: "BRSFLEX7110-PRE-2", description: "ELLER BRS-FLEX-712 har exekverats (DSO-bud)." },
    { id: "BRSFLEX7110-PRE-3", description: "ELLER BRS-FLEX-713 har exekverats (NEMO-bud)." },
    { id: "BRSFLEX7110-PRE-4", description: "OCH Rapporteringsfönstret för BRS-FLEX-611 har passerat." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX7110-POST-1", description: "Ett verifieringsresultat är sparat med beräknade diffar." },
      { id: "BRSFLEX7110-POST-2", description: "Underlag för avräkning/fakturering är skapat." }
    ],
    rejected: [
      { id: "BRSFLEX7110-POST-3", description: "Verifiering kunde ej genomföras (t.ex. systemfel)." }
    ]
  },
  infoObjects: [content7110Input, content7110Output]
};
