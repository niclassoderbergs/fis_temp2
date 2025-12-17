
import { BRSData } from '../../types';
import { content321Input, content321Internal, content321Output } from '../../content-definitions';

export const brsFlex321: BRSData = {
  id: "BRS-FLEX-321",
  title: "SP begär Nätförkvalificering",
  purpose: "Att be Nätägaren (DSO) kontrollera om aktivering av dessa resurser skapar lokala nätproblem (Grid Pre-qualification), enligt DR NC Artikel 49.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-321: SP begär Nätförkvalificering
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: RequestGridQualification (CU-ID / SPU-ID)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Identifiera berörda nätområden
        FIS->>FIS: Sätt status 'Pending Grid Check'
        FIS-->>SP: Ack
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX321-1", description: "En SP har begärt nätförkvalificering för en resurs." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX321-2", description: "FIS har satt status till 'Pending Grid Check'." },
      { id: "BRSFLEX321-3", description: "SP har mottagit bekräftelse på begäran." }
    ],
    rejected: [
      { id: "BRSFLEX321-4", description: "Fel vid routing, förfrågan ej skickad." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX321-5", description: "Angivet SPU-ID eller CU-ID måste existera i FIS.", errorCode: "E_321_RESOURCE_NOT_FOUND" },
    { id: "BRSFLEX321-6", description: "Resurserna måste vara kopplade till mätpunkter för att nätområde ska kunna identifieras.", errorCode: "E_321_MISSING_MP" },
    { id: "BRSFLEX321-7", description: "Mätpunkts-ID måste kunna matchas mot en registrerad Nätägare (DSO) för routing.", errorCode: "E_321_ROUTING_FAILED" }
  ],
  process: [
    { id: "BRSFLEX321-8", description: "SP begär nätförkvalificering för en resurs." },
    { id: "BRSFLEX321-9", description: "Flexibilitetsregistret bekräftar begäran till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX321-10", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content321Input, content321Internal, content321Output]
};
