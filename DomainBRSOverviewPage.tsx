
import React, { useMemo, useState } from 'react';
import { BRSData } from './types';

interface Props {
  brsData: BRSData[];
  domainId: string;
  onNavigateToBRS: (id: string) => void;
}

const styles = {
  container: {
    padding: '40px 60px',
    backgroundColor: '#fff',
    minHeight: '100%',
    boxSizing: 'border-box' as const,
    maxWidth: '1200px',
    margin: '0 auto'
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
    marginBottom: '24px'
  },
  descriptionBox: {
    backgroundColor: '#f4f5f7',
    padding: '24px',
    borderRadius: '8px',
    marginBottom: '32px',
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#172b4d',
    borderLeft: '4px solid #268099' // Teal/Blue to match BRS badge color logic roughly
  },
  // Search Bar
  searchContainer: {
    marginBottom: '32px',
    padding: '16px',
    backgroundColor: '#fff',
    border: '1px solid #dfe1e6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  searchLabel: {
    fontWeight: 700,
    fontSize: '0.9rem',
    color: '#172b4d'
  },
  searchInput: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #dfe1e6',
    fontSize: '0.9rem',
    flex: 1,
    maxWidth: '400px',
    outline: 'none',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
  },
  // List Styles
  listContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0px' // No gap, using border-bottom
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 8px',
    borderBottom: '1px solid #ebecf0',
    cursor: 'pointer',
    transition: 'background-color 0.1s'
  },
  listItemHover: {
    backgroundColor: '#f9f9f9'
  },
  itemLink: {
    color: '#4b2c85', // Purple-ish link color similar to reference
    fontWeight: 600,
    fontSize: '1.05rem',
    textDecoration: 'underline',
    marginRight: '16px'
  },
  itemBadge: {
    backgroundColor: '#268099', // Teal/Blue badge color
    color: 'white',
    padding: '4px 12px',
    borderRadius: '4px',
    fontWeight: 600,
    fontSize: '0.85rem',
    whiteSpace: 'nowrap' as const,
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  }
};

const domainNames: Record<string, string> = {
  '1': 'Master data och aggregeringsobjekt',
  '2': 'Avtal & marknad',
  '3': 'Produkt & förkvalificering',
  '4': 'Nätbegränsningar',
  '5': 'Baseline',
  '6': 'Mätvärden',
  '7': 'Verifiering & budgivning',
  '8': 'Aktörsadministration'
};

const domainDescriptions: Record<string, string> = {
  '1': 'Denna domän hanterar grunddatan för flexibilitetsmarknaden. BRS:erna nedan definierar de atomära transaktionerna för att registrera tekniska resurser (CU) och strukturera dem i aggregeringsobjekt (SPU/SPG). Här ingår även automatiska funktioner för systeminitierade uppdateringar och städning av masterdata.',
  '2': 'Hanterar de kommersiella relationerna mellan aktörer och resurser. Transaktionerna täcker livscykeln för Flexibilitetsavtal, inklusive processer för slutkundsinitierade avslut via DHV och automatiska systemavslut vid förändrade förutsättningar, samt leverantörsbyten.',
  '3': 'Beskriver hur resurser godkänns för att delta på olika marknader. Innehåller transaktioner för tre kvalificeringssteg: Administrativ granskning av produktansökan (av TSO/DSO), Nätförkvalificering (analys av nätpåverkan) samt Teknisk produktförkvalificering (funktionstester).',
  '4': 'Hanterar processer för Nätägare (DSO) att registrera och kommunicera tillfälliga begränsningar i elnätet (Congestion Management). Informationen distribueras till berörda SP och ligger till grund för kapacitetskontrollen av bud i Domän 7.',
  '5': 'Domänen definierar hanteringen av referenskurvor (Baseline). Transaktionerna omfattar TSO/DSOs registrering av godkända metoder, aktörers möjlighet att hämta information om dessa, samt SPs val av metod för en specifik CU. Vidare ingår processer för att registrera beräknade baselines (av SP eller FIS). Även när SP registrerar baseline kan FIS behöva genomföra en egen kontrollberäkning för validering. Slutligen distribueras information till berörda parter.',
  '6': 'Fokuserar på rapportering, validering och distribution av mätdata. SP rapporterar mätvärden för CU, vilket notifieras till aktörer som även kan begära datan. Domänen omfattar också registrering av beräknad aktiverad flexibilitetsvolym (av SP eller FIS) samt hämtning av mätpunktsdata från Datahub.',
  '7': 'Hanterar det operativa marknadsflödet och säkerställer teknisk genomförbarhet. TSO och DSO validerar kapacitets- och energibud mot resursers (CU) tekniska egenskaper och nätbegränsningar innan acceptans. Accepterade bud och aktiveringar registreras, varpå faktiskt utfall beräknas baserat på data från Domän 6. Avvikelser rapporteras tillbaka till aktören. Slutligen allokerar FIS volymerna per Balansansvarig (BRP) för obalansjustering i balansavräkningen, samt per Elleverantör för ekonomisk kompensation, och notifierar berörda parter.',
  '8': 'Hanterar livscykeln för marknadsaktörer (företaget), inklusive onboarding, uppdatering av kontaktuppgifter och avregistrering.'
};

