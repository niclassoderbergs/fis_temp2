
import { BRSData } from './types';
import { content103Input, content103Output } from './content-definitions';

export const brsFlex103: BRSData = {
  id: "BRS-FLEX-103",
  title: "Begär CU-information",
  purpose: "Möjliggör för behöriga aktörer att hämta aktuell masterdata för en specifik enhet. Strikt behörighetsstyrd för att skydda affärskritisk information.",
  actors: [
    { role: "Initiator", description: "SP eller Systemoperatör (SO)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-103: Begär CU-information
    participant Requester as SP eller SO
    participant FIS as Flexibilitetsregistret

    Requester->>FIS: GetControllableUnitView (Filter eller ID)
    activate FIS
    FIS->>FIS: Validera behörighet och regler
    
    alt Behörig
        FIS->>FIS: Hämta Data från DB
        FIS->>FIS: Filtrera baserat på Roll
        FIS-->>Requester: ShowControllableUnitView (Data)
    else Ej Behörig eller Fel
        FIS-->>Requester: Nekad Åtkomst (Error)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX103-9", description: "Aktören skickar GetControllableUnitView med ett specifikt CU-ID eller sökfilter." },
    { id: "BRSFLEX103-10", description: "FIS verifierar vem som frågar (Autentisering)." },
    { id: "BRSFLEX103-11", description: "FIS applicerar behörighetsfilter. För SP avgörs ägarskap genom att kontrollera aktivt flexavtal, eller om sådant saknas, vem som registrerade resursen." },
    { id: "BRSFLEX103-12", description: "FIS hämtar data från databasen." },
    { id: "BRSFLEX103-13", description: "FIS skickar ShowControllableUnitView med begärd data." }
  ],
  preConditions: [
    { id: "BRSFLEX103-1", description: "SP begär CU-information" },
    { id: "BRSFLEX103-2", description: "FIS begär CU-information" }
  ],
  businessRules: [
    { id: "BRSFLEX103-6", description: "Om ett specifikt CU-ID anges måste det existera i FIS.", errorCode: "E_103_NOT_FOUND" },
    { id: "BRSFLEX103-7", description: "Om en SP begär information behöver denne vara ägaren till CU vid begäran.", errorCode: "E_103_UNAUTHORIZED_RESOURCE" },
    { id: "BRSFLEX103-8", description: "En SO (DSO/TSO) får endast se CU:s kopplade till mätpunkter inom deras eget nätområde.", errorCode: "E_103_OUT_OF_GRID_AREA" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX103-3", description: "Begärd data har levererats till aktören." },
      { id: "BRSFLEX103-4", description: "Ingen data har ändrats (Read-only)." }
    ],
    rejected: [
      { id: "BRSFLEX103-5", description: "Meddelande om nekad åtkomst eller 'ej hittad' har skickats." }
    ]
  },
  infoObjects: [content103Input, content103Output]
};
