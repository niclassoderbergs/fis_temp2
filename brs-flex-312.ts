
import { BRSData } from './types';
import { content312Input, content312Output } from './content-definitions';

export const brsFlex312: BRSData = {
  id: "BRS-FLEX-312",
  title: "Uppdatera Produktförkvalificering",
  purpose: "Att registrera resultatet av ett utfört test (Godkänd/Underkänd). Utförs av Systemoperatören efter test genomförts.",
  actors: [
    { role: "Initiator", description: "Systemoperatör (TSO)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-312: Uppdatera resultat av Produktförkvalificering
    participant TSO as Systemoperatör
    participant FIS as Flexibilitetsregistret

    TSO->>FIS: UpdateQualificationResult (SPU-ID, Produkt, Status, GiltigTill)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Uppdatera status (Qualified/Rejected)
        
        opt Om Qualified
            FIS->>FIS: Spara slutdatum
        end
        
        FIS-->>TSO: Ack
    else Validering Fel
        FIS-->>TSO: Error (Validation Failed)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX312-10", description: "TSO genomför test utanför systemet eller via testmodul." },
    { id: "BRSFLEX312-11", description: "TSO rapporterar resultatet till FIS via API eller gränssnitt." },
    { id: "BRSFLEX312-12", description: "FIS uppdaterar status på kvalificeringsobjektet." }
  ],
  preConditions: [
    { id: "BRSFLEX312-1", description: "TSO vill rapportera resultat av produktförkvalificering." }
  ],
  businessRules: [
    { id: "BRSFLEX312-6", description: "Ansökan måste finnas (t.ex. status 'Pending Test').", errorCode: "E_312_NO_APPLICATION" },
    { id: "BRSFLEX312-7", description: "Om Godkänt, måste ett slutdatum för kvalificeringen anges.", errorCode: "E_312_MISSING_EXPIRY" },
    { id: "BRSFLEX312-8", description: "Status sätts till 'Qualified' eller 'Rejected'.", errorCode: "E_312_INVALID_STATUS" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX312-2", description: "Kvalificeringsstatus har uppdaterats enligt resultatet." },
      { id: "BRSFLEX312-3", description: "Systemoperatören har mottagit en positiv kvittens." }
    ],
    rejected: [
      { id: "BRSFLEX312-4", description: "Ingen ändring har genomförts." }
    ]
  },
  infoObjects: [content312Input, content312Output]
};
