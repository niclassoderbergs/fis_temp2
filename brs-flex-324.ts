
import { BRSData } from './types';
import { content324Output } from './content-definitions';

export const brsFlex324: BRSData = {
  id: "BRS-FLEX-324",
  title: "SP tar emot notifiering om nätförkvalificering",
  purpose: "Att informera SP om resultatet av en nätförkvalificering (Grid Qualification) som rapporterats av Nätägaren (DSO). Detta inkluderar information om eventuella villkor för godkännandet.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-324: Notifiering om nätförkvalificering
    participant FIS as Flexibilitetsregistret
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-323
    activate FIS
    FIS->>FIS: Sammanställ resultat och villkor
    FIS->>SP: NotifyGridQualificationResult (ID, Status, Villkor)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX324-4", description: "Processen triggas automatiskt när DSO uppdaterar resultatet i BRS-FLEX-323." },
    { id: "BRSFLEX324-5", description: "FIS hämtar status (Approved, Conditional, Rejected) och eventuella villkor." },
    { id: "BRSFLEX324-6", description: "En notifiering skickas till SP." }
  ],
  preConditions: [
    { id: "BRSFLEX324-1", description: "BRS-FLEX-323 har exekverats och uppdaterat status." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX324-2", description: "SP har mottagit notifiering om nätförkvalificering." }
    ],
    rejected: [
      { id: "BRSFLEX324-3", description: "Notifiering misslyckades (loggas)." }
    ]
  },
  infoObjects: [content324Output]
};
