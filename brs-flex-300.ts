
import { BRSData } from './types';
import { content301Input as content300Input, content301Output as content300Output } from './content-definitions';

export const brsFlex300: BRSData = {
  id: "BRS-FLEX-300",
  title: "TSO registrerar Produkt",
  purpose: "Att definiera en ny marknadsprodukt (t.ex. mFRR, FCR) i systemet med tillhörande tekniska krav och attribut. Detta möjliggör för SP att ansöka om kvalificering mot denna produkt.",
  actors: [
    { role: "Initiator", description: "Systemoperatör (TSO)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-300: TSO registrerar Produkt
    participant TSO as Systemoperatör
    participant FIS as Flexibilitetsregistret

    TSO->>FIS: RegisterProduct (Namn, Attribut, Krav)
    activate FIS
    FIS->>FIS: Validera unicitet
    FIS->>FIS: Skapa Produktdefinition
    FIS-->>TSO: ProductRegistered (Produkt-ID)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX300-10", description: "TSO definierar en ny produkt med specifika attribut (t.ex. upplösning, riktning, gate closure)." },
    { id: "BRSFLEX300-11", description: "FIS validerar att produktnamnet är unikt." },
    { id: "BRSFLEX300-12", description: "FIS sparar produkten i masterdata." },
    { id: "BRSFLEX300-13", description: "Produkten blir tillgänglig för kvalificering (BRS-FLEX-301)." }
  ],
  preConditions: [
    { id: "BRSFLEX300-1", description: "TSO vill introducera en ny produkt på marknaden." }
  ],
  businessRules: [
    { id: "BRSFLEX300-6", description: "Produktnamn måste vara unikt.", errorCode: "E_300_DUPLICATE_NAME" },
    { id: "BRSFLEX300-7", description: "Tidsupplösning måste vara giltig (t.ex. 15, 60 min).", errorCode: "E_300_INVALID_RESOLUTION" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX300-2", description: "Ny produkt är registrerad och aktiv." }
    ],
    rejected: [
      { id: "BRSFLEX300-3", description: "Ingen produkt skapad." }
    ]
  },
  infoObjects: [content300Input, content300Output]
};