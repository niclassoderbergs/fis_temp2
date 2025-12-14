
import { BRSData } from './types';
import { content401Input, content401Output } from './content-definitions';

export const brsFlex401: BRSData = {
  id: "BRS-FLEX-401",
  title: "DSO begär flexibilitetsresurser i nätområde",
  purpose: "För att kunna sätta begränsningar måste Nätägaren (DSO) veta vilka mätpunkter i deras nät som har aktiva flexibilitetsresurser.",
  actors: [
    { role: "Initiator", description: "Nätägare (DSO)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-401: DSO begär flexibilitetsresurser i nätområde
    participant DSO as Nätägare
    participant FIS as Flexibilitetsregistret

    DSO->>FIS: GetGridAreaResources (Nätområdes-ID)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Sök Aktiva Resurser (Mätpunkter)
        FIS-->>DSO: ShowResources (Nätområdes-ID, Lista [Mätpunkts-ID])
    else Validering Fel
        FIS-->>DSO: Error (Validation Failed)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX401-10", description: "DSO skickar förfrågan med Nätområdes-ID." },
    { id: "BRSFLEX401-11", description: "FIS validerar att nätområdet finns och att anropande DSO är registrerad ägare till detta." },
    { id: "BRSFLEX401-12", description: "FIS söker fram alla mätpunkter i detta område som har en aktiv resurskoppling." },
    { id: "BRSFLEX401-13", description: "FIS returnerar Nätområdes-ID och listan på mätpunkter till DSO." }
  ],
  preConditions: [
    { id: "BRSFLEX401-1", description: "En nätägare vill hämta lista på mätpunkter med aktiva resurser." }
  ],
  businessRules: [
    { id: "BRSFLEX401-7", description: "Angivet Nätområdes-ID måste existera i systemet.", errorCode: "E_401_GRID_AREA_NOT_FOUND" },
    { id: "BRSFLEX401-8", description: "Anropande DSO måste vara registrerad ägare av det angivna nätområdet.", errorCode: "E_401_UNAUTHORIZED_GRID_OWNER" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX401-2", description: "Lista på mätpunkter har returnerats." }
    ],
    rejected: [
      { id: "BRSFLEX401-3", description: "Åtkomst nekad eller ogiltigt ID, ingen data returnerad." }
    ]
  },
  infoObjects: [content401Input, content401Output]
};
