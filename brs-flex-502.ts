
import { BRSData } from './types';
import { content502Input, content502Output } from './content-definitions';

export const brsFlex502: BRSData = {
  id: "BRS-FLEX-502",
  title: "Registrera Beräknad Baseline",
  purpose: "SP skickar in den kontrafaktiska kurvan (vad förbrukningen/produktionen hade varit utan aktivering) för en leveransperiod. Detta används som jämförelseunderlag mot mätvärden vid verifiering.",
  actors: [
    { role: "Initiator", description: "Service Provider (SP)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-502: Registrera Baseline-data
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: SubmitBaselineData (CU, Period, Värden)
    activate FIS
    FIS->>FIS: Validera format mot vald Metod (BRS-FLEX-501)
    FIS->>FIS: Lagra tidsserie
    FIS-->>SP: Ack
    deactivate FIS`,
  process: [
    "SP beräknar baseline enligt vald metod och skickar in dataserien till FIS.",
    "FIS validerar att formatet stämmer.",
    "Data lagras för senare verifiering."
  ],
  preConditions: [
    "En baselinemetod är vald (BRS-FLEX-501)."
  ],
  businessRules: [
    { id: "Regel 1", description: "Dataformatet valideras mot den metod som är konfigurerad för CU:n.", errorCode: "E_502_FORMAT_MISMATCH" },
    { id: "Regel 2", description: "Tidsupplösningen måste matcha marknadsproduktens krav.", errorCode: "E_502_INVALID_RESOLUTION" }
  ],
  postConditions: {
    accepted: [
      { id: "BRS-FLEX-502-POST-1", description: "Baselinedata har lagrats." }
    ],
    rejected: [
      { id: "BRS-FLEX-502-POST-2", description: "Data avvisad." }
    ]
  },
  infoObjects: [content502Input, content502Output]
};
