
import { BRSData } from '../../types';
import { content323Input, content323Output } from '../../content-definitions';

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
    participant DSO as DSO
    participant FIS as FIS

    DSO->>FIS: GridQualificationResponse (SPU/CU-ID, Produkt, Status, Villkor)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Uppdatera status (Qualified/Conditional/Rejected)
        FIS-->>DSO: Ack
    else Validering Fel
        FIS-->>DSO: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX323-1", description: "En nätägare (DSO) har registrerat resultatet av en nätförkvalificering." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX323-2", description: "FIS har uppdaterat status för nätförkvalificeringen." },
      { id: "BRSFLEX323-3", description: "FIS har lagrat eventuella villkor för godkännandet." },
      { id: "BRSFLEX323-4", description: "DSO har mottagit kvittens på uppdateringen." }
    ],
    rejected: [
      { id: "BRSFLEX323-5", description: "Ingen ändring har genomförts." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX323-6", description: "Förfrågan måste finnas och vara öppen.", errorCode: "E_323_NO_REQUEST" },
    { id: "BRSFLEX323-7", description: "Om 'Conditionally Approved', måste villkoren (t.ex. max 50kW eller tidsbegränsning) lagras strukturerat i FIS.", errorCode: "E_323_MISSING_CONDITIONS" }
  ],
  process: [
    { id: "BRSFLEX323-8", description: "Nätägaren (DSO) registrerar resultatet av nätförkvalificeringen." },
    { id: "BRSFLEX323-9", description: "Flexibilitetsregistret bekräftar uppdateringen till Nätägaren." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX323-10", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content323Input, content323Output]
};
