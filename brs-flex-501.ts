
import { BRSData } from './types';
import { content501Input, content501Output } from './content-definitions';

export const brsFlex501: BRSData = {
  id: "BRS-FLEX-501",
  title: "Välj Baselinemetod för CU",
  purpose: "SP konfigurerar vilken beräkningsmetod som ska användas för en specifik CU vid verifiering av leverans. Detta styr hur den kontrafaktiska kurvan ska beräknas eller valideras.",
  actors: [
    { role: "Initiator", description: "Service Provider (SP)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-501: Välj Baselinemetod
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: SetBaselineConfig (CU-ID, Metod-ID)
    activate FIS
    FIS->>FIS: Kontrollera Metodens giltighet
    FIS->>FIS: Spara konfiguration för CU
    FIS-->>SP: Ack (Config-ID)
    deactivate FIS`,
  process: [
    "SP väljer en metod från listan av godkända metoder (BRS-FLEX-500) för sin resurs.",
    "FIS sparar valet som gällande konfiguration från angivet startdatum."
  ],
  preConditions: [
    "Metoden måste finnas i registret (BRS-FLEX-500).",
    "CU måste vara aktiv."
  ],
  businessRules: [
    { id: "Regel 1", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_501_CU_NOT_FOUND" },
    { id: "Regel 2", description: "Angivet Metod-ID måste existera i FIS.", errorCode: "E_501_METHOD_NOT_FOUND" },
    { id: "Regel 3", description: "En CU måste ha en aktiv baselinemetod vald för att kunna verifieras.", errorCode: "E_501_METHOD_REQUIRED" },
    { id: "Regel 4", description: "Vald metod måste vara giltig för resurstypen (om begränsningar finns).", errorCode: "E_501_INVALID_METHOD_FOR_TYPE" }
  ],
  postConditions: {
    accepted: [
      { id: "BRS-FLEX-501-POST-1", description: "Metodval har sparats för CU." }
    ],
    rejected: [
      { id: "BRS-FLEX-501-POST-2", description: "Konfiguration ej sparad." }
    ]
  },
  infoObjects: [content501Input, content501Output]
};
