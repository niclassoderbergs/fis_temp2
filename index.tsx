
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { brsList as initialBrsList, mpsList as initialMpsList } from './data';
import { PurposeSection } from './PurposeSection';
import { MPSSection } from './MPSSection';
import { BRSData, MPSData } from './types';
import { StatusPage } from './StatusPage';
import { DomainConditionsPage } from './DomainConditionsPage';
import { ProceduresPage } from './ProceduresPage';
import { JWGProcedure1 } from './JWGProcedure1';
import { JWGProcedure2 } from './JWGProcedure2';
import { JWGProcedure3 } from './JWGProcedure3';
import { JWGProcedure4 } from './JWGProcedure4';
import { JWGProcedure5 } from './JWGProcedure5';
import { JWGProcedure6 } from './JWGProcedure6';
import { JWGProcedure7 } from './JWGProcedure7';
import { JWGProcedure8 } from './JWGProcedure8';
import { JWGProcedure9 } from './JWGProcedure9';
import { JWGProcedure10 } from './JWGProcedure10';
import { JWGProcedure11 } from './JWGProcedure11';
import { JWGProcedure12 } from './JWGProcedure12';
import { JWGProcedure13 } from './JWGProcedure13';
import { JWGProcedure14 } from './JWGProcedure14';
import { JWGProcedure15 } from './JWGProcedure15';
import { JWGProcedure16 } from './JWGProcedure16';
import { JWGProcedure17 } from './JWGProcedure17';
import { JWGProcedure18 } from './JWGProcedure18';
import { JWGProcedure19 } from './JWGProcedure19';
import { JWGProcedure20 } from './JWGProcedure20';
import { JWGProcedure21 } from './JWGProcedure21';
import { JWGProcedure22 } from './JWGProcedure22';
import { JWGProcedure23 } from './JWGProcedure23';
import { JWGProcedure24 } from './JWGProcedure24';
import { JWGProcedure25 } from './JWGProcedure25';
import { JWGProcedure26 } from './JWGProcedure26';
import { JWGProcedure27 } from './JWGProcedure27';
import { JWGProcedure28 } from './JWGProcedure28';
import { JWGProcedure29 } from './JWGProcedure29';
import { JWGProcedure30 } from './JWGProcedure30';
import { JWGProcedure31 } from './JWGProcedure31';
import { JWGProcedure32 } from './JWGProcedure32';
import { JWGProcedure33 } from './JWGProcedure33';
import { JWGProcedure34 } from './JWGProcedure34';

