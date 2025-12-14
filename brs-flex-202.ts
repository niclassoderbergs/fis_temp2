
import { BRSData } from './types';
import { content202Input, content202Output } from './content-definitions';

export const brsFlex202: BRSData = {
  id: "BRS-FLEX-202",
  title: "SP avslutar Flexavtal",
  purpose: "SP avslutar sin tjänst för en CU (t.ex. vid avtalsslut med kund).",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-202: SP avslutar Flexavtal
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: TerminateFlexAgreement (Flexavtals-ID, CU-ID, Slutdatum)
    activate FIS
    FIS->>FIS: Validera affärsregler och behörighet
    
    alt Validering OK
        FIS->>FIS: Sätt slutdatum
        FIS-->>SP: Acknowledgement (CU-ID, Urspr. Startdatum)
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX202-12", description: "SP begär avslut av ett flexavtal och anger både Avtals-ID och CU-ID." },
    { id: "BRSFLEX202-13", description: "FIS validerar att båda ID:n existerar och att avtalet faktiskt hör till den angivna CU:n." },
    { id: "BRSFLEX202-14", description: "FIS validerar att anropande SP är registrerad part på avtalet." },
    { id: "BRSFLEX202-15", description: "FIS sätter slutdatum på avtalet." },
    { id: "BRSFLEX202-16", description: "FIS returnerar kvittens med registrerat slutdatum, CU-ID samt avtalets ursprungliga startdatum." }
  ],
  preConditions: [
    { id: "BRSFLEX202-1", description: "SP vill avsluta ett Flexavtal." }
  ],
  businessRules: [
    { id: "BRSFLEX202-6", description: "Angivet Flexibilitetsavtals-ID måste existera i FIS.", errorCode: "E_202_AGREEMENT_NOT_FOUND" },
    { id: "BRSFLEX202-7", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_202_CU_NOT_FOUND" },
    { id: "BRSFLEX202-8", description: "Angivet Flexibilitetsavtals-ID måste vara kopplat till angivet CU-ID.", errorCode: "E_202_MISMATCH_AGREEMENT_CU" },
    { id: "BRSFLEX202-9", description: "Avtalet måste vara aktivt.", errorCode: "E_202_ALREADY_INACTIVE" },
    { id: "BRSFLEX202-10", description: "Slutdatum måste anges.", errorCode: "E_202_MISSING_DATE" },
    { id: "BRSFLEX202-11", description: "SP måste vara registrerad på angivet Flexibilitetsavtals-ID.", errorCode: "E_202_UNAUTHORIZED" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX202-2", description: "Avtalet har satts att avslutas vid angivet datum." },
      { id: "BRSFLEX202-3", description: "Status kommer automatiskt bli Inactive efter slutdatum." },
      { id: "BRSFLEX202-4", description: "SP har mottagit en positiv kvittens inklusive CU-ID och ursprungligt startdatum." }
    ],
    rejected: [
      { id: "BRSFLEX202-5", description: "Ingen ändring har genomförts." }
    ]
  },
  infoObjects: [content202Input, content202Output]
};
