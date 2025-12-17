
import { BRSData } from '../../types';
import { content324Output } from '../../content-definitions';

export const brsFlex324: BRSData = {
  id: "BRS-FLEX-324",
  title: "Notifiering om nätförkvalificering",
  purpose: "Att informera SP om resultatet av en nätförkvalificering (Grid Qualification) som rapporterats av Nätägaren (DSO). Detta inkluderar information om eventuella villkor för godkännandet.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-324: Notifiering om nätförkvalificering
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-323
    activate FIS
    FIS->>FIS: Sammanställ resultat och villkor
    FIS->>SP: NotifyGridQualificationResult (ID, Status, Villkor)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX324-1", description: "En DSO har uppdaterat nätförkvalificering (via BRS-FLEX-323)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX324-2", description: "SP har mottagit notifiering om resultatet av nätförkvalificeringen." }
    ],
    rejected: [
      { id: "BRSFLEX324-3", description: "Notifiering misslyckades (loggas)." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX324-4", description: "Flexibilitetsregistret skickar notifiering om nätförkvalificeringsresultatet." },
    { id: "BRSFLEX324-5", description: "SP tar emot informationen." }
  ],
  infoObjects: [content324Output]
};
