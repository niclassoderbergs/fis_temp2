
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { brsList as initialBrsList } from './data';
import { PurposeSection } from './PurposeSection';
import { BRSData, PostCondition } from './types';
import { StatusPage } from './StatusPage';

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
  treeItem: {
    display: 'block',
    width: '100%',
    textAlign: 'left' as const,
    padding: '8px 16px 8px 36px',
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

// --- Helper Components ---

const StatusBadge = () => (
  <span style={styles.badge}>
    Not implemented
  </span>
);

// New Editable Table Components
interface EditableRowProps {
  data: any;
  columns: { key: string; label: string; width?: string; type?: 'text' | 'textarea' }[];
  rowIndex: number;
  isEditing: boolean;
  onUpdate: (index: number, key: string, value: string) => void;
}

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
  prefixes: string[];
}

const groups: GroupDef[] = [
  { id: '100', title: 'Domän 1: Master data och aggregeringsobjekt', prefixes: ['BRS-FLEX-1'] },
  { id: '200', title: 'Domän 2: Avtal & Marknad', prefixes: ['BRS-FLEX-2'] }, 
  { id: '300', title: 'Domän 3: Produkt & Förkvalificering', prefixes: ['BRS-FLEX-3'] },
  { id: '400', title: 'Domän 4: Nätbegränsningar', prefixes: ['BRS-FLEX-4'] },
  { id: '500', title: 'Domän 5: Baseline', prefixes: ['BRS-FLEX-5'] },
  { id: '600', title: 'Domän 6: Verifiering', prefixes: ['BRS-FLEX-6'] },
];

interface SidebarGroupProps {
  group: GroupDef;
  items: BRSData[];
  isOpen: boolean;
  onToggle: () => void;
  selectedId: string;
  onSelect: (id: string) => void;
  viewMode: 'detail' | 'status';
}

const SidebarGroup: React.FC<SidebarGroupProps> = ({ group, items, isOpen, onToggle, selectedId, onSelect, viewMode }) => {
  const [hover, setHover] = useState(false);

  if (items.length === 0 && group.id !== '500') return null;

  if (items.length === 0) {
      return (
        <div style={styles.treeGroup}>
            <div style={{...styles.treeHeader, opacity: 0.5, cursor: 'default'}}>
                <span style={{...styles.arrow, visibility: 'hidden'}}>▶</span>
                {group.title}
            </div>
        </div>
      )
  }

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
          {items.map(brs => {
             const isActive = viewMode === 'detail' && selectedId === brs.id;
             return (
               <button
                 key={brs.id}
                 onClick={() => onSelect(brs.id)}
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
        </div>
      )}
    </div>
  );
};

// --- ID Generation Helper Functions ---

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
  
  if (brs.postConditions) {
    if (Array.isArray(brs.postConditions.accepted)) collect(brs.postConditions.accepted);
    else if (brs.postConditions.accepted && typeof brs.postConditions.accepted === 'object') ids.push((brs.postConditions.accepted as any).id);

    if (Array.isArray(brs.postConditions.rejected)) collect(brs.postConditions.rejected);
    else if (brs.postConditions.rejected && typeof brs.postConditions.rejected === 'object') ids.push((brs.postConditions.rejected as any).id);
  }

  return ids;
};

