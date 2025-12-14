
import { BRSData } from './types';
import { content322Output } from './content-definitions';

export const brsFlex322: BRSData = {
  id: "BRS-FLEX-322",
  title: "DSO tar emot notifiering om begäran av nätförkvalificering",
  purpose: "Att informera Nätägaren (DSO) om att en SP har begärt nätförkvalificering för en eller flera resurser i nätområdet. Notifieringen innehåller detaljerad information om ingående enheter (CU) och deras indikativa bidrag för att DSO ska kunna utföra nätanalys.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "Nätägare (DSO)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-322: Notifiering till DSO (Begäran om nätförkvalificering)
    participant FIS as Flexibilitetsregistret
    participant DSO as Nätägare

    Note over FIS: Trigger: BRS-FLEX-321
    activate FIS
    FIS->>FIS: Identifiera DSO baserat på Mätpunkter
    FIS->>FIS: Sammanställ teknisk data (CU, Max effekt, Bidrag)
    FIS->>DSO: NotifyGridQualificationRequest (Data)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX322-4", description: "Processen triggas automatiskt när SP skickar in en begäran via BRS-FLEX-321." },
    { id: "BRSFLEX322-5", description: "FIS identifierar berörd DSO baserat på mätpunktsinformationen i de ingående enheterna." },
    { id: "BRSFLEX322-6", description: "FIS sammanställer en lista över alla CU som ingår i SPU/SPG:n med koppling till DSO:ns nät." },
    { id: "BRSFLEX322-7", description: "FIS skickar notifieringen innehållande identifiering av enheter, maximal effekt och indikativt bidrag per CU." }
  ],
  preConditions: [
    { id: "BRSFLEX322-1", description: "BRS-FLEX-321 har exekverats." },
    { id: "BRSFLEX322-2", description: "Resurserna har giltiga mätpunkter kopplade till DSO." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX322-3", description: "DSO har mottagit notifiering och underlag för analys." }
    ],
    rejected: [
      { id: "BRSFLEX322-4", description: "Notifiering misslyckades (loggas)." }
    ]
  },
  infoObjects: [content322Output]
};
