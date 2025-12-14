
import { BRSData } from './types';
import { content402Input, content402Output } from './content-definitions';

export const brsFlex402: BRSData = {
  id: "BRS-FLEX-402",
  title: "DSO registrerar Nätbegränsning",
  purpose: "Att registrera en tillfällig begränsning (tak eller golv för effekt) på en eller flera mätpunkter/CU:s för att undvika överlast i nätet (Temporary Limit).",
  actors: [
    { role: "Initiator", description: "Nätägare (DSO) eller TSO" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" },
    { role: "Mottagare", description: "SP - via notifiering" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-402: DSO registrerar Nätbegränsning
    participant DSO as Nätägare
    participant FIS as Flexibilitetsregistret
    participant SP as SP

    DSO->>FIS: RegisterConstraint (Lista IDn, Period, Limit)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Spara Begränsning
        FIS->>SP: Notify (Constraint Activated)
        FIS-->>DSO: Ack
    else Validering Fel
        FIS-->>DSO: Error (Validation Failed)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX402-10", description: "DSO/TSO identifierar behov av begränsning och skickar begäran till FIS." },
    { id: "BRSFLEX402-11", description: "FIS validerar att mätpunkterna tillhör aktörens nätområde." },
    { id: "BRSFLEX402-12", description: "FIS lagrar begränsningen (Tidsperiod, Max/Min effekt)." },
    { id: "BRSFLEX402-13", description: "FIS notifierar berörda SP om att deras resurser är begränsade." }
  ],
  preConditions: [
    { id: "BRSFLEX402-1", description: "Nätägare/TSO vill registrera en nätbegränsning." }
  ],
  businessRules: [
    { id: "BRSFLEX402-6", description: "Resurserna måste finnas och vara aktiva.", errorCode: "E_402_NOT_FOUND" },
    { id: "BRSFLEX402-7", description: "Mätpunkterna måste tillhöra Nätägarens område (valideras mot ägarskap i Master Data).", errorCode: "E_402_WRONG_GRID_AREA" },
    { id: "BRSFLEX402-8", description: "Begränsningen måste innehålla tidsperiod (Start/Slut) samt effektvärde och riktning.", errorCode: "E_402_INVALID_DATA" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX402-2", description: "Begränsning har sparats i systemet." },
      { id: "BRSFLEX402-3", description: "Berörda SP har notifierats." },
      { id: "BRSFLEX402-4", description: "Nätägaren/TSO har mottagit en positiv kvittens." }
    ],
    rejected: [
      { id: "BRSFLEX402-5", description: "Ingen begränsning sparad." }
    ]
  },
  infoObjects: [content402Input, content402Output]
};
