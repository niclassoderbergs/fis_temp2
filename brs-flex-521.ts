
import { BRSData } from './types';
import { content521Input, content521Output } from './content-definitions';

export const brsFlex521: BRSData = {
  id: "BRS-FLEX-521",
  title: "SP registrerar beräknad baseline för CU",
  purpose: "SP skickar in den kontrafaktiska kurvan (vad förbrukningen/produktionen hade varit utan aktivering) för en leveransperiod. Detta används när metoden kräver att SP själv står för beräkningen.",
  actors: [
    { role: "Initiator", description: "Service Provider (SP)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-521: SP registrerar beräknad baseline för CU
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: SubmitBaselineData (CU, Period, Värden)
    activate FIS
    FIS->>FIS: Validera format mot vald Metod (BRS-FLEX-511)
    FIS->>FIS: Lagra tidsserie
    FIS-->>SP: Ack
    deactivate FIS`,
  process: [
    { id: "BRSFLEX521-1", description: "SP beräknar baseline enligt vald metod och skickar in dataserien till FIS." },
    { id: "BRSFLEX521-2", description: "FIS validerar att formatet stämmer." },
    { id: "BRSFLEX521-3", description: "Data lagras för senare verifiering." }
  ],
  preConditions: [
    { id: "BRSFLEX521-PRE-1", description: "En baselinemetod är vald (BRS-FLEX-511)." }
  ],
  businessRules: [
    { id: "BRSFLEX521-BR-1", description: "Dataformatet valideras mot den metod som är konfigurerad för CU:n.", errorCode: "E_521_FORMAT_MISMATCH" },
    { id: "BRSFLEX521-BR-2", description: "Tidsupplösningen måste matcha marknadsproduktens krav.", errorCode: "E_521_INVALID_RESOLUTION" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX521-POST-1", description: "Baselinedata har lagrats." }
    ],
    rejected: [
      { id: "BRSFLEX521-POST-2", description: "Data avvisad." }
    ]
  },
  infoObjects: [content521Input, content521Output]
};
