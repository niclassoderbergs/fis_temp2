
import { BRSData } from '../../types';
import { content612Input, content612Output } from '../../content-definitions';

export const brsFlex612: BRSData = {
  id: "BRS-FLEX-612",
  title: "Begär beräknad aktiverad flexibilitetsvolym för CU",
  purpose: "Möjliggör för behöriga aktörer (SP, TSO, Marknadsplats) att hämta den registrerade leveransvolymen för en specifik aktivering. Detta används vid verifiering och ekonomisk reglering.",
  actors: [
    { role: "Initiator", description: "SP, TSO eller Marknadsplats" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-612: Begär Leveransvolym
    participant Req as Requester
    participant FIS as FIS

    Req->>FIS: GetActivationVolume (Aktiverings-ID)
    activate FIS
    FIS->>FIS: Validera behörighet
    
    alt Behörig och Data finns
        FIS->>FIS: Hämta volymdata
        FIS-->>Req: ActivationVolumeResponse (Tidsserie)
    else Ej Behörig eller Saknas
        FIS-->>Req: Error (Not Found / Unauthorized)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX612-1", description: "En SP har begärt leveransvolym för en aktivering." },
    { id: "BRSFLEX612-2", description: "En TSO har begärt leveransvolym för en aktivering." },
    { id: "BRSFLEX612-3", description: "En DSO har begärt leveransvolym för en aktivering." },
    { id: "BRSFLEX612-4", description: "En BRP har begärt leveransvolym för en aktivering." },
    { id: "BRSFLEX612-5", description: "En elleverantör har begärt leveransvolym för en aktivering." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX612-6", description: "FIS har returnerat efterfrågad flexibilitetsvolym till SP." },
      { id: "BRSFLEX612-7", description: "FIS har returnerat efterfrågad flexibilitetsvolym till TSO." },
      { id: "BRSFLEX612-8", description: "FIS har returnerat efterfrågad flexibilitetsvolym till DSO." },
      { id: "BRSFLEX612-9", description: "FIS har returnerat efterfrågad flexibilitetsvolym till BRP." },
      { id: "BRSFLEX612-10", description: "FIS har returnerat efterfrågad flexibilitetsvolym till elleverantör." }
    ],
    rejected: [
      { id: "BRSFLEX612-11", description: "Ingen data eller nekad åtkomst." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX612-12", description: "Aktiverings-ID måste existera.", errorCode: "E_612_NOT_FOUND" },
    { id: "BRSFLEX612-13", description: "Anropande part måste ha behörighet (SP, TSO, DSO).", errorCode: "E_612_UNAUTHORIZED" }
  ],
  process: [
    { id: "BRSFLEX612-14", description: "Aktör begär beräknad leveransvolym för en aktivering." },
    { id: "BRSFLEX612-15", description: "FIS skickar volymdata till aktören." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX612-16", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content612Input, content612Output]
};