// --- Styles ---
const styles = {
  appContainer: {
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100vh',
    backgroundColor: '#f4f6f8',
    color: '#333'
  },
  header: {
    backgroundColor: '#0052cc',
    color: 'white',
    padding: '0 24px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    zIndex: 10,
    flexShrink: 0
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center'
  },
  navButton: {
    backgroundColor: 'transparent',
    border: '1px solid rgba(255,255,255,0.4)',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginLeft: '16px',
    fontWeight: 500,
    transition: 'background 0.2s'
  },
  navButtonActive: {
    backgroundColor: '#ffab00', // Distinct color for edit mode
    color: '#172b4d',
    borderColor: '#ffab00',
    fontWeight: 700
  },
  sidebar: {
    width: '300px',
    backgroundColor: '#f7f9fc',
    borderRight: '1px solid #dfe1e6',
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    flexShrink: 0,
    paddingBottom: '20px'
  },
  mainScroll: {
    flex: 1,
    overflowY: 'auto' as const,
    backgroundColor: '#e0e0e0',
    padding: '40px'
  },
  paper: {
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: '60px 80px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    minHeight: '1000px',
    boxSizing: 'border-box' as const
  },
  // Typography
  docId: {
    fontSize: '0.95rem',
    color: '#333',
    marginBottom: '8px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  docTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#000',
    margin: '0 0 32px 0',
    lineHeight: 1.1,
    width: '100%'
  },
  sectionHeader: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#172b4d',
    marginTop: '48px',
    marginBottom: '16px',
  },
  subHeader: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#172b4d',
    marginTop: '24px',
    marginBottom: '8px'
  },
  subSubHeader: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#172b4d',
    marginTop: '16px',
    marginBottom: '8px'
  },
  paragraph: {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#333',
    marginBottom: '16px'
  },
  // Diagram
  diagramWrapper: {
    marginTop: '24px',
    marginBottom: '8px',
    border: '1px solid #000',
  },
  caption: {
    fontSize: '0.9rem',
    fontStyle: 'italic',
    color: '#444',
    marginBottom: '32px'
  },
  captionId: {
    color: '#800080',
    fontWeight: 500
  },
  // Tables
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginBottom: '16px',
    fontSize: '0.85rem',
    border: '1px solid #ccc',
    backgroundColor: 'white'
  },
  th: {
    backgroundColor: '#1f6089',
    color: 'white',
    padding: '6px 8px',
    textAlign: 'left' as const,
    fontWeight: 600,
    border: '1px solid #1f6089',
    verticalAlign: 'top' as const
  },
  td: {
    padding: '6px 8px',
    border: '1px solid #ccc',
    verticalAlign: 'top' as const,
    color: '#333',
    lineHeight: '1.4'
  },
  trEven: {
    backgroundColor: '#f9f9f9'
  },
  badge: {
    border: '1px solid #ccc',
    color: '#999',
    fontSize: '0.75rem',
    padding: '1px 6px',
    borderRadius: '3px',
    fontWeight: 400,
    backgroundColor: 'white',
    textTransform: 'none' as const
  },
  // Tree View Styles
  treeGroup: {
    marginBottom: '4px',
  },
  treeHeader: {
    padding: '12px 16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: '0.85rem',
    color: '#42526e',
    userSelect: 'none' as const,
    backgroundColor: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left' as const,
  },
  treeHeaderHover: {
    backgroundColor: '#ebecf0'
  },
  treeContent: {
    overflow: 'hidden',
    transition: 'max-height 0.2s ease-in-out'
  },
  treeSubHeader: {
    padding: '8px 16px 4px 28px', 
    fontSize: '0.7rem', 
    textTransform: 'uppercase' as const, 
    color: '#6b778c', 
    fontWeight: 700, 
    letterSpacing: '0.5px',
    marginTop: '4px'
  },
  treeItem: {
    display: 'block',
    width: '100%',
    textAlign: 'left' as const,
    padding: '6px 16px 6px 36px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '0.85rem',
    color: '#333',
    outline: 'none',
    textDecoration: 'none'
  },
  treeItemActive: {
    backgroundColor: '#e6effc',
    color: '#0052cc',
    fontWeight: 600,
    borderRight: '3px solid #0052cc'
  },
  arrow: {
    marginRight: '8px',
    fontSize: '0.7rem',
    transition: 'transform 0.2s'
  },
  menuHeader: {
    padding: '24px 16px 8px 16px', 
    fontSize: '0.75rem', 
    textTransform: 'uppercase' as const, 
    color: '#6b778c', 
    fontWeight: 700, 
    letterSpacing: '0.5px'
  },
  // Editing specific
  input: {
    width: '100%',
    boxSizing: 'border-box' as const,
    padding: '4px',
    border: '1px solid #0052cc',
    borderRadius: '3px',
    backgroundColor: '#fffdf5', // light yellow hint
    fontFamily: 'inherit',
    fontSize: 'inherit'
  },
  textarea: {
    width: '100%',
    boxSizing: 'border-box' as const,
    padding: '4px',
    border: '1px solid #0052cc',
    borderRadius: '3px',
    backgroundColor: '#fffdf5',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    minHeight: '60px',
    resize: 'vertical' as const
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 8px',
    fontSize: '1rem',
    opacity: 0.7,
    transition: 'opacity 0.2s'
  },
  addButton: {
    marginTop: '8px',
    padding: '6px 12px',
    backgroundColor: '#e6effc',
    color: '#0052cc',
    border: '1px dashed #0052cc',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
    width: '100%',
    textAlign: 'center' as const
  }
};

const StatusBadge = () => (
  <span style={styles.badge}>
    Not implemented
  </span>
);

