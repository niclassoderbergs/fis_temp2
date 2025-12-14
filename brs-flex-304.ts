
import { BRSData } from './types';

export const brsFlex304: BRSData = {
  id: "BRS-FLEX-304",
  title: "Uppdatera Nätförkvalificering",
  purpose: "DSO svarar på förfrågan om nätförkvalificering med status 'Approved', 'Conditionally Approved' eller 'Rejected'.",
  actors: [
    { role: "Initiator", description: "Nätägare (DSO)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-304: Uppdatera resultat av Nätförkvalificering
    participant DSO as Nätägare
    participant FIS as Flexibilitetsregistret

    DSO->>FIS: GridQualificationResponse (ID, Status, Villkor)
    activate FIS
    
    alt Approved
        FIS->>FIS: Sätt status 'Grid Qualified'
    else Conditionally Approved
        FIS->>FIS: Sätt status 'Conditional'
        FIS->>FIS: Lagra begränsningsvillkor
    else Rejected
        FIS->>FIS: Sätt status 'Rejected'
    end

    FIS-->>DSO: Ack
    deactivate FIS`,
  process: [
    "DSO utreder nätpåverkan.",
    "DSO skickar svar till FIS.",
    "FIS uppdaterar status och eventuella villkor."
  ],
  preConditions: [
    "DSO vill rapportera resultat av nätförkvalificering."
  ],
  businessRules: [
    { id: "Regel 1", description: "Förfrågan måste finnas och vara öppen.", errorCode: "E_304_NO_REQUEST" },
    { id: "Regel 2", description: "Om 'Conditionally Approved', måste villkoren (t.ex. max 50kW eller tidsbegränsning) lagras strukturerat i FIS.", errorCode: "E_304_MISSING_CONDITIONS" }
  ],
  postConditions: {
    accepted: [
      { id: "BRS-FLEX-304-POST-1", description: "Nätkvalificeringsstatus har uppdaterats." },
      { id: "BRS-FLEX-304-POST-2", description: "Eventuella villkor har lagrats." },
      { id: "BRS-FLEX-304-POST-3", description: "Nätägaren har mottagit en positiv kvittens." }
    ],
    rejected: [
      { id: "BRS-FLEX-304-POST-4", description: "Ingen ändring har genomförts." }
    ]
  }
};
