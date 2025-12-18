
import React from 'react';
import { brsList } from './data';

interface ProcedureDef {
  id: number;
  name: string;
  desc: string;
  brs: string[];
}

// "Sanningen" om vad som faktiskt är kodat/importerat i respektive JWGProcedure-fil.
// Detta används för att kontrollera integriteten mot listan nedan.
const implementationMap: Record<number, string[]> = {
  1: ["BRS-FLEX-103"],
  2: ["BRS-FLEX-101"],
  3: ["BRS-FLEX-102", "BRS-FLEX-1040"],
  4: ["BRS-FLEX-102"], // Detaljsidan implementerar 102, men processen kanske kräver 1040 också?
  5: ["BRS-FLEX-104"],
  6: ["BRS-FLEX-105", "BRS-FLEX-106", "BRS-FLEX-107"],
  7: ["BRS-FLEX-801"],
  8: ["BRS-FLEX-802"],
  9: ["BRS-FLEX-208", "BRS-FLEX-205"],
  10: ["BRS-FLEX-202"],
  11: ["BRS-FLEX-201"],
  12: ["BRS-FLEX-207"], // Hävning
  13: ["BRS-FLEX-803"],
  14: ["BRS-FLEX-803"],
  15: ["BRS-FLEX-804"],
  16: ["BRS-FLEX-810"],
  17: ["BRS-FLEX-811"],
  18: ["BRS-FLEX-812"],
  19: ["BRS-FLEX-321"],
  20: ["BRS-FLEX-312"],
  21: ["BRS-FLEX-714"],
  22: ["BRS-FLEX-110"],
  23: ["BRS-FLEX-112"],
  24: ["BRS-FLEX-113"],
  25: ["BRS-FLEX-311"],
  26: ["BRS-FLEX-114"],
  27: ["BRS-FLEX-115"],
  28: ["BRS-FLEX-116"],
  29: ["BRS-FLEX-701"],
  30: ["BRS-FLEX-402"],
  31: ["BRS-FLEX-511"],
  32: ["BRS-FLEX-603"],
  33: ["BRS-FLEX-6110"],
  34: ["BRS-FLEX-5210"]
};

