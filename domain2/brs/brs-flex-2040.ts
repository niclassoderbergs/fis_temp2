
import { BRSData } from '../../types';
import { content204Input, content204Output } from '../../content-definitions';

export const brsFlex2040: BRSData = {
  id: "BRS-FLEX-2040",
  title: "FIS avslutar Flexavtal",
  purpose: "Att automatiskt stänga flexibilitetsavtal som inte längre är giltiga på grund av ändrade förutsättningar (t.ex. flytt eller leverantörsbyte), för att förhindra felaktig handel.",
  actors: [
    { role: "Initiator", description: "FIS (System) eller DHV" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-2040: FIS avslutar Flexavtal
    participant DHV as DHV
    participant FIS as FIS

    Note over FIS: Trigger: Konfliktande avtal (201) eller Utflytt (DHV)

    alt Switch (Konflikt vid nyreg.)
        FIS->>FIS: Detekterat överlapp från BRS-FLEX-201
    else Move-out (Kundflytt)
        DHV->>FIS: Signal om utflytt på Mätpunkt
    end

    activate FIS
    FIS->>FIS: Identifiera aktivt avtal
    FIS->>FIS: Sätt Slutdatum = Händelsedatum - 1 dag
    FIS->>FIS: Uppdatera status -> Inactive
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX2040-1", description: "Ett nytt flexibilitetsavtal har registrerats (via BRS-FLEX-201) och det fanns redan ett aktivt flexibilitetsavtal för CU." },
    { id: "BRSFLEX2040-2", description: "DHV har notifierat att slutkunden har flyttat ut ifrån en mätpunkt där det finns ett aktivt flexibilitetsavtal." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX2040-3", description: "FIS har avslutat flexibilitetsavtalet." }
    ],
    rejected: [
      { id: "BRSFLEX2040-4", description: "Ingen åtgärd (om inget aktivt avtal fanns vid startpunkten)." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX2040-5", description: "Flexibilitetsregistret avslutar ett flexibilitetsavtal på grund av extern händelse (t.ex. kundflytt eller leverantörsbyte)." },
    { id: "BRSFLEX2040-6", description: "Flexibilitetsregistret initierar notifiering till berörd SP." }
  ],
  infoObjects: [content204Input, content204Output]
};
