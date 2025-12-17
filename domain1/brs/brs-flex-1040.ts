
import { BRSData } from '../../types';
import { content104Input, content104Output } from '../../content-definitions';

export const brsFlex1040: BRSData = {
  id: "BRS-FLEX-1040",
  title: "FIS uppdaterar CU",
  purpose: "Automatisk systemprocess eller administrativ åtgärd där FIS uppdaterar attribut på en Styrbar Enhet (CU). Detta sker som en konsekvens av systemhändelser, till exempel om den underliggande mätpunkten avaktiveras i Datahubben eller vid administrativa beslut som kräver att resursen pausas.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "SP - via notifiering" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-1040: FIS uppdaterar CU (System/Admin)
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: Ex. Mätpunkt stängd i DHV
    activate FIS
    FIS->>FIS: Identifiera CU kopplad till Mätpunkt
    FIS->>FIS: Applicera uppdatering (t.ex. inaktivering)
    FIS-->>SP: Notification (CU Updated by System)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX1040-1", description: "Datahubben har notifierat att mätpunkten för CUn har avaktiverats eller annan systemhändelse har inträffat." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX1040-2", description: "FIS har uppdaterat den styrbara enhetens status på grund av en extern händelse." },
      { id: "BRSFLEX1040-3", description: "FIS har notifierat SP om uppdateringen." }
    ],
    rejected: [
      { id: "BRSFLEX1040-4", description: "Uppdateringen misslyckades (loggas internt)." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX1040-5", description: "FIS uppdaterar CU-status baserat på extern händelse." },
    { id: "BRSFLEX1040-6", description: "FIS notifierar SP om uppdateringen." }
  ],
  infoObjects: [content104Input, content104Output]
};
