
import { BRSData } from '../../types';
import { content811Output } from '../../content-definitions';

export const brsFlex811: BRSData = {
  id: "BRS-FLEX-811",
  title: "Avregistrering av SP (Tvingande)",
  purpose: "Att permanent ta bort en SP från marknaden på initiativ av systemägaren (t.ex. vid konkurs eller grovt avtalsbrott). Alla kopplingar avslutas.",
  actors: [
    { role: "Initiator", description: "FIS Admin" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-811: Tvingande avregistrering
    participant Admin as FIS Admin
    participant FIS as FIS
    participant SP as SP

    Admin->>FIS: ForceTerminateActor (SP-ID)
    activate FIS
    FIS->>FIS: Säg upp alla Flexavtal (Trigger BRS-FLEX-2040)
    FIS->>FIS: Ta bort alla bud
    FIS->>FIS: Sätt status 'Terminated'
    FIS->>SP: NotifyTermination (Orsak)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX811-1", description: "Beslut om permanent uteslutning har fattats." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX811-2", description: "SP-kontot är avslutat och alla underliggande objekt städade." }
    ],
    rejected: [
      { id: "BRSFLEX811-3", description: "Fel vid terminering." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX811-4", description: "Åtgärden är irreversibel via API (kräver databasåtgärd för att häva).", errorCode: "W_811_IRREVERSIBLE" }
  ],
  process: [
    { id: "BRSFLEX811-5", description: "Admin initierar tvingande avslut." },
    { id: "BRSFLEX811-6", description: "FIS stänger alla relationer och terminerar kontot." }
  ],
  infoObjects: [content811Output]
};