const procedures: ProcedureDef[] = [
  { 
    id: 1, 
    name: "Generell åtkomst till CU-stamdata", 
    desc: "En berättigad part begär att få hämta masterdata för de styrbara enheter (CU) de har rättighet till.",
    brs: ["BRS-FLEX-103"]
  },
  { 
    id: 2, 
    name: "Registrering av Styrbar Enhet (CU)", 
    desc: "Registreringsansvarig lägger upp en ny CU i systemet (inklusive koppling till mätpunkt).",
    brs: ["BRS-FLEX-101"]
  },
  { 
    id: 3, 
    name: "Uppdatering av CU-information", 
    desc: "Uppdatering av attribut på en befintlig CU (t.ex. teknisk kapacitet).",
    brs: ["BRS-FLEX-102", "BRS-FLEX-1040"]
  },
  { 
    id: 4, 
    name: "Avregistrering av Styrbar Enhet (CU)", 
    desc: "En CU tas bort permanent ur systemet.",
    brs: ["BRS-FLEX-102", "BRS-FLEX-1040"]
  },
  { 
    id: 5, 
    name: "Suspendering av CU (av berättigad part)", 
    desc: "En systemoperatör eller annan part tvingar fram en \"paus\" för en resurs (t.ex. vid tekniska fel).",
    brs: ["BRS-FLEX-104"]
  },
  { 
    id: 6, 
    name: "Återaktivering av Styrbar Enhet (CU)", 
    desc: "En suspenderad CU återaktiveras för att kunna delta på marknaden igen.",
    brs: ["BRS-FLEX-102", "BRS-FLEX-1040"]
  },
  { 
    id: 7, 
    name: "Registrering av Tjänsteleverantör (SP)", 
    desc: "En ny SP registrerar sig i systemet för att få åtkomst (skapa konto/identitet).",
    brs: ["BRS-FLEX-801"]
  },
  { 
    id: 8, 
    name: "SP-ansökan om kvalificering", 
    desc: "SP ansöker om att bli godkänd leverantör för en viss produkt eller marknad.",
    brs: ["BRS-FLEX-802"]
  },
  { 
    id: 9, 
    name: "Återkallelse av serviceavtal (av Slutkund)", 
    desc: "Slutkunden avslutar avtalet med sin SP (vilket tar bort SP:ns rätt till CU:n).",
    brs: ["BRS-FLEX-208", "BRS-FLEX-205"]
  },
  { 
    id: 10, 
    name: "Uppsägning av serviceavtal (av SP)", 
    desc: "Tjänsteleverantören avslutar avtalet med slutkunden.",
    brs: ["BRS-FLEX-202"]
  },
  { 
    id: 11, 
    name: "Byte av SP eller nyregistrering på CU", 
    desc: "\"Switching\"-processen. En ny SP tar över en CU från en gammal SP (eller nyteckning).",
    brs: ["BRS-FLEX-201", "BRS-FLEX-2040"]
  },
  { 
    id: 12, 
    name: "Annullering av SP-registrering på CU", 
    desc: "Den nya SP:n eller kunden ångrar bytet/registreringen innan startdatumet har infallit.",
    brs: ["BRS-FLEX-207"] // Här kan man testa att byta till 202 för att se varningen
  },
  { 
    id: 13, 
    name: "Uppdatering av SP-profilinformation", 
    desc: "SP uppdaterar enkel information (adress, kontaktuppgifter) som inte kräver om-kvalificering.",
    brs: ["BRS-FLEX-803"]
  },
  { 
    id: 14, 
    name: "Uppdatering av kritisk SP-information", 
    desc: "SP uppdaterar kritisk data som kan kräva att kvalificeringen prövas på nytt.",
    brs: ["BRS-FLEX-803", "BRS-FLEX-802"]
  },
  { 
    id: 15, 
    name: "Avregistrering av Tjänsteleverantör (SP)", 
    desc: "SP:n lämnar marknaden helt och tas bort ur systemet. Alla resurser kopplas loss.",
    brs: ["BRS-FLEX-804", "BRS-FLEX-811"]
  },
  { 
    id: 16, 
    name: "Suspendering av SP-kvalificering", 
    desc: "Systemoperatören (TSO/DSO) stänger tillfälligt av en SP (t.ex. pga regelbrott).",
    brs: ["BRS-FLEX-810"]
  },
  { 
    id: 17, 
    name: "Återkallelse av Tjänsteleverantör (Revocation)", 
    desc: "Systemoperatören drar permanent in SP:ns godkännande (tvingande avslut).",
    brs: ["BRS-FLEX-811"]
  },
  { 
    id: 18, 
    name: "Återaktivering av Tjänsteleverantör", 
    desc: "SP får tillbaka sin status som \"Aktiv\" efter en suspendering.",
    brs: ["BRS-FLEX-812"]
  },
  { 
    id: 19, 
    name: "Nät-förkvalificering av SPU eller SPG", 
    desc: "Process för att kontrollera att resursgruppen inte orsakar nätproblem (DSO-koordinering).",
    brs: ["BRS-FLEX-321", "BRS-FLEX-322", "BRS-FLEX-323", "BRS-FLEX-324"]
  },
  { 
    id: 20, 
    name: "Produkt-förkvalificering (SPU/SPG)", 
    desc: "Teknisk test och godkännande av en resursgrupp för en specifik produkt (t.ex. FCR/mFRR).",
    brs: ["BRS-FLEX-311", "BRS-FLEX-312", "BRS-FLEX-313", "BRS-FLEX-314"]
  },
  { 
    id: 21, 
    name: "Produktverifiering (SPU/SPG)", 
    desc: "Verifiering i efterhand (ex-post) att leveransen faktiskt skedde korrekt.",
    brs: ["BRS-FLEX-7110", "BRS-FLEX-714", "BRS-FLEX-715"]
  },
  { 
    id: 22, 
    name: "Registrering av SPU eller SPG", 
    desc: "SP skapar en ny Providing Unit (Enhet) eller Providing Group (Grupp) i portföljen.",
    brs: ["BRS-FLEX-110", "BRS-FLEX-120"]
  },
  { 
    id: 23, 
    name: "Uppdatering av SPU eller SPG", 
    desc: "Ändring av data för en befintlig portfölj/resursgrupp.",
    brs: ["BRS-FLEX-112", "BRS-FLEX-122"]
  },
  { 
    id: 24, 
    name: "Avregistrering av SPU eller SPG", 
    desc: "SP tar bort en portfölj/resursgrupp ur systemet.",
    brs: ["BRS-FLEX-113", "BRS-FLEX-123"]
  },
  { 
    id: 25, 
    name: "Produktansökan för SPU/SPG", 
    desc: "SP ansöker om att få använda en specifik SPU/SPG på en specifik marknad.",
    brs: ["BRS-FLEX-311"]
  },
  { 
    id: 26, 
    name: "Suspendering av SPU eller SPG", 
    desc: "Systemoperatören pausar en specifik resursgrupp (t.ex. pga upprepade felbud).",
    brs: ["BRS-FLEX-114", "BRS-FLEX-124"]
  },
  { 
    id: 27, 
    name: "Återaktivering av SPU eller SPG", 
    desc: "Resursgruppen öppnas upp för handel igen efter suspendering.",
    brs: ["BRS-FLEX-115", "BRS-FLEX-125"]
  },
  { 
    id: 28, 
    name: "Generell åtkomst till SPU/SPG-stamdata", 
    desc: "Berättigad part hämtar teknisk data om en SPU eller SPG.",
    brs: ["BRS-FLEX-116", "BRS-FLEX-126"]
  },
  { 
    id: 29, 
    name: "Budgivning och aktivering", 
    desc: "Processen för att skicka in bud och ta emot aktiveringssignaler (Market dispatch).",
    brs: ["BRS-FLEX-701", "BRS-FLEX-702", "BRS-FLEX-711", "BRS-FLEX-712", "BRS-FLEX-713"]
  },
  { 
    id: 30, 
    name: "Tillfälliga begränsningar (Temporary limits)", 
    desc: "Nätägare sätter tillfälliga restriktioner (t.ex. \"Max 0 MW\") pga driftläge i nätet.",
    brs: ["BRS-FLEX-402", "BRS-FLEX-403"]
  },
  { 
    id: 31, 
    name: "Hantering av baslinjedata", 
    desc: "Process för att beräkna och distribuera baslinjen (vad förbrukningen hade varit utan aktivering).",
    brs: ["BRS-FLEX-501", "BRS-FLEX-511", "BRS-FLEX-512", "BRS-FLEX-522"]
  },
  { 
    id: 32, 
    name: "Tillgängliggörande av mätdata", 
    desc: "Process för att hämta in mätvärden från Datahub, Sub-meters eller beräknad data.",
    brs: ["BRS-FLEX-601", "BRS-FLEX-602", "BRS-FLEX-603", "BRS-FLEX-622"]
  },
  { 
    id: 33, 
    name: "Kvantifiering", 
    desc: "Beräkning av levererad volym (Skillnaden mellan Baslinje och Mätvärde).",
    brs: ["BRS-FLEX-6110", "BRS-FLEX-611", "BRS-FLEX-612"]
  },
  { 
    id: 34, 
    name: "(Valfri) Validering av baslinje", 
    desc: "En extra process för att kontrollera att baslinjen är korrekt beräknad.",
    brs: ["BRS-FLEX-5210"]
  }
];

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#fff',
    minHeight: '100%',
    boxSizing: 'border-box' as const
  },
  header: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '8px',
    color: '#172b4d'
  },
  subHeader: {
    fontSize: '1.1rem',
    color: '#5e6c84',
    marginBottom: '32px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    fontSize: '0.9rem',
    border: '1px solid #dfe1e6'
  },
  th: {
    backgroundColor: '#f4f5f7',
    color: '#172b4d',
    padding: '12px 16px',
    textAlign: 'left' as const,
    borderBottom: '2px solid #dfe1e6',
    fontWeight: 600,
    position: 'sticky' as const,
    top: 0
  },
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #dfe1e6',
    verticalAlign: 'top' as const,
    color: '#172b4d',
    lineHeight: '1.5'
  },
  trEven: {
    backgroundColor: '#fafbfc'
  },
  idCell: {
    fontWeight: 700,
    color: '#42526e',
    width: '50px',
    textAlign: 'center' as const
  },
  brsTag: {
    display: 'inline-block',
    backgroundColor: '#e6effc',
    color: '#0052cc',
    borderRadius: '3px',
    padding: '2px 6px',
    margin: '0',
    fontSize: '0.8rem',
    fontWeight: 500,
    cursor: 'pointer',
    border: '1px solid #b3d4ff'
  },
  missingTag: {
    display: 'inline-block',
    color: '#bf2600',
    fontStyle: 'italic',
    fontSize: '0.8rem'
  },
  viewButton: {
    backgroundColor: '#0052cc',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    padding: '4px 8px',
    fontSize: '0.8rem',
    cursor: 'pointer',
    marginTop: '4px'
  },
  warning: {
    display: 'inline-flex',
    alignItems: 'center',
    marginLeft: '8px',
    color: '#bf2600',
    fontSize: '0.9rem',
    cursor: 'help'
  }
};

