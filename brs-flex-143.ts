
import { BRSData } from './types';
import { content143Input, content143Output } from './content-definitions';

export const brsFlex143: BRSData = {
  id: "BRS-FLEX-1410",
  title: "FIS kopplar CU till SPG",
  purpose: "Automatisk systemfunktion som kopplar en nyligen förkvalificerad CU till en passande SPG (Portfölj). Syftet är att förenkla administrationen för SP genom att automatiskt samla resurser med liknande egenskaper (samma elområde och teknisk typ) inför budgivning.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "SP - via notifiering" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-1410: FIS kopplar CU till SPG (System/Admin)
    participant FIS as Flexibilitetsregistret
    participant SP as SP

    Note over FIS: Trigger: Förkvalificering eller Admin-beslut
    activate FIS
    FIS->>FIS: Identifiera matchande SPG (Samma typ/elområde)
    
    alt Matchning hittad
        FIS->>FIS: Skapa Relation (CU -> SPG)
        FIS->>FIS: Uppdatera SPG status (Available -> Active)
        FIS-->>SP: Notification (Resource Auto-linked to Group)
    else Ingen matchning (Om Admin)
        FIS->>FIS: Tvingande koppling till vald SPG
        FIS-->>SP: Notification (Admin linked Resource)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX1410-6", description: "Processen startas antingen manuellt av admin eller automatiskt av systemet." },
    { id: "BRSFLEX1410-7", description: "Systemet söker efter en befintlig SPG som innehåller resurser av samma tekniska typ och elområde." },
    { id: "BRSFLEX1410-8", description: "Om en matchande SPG hittas, kopplas den nya CU:n automatiskt dit för att underlätta budgivning." },
    { id: "BRSFLEX1410-9", description: "Om SPG hade status 'Available' sätts den till 'Active'." },
    { id: "BRSFLEX1410-10", description: "SP notifieras om den nya kopplingen." }
  ],
  preConditions: [
    { id: "BRSFLEX1410-1", description: "SP har förkvalificerat en resurs (och automatik är aktiverad)" }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX1410-2", description: "Relation har skapats." },
      { id: "BRSFLEX1410-3", description: "SPG är aktiv." },
      { id: "BRSFLEX1410-4", description: "SP har notifierats." }
    ],
    rejected: [
      { id: "BRSFLEX1410-5", description: "Ingen koppling utförd." }
    ]
  },
  infoObjects: [content143Input, content143Output]
};
