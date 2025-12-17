
import { BRSData } from '../../types';
import { content312Input, content312Output } from '../../content-definitions';

export const brsFlex312: BRSData = {
  id: "BRS-FLEX-312",
  title: "TSO uppdaterar produktförkvalificering",
  purpose: "Att registrera resultatet av ett utfört test (Godkänd/Underkänd). Utförs av Systemoperatören efter test genomförts.",
  actors: [
    { role: "Initiator", description: "Systemoperatör (TSO)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-312: TSO uppdaterar produktförkvalificering
    participant TSO as TSO
    participant FIS as FIS

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
  preConditions: [
    { id: "BRSFLEX312-1", description: "En systemoperatör (TSO) har registrerat resultatet av en produktförkvalificering." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX312-2", description: "FIS har uppdaterat kvalificeringsstatusen." },
      { id: "BRSFLEX312-3", description: "TSO har mottagit kvittens på uppdateringen." }
    ],
    rejected: [
      { id: "BRSFLEX312-4", description: "Ingen ändring har genomförts." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX312-5", description: "Ansökan måste finnas (t.ex. status 'Pending Test').", errorCode: "E_312_NO_APPLICATION" },
    { id: "BRSFLEX312-6", description: "Om Godkänt, måste ett slutdatum för kvalificeringen anges.", errorCode: "E_312_MISSING_EXPIRY" },
    { id: "BRSFLEX312-7", description: "Status sätts till 'Qualified' eller 'Rejected'.", errorCode: "E_312_INVALID_STATUS" }
  ],
  process: [
    { id: "BRSFLEX312-8", description: "Systemoperatören (TSO) registrerar resultatet av en produktförkvalificering." },
    { id: "BRSFLEX312-9", description: "Flexibilitetsregistret bekräftar uppdateringen till TSO." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX312-10", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content312Input, content312Output]
};
