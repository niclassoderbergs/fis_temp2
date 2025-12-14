
import { BRSData } from './types';
import { content612Input, content612Output } from './content-definitions';

export const brsFlex612: BRSData = {
  id: "BRS-FLEX-612",
  title: "Begär beräknad aktiverad flexibilitetsvolym för CU",
  purpose: "Möjliggör för behöriga aktörer (SP, TSO, Marknadsplats) att hämta den registrerade leveransvolymen för en specifik aktivering. Detta används vid verifiering och ekonomisk reglering.",
  actors: [
    { role: "Initiator", description: "SP, TSO eller Marknadsplats" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-612: Begär Leveransvolym
    participant Req as Requester
    participant FIS as Flexibilitetsregistret

    Req->>FIS: GetActivationVolume (Aktiverings-ID)
    activate FIS
    FIS->>FIS: Validera behörighet
    FIS->>FIS: Hämta volymdata
    FIS-->>Req: ActivationVolumeResponse (Tidsserie)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX612-1", description: "Aktör begär volymdata för ett specifikt Aktiverings-ID." },
    { id: "BRSFLEX612-2", description: "FIS kontrollerar att aktören är part i affären." },
    { id: "BRSFLEX612-3", description: "FIS returnerar den registrerade tidsserien." }
  ],
  preConditions: [
    { id: "BRSFLEX612-PRE-1", description: "Leveransdata har registrerats via BRS-FLEX-611 eller 6110." }
  ],
  businessRules: [
    { id: "BRSFLEX612-BR-1", description: "Aktiverings-ID måste existera.", errorCode: "E_612_NOT_FOUND" },
    { id: "BRSFLEX612-BR-2", description: "Anropande part måste ha behörighet (SP, TSO, DSO).", errorCode: "E_612_UNAUTHORIZED" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX612-POST-1", description: "Volymdata returnerad." }
    ],
    rejected: [
      { id: "BRSFLEX612-POST-2", description: "Ingen data eller nekad åtkomst." }
    ]
  },
  infoObjects: [content612Input, content612Output]
};