interface ProceduresPageProps {
  onNavigateToBRS: (id: string) => void;
  onNavigateToProcedure?: (id: number) => void;
}

export const ProceduresPage: React.FC<ProceduresPageProps> = ({ onNavigateToBRS, onNavigateToProcedure }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>JWG Annex - Processlista</h1>
      <p style={styles.subHeader}>
        Nedan listas de identifierade processerna från "Implementing Regulation on interoperability requirements and non-discriminatory and transparent procedures for access to and exchange of data for demand response" och deras koppling till FIS BRS-dokumentation.
      </p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nr</th>
            <th style={styles.th}>Processnamn</th>
            <th style={styles.th}>Beskrivning / Händelse</th>
            <th style={{...styles.th, width: '35%'}}>Kopplad BRS</th>
          </tr>
        </thead>
        <tbody>
          {procedures.map((proc, index) => {
            // Kontrollera om listan matchar implementationen
            const declaredBRS = proc.brs || [];
            const implementedBRS = implementationMap[proc.id] || [];
            
            // Hitta skillnader
            const missingInImplementation = declaredBRS.filter(x => !implementedBRS.includes(x));
            const missingInList = implementedBRS.filter(x => !declaredBRS.includes(x));
            
            // Flagga om det finns skillnader, men ignorera om implementationMap är tom (t.ex. för processer > 34 om de fanns)
            const hasMismatch = (missingInImplementation.length > 0 || missingInList.length > 0) && implementedBRS.length > 0;
            
            const warningTooltip = hasMismatch 
                ? `Mismatch detected!\nListed but missing in code: ${missingInImplementation.join(', ') || 'None'}\nFound in code but missing in list: ${missingInList.join(', ') || 'None'}`
                : '';

            return (
                <tr key={proc.id} style={index % 2 === 1 ? styles.trEven : {}}>
                <td style={{...styles.td, ...styles.idCell}}>{proc.id}</td>
                <td style={{...styles.td, fontWeight: 600, width: '25%'}}>
                    {proc.name}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34].includes(proc.id) && onNavigateToProcedure && (
                    <div>
                        <button 
                        style={styles.viewButton} 
                        onClick={() => onNavigateToProcedure(proc.id)}
                        >
                        Se detaljer
                        </button>
                    </div>
                    )}
                </td>
                <td style={styles.td}>{proc.desc}</td>
                <td style={styles.td}>
                    {declaredBRS.length > 0 ? (
                    declaredBRS.map(brsId => {
                        const brsObj = brsList.find(b => b.id === brsId);
                        return (
                            <div key={brsId} style={{marginBottom: '8px'}}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <span 
                                    style={styles.brsTag}
                                    onClick={() => onNavigateToBRS(brsId)}
                                    title={`Gå till ${brsId}`}
                                    >
                                    {brsId}
                                    </span>
                                </div>
                                {brsObj && (
                                    <div style={{fontSize: '0.75rem', color: '#666', marginTop: '2px', paddingLeft: '2px'}}>
                                        {brsObj.title}
                                    </div>
                                )}
                            </div>
                        );
                    })
                    ) : (
                    <span style={styles.missingTag}>Ej täckt</span>
                    )}
                    
                    {hasMismatch && (
                        <span style={styles.warning} title={warningTooltip}>
                            ⚠️ <span style={{fontSize: '0.7rem', marginLeft: '4px', textDecoration: 'underline'}}>Mismatch</span>
                        </span>
                    )}
                </td>
                </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
