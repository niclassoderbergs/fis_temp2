
import { BRSData } from './types';
import { content7121Input, content7121Output } from './content-definitions';

export const brsFlex7121: BRSData = {
  id: "BRS-FLEX-7121",
  title: "FIS allokerar verifierad volym per Elleverantör",
  purpose: "En intern systemprocess för att fördela (allokera) den verifierade flexibilitetsvolymen på berörda Elleverantörer (Suppliers). Eftersom en aktivering av flexibilitet påverkar energivolymen för mätpunkten, behöver Elleverantören underlag för den ekonomiska kompensationen de kommer få.",
  actors: [
    { role: "Initiator", description: "System (Triggered by 7110)" },
    { role: "Utförare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-7121: Allokering för Kompensation (Leverantör)
    participant FIS as FIS Engine
    participant DB as Databas

    Note over FIS: Trigger: BRS-FLEX-7110 (Resultat klart)
    activate FIS
    FIS->>DB: Hämta Verifierat Resultat
    
    loop För varje CU
        FIS->>DB: Slå upp Mätpunkt
        FIS->>DB: Slå upp Elleverantör för Mätpunkt
        FIS->>FIS: Addera CU-volym till Leverantörs-total
    end

    FIS->>DB: Spara Kompensationsunderlag (Lev-ID, Summa Volym)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX7121-1", description: "Processen startar parallellt med BRS-FLEX-7120 när ett verifieringsresultat fastställts i 7110." },
    { id: "BRSFLEX7121-2", description: "FIS itererar genom alla ingående CUs." },
    { id: "BRSFLEX7121-3", description: "Systemet identifierar vilken Elleverantör (Electricity Supplier) som hade avtal för mätpunkten vid leveranstillfället." },
    { id: "BRSFLEX7121-4", description: "Volymerna aggregeras per unik Leverantör." },
    { id: "BRSFLEX7121-5", description: "Resultatet lagras som underlag för kompensationshantering." }
  ],
  preConditions: [
    { id: "BRSFLEX7121-PRE-1", description: "BRS-FLEX-7110 har exekverats." },
    { id: "BRSFLEX7121-PRE-2", description: "Relationer mellan Mätpunkter och Elleverantör finns i Master Data." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX7121-POST-1", description: "Underlag för kompensation är sparat." }
    ],
    rejected: [
      { id: "BRSFLEX7121-POST-2", description: "Allokering misslyckades." }
    ]
  },
  infoObjects: [content7121Input, content7121Output]
};
