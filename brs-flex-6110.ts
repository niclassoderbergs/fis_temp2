
import { BRSData } from './types';
import { content6110Input, content6110Output } from './content-definitions';

export const brsFlex6110: BRSData = {
  id: "BRS-FLEX-6110",
  title: "FIS registrerar beräknad aktiverad flexibilitetsvolym för CU",
  purpose: "En administrativ eller automatisk process där FIS registrerar levererad volym för en aktivering. Detta används när systemet själv beräknar leveransen (t.ex. baserat på mätvärden från DHV för resurser typ FCR) eller vid manuella korrigeringar av administratör.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "SP - via notifiering" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-6110: FIS registrerar leveransdata (System/Admin)
    participant Admin as FIS Engine/Admin
    participant FIS as Flexibilitetsregistret
    participant SP as SP

    Admin->>FIS: RegisterDeliveryData (Aktiverings-ID, CU, Volym)
    activate FIS
    FIS->>FIS: Validera koppling till Aktivering
    FIS->>FIS: Lagra Leveransbevis (Källa: System)
    FIS-->>SP: Notification (System Registered Delivery)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX6110-1", description: "FIS (automatiskt jobb eller admin) beräknar levererad volym för en aktivering." },
    { id: "BRSFLEX6110-2", description: "Systemet lagrar datan kopplat till Aktiverings-ID:t." },
    { id: "BRSFLEX6110-3", description: "Systemet notifierar SP om att leveransdata har fastställts av systemet." }
  ],
  preConditions: [
    { id: "BRSFLEX6110-PRE-1", description: "En aktivering har genomförts." },
    { id: "BRSFLEX6110-PRE-2", description: "Mätdata (t.ex. från BRS-FLEX-622) finns tillgänglig för beräkning." }
  ],
  businessRules: [
    { id: "BRSFLEX6110-BR-1", description: "Systemregistrerad data har företräde framför SP-rapporterad data vid konflikter (beroende på produktregler).", errorCode: "-" },
    { id: "BRSFLEX6110-BR-2", description: "Tidsserien måste täcka aktiveringsperioden.", errorCode: "E_6110_PERIOD_MISMATCH" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX6110-POST-1", description: "Leveransdata har registrerats." },
      { id: "BRSFLEX6110-POST-2", description: "SP har notifierats." }
    ],
    rejected: [
      { id: "BRSFLEX6110-POST-3", description: "Beräkning/Registrering misslyckades." }
    ]
  },
  infoObjects: [content6110Input, content6110Output]
};
