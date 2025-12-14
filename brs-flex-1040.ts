
import { BRSData } from './types';
import { content104Input, content104Output } from './content-definitions';

export const brsFlex1040: BRSData = {
  id: "BRS-FLEX-1040",
  title: "FIS uppdaterar CU",
  purpose: "Automatisk systemprocess eller administrativ åtgärd där FIS uppdaterar attribut på en Styrbar Enhet (CU). Detta sker oftast som en konsekvens av systemhändelser, till exempel när en nätbegränsning har registrerats på en mätpunkt och resursen måste flaggas om.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "SP - via notifiering" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-1040: FIS uppdaterar CU (System/Admin)
    participant FIS as Flexibilitetsregistret
    participant SP as SP

    Note over FIS: Trigger: Ex. Nätbegränsning (BRS-FLEX-401)
    activate FIS
    FIS->>FIS: Identifiera CU kopplad till Mätpunkt
    FIS->>FIS: Applicera uppdatering (t.ex. statusbegränsning)
    FIS-->>SP: Notification (CU Updated by System)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX1040-5", description: "FIS detekterar ett behov av att uppdatera en CU utan SP:s direkta inblandning." },
    { id: "BRSFLEX1040-6", description: "Exempeltrigger: BRS-FLEX-401 (DSO registrerar nätbegränsning på mätpunkt)." },
    { id: "BRSFLEX1040-7", description: "Systemet identifierar vilken CU som är kopplad till den aktuella mätpunkten." },
    { id: "BRSFLEX1040-8", description: "FIS uppdaterar relevanta attribut på CU (t.ex. sätter en flagga för 'Grid Constraint Active' eller justerar tillgänglig kapacitet)." },
    { id: "BRSFLEX1040-9", description: "Systemet skickar en notifiering till ansvarig SP om att resursen har uppdaterats av systemet." }
  ],
  preConditions: [
    { id: "BRSFLEX1040-1", description: "En nätägare har registrerat en nätbegränsning för CUn genom BRS-FLEX-401." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX1040-2", description: "CU-objektet har uppdaterats med nya värden/status." },
      { id: "BRSFLEX1040-3", description: "SP har notifierats om den externa påverkan." }
    ],
    rejected: [
      { id: "BRSFLEX1040-4", description: "Uppdateringen misslyckades (loggas internt)." }
    ]
  },
  infoObjects: [content104Input, content104Output]
};
