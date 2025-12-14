
import { BRSData } from './types';
import { content511Input, content511Output } from './content-definitions';

export const brsFlex511: BRSData = {
  id: "BRS-FLEX-511",
  title: "SP registrerar vald baselinemetod för CU",
  purpose: "SP konfigurerar vilken beräkningsmetod som ska användas för en specifik CU vid verifiering av leverans. Detta styr hur den kontrafaktiska kurvan ska beräknas eller valideras.",
  actors: [
    { role: "Initiator", description: "Service Provider (SP)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-511: SP registrerar vald baselinemetod för CU
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: SetBaselineConfig (CU-ID, Metod-ID, Parametrar)
    activate FIS
    FIS->>FIS: Kontrollera Metodens giltighet
    FIS->>FIS: Spara konfiguration för CU
    FIS-->>SP: Ack (Config-ID)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX511-1", description: "SP väljer en metod från listan av godkända metoder (BRS-FLEX-502) för sin resurs." },
    { id: "BRSFLEX511-2", description: "FIS sparar valet som gällande konfiguration från angivet startdatum." }
  ],
  preConditions: [
    { id: "BRSFLEX511-PRE-1", description: "Metoden måste finnas i registret." },
    { id: "BRSFLEX511-PRE-2", description: "CU måste vara aktiv." }
  ],
  businessRules: [
    { id: "BRSFLEX511-BR-1", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_511_CU_NOT_FOUND" },
    { id: "BRSFLEX511-BR-2", description: "Angivet Metod-ID måste existera i FIS.", errorCode: "E_511_METHOD_NOT_FOUND" },
    { id: "BRSFLEX511-BR-3", description: "En CU måste ha en aktiv baselinemetod vald för att kunna verifieras.", errorCode: "E_511_METHOD_REQUIRED" },
    { id: "BRSFLEX511-BR-4", description: "Vald metod måste vara giltig för resurstypen (om begränsningar finns).", errorCode: "E_511_INVALID_METHOD_FOR_TYPE" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX511-POST-1", description: "Metodval har sparats för CU." }
    ],
    rejected: [
      { id: "BRSFLEX511-POST-2", description: "Konfiguration ej sparad." }
    ]
  },
  infoObjects: [content511Input, content511Output]
};
