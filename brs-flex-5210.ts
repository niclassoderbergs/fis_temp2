
import { BRSData } from './types';
import { content5210Input, content5210Output } from './content-definitions';

export const brsFlex5210: BRSData = {
  id: "BRS-FLEX-5210",
  title: "FIS beräknar baseline för CU",
  purpose: "Automatisk funktion där FIS beräknar baseline för en CU baserat på historisk mätdata. Detta används när vald baselinemetod är 'Historical' eller liknande där systemet äger logiken.",
  actors: [
    { role: "Initiator", description: "FIS (System/Internal)" },
    { role: "Mottagare", description: "System (Database)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-5210: FIS beräknar baseline för CU
    participant FIS as FIS Engine
    participant DB as Databas

    Note over FIS: Trigger: Efter leveransperiod
    FIS->>DB: Hämta Config (BRS-FLEX-511)
    FIS->>DB: Hämta Historisk Mätdata (BRS-FLEX-601)
    activate FIS
    FIS->>FIS: Exekvera Beräkningsalgoritm
    deactivate FIS
    FIS->>DB: Spara Baseline Resultat`,
  process: [
    { id: "BRSFLEX5210-1", description: "Systemet triggas efter avslutad leveransperiod eller vid verifieringstillfället." },
    { id: "BRSFLEX5210-2", description: "FIS hämtar konfigurationen för CU:n för att veta vilken metod som ska användas." },
    { id: "BRSFLEX5210-3", description: "FIS hämtar nödvändig historisk data (mätvärden) för CUn." },
    { id: "BRSFLEX5210-4", description: "Baseline beräknas enligt algoritmen och sparas som referenskurva." }
  ],
  preConditions: [
    { id: "BRSFLEX5210-PRE-1", description: "Mätvärden finns tillgängliga (BRS-FLEX-601)." },
    { id: "BRSFLEX5210-PRE-2", description: "En metod är vald som stödjer systemberäkning." }
  ],
  businessRules: [
    { id: "BRSFLEX5210-BR-1", description: "Tillräcklig historik måste finnas för att uppfylla metodens krav.", errorCode: "E_5210_INSUFFICIENT_HISTORY" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX5210-POST-1", description: "Baseline har beräknats och sparats." }
    ],
    rejected: [
      { id: "BRSFLEX5210-POST-2", description: "Beräkning misslyckades (larm genereras)." }
    ]
  },
  infoObjects: [content5210Input, content5210Output]
};