const EditableTable = ({ 
  data, 
  columns, 
  isEditing, 
  onUpdate,
  onAdd,
  onRemove
}: { 
  data: any[], 
  columns: any[], 
  isEditing: boolean, 
  onUpdate: (idx: number, key: string, val: string) => void,
  onAdd?: () => void,
  onRemove?: (idx: number) => void
}) => (
  <div style={{marginBottom: '16px'}}>
    <table style={styles.table}>
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} style={{ ...styles.th, width: col.width }}>
              {col.label}
            </th>
          ))}
          {isEditing && <th style={{ ...styles.th, width: '40px' }}></th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIdx) => (
          <tr key={rowIdx} style={rowIdx % 2 === 1 ? styles.trEven : {}}>
            {columns.map((col, colIdx) => {
              const val = row[col.key] || '';
              const isId = col.key === 'id';
              
              return (
                <td key={colIdx} style={styles.td}>
                  {isEditing ? (
                    col.type === 'textarea' ? (
                      <textarea 
                        style={styles.textarea}
                        value={val}
                        onChange={(e) => onUpdate(rowIdx, col.key, e.target.value)}
                      />
                    ) : (
                      <input 
                        type="text" 
                        style={styles.input}
                        value={val}
                        onChange={(e) => onUpdate(rowIdx, col.key, e.target.value)}
                      />
                    )
                  ) : (
                    isId ? <span style={{fontWeight: 600}}>{val}</span> : val
                  )}
                </td>
              );
            })}
            {isEditing && onRemove && (
              <td style={styles.td}>
                <button 
                  style={styles.iconButton} 
                  title="Remove row"
                  onClick={() => onRemove(rowIdx)}
                >
                  🗑️
                </button>
              </td>
            )}
          </tr>
        ))}
        {data.length === 0 && !isEditing && (
          <tr>
            <td colSpan={columns.length} style={{ ...styles.td, fontStyle: 'italic', color: '#777' }}>
              None defined.
            </td>
          </tr>
        )}
      </tbody>
    </table>
    {isEditing && onAdd && (
      <button style={styles.addButton} onClick={onAdd}>
        + Add Row
      </button>
    )}
  </div>
);

// --- Sidebar Components ---
interface GroupDef {
  id: string;
  title: string;
  brsPrefixes: string[];
  mpsPrefixes: string[];
}

const groups: GroupDef[] = [
  { id: '100', title: 'Domän 1: Master data och aggregeringsobjekt', brsPrefixes: ['BRS-FLEX-1'], mpsPrefixes: ['MPS-FLEX-1'] },
  { id: '200', title: 'Domän 2: Avtal & Marknad', brsPrefixes: ['BRS-FLEX-2'], mpsPrefixes: ['MPS-FLEX-2'] }, 
  { id: '300', title: 'Domän 3: Produkt & Förkvalificering', brsPrefixes: ['BRS-FLEX-3'], mpsPrefixes: ['MPS-FLEX-3'] },
  { id: '400', title: 'Domän 4: Nätbegränsningar', brsPrefixes: ['BRS-FLEX-4'], mpsPrefixes: ['MPS-FLEX-4'] },
  { id: '500', title: 'Domän 5: Baseline', brsPrefixes: ['BRS-FLEX-5'], mpsPrefixes: ['MPS-FLEX-5'] },
  { id: '600', title: 'Domän 6: Mätvärden', brsPrefixes: ['BRS-FLEX-6'], mpsPrefixes: ['MPS-FLEX-6'] },
  { id: '700', title: 'Domän 7: Verifiering', brsPrefixes: ['BRS-FLEX-7'], mpsPrefixes: ['MPS-FLEX-7'] },
  { id: '800', title: 'Domän 8: Aktörsadministration', brsPrefixes: ['BRS-FLEX-8'], mpsPrefixes: ['MPS-FLEX-8'] },
];

interface SidebarGroupProps {
  group: GroupDef;
  brsItems: BRSData[];
  mpsItems: MPSData[];
  isOpen: boolean;
  onToggle: () => void;
  selectedId: string;
  selectedMpsId: string;
  selectedDomain: string;
  onSelectBRS: (id: string) => void;
  onSelectMPS: (id: string) => void;
  onSelectConditions: (domainId: string) => void;
  viewMode: string;
}

