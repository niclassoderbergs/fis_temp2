
import React, { useMemo, useState } from 'react';
import { BRSData, MPSData } from './types';

interface Props {
  brsData: BRSData[];
  mpsData: MPSData[];
  domainId: string;
  onNavigateToBRS: (id: string) => void;
}

const styles = {
  container: {
    padding: '40px 60px',
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
  controls: {
    marginBottom: '24px',
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  searchInput: {
    padding: '10px 16px',
    borderRadius: '4px',
    border: '1px solid #dfe1e6',
    fontSize: '0.9rem',
    width: '300px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '0.9rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #dfe1e6',
    backgroundColor: 'white'
  },
  thSortable: {
    backgroundColor: '#f4f5f7',
    color: '#172b4d',
    padding: '12px 16px',
    textAlign: 'left' as const,
    borderBottom: '2px solid #dfe1e6',
    fontWeight: 600,
    cursor: 'pointer',
    userSelect: 'none' as const,
    whiteSpace: 'nowrap' as const,
    transition: 'background-color 0.2s'
  },
  thIcon: {
    marginLeft: '8px',
    fontSize: '0.8rem',
    color: '#6b778c'
  },
  row: {
    borderBottom: '1px solid #ebecf0',
    transition: 'background-color 0.1s',
    cursor: 'pointer'
  },
  rowHover: {
    backgroundColor: '#fafbfc'
  },
  rowExpanded: {
    backgroundColor: '#f2f6fa'
  },
  cell: {
    padding: '12px 16px',
    color: '#172b4d',
    verticalAlign: 'middle' as const
  },
  expandableRow: {
    backgroundColor: '#f9f9f9', // Lighter background for content
    borderBottom: '1px solid #ebecf0'
  },
  expandableContent: {
    padding: '24px 32px',
    fontSize: '0.9rem',
    color: '#42526e',
    boxShadow: 'inset 0 4px 4px -4px rgba(0,0,0,0.1)'
  },
  brsId: {
    fontFamily: 'monospace',
    fontWeight: 600,
    color: '#0052cc',
    fontSize: '0.95rem'
  },
  navButton: {
    marginTop: '16px',
    display: 'inline-block',
    padding: '8px 16px',
    backgroundColor: '#0052cc',
    color: 'white',
    borderRadius: '4px',
    fontWeight: 600,
    fontSize: '0.85rem',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  actorBadge: {
    fontWeight: 600,
    color: '#172b4d',
    backgroundColor: '#e6effc',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.85rem'
  }
};

// Helper to normalize actor names from BRS
const normalizeActor = (description: string): string => {
  const d = description.toLowerCase();
  
  // Handle multi-party lists explicitly to avoid them being captured by single checks
  if (d.includes('/') && (d.includes('tso') || d.includes('dso') || d.includes('brp'))) {
      return description; // Return full string for transparency
  }

  if (d.includes('sp') || d.includes('service provider')) return 'Service Provider (SP)';
  if (d.includes('fis') || d.includes('system') || d.includes('admin') || d.includes('registret')) return 'Flexibility Information System (FIS)';
  if (d.includes('dhv') || d.includes('datahub')) return 'Datahub (DHV)';
  if (d.includes('dso') || d.includes('nätägare')) return 'DSO (Nätägare)';
  if (d.includes('tso') || d.includes('systemoperatör')) return 'TSO (Systemoperatör)';
  if (d.includes('brp') || d.includes('balansansvarig')) return 'Balansansvarig (BRP)';
  if (d.includes('elleverantör') || d.includes('supplier')) return 'Elleverantör';
  if (d.includes('nemo')) return 'NEMO';
  if (d.includes('slutkund') || d.includes('final customer') || d.includes('kund')) return 'Slutkund';
  
  return description.length < 30 ? description : 'Övriga';
};

interface FlatRowData {
    uniqueKey: string;
    id: string;
    title: string;
    purpose: string;
    actorName: string;
}

type SortKey = 'id' | 'title' | 'actorName';

export const DomainActorOverviewPage: React.FC<Props> = ({ brsData, domainId, onNavigateToBRS }) => {
  
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({ key: 'id', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  const toggleRow = (key: string) => {
    const newSet = new Set(expandedRows);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    setExpandedRows(newSet);
  };

  const handleSort = (key: SortKey) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  // 1. Prepare Flat Data
  const flatData = useMemo(() => {
    const rows: FlatRowData[] = [];
    
    // Filter BRS for Domain
    const domainBRSs = brsData.filter(b => b.id.startsWith(`BRS-FLEX-${domainId}`));

    domainBRSs.forEach(brs => {
        let normalizedName = 'Unknown';
        const numericId = brs.id.replace('BRS-FLEX-', '');

        // Override logic specific to TSO transactions
        const tsoIds = ['301', '308', '314', '317', '318', '319', '320'];
        
        if (tsoIds.includes(numericId)) {
            normalizedName = 'TSO (Systemoperatör)';
        } else {
            // Standard Logic:
            // - Default: Use Initiator
            // - Exception: If it's a notification, use Receiver (Mottagare)
            
            let targetActor = brs.actors.find(a => a.role.toLowerCase().includes('initiator'));
            const isNotification = brs.title.toLowerCase().includes('notifier') || brs.title.toLowerCase().includes('notify');

            if (isNotification) {
                 const receiver = brs.actors.find(a => a.role.toLowerCase().includes('mottagare') || a.role.toLowerCase().includes('receiver'));
                 if (receiver) {
                     targetActor = receiver;
                 }
            }

            // Fallback
            if (!targetActor) targetActor = brs.actors[0];
            
            if (targetActor) {
                normalizedName = normalizeActor(targetActor.description);
            }
        }

        rows.push({
            uniqueKey: brs.id,
            id: brs.id,
            title: brs.title,
            purpose: brs.purpose,
            actorName: normalizedName
        });
    });

    return rows;
  }, [brsData, domainId]);

  // 2. Filter & Sort Data
  const filteredSortedData = useMemo(() => {
    let data = [...flatData];

    if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        data = data.filter(r => 
            r.id.toLowerCase().includes(lowerSearch) || 
            r.title.toLowerCase().includes(lowerSearch) || 
            r.actorName.toLowerCase().includes(lowerSearch)
        );
    }

    const { key, direction } = sortConfig;
    const multiplier = direction === 'asc' ? 1 : -1;

    data.sort((a, b) => {
        if (key === 'id') {
             // Smart sort for IDs (handle numeric part)
             return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }) * multiplier;
        }
        return a[key].localeCompare(b[key]) * multiplier;
    });

    return data;
  }, [flatData, sortConfig, searchTerm]);

  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) return null;
    return <span style={styles.thIcon}>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Aktörsöversikt: Domän {domainId}</h1>
      <p style={styles.subHeader}>
        Tabellen visar en översikt över transaktionerna i domänen och vilken aktör som är primär part (Initiativtagare för processer, Mottagare för notifieringar).
      </p>

      <div style={styles.controls}>
        <input 
            type="text" 
            placeholder="Sök på ID, titel eller aktör..." 
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table style={styles.table}>
        <thead>
            <tr>
                <th style={{...styles.thSortable, width: '15%'}} onClick={() => handleSort('id')}>
                    ID {getSortIcon('id')}
                </th>
                <th style={{...styles.thSortable, width: '50%'}} onClick={() => handleSort('title')}>
                    Titel {getSortIcon('title')}
                </th>
                <th style={{...styles.thSortable, width: '35%'}} onClick={() => handleSort('actorName')}>
                    Aktör {getSortIcon('actorName')}
                </th>
            </tr>
        </thead>
        <tbody>
            {filteredSortedData.map((row) => {
                const isExpanded = expandedRows.has(row.uniqueKey);
                return (
                    <React.Fragment key={row.uniqueKey}>
                        <tr 
                            onClick={() => toggleRow(row.uniqueKey)}
                            style={{
                                ...styles.row,
                                ...(isExpanded ? styles.rowExpanded : {})
                            }}
                            onMouseEnter={(e) => { if(!isExpanded) e.currentTarget.style.backgroundColor = '#fafbfc'; }}
                            onMouseLeave={(e) => { if(!isExpanded) e.currentTarget.style.backgroundColor = 'white'; }}
                        >
                            <td style={styles.cell}>
                                <span style={styles.brsId}>{row.id}</span>
                            </td>
                            <td style={styles.cell}>
                                <div style={{fontWeight: 500}}>{row.title}</div>
                            </td>
                            <td style={styles.cell}>
                                <span style={styles.actorBadge}>{row.actorName}</span>
                            </td>
                        </tr>
                        {isExpanded && (
                            <tr style={styles.expandableRow}>
                                <td colSpan={3} style={{padding: 0}}>
                                    <div style={styles.expandableContent}>
                                        <div style={{marginBottom: '16px', lineHeight: '1.6'}}>
                                            <strong style={{color: '#172b4d', display: 'block', marginBottom: '8px'}}>Syfte:</strong>
                                            {row.purpose}
                                        </div>
                                        <button 
                                            style={styles.navButton}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onNavigateToBRS(row.id);
                                            }}
                                        >
                                            Gå till dokumentation →
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                );
            })}
            {filteredSortedData.length === 0 && (
                <tr>
                    <td colSpan={3} style={{...styles.cell, textAlign: 'center', color: '#666', padding: '32px'}}>
                        Inga transaktioner hittades.
                    </td>
                </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};
