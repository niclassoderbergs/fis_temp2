
import { BRSData } from '../../types';
import { content402Input, content402Output } from '../../content-definitions';

export const brsFlex402: BRSData = {
  id: "BRS-FLEX-402",
  title: "DSO registrerar Nätbegränsning",
  purpose: "Att registrera en tillfällig begränsning (tak eller golv för effekt) på en eller flera mätpunkter/CU:s för att undvika överlast i nätet (Temporary Limit).",
  actors: [
    { role: "Initiator", description: "Nätägare (DSO) eller TSO" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-402: DSO registrerar Nätbegränsning
    participant DSO as DSO
    participant FIS as FIS

    DSO->>FIS: RegisterConstraint (Lista IDn, Period, Limit)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Spara Begränsning
        FIS-->>DSO: Ack
    else Validering Fel
        FIS-->>DSO: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX402-1", description: "En nätägare (DSO) eller systemoperatör (TSO) har registrerat en nätbegränsning." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX402-2", description: "FIS har registrerat nätbegränsningen." },
      { id: "BRSFLEX402-3", description: "Aktören (DSO/TSO) har mottagit kvittens på registreringen." }
    ],
    rejected: [
      { id: "BRSFLEX402-4", description: "Ingen begränsning sparad." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX402-5", description: "Resurserna måste finnas och vara aktiva.", errorCode: "E_402_NOT_FOUND" },
    { id: "BRSFLEX402-6", description: "Mätpunkterna måste tillhöra Nätägarens område (valideras mot ägarskap i Master Data).", errorCode: "E_402_WRONG_GRID_AREA" },
    { id: "BRSFLEX402-7", description: "Begränsningen måste innehålla tidsperiod (Start/Slut) samt effektvärde och riktning.", errorCode: "E_402_INVALID_DATA" }
  ],
  process: [
    { id: "BRSFLEX402-8", description: "Nätägaren (DSO) eller Systemoperatören (TSO) registrerar en nätbegränsning för en eller flera resurser." },
    { id: "BRSFLEX402-9", description: "Flexibilitetsregistret bekräftar registreringen till aktören." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX402-10", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content402Input, content402Output]
};
