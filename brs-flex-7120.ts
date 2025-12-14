
import { BRSData } from './types';
import { content7120Input, content7120Output } from './content-definitions';

export const brsFlex7120: BRSData = {
  id: "BRS-FLEX-7120",
  title: "FIS allokerar verifierad volym per BRP",
  purpose: "En intern systemprocess för att fördela (allokera) den verifierade flexibilitetsvolymen på berörda Balansansvariga (BRP). Syftet är att skapa underlag för obalansjustering (Imbalance Adjustment) så att BRP inte drabbas ekonomiskt för obalanser orsakade av flexibilitetsaktiveringar som de inte själva initierat.",
  actors: [
    { role: "Initiator", description: "System (Triggered by 7110)" },
    { role: "Utförare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-7120: Allokering för Obalansjustering (BRP)
    participant FIS as FIS Engine
    participant DB as Databas

    Note over FIS: Trigger: BRS-FLEX-7110 (Resultat klart)
    activate FIS
    FIS->>DB: Hämta Verifierat Resultat (CUs & Volymer)
    
    loop För varje CU
        FIS->>DB: Slå upp Mätpunkt
        FIS->>DB: Slå upp BRP för Mätpunkt (Master Data)
        FIS->>FIS: Addera CU-volym till BRP-total
    end

    FIS->>DB: Spara Obalansunderlag (BRP-ID, Summa Volym)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX7120-1", description: "Processen startar automatiskt när BRS-FLEX-7110 har fastställt ett verifieringsresultat." },
    { id: "BRSFLEX7120-2", description: "FIS hämtar listan på alla CUs som ingick i aktiveringen samt deras individuella bidrag till den totala verifierade volymen." },
    { id: "BRSFLEX7120-3", description: "Systemet identifierar vilken BRP som ansvarade för den kopplade mätpunkten vid leveranstillfället." },
    { id: "BRSFLEX7120-4", description: "Volymerna aggregeras per unikt BRP-ID." },
    { id: "BRSFLEX7120-5", description: "Resultatet lagras som 'Imbalance Adjustment Data' att skickas till Settlement (eSett)." }
  ],
  preConditions: [
    { id: "BRSFLEX7120-PRE-1", description: "BRS-FLEX-7110 har exekverats och resultatet är sparat." },
    { id: "BRSFLEX7120-PRE-2", description: "Relationer mellan Mätpunkter och BRP finns tillgängliga i Master Data." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX7120-POST-1", description: "Underlag för obalansjustering är sparat." }
    ],
    rejected: [
      { id: "BRSFLEX7120-POST-2", description: "Allokering misslyckades." }
    ]
  },
  infoObjects: [content7120Input, content7120Output]
};
