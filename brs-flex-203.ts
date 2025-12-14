
import { BRSData } from './types';
import { content203Input, content203Output } from './content-definitions';

export const brsFlex203: BRSData = {
  id: "BRS-FLEX-203",
  title: "SP uppdaterar Flexavtal",
  purpose: "Att ändra administrativa detaljer på kopplingen, t.ex. förlänga giltighetstid.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-203: SP uppdaterar Flexavtal
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: UpdateFlexAgreement (Data)
    activate FIS
    FIS->>FIS: Uppdatera information
    FIS-->>SP: OK
    deactivate FIS`,
  process: [
    { id: "BRSFLEX203-8", description: "SP skickar uppdaterad information." },
    { id: "BRSFLEX203-9", description: "FIS sparar ändringarna." }
  ],
  preConditions: [
    { id: "BRSFLEX203-1", description: "SP vill uppdatera ett Flexavtal." }
  ],
  businessRules: [
    { id: "BRSFLEX203-6", description: "Angivet Flexibilitetsavtals-ID måste existera i FIS.", errorCode: "E_203_NOT_FOUND" },
    { id: "BRSFLEX203-7", description: "Endast administrativa detaljer får ändras (t.ex. Giltighetstid).", errorCode: "-" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX203-2", description: "Informationen har uppdaterats." },
      { id: "BRSFLEX203-3", description: "SP har mottagit en positiv kvittens." }
    ],
    rejected: [
      { id: "BRSFLEX203-4", description: "Inga ändringar har sparats." }
    ]
  },
  infoObjects: [content203Input, content203Output]
};