const SidebarGroup: React.FC<SidebarGroupProps> = ({ 
  group, 
  brsItems, 
  mpsItems, 
  isOpen, 
  onToggle, 
  selectedId, 
  selectedMpsId,
  selectedDomain,
  onSelectBRS, 
  onSelectMPS,
  onSelectConditions,
  viewMode 
}) => {
  const [hover, setHover] = useState(false);

  const hasItems = brsItems.length > 0 || mpsItems.length > 0;

  if (!hasItems) {
      return (
        <div style={styles.treeGroup}>
            <div style={{...styles.treeHeader, opacity: 0.5, cursor: 'default'}}>
                <span style={{...styles.arrow, visibility: 'hidden'}}>▶</span>
                {group.title}
            </div>
        </div>
      )
  }

  // Rename logic
  let mpsHeader = "MPS - Marknadsprocesser";
  if (group.id === '100') mpsHeader = "MPS - Marknadsprocesser Domän 1";
  else if (group.id === '200') mpsHeader = "MPS - Marknadsprocesser Domän 2";
  else if (group.id === '300') mpsHeader = "MPS - Marknadsprocesser Domän 3";
  else if (group.id === '400') mpsHeader = "MPS - Marknadsprocesser Domän 4";
  else if (group.id === '500') mpsHeader = "MPS - Marknadsprocesser Domän 5";
  else if (group.id === '600') mpsHeader = "MPS - Marknadsprocesser Domän 6";
  else if (group.id === '700') mpsHeader = "MPS - Marknadsprocesser Domän 7";
  else if (group.id === '800') mpsHeader = "MPS - Marknadsprocesser Domän 8";

  // Determine domain ID
  const domainId = group.id.substring(0, 1);
  // Allow condition matrix for domain 1-8
  const showConditionsLink = ['100', '200', '300', '400', '500', '600', '700', '800'].includes(group.id);

  return (
    <div style={styles.treeGroup}>
      <button 
        onClick={onToggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          ...styles.treeHeader,
          ...(hover ? styles.treeHeaderHover : {})
        }}
      >
        <span style={{
          ...styles.arrow,
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
        }}>▶</span>
        {group.title}
      </button>
      
      {isOpen && (
        <div style={styles.treeContent}>
          {/* MPS Section */}
          {(mpsItems.length > 0 || showConditionsLink) && (
            <>
              <div style={styles.treeSubHeader}>{mpsHeader}</div>
              
              {/* Specific link for Conditions Matrix */}
              {showConditionsLink && (
                <button
                    onClick={() => onSelectConditions(domainId)}
                    style={{
                      ...styles.treeItem,
                      ...(viewMode === 'conditions' && selectedDomain === domainId ? styles.treeItemActive : {}),
                      color: (viewMode === 'conditions' && selectedDomain === domainId) ? '#0052cc' : '#6b778c'
                    }}
                  >
                    📋 MPS/BRS översikt: Domän {domainId}
                </button>
              )}

              {mpsItems.map(mps => {
                const isActive = viewMode === 'mps' && selectedMpsId === mps.id;
                return (
                  <button
                    key={mps.id}
                    onClick={() => onSelectMPS(mps.id)}
                    style={{
                      ...styles.treeItem,
                      ...(isActive ? styles.treeItemActive : {})
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '2px' }}>{mps.id}</div>
                    {mps.title}
                  </button>
                );
              })}
            </>
          )}

          {/* BRS Section */}
          {brsItems.length > 0 && (
            <>
              <div style={styles.treeSubHeader}>BRS - Affärstransaktioner</div>
              {brsItems.map(brs => {
                 const isActive = viewMode === 'detail' && selectedId === brs.id;
                 return (
                   <button
                     key={brs.id}
                     onClick={() => onSelectBRS(brs.id)}
                     style={{
                       ...styles.treeItem,
                       ...(isActive ? styles.treeItemActive : {})
                     }}
                   >
                     <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '2px' }}>{brs.id}</div>
                     {brs.title}
                   </button>
                 );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

// --- Helpers ---
const getAllIds = (brs: BRSData): string[] => {
  const ids: string[] = [];
  const collect = (list: any[]) => {
    if (!list) return;
    list.forEach(item => {
      if (item && typeof item === 'object' && item.id) {
        ids.push(item.id);
      }
    });
  };
  collect(brs.preConditions);
  collect(brs.businessRules);
  collect(brs.process);
  if (brs.exceptionFlow) collect(brs.exceptionFlow);
  if (brs.postConditions) {
    if (Array.isArray(brs.postConditions.accepted)) collect(brs.postConditions.accepted);
    if (Array.isArray(brs.postConditions.rejected)) collect(brs.postConditions.rejected);
  }
  return ids;
};

const generateNextId = (brs: BRSData, currentList: any[]): string => {
  let prefix = '';
  const defaultPrefix = brs.id.replace(/-/g, '') + '-';
  
  for (let i = currentList.length - 1; i >= 0; i--) {
    const item = currentList[i];
    if (typeof item === 'object' && item.id) {
      const match = item.id.match(/^(.+?)(\d+)$/);
      if (match) {
        prefix = match[1];
        break;
      }
    }
  }
  if (!prefix) prefix = defaultPrefix;

  const allIds = getAllIds(brs);
  let maxNum = 0;
  allIds.forEach(id => {
    if (id.startsWith(prefix)) {
      const remainder = id.substring(prefix.length);
      const num = parseInt(remainder, 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    }
  });
  return `${prefix}${maxNum + 1}`;
};

const STORAGE_KEY = 'fis-wiki-data-v1';

// Natural sort helper for BRS/MPS IDs
const sortById = (a: { id: string }, b: { id: string }) => 
  a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });

type ViewMode = 'detail' | 'status' | 'mps' | 'conditions' | 'procedures' 
| 'jwg-procedure-1' | 'jwg-procedure-2' | 'jwg-procedure-3' | 'jwg-procedure-4' | 'jwg-procedure-5' 
| 'jwg-procedure-6' | 'jwg-procedure-7' | 'jwg-procedure-8' | 'jwg-procedure-9' | 'jwg-procedure-10' 
| 'jwg-procedure-11' | 'jwg-procedure-12' | 'jwg-procedure-13' | 'jwg-procedure-14' | 'jwg-procedure-15'
| 'jwg-procedure-16' | 'jwg-procedure-17' | 'jwg-procedure-18' | 'jwg-procedure-19' | 'jwg-procedure-20'
| 'jwg-procedure-21' | 'jwg-procedure-22' | 'jwg-procedure-23' | 'jwg-procedure-24' | 'jwg-procedure-25'
| 'jwg-procedure-26' | 'jwg-procedure-27' | 'jwg-procedure-28' | 'jwg-procedure-29' | 'jwg-procedure-30'
| 'jwg-procedure-31' | 'jwg-procedure-32' | 'jwg-procedure-33' | 'jwg-procedure-34';

function App() {
  const [brsData, setBrsData] = useState<BRSData[]>(initialBrsList);
  const [mpsData, setMpsData] = useState<MPSData[]>(initialMpsList);
  
  const [selectedId, setSelectedId] = useState<string>(initialBrsList[0].id);
  const [selectedMpsId, setSelectedMpsId] = useState<string>(initialMpsList[0]?.id || '');
  const [selectedDomain, setSelectedDomain] = useState<string>('1'); // '1' or '2' etc.
  
  const [openGroups, setOpenGroups] = useState<string[]>(['100', '200', '300', '400', '500', '600', '700', '800']);
  const [viewMode, setViewMode] = useState<ViewMode>('detail');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const merged = initialBrsList.map(item => {
          const found = parsed.find((p: BRSData) => p.id === item.id);
          return found || item;
        });
        setBrsData(merged);
      } catch (e) {
        console.error("Failed to load BRS data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(brsData));
    }
  }, [brsData, isLoaded]);

  const activeBRS = brsData.find(b => b.id === selectedId) || brsData[0];
  const activeMPS = mpsData.find(m => m.id === selectedMpsId) || mpsData[0];

  const handleUpdateBRS = (updated: BRSData) => {
    setBrsData(prev => prev.map(item => item.id === updated.id ? updated : item));
  };

  const handleResetData = () => {
    if (confirm("Detta återställer ändringar. Är du säker?")) {
      setBrsData(initialBrsList);
      localStorage.removeItem(STORAGE_KEY);
      setIsEditing(false);
    }
  };

  const normalizeArray = (arr: any[], defaultPrefix: string) => {
    return arr.map((item, i) => {
      if (typeof item === 'string') {
        return { id: `${defaultPrefix}-${i + 1}`, description: item, _isString: true };
      }
      return { ...item, _isString: false };
    });
  };

  const updateArrayItem = (field: any, index: number, key: string, val: string) => {
    const list = (activeBRS as any)[field] as any[];
    const newList = [...list];
    const item = newList[index];
    if (typeof item === 'string') {
        if (key === 'description') newList[index] = val;
        else newList[index] = { id: val, description: item };
    } else {
        newList[index] = { ...item, [key]: val };
    }
    handleUpdateBRS({ ...activeBRS, [field]: newList });
  };

  const handleAddArrayItem = (field: string) => {
    const list = ((activeBRS as any)[field] || []) as any[];
    const nextId = generateNextId(activeBRS, list);
    let newItem: any;
    if (field === 'businessRules') newItem = { id: nextId, description: 'New business rule', errorCode: '' };
    else newItem = { id: nextId, description: 'New item' };
    handleUpdateBRS({ ...activeBRS, [field]: [...list, newItem] });
  };

  const handleRemoveArrayItem = (field: string, index: number) => {
    const list = [...((activeBRS as any)[field] as any[])];
    list.splice(index, 1);
    handleUpdateBRS({ ...activeBRS, [field]: list });
  };

  // Render helpers
  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]);
  };

  const handleSelectBRS = (id: string) => {
    setSelectedId(id);
    setViewMode('detail');
  };

  const handleSelectMPS = (id: string) => {
    setSelectedMpsId(id);
    setViewMode('mps');
  };

  const handleSelectConditions = (domainId: string) => {
    setSelectedDomain(domainId);
    setViewMode('conditions');
  };

  // Data preps
  const startConditionsData = normalizeArray(activeBRS.preConditions, `${activeBRS.id}-PRE`);
  const acceptedData = normalizeArray(
    Array.isArray(activeBRS.postConditions.accepted) ? activeBRS.postConditions.accepted : [activeBRS.postConditions.accepted].filter(Boolean), 
    `${activeBRS.id}-POST-OK`
  );
  const rejectedData = normalizeArray(
    Array.isArray(activeBRS.postConditions.rejected) ? activeBRS.postConditions.rejected : [activeBRS.postConditions.rejected].filter(Boolean), 
    `${activeBRS.id}-POST-ERR`
  );
  const flowData = normalizeArray(activeBRS.process, `${activeBRS.id.replace('BRS-FLEX-', 'BRS')}`);

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>FIS Wiki</h1>
          <span style={{ marginLeft: '16px', opacity: 0.8, fontSize: '0.9rem', borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: '16px' }}>
            Technical Specifications {isEditing && <span style={{backgroundColor: '#ffab00', color: '#000', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', marginLeft: '8px'}}>EDIT MODE</span>}
          </span>
        </div>
        <div>
          {viewMode === 'detail' && (
            <button 
               onClick={() => setIsEditing(!isEditing)} 
               style={{...styles.navButton, ...(isEditing ? styles.navButtonActive : {})}}
            >
              {isEditing ? 'Exit Edit Mode' : '✎ Edit Content'}
            </button>
          )}
          {isEditing && (
            <button 
              onClick={handleResetData}
              style={{...styles.navButton, marginLeft: '8px', borderColor: '#ffcccc', color: '#ffcccc'}}
            >
              Reset All
            </button>
          )}
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          <nav style={styles.sidebar}>
             <div style={styles.menuHeader}>Översikt</div>
             <button onClick={() => setViewMode('status')} style={{...styles.treeItem, fontWeight: 500, ...(viewMode === 'status' ? styles.treeItemActive : {})}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{fontSize: '1.1rem', marginRight: '8px'}}>📊</span> Status Dashboard
                </div>
             </button>
             <button onClick={() => setViewMode('procedures')} style={{...styles.treeItem, fontWeight: 500, ...(viewMode === 'procedures' ? styles.treeItemActive : {})}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{fontSize: '1.1rem', marginRight: '8px'}}>📜</span> JWG Processlista
                </div>
             </button>

            <div style={styles.menuHeader}>Dokumentation</div>
            {groups.map(group => {
                const filteredBrs = brsData
                    .filter(item => group.brsPrefixes.some(prefix => item.id.startsWith(prefix)))
                    .sort(sortById);
                
                const filteredMps = mpsData
                    .filter(item => group.mpsPrefixes.some(prefix => item.id.startsWith(prefix)))
                    .sort(sortById);

                return (
                    <SidebarGroup 
                      key={group.id}
                      group={group}
                      brsItems={filteredBrs}
                      mpsItems={filteredMps}
                      isOpen={openGroups.includes(group.id)}
                      onToggle={() => toggleGroup(group.id)}
                      selectedId={selectedId}
                      selectedMpsId={selectedMpsId}
                      selectedDomain={selectedDomain}
                      onSelectBRS={handleSelectBRS}
                      onSelectMPS={handleSelectMPS}
                      onSelectConditions={handleSelectConditions}
                      viewMode={viewMode}
                    />
                );
            })}
          </nav>

          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {viewMode === 'status' && (
              <div style={{flex: 1, overflowY: 'auto', backgroundColor: '#e0e0e0', padding: '40px'}}>
                  <StatusPage 
                    data={brsData} 
                    mpsData={mpsData}
                    onSelectBRS={handleSelectBRS} 
                    onSelectMPS={handleSelectMPS}
                  />
              </div>
            )}

            {viewMode === 'procedures' && (
              <div style={styles.mainScroll}>
                <div style={styles.paper}>
                  <ProceduresPage 
                    onNavigateToBRS={handleSelectBRS} 
                    onNavigateToProcedure={(id) => {
                      if (id >= 1 && id <= 34) setViewMode(`jwg-procedure-${id}` as ViewMode);
                    }}
                  />
                </div>
              </div>
            )}

            {/* JWG Procedures 1-34 */}
            {viewMode === 'jwg-procedure-1' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure1 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-2' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure2 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-3' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure3 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-4' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure4 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-5' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure5 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-6' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure6 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-7' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure7 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-8' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure8 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-9' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure9 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-10' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure10 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-11' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure11 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-12' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure12 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-13' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure13 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-14' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure14 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-15' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure15 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-16' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure16 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-17' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure17 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-18' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure18 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-19' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure19 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-20' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure20 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-21' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure21 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-22' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure22 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-23' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure23 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-24' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure24 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-25' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure25 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-26' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure26 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-27' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure27 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-28' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure28 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-29' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure29 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-30' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure30 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-31' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure31 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-32' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure32 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-33' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure33 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}
            {viewMode === 'jwg-procedure-34' && <div style={styles.mainScroll}><div style={styles.paper}><JWGProcedure34 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} /></div></div>}

            {viewMode === 'conditions' && (
              <div style={styles.mainScroll}>
                <DomainConditionsPage 
                    mpsData={mpsData} 
                    brsData={brsData}
                    domainId={selectedDomain}
                    domainTitle={`Domän ${selectedDomain}`}
                    onNavigateToBRS={handleSelectBRS}
                    onNavigateToMPS={handleSelectMPS}
                />
              </div>
            )}

            {viewMode === 'mps' && activeMPS && (
              <div style={styles.mainScroll}>
                <div style={styles.paper}>
                  <MPSSection 
                    activeMPS={activeMPS} 
                    brsList={brsData} 
                    styles={styles} 
                    onNavigateToBRS={handleSelectBRS}
                  />
                </div>
              </div>
            )}

            {viewMode === 'detail' && (
              <div style={styles.mainScroll}>
                <div style={styles.paper}>
                  <div>
                    <div style={styles.docId}>{activeBRS.id} <StatusBadge /></div>
                    {isEditing ? (
                        <input 
                          style={{...styles.input, fontSize: '2rem', fontWeight: 700, marginBottom: '24px'}}
                          value={activeBRS.title}
                          onChange={(e) => handleUpdateBRS({...activeBRS, title: e.target.value})}
                        />
                    ) : (
                        <h1 style={styles.docTitle}>{activeBRS.title}</h1>
                    )}
                  </div>

                  <PurposeSection activeBRS={activeBRS} styles={styles} isEditing={isEditing} onUpdate={handleUpdateBRS} />

                  <section>
                    <h2 style={styles.sectionHeader}>Constraints</h2>
                    <h3 style={styles.subHeader}>Start conditions</h3>
                    <EditableTable 
                      data={startConditionsData}
                      columns={[{ key: 'id', label: 'Rule #', width: '20%' }, { key: 'description', label: 'Description', type: 'textarea' }]}
                      isEditing={isEditing}
                      onUpdate={(idx, key, val) => updateArrayItem('preConditions', idx, key, val)}
                      onAdd={() => handleAddArrayItem('preConditions')}
                      onRemove={(idx) => handleRemoveArrayItem('preConditions', idx)}
                    />
                    
                    <h3 style={styles.subHeader}>Stop conditions</h3>
                    <h4 style={styles.subSubHeader}>If accepted</h4>
                    <EditableTable 
                      data={acceptedData}
                      columns={[{ key: 'id', label: 'Rule #', width: '20%' }, { key: 'description', label: 'Description', type: 'textarea' }]}
                      isEditing={isEditing}
                      onUpdate={(idx, key, val) => { /* Reuse logic */ }}
                      onAdd={() => { /* Reuse logic */ }}
                      onRemove={(idx) => { /* Reuse logic */ }}
                    />
                  </section>

                  <section>
                    <h2 style={styles.sectionHeader}>Business rules</h2>
                    <EditableTable 
                      data={activeBRS.businessRules}
                      columns={[{ key: 'id', label: 'Rule #', width: '15%' }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'errorCode', label: 'Error message', width: '25%' }]}
                      isEditing={isEditing}
                      onUpdate={(idx, key, val) => updateArrayItem('businessRules', idx, key, val)}
                      onAdd={() => handleAddArrayItem('businessRules')}
                      onRemove={(idx) => handleRemoveArrayItem('businessRules', idx)}
                    />
                  </section>

                  <section>
                    <h2 style={styles.sectionHeader}>Flows</h2>
                    <h3 style={styles.subHeader}>Normal flow</h3>
                    <EditableTable 
                      data={flowData}
                      columns={[{ key: 'id', label: 'Rule #', width: '15%' }, { key: 'description', label: 'Description', type: 'textarea' }]}
                      isEditing={isEditing}
                      onUpdate={(idx, key, val) => updateArrayItem('process', idx, key, val)}
                      onAdd={() => handleAddArrayItem('process')}
                      onRemove={(idx) => handleRemoveArrayItem('process', idx)}
                    />
                  </section>
                  
                  {activeBRS.infoObjects && activeBRS.infoObjects.length > 0 && (
                    <section>
                      <h2 style={styles.sectionHeader}>Content in information flow</h2>
                      {activeBRS.infoObjects.map((io, idx) => (
                        <div key={idx} style={{ marginBottom: '24px' }}>
                          <h3 style={styles.subHeader}>Informationsobjekt – {io.title}</h3>
                          <EditableTable 
                             data={io.attributes}
                             columns={[{ key: 'attribute', label: 'Attribute', width: '25%' }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'article', label: 'Ref', width: '20%' }]}
                             isEditing={isEditing}
                             onUpdate={() => {}}
                          />
                        </div>
                      ))}
                    </section>
                  )}
                </div>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
