
import { BRSData } from './types';
import { content301Input, content301Output } from './content-definitions';

export const brsFlex301: BRSData = {
  id: "BRS-FLEX-301",
  title: "TSO registrerar marknadsprodukt",
  purpose: "Att definiera en ny marknadsprodukt (t.ex. mFRR, FCR) i systemet med tillhörande tekniska krav och attribut. Detta möjliggör för SP att ansöka om kvalificering mot denna produkt.",
  actors: [
    { role: "Initiator", description: "Systemoperatör (TSO)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-301: TSO registrerar marknadsprodukt
    participant TSO as Systemoperatör
    participant FIS as Flexibilitetsregistret

    TSO->>FIS: RegisterProduct (Namn, Attribut, Krav)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Skapa Produktdefinition
        FIS-->>TSO: ProductRegistered (Produkt-ID)
    else Validering Fel
        FIS-->>TSO: Error (Validation Failed)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX301-10", description: "TSO definierar en ny produkt med specifika attribut (t.ex. upplösning, riktning, gate closure)." },
    { id: "BRSFLEX301-11", description: "FIS validerar att produktnamnet är unikt." },
    { id: "BRSFLEX301-12", description: "FIS sparar produkten i masterdata." },
    { id: "BRSFLEX301-13", description: "Produkten blir tillgänglig för kvalificering (BRS-FLEX-311)." }
  ],
  preConditions: [
    { id: "BRSFLEX301-1", description: "TSO vill introducera en ny produkt på marknaden." }
  ],
  businessRules: [
    { id: "BRSFLEX301-6", description: "Produktnamn måste vara unikt.", errorCode: "E_301_DUPLICATE_NAME" },
    { id: "BRSFLEX301-7", description: "Tidsupplösning måste vara giltig (t.ex. 15, 60 min).", errorCode: "E_301_INVALID_RESOLUTION" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX301-2", description: "Ny produkt är registrerad och aktiv." }
    ],
    rejected: [
      { id: "BRSFLEX301-3", description: "Ingen produkt skapad." }
    ]
  },
  infoObjects: [content301Input, content301Output]
};
