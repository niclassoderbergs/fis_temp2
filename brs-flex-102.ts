
import { BRSData } from './types';
import { content102Input } from './content-definitions';

export const brsFlex102: BRSData = {
  id: "BRS-FLEX-102",
  title: "SP uppdaterar en CU",
  purpose: "Processen används för att uppdatera stamdata för en befintlig Styrbar Enhet (CU). Detta säkerställer att registret speglar verkligheten vid förändringar (t.ex. utökad effekt).",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-102: SP uppdaterar en CU
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: UpdateControllableUnit (CU-ID, MP-ID, Attribut)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Skapa ny version av CU
        FIS-->>SP: UpdateAcknowledgement (Kvittens)
    else Validering Fel
        FIS-->>SP: Felmeddelande (Error)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX102-11", description: "SP skickar meddelandet UpdateControllableUnit med CU-ID, Mätpunkts-ID och ändrade attribut samt datum för ikraftträdande." },
    { id: "BRSFLEX102-12", description: "FIS identifierar objektet baserat på ID." },
    { id: "BRSFLEX102-13", description: "FIS verifierar att angivet Mätpunkts-ID överensstämmer med det som är registrerat på CU:n." },
    { id: "BRSFLEX102-14", description: "FIS validerar ägarskap (att anropande SP äger resursen)." },
    { id: "BRSFLEX102-15", description: "FIS validerar tidsfrister enligt DR NC." },
    { id: "BRSFLEX102-16", description: "Om godkänt, versionshanteras objektet och de nya värdena sparas." },
    { id: "BRSFLEX102-17", description: "FIS skickar kvittens till SP." }
  ],
  preConditions: [
    { id: "BRSFLEX102-1", description: "SP vill uppdatera attribut på en befintlig CU." }
  ],
  businessRules: [
    { id: "BRSFLEX102-7", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_102_CU_NOT_FOUND" },
    { id: "BRSFLEX102-8", description: "Angivet Mätpunkts-ID måste matcha det som är kopplat till CU:n (extra verifiering).", errorCode: "E_102_MP_MISMATCH" },
    { id: "BRSFLEX102-9", description: "Uppdateringar som påverkar kvalificering måste ha ett ValidityStart minst 10 dagar framåt i tiden (DR NC Art 22(1)).", errorCode: "E_102_TIME_CONSTRAINT" },
    { id: "BRSFLEX102-10", description: "Det är inte tillåtet att ändra kopplat Mätpunkts-ID via denna process.", errorCode: "E_102_MPID_IMMUTABLE" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX102-2", description: "CU-posten har uppdaterats med en ny version." },
      { id: "BRSFLEX102-3", description: "Versionshistorik har sparats i systemet." },
      { id: "BRSFLEX102-4", description: "SP har mottagit en positiv kvittens." }
    ],
    rejected: [
      { id: "BRSFLEX102-5", description: "Inga ändringar har gjorts på CU-objektet." },
      { id: "BRSFLEX102-6", description: "Felmeddelande har skickats till SP." }
    ]
  },
  infoObjects: [content102Input]
};
