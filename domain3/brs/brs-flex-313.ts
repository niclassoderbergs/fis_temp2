
import { BRSData } from '../../types';
import { content313Output } from '../../content-definitions';

export const brsFlex313: BRSData = {
  id: "BRS-FLEX-313",
  title: "SP tar emot notifiering om uppdaterad produktförkvalificering",
  purpose: "Att informera SP om resultatet av en produktförkvalificering (Godkänd/Avslagen) som rapporterats av Systemoperatören (TSO).",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-313: SP tar emot notifiering om uppdaterad produktförkvalificering
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-312
    activate FIS
    FIS->>FIS: Sammanställ resultat
    FIS->>SP: NotifyProductQualificationResult (SPU-ID, Status, GiltigTill)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX313-1", description: "TSO har uppdaterat produktförkvalificeringen (via BRS-FLEX-312)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX313-2", description: "SP har mottagit notifiering om resultatet av produktförkvalificeringen." }
    ],
    rejected: [
      { id: "BRSFLEX313-3", description: "Notifiering misslyckades (loggas)." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX313-4", description: "Flexibilitetsregistret skickar notifiering om kvalificeringsresultatet." },
    { id: "BRSFLEX313-5", description: "SP tar emot informationen." }
  ],
  infoObjects: [content313Output]
};
