
import { BRSData } from './types';
import { content622Input, content622Output } from './content-definitions';

export const brsFlex622: BRSData = {
  id: "BRS-FLEX-622",
  title: "Begär mätpunkts-mätvärden",
  purpose: "Att hämta officiella mätvärden för en mätpunkt. Eftersom dessa värden ägs av nätägaren och lagras centralt, agerar FIS proxy och hämtar datan från DHV (Datahubben) innan den levereras till den som begärde informationen (t.ex. SP för avräkning eller verifiering).",
  actors: [
    { role: "Initiator", description: "SP eller System (FIS)" },
    { role: "Mellanhand", description: "FIS (Proxy)" },
    { role: "Källa", description: "DHV (Datahub)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-622: Begär mätpunkts-mätvärden
    participant Req as SP/System
    participant FIS as Flexibilitetsregistret
    participant DHV as Datahub (DHV)

    Req->>FIS: RequestMeterPointData (Mätpunkts-ID, Period)
    activate FIS
    FIS->>FIS: Validera behörighet (Ägarskap/Fullmakt)
    
    FIS->>DHV: GetMeasuredData (Mätpunkts-ID, Period)
    activate DHV
    DHV-->>FIS: MeasuredData (Värden, Kvalitet)
    deactivate DHV

    FIS-->>Req: MeterDataResponse (Värden, Kvalitet)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX622-1", description: "Aktör (SP eller intern process) begär mätvärden för en specifik mätpunkt och tidsperiod." },
    { id: "BRSFLEX622-2", description: "FIS validerar att den som frågar har rätt att se datan (t.ex. att SP har ett aktivt Flexavtal kopplat till mätpunkten)." },
    { id: "BRSFLEX622-3", description: "FIS ställer en fråga mot DHV:s API för att hämta datan." },
    { id: "BRSFLEX622-4", description: "DHV returnerar mätvärdesreserien." },
    { id: "BRSFLEX622-5", description: "FIS vidarebefordrar datan till anroparen." }
  ],
  preConditions: [
    { id: "BRSFLEX622-PRE-1", description: "Aktören har behörighet till mätpunkten." },
    { id: "BRSFLEX622-PRE-2", description: "Mätpunkten existerar i DHV." }
  ],
  businessRules: [
    { id: "BRSFLEX622-BR-1", description: "SP får endast hämta data för perioder där de har ett aktivt Flexavtal (BRS-FLEX-201).", errorCode: "E_622_UNAUTHORIZED_PERIOD" },
    { id: "BRSFLEX622-BR-2", description: "Om DHV inte svarar eller saknar data ska detta meddelas tydligt.", errorCode: "E_622_DHV_UNAVAILABLE" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX622-POST-1", description: "Mätdata från DHV har levererats till anroparen." }
    ],
    rejected: [
      { id: "BRSFLEX622-POST-2", description: "Ingen data levererad (behörighetsfel eller tekniskt fel mot DHV)." }
    ]
  },
  infoObjects: [content622Input, content622Output]
};
