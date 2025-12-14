
import { BRSData } from './types';
import { content204Input, content204Output } from './content-definitions';

export const brsFlex204: BRSData = {
  id: "BRS-FLEX-2040",
  title: "FIS avslutar Flexavtal",
  purpose: "Systemprocess där FIS tvingande avslutar ett flexavtal. Detta sker när förutsättningarna för avtalet inte längre gäller, till exempel om en annan SP registrerar ett avtal för samma resurs (Switch) eller om nätkunden flyttar ut (Move-out).",
  actors: [
    { role: "Initiator", description: "FIS (System) eller DHV" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-2040: FIS avslutar Flexavtal
    participant DHV as DHV
    participant FIS as Flexibilitetsregistret

    alt Switch (Konflikt vid nyreg.)
        FIS->>FIS: Detekterat överlapp från BRS-FLEX-201
    else Move-out (Kundflytt)
        DHV->>FIS: Signal om utflytt på Mätpunkt
    end

    activate FIS
    FIS->>FIS: Identifiera aktivt avtal
    FIS->>FIS: Sätt Slutdatum = Händelsedatum - 1 dag
    FIS->>FIS: Uppdatera status -> Inactive
    FIS->>FIS: Trigger BRS-FLEX-205 (Notify SP)
    FIS->>FIS: Trigger BRS-FLEX-1420 (Cleanup i portföljer)
    deactivate FIS`,
  process: [
    "Händelse initieras av en konflikt i BRS-FLEX-201 (ny registrering överlappar befintligt avtal) eller en signal från DHV om utflytt.",
    "FIS identifierar det pågående avtalet för den berörda CU:n.",
    "FIS sätter slutdatum på avtalet till dagen innan den nya händelsen träder i kraft.",
    "Avtalets status ändras till 'Inactive'.",
    "FIS triggar BRS-FLEX-205 för att notifiera den SP som förlorar avtalet.",
    "Processen triggar ofta en rensning av resursen från portföljer (se BRS-FLEX-1420)."
  ],
  preConditions: [
    "BRS-FLEX-201 exekveras OCH det finns ett redan aktivt flexavtal för CU:n vid startdatumet för det nya avtalet (Switch).",
    "ELLER Slutkunden har flyttat ut ifrån mätpunkten som CU är relaterad till (Signal från DHV)."
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRS-FLEX-2040-POST-1", description: "Det gamla avtalet har avslutats." },
      { id: "BRS-FLEX-2040-POST-2", description: "Notifieringsprocess (BRS-FLEX-205) har initierats." },
      { id: "BRS-FLEX-2040-POST-3", description: "Resursen är redo för rensning ur portföljer." }
    ],
    rejected: [
      { id: "BRS-FLEX-2040-POST-4", description: "Ingen åtgärd (om inget aktivt avtal fanns vid startpunkten)." }
    ]
  },
  infoObjects: [content204Input, content204Output]
};
