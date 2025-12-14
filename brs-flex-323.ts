
import { BRSData } from './types';
import { content323Input, content323Output } from './content-definitions';

export const brsFlex323: BRSData = {
  id: "BRS-FLEX-323",
  title: "DSO uppdaterar nätförkvalificering",
  purpose: "DSO svarar på förfrågan om nätförkvalificering med status 'Approved', 'Conditionally Approved' eller 'Rejected'.",
  actors: [
    { role: "Initiator", description: "Nätägare (DSO)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-323: Uppdatera resultat av Nätförkvalificering
    participant DSO as Nätägare
    participant FIS as Flexibilitetsregistret

    DSO->>FIS: GridQualificationResponse (SPU/CU-ID, Produkt, Status, Villkor)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Uppdatera status (Qualified/Conditional/Rejected)
        FIS->>FIS: Trigger BRS-FLEX-324 (Notify SP)
        FIS-->>DSO: Ack
    else Validering Fel
        FIS-->>DSO: Error (Validation Failed)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX323-8", description: "DSO utreder nätpåverkan." },
    { id: "BRSFLEX323-9", description: "DSO skickar svar till FIS." },
    { id: "BRSFLEX323-10", description: "FIS uppdaterar status och eventuella villkor." },
    { id: "BRSFLEX323-11", description: "FIS initierar notifiering till SP (BRS-FLEX-324)." }
  ],
  preConditions: [
    { id: "BRSFLEX323-1", description: "DSO vill rapportera resultat av nätförkvalificering (efter mottagen 322)." }
  ],
  businessRules: [
    { id: "BRSFLEX323-6", description: "Förfrågan måste finnas och vara öppen.", errorCode: "E_323_NO_REQUEST" },
    { id: "BRSFLEX323-7", description: "Om 'Conditionally Approved', måste villkoren (t.ex. max 50kW eller tidsbegränsning) lagras strukturerat i FIS.", errorCode: "E_323_MISSING_CONDITIONS" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX323-2", description: "Nätkvalificeringsstatus har uppdaterats." },
      { id: "BRSFLEX323-3", description: "Eventuella villkor har lagrats." },
      { id: "BRSFLEX323-4", description: "Nätägaren har mottagit en positiv kvittens." }
    ],
    rejected: [
      { id: "BRSFLEX323-5", description: "Ingen ändring har genomförts." }
    ]
  },
  infoObjects: [content323Input, content323Output]
};
