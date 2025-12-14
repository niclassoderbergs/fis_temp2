
import { BRSData } from './types';

export const brsFlex601: BRSData = {
  id: "BRS-FLEX-601",
  title: "Kontrollera Bud",
  purpose: "En kontrolltjänst för att se om ett budobjekt är godkänt att buda med för en given period och marknad.",
  actors: [
    { role: "Initiator", description: "SP eller Marknadsplats" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-601: Kontrollera Budbehörighet
    participant Requester as SP/Marknad
    participant FIS as Flexibilitetsregistret

    Requester->>FIS: ValidateBidCapability (Budobjekt-ID, Tid, Produkt)
    activate FIS
    FIS->>FIS: Kontrollera Kvalificering (Qualified?)
    FIS->>FIS: Kontrollera Nätbegränsningar (Inga limits?)
    FIS->>FIS: Kontrollera Flexavtal (Aktivt?)
    
    alt Allt OK
        FIS-->>Requester: OK (Valid)
    else Fel
        FIS-->>Requester: Invalid (Orsak)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX601-10", description: "Anropande part frågar om ett objekt får buda." },
    { id: "BRSFLEX601-11", description: "FIS kontrollerar: 1. Kvalificering, 2. Nätbegränsningar, 3. Avtal." },
    { id: "BRSFLEX601-12", description: "FIS returnerar svar." }
  ],
  preConditions: [
    { id: "BRSFLEX601-1", description: "En aktör vill kontrollera budbehörighet." }
  ],
  businessRules: [
    { id: "BRSFLEX601-6", description: "Objektet måste ha status 'Qualified' för produkten.", errorCode: "E_601_NOT_QUALIFIED" },
    { id: "BRSFLEX601-7", description: "Ingen aktiv nätbegränsning får finnas under budperioden.", errorCode: "E_601_GRID_LIMIT" },
    { id: "BRSFLEX601-8", description: "Ett aktivt Flexavtal måste finnas för resursen.", errorCode: "E_601_NO_AGREEMENT" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX601-2", description: "Ett svar med status OK/Valid har returnerats." }
    ],
    rejected: [
      { id: "BRSFLEX601-3", description: "Ett svar med status Invalid och felorsak har returnerats." }
    ]
  }
};