// Helper to extract the primary actor (usually Initiator)
const getPrimaryActor = (brs: BRSData): string => {
    // Try to find initiator
    const initiator = brs.actors.find(a => a.role.toLowerCase().includes('initiator'));
    if (initiator) return initiator.description;
    
    // Fallback to first actor or "Unknown"
    return brs.actors[0]?.description || 'System';
};

export const DomainBRSOverviewPage: React.FC<Props> = ({ brsData, domainId, onNavigateToBRS }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const domainBRSs = useMemo(() => {
     return brsData
        .filter(b => b.id.startsWith(`BRS-FLEX-${domainId}`))
        .sort((a, b) => {
            const numA = parseInt(a.id.replace(/\D/g, ''), 10);
            const numB = parseInt(b.id.replace(/\D/g, ''), 10);
            return numA - numB;
        });
  }, [brsData, domainId]);

  const filteredBRSs = useMemo(() => {
      if (!searchTerm) return domainBRSs;
      const lower = searchTerm.toLowerCase();
      return domainBRSs.filter(b => 
          b.id.toLowerCase().includes(lower) || 
          b.title.toLowerCase().includes(lower) || 
          b.purpose.toLowerCase().includes(lower)
      );
  }, [domainBRSs, searchTerm]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Business Requirement Specification (BRS)</h1>
      <p style={styles.subHeader}>
        Domän {domainId}: {domainNames[domainId]}
      </p>

      {domainDescriptions[domainId] && (
        <div style={styles.descriptionBox}>
            {domainDescriptions[domainId]}
        </div>
      )}

      <div style={styles.searchContainer}>
        <label style={styles.searchLabel}>Filter:</label>
        <input 
            type="text" 
            placeholder="Sök transaktion..." 
            style={styles.searchInput}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={styles.listContainer}>
        {filteredBRSs.map(brs => (
            <div 
                key={brs.id}
                style={{
                    ...styles.listItem,
                    ...(hoveredItem === brs.id ? styles.listItemHover : {})
                }}
                onMouseEnter={() => setHoveredItem(brs.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => onNavigateToBRS(brs.id)}
            >
                <div style={styles.itemLink}>
                    {brs.id.replace('BRS-FLEX-', '')} - {brs.title}
                </div>
                <div style={styles.itemBadge}>
                    {getPrimaryActor(brs)}
                </div>
            </div>
        ))}
      </div>
      
      {filteredBRSs.length === 0 && (
          <div style={{color: '#666', fontStyle: 'italic', textAlign: 'center', marginTop: '40px'}}>
              Inga transaktioner hittades.
          </div>
      )}
    </div>
  );
};
