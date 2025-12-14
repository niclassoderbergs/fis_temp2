
import { BRSData } from './types';
import { content321Input, content321Internal, content321Output } from './content-definitions';

export const brsFlex321: BRSData = {
  id: "BRS-FLEX-321",
  title: "SP begär Nätförkvalificering",
  purpose: "Att be Nätägaren (DSO) kontrollera om aktivering av dessa resurser skapar lokala nätproblem (Grid Pre-qualification), enligt DR NC Artikel 49.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" },
    { role: "Sekundär", description: "Nätägare (DSO)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-321: SP begär Nätförkvalificering
    participant SP as SP
    participant FIS as Flexibilitetsregistret
    participant DSO as Nätägare

    SP->>FIS: RequestGridQualification (CU-ID / SPU-ID)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Identifiera berörda nätområden
        FIS->>FIS: Trigger BRS-FLEX-322 (Notify DSO)
        FIS->>FIS: Sätt status 'Pending Grid Check'
        FIS-->>SP: Ack
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX321-10", description: "SP begär nätförkvalificering för en resurs eller grupp." },
    { id: "BRSFLEX321-11", description: "FIS identifierar vilken eller vilka Nätägare (DSO) som berörs baserat på Mätpunkts-ID." },
    { id: "BRSFLEX321-12", description: "FIS initierar notifiering till DSO via BRS-FLEX-322." },
    { id: "BRSFLEX321-13", description: "Status sätts till 'Pending Grid Check'." }
  ],
  preConditions: [
    { id: "BRSFLEX321-1", description: "SP vill begära nätförkvalificering." }
  ],
  businessRules: [
    { id: "BRSFLEX321-6", description: "Angivet SPU-ID eller CU-ID måste existera i FIS.", errorCode: "E_321_RESOURCE_NOT_FOUND" },
    { id: "BRSFLEX321-7", description: "Resurserna måste vara kopplade till mätpunkter för att nätområde ska kunna identifieras.", errorCode: "E_321_MISSING_MP" },
    { id: "BRSFLEX321-8", description: "Mätpunkts-ID styr routing av förfrågan till korrekt DSO.", errorCode: "-" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX321-2", description: "Notifiering (BRS-FLEX-322) har initierats." },
      { id: "BRSFLEX321-3", description: "Status har satts till 'Pending Grid Check'." },
      { id: "BRSFLEX321-4", description: "SP har mottagit en bekräftelse på att förfrågan vidarebefordrats." }
    ],
    rejected: [
      { id: "BRSFLEX321-5", description: "Fel vid routing, förfrågan ej skickad." }
    ]
  },
  infoObjects: [content321Input, content321Internal, content321Output]
};
