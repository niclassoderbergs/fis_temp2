
import { BRSData } from './types';
import { content7011Input, content7011Output } from './content-definitions';

export const brsFlex7011: BRSData = {
  id: "BRS-FLEX-7011",
  title: "FIS kontrollerar budets kapacitet",
  purpose: "En intern kontrolltjänst för att validera om ett inkommet bud har teknisk täckning. Tjänsten beräknar den aggregerade kapaciteten av bakomliggande CUs och validerar detta mot budad volym samt kontrollerar att inga nätbegränsningar hindrar leveransen.",
  actors: [
    { role: "Initiator", description: "System" },
    { role: "Utförare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-7011: FIS kontrollerar budets kapacitet
    participant FIS as FIS Engine
    participant DB as Databas

    activate FIS
    Note over FIS: Trigger: Nytt bud inkommit
    
    FIS->>DB: Hämta ingående CUs för Budobjektet
    FIS->>DB: Kontrollera Nätbegränsningar (402)
    FIS->>FIS: Beräkna Aggregerad Kapacitet
    FIS->>FIS: Validera Kapacitet vs Budvolym
    FIS->>DB: Spara Kapacitetsresultat
    
    deactivate FIS`,
  process: [
    { id: "BRSFLEX7011-1", description: "Processen initieras automatiskt när ett nytt bud har sparats i systemet, antingen via BRS-FLEX-701 (TSO) eller BRS-FLEX-702 (DSO)." },
    { id: "BRSFLEX7011-2", description: "FIS identifierar alla CUs som är kopplade till det angivna budobjektet." },
    { id: "BRSFLEX7011-3", description: "FIS hämtar aktiva nätbegränsningar (från BRS-FLEX-402) som påverkar de ingående resurserna." },
    { id: "BRSFLEX7011-4", description: "FIS beräknar den tillgängliga aggregerade kapaciteten (summan av CUs minus eventuella begränsningar)." },
    { id: "BRSFLEX7011-5", description: "FIS jämför tillgänglig kapacitet mot den budade volymen. Om kapaciteten är lägre markeras budet som 'Invalid', annars 'Valid'." },
    { id: "BRSFLEX7011-6", description: "Resultatet sparas på budobjektet." }
  ],
  preConditions: [
    { id: "BRSFLEX7011-PRE-1", description: "Ett TSO-bud har registrerats via BRS-FLEX-701." },
    { id: "BRSFLEX7011-PRE-2", description: "ELLER ett DSO-bud har registrerats via BRS-FLEX-702." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX7011-POST-1", description: "Kapacitetskontroll är utförd och resultat sparat." }
    ],
    rejected: [
      { id: "BRSFLEX7011-POST-2", description: "Tekniskt fel vid beräkning (loggas)." }
    ]
  },
  infoObjects: [content7011Input, content7011Output]
};
