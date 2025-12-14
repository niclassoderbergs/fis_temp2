
import { BRSData } from './types';
import { content313Output } from './content-definitions';

export const brsFlex313: BRSData = {
  id: "BRS-FLEX-313",
  title: "SP tar emot notifiering om produktförkvalificering",
  purpose: "Att informera SP om resultatet av en produktförkvalificering (Godkänd/Avslagen) som rapporterats av Systemoperatören (TSO).",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-313: Notifiering om produktförkvalificering
    participant FIS as Flexibilitetsregistret
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-312
    activate FIS
    FIS->>FIS: Sammanställ resultat
    FIS->>SP: NotifyProductQualificationResult (SPU-ID, Status, GiltigTill)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX313-4", description: "Processen triggas automatiskt när TSO uppdaterar resultatet i BRS-FLEX-312." },
    { id: "BRSFLEX313-5", description: "FIS hämtar aktuell status och eventuellt slutdatum för kvalificeringen." },
    { id: "BRSFLEX313-6", description: "En notifiering skickas till SP med resultatet." }
  ],
  preConditions: [
    { id: "BRSFLEX313-1", description: "BRS-FLEX-312 har exekverats och uppdaterat status." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX313-2", description: "SP har mottagit notifiering om kvalificeringsresultat." }
    ],
    rejected: [
      { id: "BRSFLEX313-3", description: "Notifiering misslyckades (loggas)." }
    ]
  },
  infoObjects: [content313Output]
};
