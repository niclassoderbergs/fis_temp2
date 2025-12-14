
import { BRSData } from './types';
import { content204Input, content204Output } from './content-definitions';

export const brsFlex2040: BRSData = {
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
    { id: "BRSFLEX2040-8", description: "Händelse initieras av en konflikt i BRS-FLEX-201 (ny registrering överlappar befintligt avtal) eller en signal från DHV om utflytt." },
    { id: "BRSFLEX2040-9", description: "FIS identifierar det pågående avtalet för den berörda CU:n." },
    { id: "BRSFLEX2040-10", description: "FIS sätter slutdatum på avtalet till dagen innan den nya händelsen träder i kraft." },
    { id: "BRSFLEX2040-11", description: "Avtalets status ändras till 'Inactive'." },
    { id: "BRSFLEX2040-12", description: "FIS triggar BRS-FLEX-205 för att notifiera den SP som förlorar avtalet." },
    { id: "BRSFLEX2040-13", description: "Processen triggar ofta en rensning av resursen från portföljer (se BRS-FLEX-1420)." }
  ],
  preConditions: [
    { id: "BRSFLEX2040-1", description: "BRS-FLEX-201 exekveras OCH det finns ett redan aktivt flexavtal för CU:n vid startdatumet för det nya avtalet (Switch)." },
    { id: "BRSFLEX2040-2", description: "ELLER Slutkunden har flyttat ut ifrån mätpunkten som CU är relaterad till (Signal från DHV)." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX2040-3", description: "Det gamla avtalet har avslutats." },
      { id: "BRSFLEX2040-4", description: "Notifieringsprocess (BRS-FLEX-205) har initierats." },
      { id: "BRSFLEX2040-5", description: "Resursen är redo för rensning ur portföljer." }
    ],
    rejected: [
      { id: "BRSFLEX2040-6", description: "Ingen åtgärd (om inget aktivt avtal fanns vid startpunkten)." }
    ]
  },
  infoObjects: [content204Input, content204Output]
};