const generateNextId = (brs: BRSData, currentList: any[]): string => {
  // 1. Determine prefix from the current list (look for pattern in existing items)
  let prefix = '';
  // Default prefix logic based on BRS ID (remove dashes, add dash at end)
  // e.g. BRS-FLEX-101 -> BRSFLEX101-
  const defaultPrefix = brs.id.replace(/-/g, '') + '-';
  
  // Try to find a pattern in the current list's last object item
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

  // If no prefix found in list, use default
  if (!prefix) {
    prefix = defaultPrefix;
  }

  // 2. Scan ALL IDs in the BRS to find the highest number for this prefix
  const allIds = getAllIds(brs);
  let maxNum = 0;

  allIds.forEach(id => {
    if (id.startsWith(prefix)) {
      const remainder = id.substring(prefix.length);
      const num = parseInt(remainder, 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  });

  return `${prefix}${maxNum + 1}`;
};


const STORAGE_KEY = 'fis-wiki-data-v1';

function App() {
  const [brsData, setBrsData] = useState<BRSData[]>(initialBrsList);
  const [selectedId, setSelectedId] = useState<string>(initialBrsList[0].id);
  const [openGroups, setOpenGroups] = useState<string[]>(['100', '200', '300', '400', '500', '600']);
  const [viewMode, setViewMode] = useState<'detail' | 'status'>('detail');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // Flag to prevent overwriting storage

  // Load from LocalStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Merge with initial list to ensure new files (if any) are present, 
        // but prioritize stored data for existing IDs.
        const merged = initialBrsList.map(item => {
          const found = parsed.find((p: BRSData) => p.id === item.id);
          return found || item;
        });
        setBrsData(merged);
      } catch (e) {
        console.error("Failed to load BRS data", e);
      }
    }
    setIsLoaded(true); // Mark load as complete
  }, []);

  // Save to LocalStorage whenever data changes
  useEffect(() => {
    if (isLoaded) { // Only save if data has been loaded/merged
      localStorage.setItem(STORAGE_KEY, JSON.stringify(brsData));
    }
  }, [brsData, isLoaded]);

  const activeBRS = brsData.find(b => b.id === selectedId) || brsData[0];

  const handleUpdateBRS = (updated: BRSData) => {
    setBrsData(prev => prev.map(item => item.id === updated.id ? updated : item));
  };

  const handleResetData = () => {
    if (confirm("Detta kommer att återställa alla ändringar till ursprungsläget. Är du säker?")) {
      setBrsData(initialBrsList);
      localStorage.removeItem(STORAGE_KEY);
      setIsEditing(false);
    }
  };

  // --- CMS Helper Functions for Arrays ---

  // Helper to normalize data for generic editors
  const normalizeArray = (arr: any[], defaultPrefix: string) => {
    return arr.map((item, i) => {
      if (typeof item === 'string') {
        return { id: `${defaultPrefix}-${i + 1}`, description: item, _isString: true };
      }
      return { ...item, _isString: false };
    });
  };

  const updateArrayItem = (
    field: 'preConditions' | 'businessRules' | 'process',
    index: number, 
    key: string, 
    val: string
  ) => {
    const list = activeBRS[field] as any[];
    const newList = [...list];
    
    // Check if original was string
    const item = newList[index];
    if (typeof item === 'string') {
        // If it was a string, and we edit description, update string. 
        // If we edit ID of a string item, convert to object.
        if (key === 'description') {
            newList[index] = val;
        } else {
            newList[index] = { id: val, description: item };
        }
    } else {
        // It's an object
        newList[index] = { ...item, [key]: val };
    }
    
    handleUpdateBRS({ ...activeBRS, [field]: newList });
  };

  const handleAddArrayItem = (field: 'preConditions' | 'businessRules' | 'process') => {
    const list = (activeBRS[field] || []) as any[];
    const nextId = generateNextId(activeBRS, list);
    
    let newItem: any;
    if (field === 'businessRules') {
      newItem = { id: nextId, description: 'New business rule', errorCode: '' };
    } else if (field === 'preConditions') {
      newItem = { id: nextId, description: 'New pre-condition' };
    } else {
      newItem = { id: nextId, description: 'New step' };
    }
    
    handleUpdateBRS({
      ...activeBRS,
      [field]: [...list, newItem]
    });
  };

  const handleRemoveArrayItem = (field: 'preConditions' | 'businessRules' | 'process', index: number) => {
    const list = [...(activeBRS[field] as any[])];
    list.splice(index, 1);
    handleUpdateBRS({ ...activeBRS, [field]: list });
  };

  // --- Post Conditions Helpers ---
  
  const updatePostCondition = (
    type: 'accepted' | 'rejected',
    index: number,
    key: string,
    val: string
  ) => {
    const pc = { ...activeBRS.postConditions };
    const list = Array.isArray(pc[type]) ? (pc[type] as any[]) : [pc[type] as string];
    const newList = [...list];
    
    const item = newList[index];
    if (typeof item === 'string') {
      if (key === 'description') newList[index] = val;
      else newList[index] = { id: val, description: item };
    } else {
      newList[index] = { ...item, [key]: val };
    }

    pc[type] = newList;
    handleUpdateBRS({ ...activeBRS, postConditions: pc });
  };

  const handleAddPostCondition = (type: 'accepted' | 'rejected') => {
    const pc = { ...activeBRS.postConditions };
    const list = Array.isArray(pc[type]) ? [...(pc[type] as any[])] : (pc[type] ? [pc[type] as string] : []);
    
    // For post conditions, we want to check the specific list to find pattern like BRS-FLEX-201-POST-
    // But scan globally for max number.
    const nextId = generateNextId(activeBRS, list);
    
    list.push({ id: nextId, description: 'New condition' });
    
    pc[type] = list;
    handleUpdateBRS({ ...activeBRS, postConditions: pc });
  };

  const handleRemovePostCondition = (type: 'accepted' | 'rejected', index: number) => {
    const pc = { ...activeBRS.postConditions };
    const list = Array.isArray(pc[type]) ? [...(pc[type] as any[])] : [pc[type] as string];
    list.splice(index, 1);
    pc[type] = list;
    handleUpdateBRS({ ...activeBRS, postConditions: pc });
  };

  // --- Info Objects Helpers ---

  const handleAddInfoAttribute = (infoIndex: number) => {
    const newInfos = [...(activeBRS.infoObjects || [])];
    const info = { ...newInfos[infoIndex] };
    info.attributes = [...info.attributes, { attribute: 'New Attribute', description: '', article: '' }];
    newInfos[infoIndex] = info;
    handleUpdateBRS({ ...activeBRS, infoObjects: newInfos });
  };

  const handleRemoveInfoAttribute = (infoIndex: number, attrIndex: number) => {
    const newInfos = [...(activeBRS.infoObjects || [])];
    const info = { ...newInfos[infoIndex] };
    const attrs = [...info.attributes];
    attrs.splice(attrIndex, 1);
    info.attributes = attrs;
    newInfos[infoIndex] = info;
    handleUpdateBRS({ ...activeBRS, infoObjects: newInfos });
  };

  // --- Render Prep ---

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => 
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };

  const handleSelectBRS = (id: string) => {
    setSelectedId(id);
    setViewMode('detail');
  };

  // Data for tables
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
      
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>FIS Wiki</h1>
          <span style={{ marginLeft: '16px', opacity: 0.8, fontSize: '0.9rem', borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: '16px' }}>
            Technical Specifications {isEditing && <span style={{backgroundColor: '#ffab00', color: '#000', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', marginLeft: '8px'}}>EDIT MODE</span>}
          </span>
        </div>
        <div>
          <button 
             onClick={() => setIsEditing(!isEditing)} 
             style={{...styles.navButton, ...(isEditing ? styles.navButtonActive : {})}}
          >
            {isEditing ? 'Exit Edit Mode' : '✎ Edit Content'}
          </button>
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
          
          {/* Sidebar */}
          <nav style={styles.sidebar}>
             <div style={styles.menuHeader}>Översikt</div>
             <button
                onClick={() => setViewMode('status')}
                style={{
                  ...styles.treeItem,
                  fontWeight: 500,
                  ...(viewMode === 'status' ? styles.treeItemActive : {})
                }}
            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{fontSize: '1.1rem', marginRight: '8px'}}>📊</span>
                    Status Dashboard
                </div>
            </button>

            <div style={styles.menuHeader}>Dokumentation</div>
            {groups.map(group => {
              const groupItems = brsData.filter(item => group.prefixes.some(prefix => item.id.startsWith(prefix)));
              return (
                <SidebarGroup 
                  key={group.id}
                  group={group}
                  items={groupItems}
                  isOpen={openGroups.includes(group.id)}
                  onToggle={() => toggleGroup(group.id)}
                  selectedId={selectedId}
                  onSelect={handleSelectBRS}
                  viewMode={viewMode}
                />
              );
            })}
          </nav>

          {/* Content Area */}
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {viewMode === 'status' ? (
              <div style={{flex: 1, overflowY: 'auto', backgroundColor: '#e0e0e0', padding: '40px'}}>
                  <StatusPage data={brsData} onSelectBRS={handleSelectBRS} />
              </div>
            ) : (
              <div style={styles.mainScroll}>
                <div style={styles.paper}>
                  
                  {/* 1. Header Block */}
                  <div>
                    <div style={styles.docId}>
                      {activeBRS.id} 
                      <StatusBadge />
                    </div>
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

                  {/* 2. Purpose (Editable) */}
                  <PurposeSection 
                    activeBRS={activeBRS} 
                    styles={styles} 
                    isEditing={isEditing}
                    onUpdate={handleUpdateBRS}
                  />

                  {/* 3. Constraints */}
                  <section>
                    <h2 style={styles.sectionHeader}>Constraints</h2>

                    <h3 style={styles.subHeader}>Start conditions</h3>
                    <EditableTable 
                      data={startConditionsData}
                      columns={[
                        { key: 'id', label: 'Rule #', width: '20%' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                      ]}
                      isEditing={isEditing}
                      onUpdate={(idx, key, val) => updateArrayItem('preConditions', idx, key, val)}
                      onAdd={() => handleAddArrayItem('preConditions')}
                      onRemove={(idx) => handleRemoveArrayItem('preConditions', idx)}
                    />

                    <h3 style={styles.subHeader}>Stop conditions</h3>
                    
                    <h4 style={styles.subSubHeader}>If accepted</h4>
                    <EditableTable 
                      data={acceptedData}
                      columns={[
                        { key: 'id', label: 'Rule #', width: '20%' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                      ]}
                      isEditing={isEditing}
                      onUpdate={(idx, key, val) => updatePostCondition('accepted', idx, key, val)}
                      onAdd={() => handleAddPostCondition('accepted')}
                      onRemove={(idx) => handleRemovePostCondition('accepted', idx)}
                    />

                    <h4 style={styles.subSubHeader}>If rejected</h4>
                    <EditableTable 
                      data={rejectedData}
                      columns={[
                        { key: 'id', label: 'Rule #', width: '20%' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                      ]}
                      isEditing={isEditing}
                      onUpdate={(idx, key, val) => updatePostCondition('rejected', idx, key, val)}
                      onAdd={() => handleAddPostCondition('rejected')}
                      onRemove={(idx) => handleRemovePostCondition('rejected', idx)}
                    />
                  </section>

                  {/* 4. Business rules */}
                  <section>
                    <h2 style={styles.sectionHeader}>Business rules</h2>
                    <EditableTable 
                      data={activeBRS.businessRules}
                      columns={[
                        { key: 'id', label: 'Rule #', width: '15%' },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'errorCode', label: 'Error message', width: '25%' }
                      ]}
                      isEditing={isEditing}
                      onUpdate={(idx, key, val) => updateArrayItem('businessRules', idx, key, val)}
                      onAdd={() => handleAddArrayItem('businessRules')}
                      onRemove={(idx) => handleRemoveArrayItem('businessRules', idx)}
                    />
                  </section>

                  {/* 5. Flows */}
                  <section>
                    <h2 style={styles.sectionHeader}>Flows</h2>
                    
                    <h3 style={styles.subHeader}>Normal flow</h3>
                    <EditableTable 
                      data={flowData}
                      columns={[
                        { key: 'id', label: 'Rule #', width: '15%' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                      ]}
                      isEditing={isEditing}
                      onUpdate={(idx, key, val) => updateArrayItem('process', idx, key, val)}
                      onAdd={() => handleAddArrayItem('process')}
                      onRemove={(idx) => handleRemoveArrayItem('process', idx)}
                    />
                  </section>

                  {/* 6. Content in information flow */}
                  {activeBRS.infoObjects && activeBRS.infoObjects.length > 0 && (
                    <section>
                      <h2 style={styles.sectionHeader}>Content in information flow</h2>
                      {activeBRS.infoObjects.map((io, idx) => (
                        <div key={idx} style={{ marginBottom: '24px' }}>
                          <h3 style={styles.subHeader}>Informationsobjekt – {io.title}</h3>
                          <EditableTable 
                             data={io.attributes}
                             columns={[
                               { key: 'attribute', label: 'Attribute', width: '25%' },
                               { key: 'description', label: 'Description / Comment', type: 'textarea' },
                               { key: 'article', label: 'Relevant Article', width: '20%' }
                             ]}
                             isEditing={isEditing}
                             onUpdate={(rowIdx, key, val) => {
                               // Deep nested update for Info Objects
                               const newInfos = [...(activeBRS.infoObjects || [])];
                               const newAttrs = [...newInfos[idx].attributes];
                               newAttrs[rowIdx] = { ...newAttrs[rowIdx], [key]: val };
                               newInfos[idx] = { ...newInfos[idx], attributes: newAttrs };
                               handleUpdateBRS({ ...activeBRS, infoObjects: newInfos });
                             }}
                             onAdd={() => handleAddInfoAttribute(idx)}
                             onRemove={(rowIdx) => handleRemoveInfoAttribute(idx, rowIdx)}
                          />
                        </div>
                      ))}
                    </section>
                  )}

                </div>
                
                <footer style={{ marginTop: '40px', color: '#888', fontSize: '0.8rem', textAlign: 'center' }}>
                  &copy; {new Date().getFullYear()} Flexibilitetsregistret (FIS).
                </footer>
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
