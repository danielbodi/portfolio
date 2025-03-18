import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import { formatSettingsToTypeScript } from '../../utils/gradientSettingsSaver';
import { useGradientSettings } from '../../context/GradientSettingsContext';
import './GradientControlPanel.css';

// Generate a truly unique ID for color stops
function generateUniqueId(): string {
  return `color-stop-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

interface ColorStop {
  id: string;
  hue: number;
  saturation: number;
  lightness: number;
  opacity: number;
  position: number;
}

interface GradientControlPanelProps {
  onSettingsChange: (settings: GradientSettings) => void;
  initialSettings?: Partial<GradientSettings>;
}

export interface GradientSettings {
  // Base angle and intensity
  baseAngle: number;
  intensityMultiplier: number;
  // Colors
  colorStops: ColorStop[];
  // Animation settings
  springTension: number;
  // Performance
  performanceMode: boolean;
  disableAnimation: boolean;
  throttleMs: number;
}

// Default color stop factory with unique IDs
const defaultColorStop = (position: number): ColorStop => ({
  id: generateUniqueId(),
  hue: 240,
  saturation: 50,
  lightness: 50,
  opacity: 0.9,
  position
});

const defaultSettings: GradientSettings = {
  baseAngle: 45,
  intensityMultiplier: 1,
  colorStops: [
    defaultColorStop(0),
    defaultColorStop(50),
    defaultColorStop(100)
  ],
  springTension: 0.15,
  performanceMode: false,
  disableAnimation: false,
  throttleMs: 16
};

// Helper to detect if two objects are the same
function shallowEqual(obj1: any, obj2: any) {
  if (obj1 === obj2) return true;
  if (!obj1 || !obj2) return false;
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  
  return true;
}

// Helper function to convert hex to HSL for updating state
const hexToHsl = (hex: string): { h: number, s: number, l: number } => {
  // Remove the # if present
  hex = hex.replace(/^#/, '');
  
  // Parse the hex values
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;
  
  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b);
  let cmax = Math.max(r, g, b);
  let delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;
  
  // Calculate hue
  if (delta === 0) {
    h = 0;
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }
  
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  
  // Calculate lightness
  l = (cmax + cmin) / 2;
  
  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  
  // Convert to percentages
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return { h, s, l };
};

// Helper to convert HSL to hex for color input
const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;
  
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export function GradientControlPanel({ 
  onSettingsChange, 
  initialSettings = {} 
}: GradientControlPanelProps) {
  const { settings, updateSettings, resetSettings } = useGradientSettings();
  const isFirstRender = useRef(true);
  const previousInitialSettings = useRef(initialSettings);
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedStops, setExpandedStops] = useState<Record<string, boolean>>({});
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedStopId, setSelectedStopId] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState<number | null>(null);
  const [draggingStopId, setDraggingStopId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const dragEndListenerAddedRef = useRef(false);
  
  // Update settings when initialSettings change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    // Only update if initialSettings actually changed
    if (!shallowEqual(initialSettings, previousInitialSettings.current)) {
      previousInitialSettings.current = initialSettings;
      
      // Ensure color stops have unique IDs if they come from initialSettings
      const initialColorStops = initialSettings.colorStops 
        ? initialSettings.colorStops as ColorStop[] 
        : undefined;
      
      const updatedSettings = {
        ...settings,
        ...initialSettings,
        ...(initialColorStops ? { colorStops: initialColorStops } : {})
      };
      
      // Update settings without triggering another render cycle
      updateSettings(updatedSettings);
      
      // Notify parent of changes
      onSettingsChange(updatedSettings);
    }
  // Remove settings from dependency array to break the cycle
  }, [initialSettings, onSettingsChange, updateSettings]);

  // Update parent component when settings change (but only from user input)
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : 
                    type === 'number' ? parseFloat(value) : 
                    parseFloat(value) || value;
    
    const updatedSettings = {
      ...settings,
      [name]: newValue
    };
    
    updateSettings(updatedSettings);
    onSettingsChange(updatedSettings);
  }, [settings, updateSettings, onSettingsChange]);

  // Add a new color stop
  const handleAddColorStop = useCallback((customStop?: any) => {
    // If we have too many stops already, don't add more
    if (settings.colorStops.length >= 10) {
      alert('Maximum of 10 color stops allowed');
      return;
    }
    
    if (customStop) {
      // Ensure the custom stop has a unique ID
      const newCustomStop = {
        ...customStop,
        id: generateUniqueId() // Always generate a new ID
      };
      
      const updatedStops = [...settings.colorStops, newCustomStop];
      const updatedSettings = {
        ...settings,
        colorStops: updatedStops
      };
      updateSettings(updatedSettings);
      onSettingsChange(updatedSettings);
      return;
    }
    
    // Create a new stop based on interpolation between existing stops
    const newStop = {
      id: generateUniqueId(), // Ensure a unique ID
      hue: 240,
      saturation: 100,
      lightness: 50,
      opacity: 1,
      position: 50 // Default to middle
    };
    
    const updatedStops = [...settings.colorStops, newStop];
    const updatedSettings = {
      ...settings,
      colorStops: updatedStops
    };
    updateSettings(updatedSettings);
    onSettingsChange(updatedSettings);
  }, [settings, updateSettings, onSettingsChange]);

  const handleRemoveColorStop = useCallback((id: string) => {
    if (settings.colorStops.length <= 2) return; // Keep at least 2 color stops
    
    const updatedStops = settings.colorStops.filter(stop => stop.id !== id);
    const updatedSettings = {
      ...settings,
      colorStops: updatedStops
    };
    updateSettings(updatedSettings);
    onSettingsChange(updatedSettings);
  }, [settings, updateSettings, onSettingsChange]);

  const handleDragEnd = useCallback((result: DropResult) => {
    // Ignore if dropped outside the list or if source and destination are the same
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }

    console.log('Drag ended:', result);
    
    // Create a new array without mutating the original
    const itemsCopy = Array.from(settings.colorStops);
    
    // Get the dragged item
    const draggedItem = itemsCopy[result.source.index];
    
    // Remove the item from its original position
    itemsCopy.splice(result.source.index, 1);
    
    // Insert the item at its new position
    itemsCopy.splice(result.destination.index, 0, draggedItem);

    const updatedSettings = {
      ...settings,
      colorStops: itemsCopy
    };
    
    updateSettings(updatedSettings);
    onSettingsChange(updatedSettings);
  }, [settings, updateSettings, onSettingsChange]);

  const handleColorStopChange = useCallback((id: string, field: keyof ColorStop, value: number) => {
    const updatedStops = settings.colorStops.map(stop => {
      if (stop.id === id) {
        // Don't regenerate ID when changing position to maintain drag and drop stability
        return { ...stop, [field]: value };
      }
      return stop;
    });
    
    const updatedSettings = {
      ...settings,
      colorStops: updatedStops
    };
    updateSettings(updatedSettings);
    onSettingsChange(updatedSettings);
  }, [settings, updateSettings, onSettingsChange]);

  // Handler for color picker change
  const handleColorPickerChange = useCallback((id: string, hex: string) => {
    const { h, s, l } = hexToHsl(hex);
    
    const updatedStops = settings.colorStops.map(stop => {
      if (stop.id === id) {
        return { 
          ...stop, 
          hue: h, 
          saturation: s, 
          lightness: l 
        };
      }
      return stop;
    });
    
    const updatedSettings = {
      ...settings,
      colorStops: updatedStops
    };
    
    updateSettings(updatedSettings);
    onSettingsChange(updatedSettings);
  }, [settings, updateSettings, onSettingsChange]);

  // Generate gradient string for preview
  const gradientString = [...settings.colorStops]
    .sort((a, b) => a.position - b.position)
    .map(stop => `hsla(${stop.hue}, ${stop.saturation}%, ${stop.lightness}%, ${stop.opacity}) ${stop.position}%`)
    .join(', ');

  // Reset to defaults
  const handleReset = useCallback(() => {
    resetSettings();
    onSettingsChange(defaultSettings);
  }, [resetSettings, onSettingsChange]);

  const copyToClipboard = useCallback((value: string, stopId: string) => {
    navigator.clipboard.writeText(value)
      .then(() => {
        setCopiedValue(stopId);
        setTimeout(() => setCopiedValue(null), 1500);
      })
      .catch(err => console.error('Could not copy text: ', err));
  }, []);

  // Function to export settings to a file
  const exportSettingsToFile = useCallback(() => {
    // Format as TypeScript code
    const formattedColorStops = settings.colorStops.map(stop => `  {
    id: '${stop.id}',
    hue: ${stop.hue},
    saturation: ${stop.saturation},
    lightness: ${stop.lightness},
    opacity: ${stop.opacity},
    position: ${stop.position}
  }`).join(',\n');
    
    const fileContent = `// Generated gradient settings - ${new Date().toLocaleString()}
export const savedGradientSettings = {
  baseAngle: ${settings.baseAngle},
  intensityMultiplier: ${settings.intensityMultiplier},
  colorStops: [
${formattedColorStops}
  ],
  springTension: ${settings.springTension},
  performanceMode: ${settings.performanceMode},
  disableAnimation: ${settings.disableAnimation},
  throttleMs: ${settings.throttleMs}
};`;

    // Create blob and download
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gradient-settings.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [settings]);

  // Function to handle file import
  const handleFileImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        
        // Extract the settings object using regex
        const settingsMatch = content.match(/export const savedGradientSettings = ({[\s\S]*?});/);
        if (!settingsMatch || !settingsMatch[1]) {
          throw new Error('Could not find valid settings in the file');
        }
        
        // Convert to a JavaScript object (careful with eval)
        // This is simplified; in production you'd want a safer approach
        const settingsObj = new Function(`return ${settingsMatch[1]}`)();
        
        // Validate the imported settings
        if (!settingsObj || typeof settingsObj !== 'object' || !Array.isArray(settingsObj.colorStops)) {
          throw new Error('Invalid settings format');
        }
        
        // Apply the imported settings
        updateSettings(settingsObj);
        onSettingsChange(settingsObj);
        
        alert('Settings imported successfully!');
      } catch (error) {
        console.error('Error importing settings:', error);
        alert('Failed to import settings. Make sure the file has the correct format.');
      } finally {
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    
    reader.readAsText(file);
  }, [updateSettings, onSettingsChange]);

  // Trigger file input click
  const triggerFileUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Show code to save as defaults
  const showSaveAsDefaultsCode = useCallback(() => {
    // Format the code
    const formattedCode = formatSettingsToTypeScript(settings);
    
    // Copy to clipboard
    navigator.clipboard.writeText(formattedCode)
      .then(() => {
        alert('Code copied to clipboard! You can now paste this into your default settings file.');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        setShowWarningModal(true);
      });
  }, [settings]);

  // Close the modal
  const closeWarningModal = useCallback(() => {
    setShowWarningModal(false);
  }, []);

  // Toggle expanded state for a color stop
  const toggleExpandedStop = useCallback((stopId: string) => {
    setExpandedStops(prev => ({
      ...prev,
      [stopId]: !prev[stopId]
    }));
    // When expanding a stop, also set it as selected
    setSelectedStopId(stopId);
  }, []);

  // Function to calculate position percentage from a mouse event
  const calculatePositionPercentage = useCallback((e: React.MouseEvent | React.DragEvent, element: HTMLElement): number => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    return Math.min(100, Math.max(0, Math.round((x / rect.width) * 100)));
  }, []);

  // Add document-level listeners to ensure drag states are cleaned up
  useEffect(() => {
    // Clean up any dangling drag states
    const handleDragEnd = () => {
      setDraggingStopId(null);
      setDragPosition(null);
      dragEndListenerAddedRef.current = false;
    };

    // Also listen for escape key to cancel drag operations
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDragEnd();
      }
    };

    document.addEventListener('dragend', handleDragEnd);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('dragend', handleDragEnd);
      document.removeEventListener('keydown', handleKeyDown);
      dragEndListenerAddedRef.current = false;
    };
  }, []);

  // Add document-level drag monitor
  useEffect(() => {
    const handleGlobalDragOver = (e: DragEvent) => {
      // If we're dragging over something that's not our preview
      if (dragPosition !== null && 
          previewRef.current && 
          !previewRef.current.contains(e.target as Node)) {
        // This is useful for detecting when a drag operation moves outside our area
        // We could implement additional behavior here if needed
      }
    };
    
    // Listen for global dragover events only when actually dragging
    if (draggingStopId !== null) {
      document.addEventListener('dragover', handleGlobalDragOver);
    }
    
    return () => {
      document.removeEventListener('dragover', handleGlobalDragOver);
    };
  }, [draggingStopId, dragPosition]);

  // Create a new color stop with default values at the given position
  const createColorStop = useCallback((position: number) => {
    // Create interpolated color if we have existing color stops
    if (settings.colorStops.length > 0) {
      // Sort stops by position
      const sortedStops = [...settings.colorStops].sort((a, b) => a.position - b.position);
      
      // Find the two stops that this position falls between
      let leftStop = sortedStops[0];
      let rightStop = sortedStops[sortedStops.length - 1];
      
      for (let i = 0; i < sortedStops.length - 1; i++) {
        if (sortedStops[i].position <= position && sortedStops[i + 1].position >= position) {
          leftStop = sortedStops[i];
          rightStop = sortedStops[i + 1];
          break;
        }
      }
      
      // Interpolate color based on position between the two stops
      const totalRange = rightStop.position - leftStop.position;
      const positionInRange = position - leftStop.position;
      const ratio = totalRange > 0 ? positionInRange / totalRange : 0;
      
      // Interpolate each color component
      const interpolateValue = (start: number, end: number) => 
        Math.round(start + ratio * (end - start));
      
      // Create a new stop based on interpolation
      return {
        id: generateUniqueId(), // Ensure a unique ID
        hue: interpolateValue(leftStop.hue, rightStop.hue),
        saturation: interpolateValue(leftStop.saturation, rightStop.saturation),
        lightness: interpolateValue(leftStop.lightness, rightStop.lightness),
        opacity: parseFloat((leftStop.opacity + ratio * (rightStop.opacity - leftStop.opacity)).toFixed(2)),
        position: position
      };
    }
    
    // Default color stop if no existing stops to interpolate from
    return {
      id: generateUniqueId(),
      hue: 210,
      saturation: 100,
      lightness: 50,
      opacity: 1,
      position: position
    };
  }, [settings.colorStops, generateUniqueId]);

  return (
    <div className="c-gradient-control-panel">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileImport}
        accept=".ts,.js,.txt"
        style={{ display: 'none' }}
      />
      
      {/* Warning Modal */}
      {showWarningModal && (
        <div className="c-gradient-control-panel__modal-overlay">
          <div className="c-gradient-control-panel__modal">
            <h4>Save as Default Settings</h4>
            <p>To save these settings as the application defaults, copy the following code and replace the contents of your default settings file:</p>
            <pre className="c-gradient-control-panel__code-preview">
              {formatSettingsToTypeScript(settings)}
            </pre>
            <div className="c-gradient-control-panel__modal-actions">
              <button 
                className="c-gradient-control-panel__copy-code" 
                onClick={() => {
                  navigator.clipboard.writeText(formatSettingsToTypeScript(settings));
                  alert('Code copied to clipboard!');
                }}
              >
                Copy Code
              </button>
              <button 
                className="c-gradient-control-panel__close-modal" 
                onClick={closeWarningModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button 
        className="c-gradient-control-panel__toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        style={{ 
          position: 'fixed',
          zIndex: 9999,
          bottom: '20px',
          right: '20px'
        }}
      >
        {isExpanded ? 'Hide Controls' : 'Gradient Controls'}
      </button>
      
      {isExpanded && (
        <div className="c-gradient-control-panel__content">
          <div className="c-gradient-control-panel__header">
            <h3>Gradient Animation Settings</h3>
            <div className="c-gradient-control-panel__header-buttons">
              <button 
                className="c-gradient-control-panel__save-defaults" 
                onClick={() => setShowWarningModal(true)}
                title="Generate code to replace default settings"
              >
                Save as Defaults
              </button>
              <button 
                className="c-gradient-control-panel__import" 
                onClick={triggerFileUpload}
                title="Import settings from file"
              >
                Import
              </button>
              <button 
                className="c-gradient-control-panel__export" 
                onClick={exportSettingsToFile}
                title="Export settings as TypeScript file"
              >
                Export
              </button>
              <button 
                className="c-gradient-control-panel__reset" 
                onClick={handleReset}
              >
                Reset Defaults
              </button>
            </div>
          </div>

          <div className="c-gradient-control-panel__preview">
            <div className="c-gradient-control-panel__gradient-preview-container">
              <div 
                ref={previewRef}
                style={{
                  background: `linear-gradient(to right, ${gradientString})`,
                  ['--marker-position' as string]: dragPosition !== null ? `${dragPosition}%` : '0%',
                } as React.CSSProperties}
                className={`c-gradient-control-panel__gradient-preview ${dragPosition !== null ? 'dragging' : ''}`}
                onClick={(e) => {
                  if (!previewRef.current) return;
                  
                  // Calculate position as percentage of width
                  const position = calculatePositionPercentage(e, previewRef.current);
                  
                  // Add a new color stop at this position
                  const newStop = createColorStop(position);
                  
                  // Add it to our array
                  const newStops = [...settings.colorStops, newStop];
                  
                  // Sort by position for consistent display
                  newStops.sort((a, b) => a.position - b.position);
                  
                  // Update context
                  updateSettings({ ...settings, colorStops: newStops });
                  
                  // Select the new stop
                  setSelectedStopId(newStop.id);
                }}
                onDragOver={(e) => {
                  try {
                    e.preventDefault();
                    e.stopPropagation(); // Prevent event bubbling
                    e.dataTransfer.dropEffect = 'move'; // Explicitly set the drop effect
                    
                    if (!previewRef.current) return;
                    
                    const position = calculatePositionPercentage(e, previewRef.current);
                    setDragPosition(position);
                  } catch (err) {
                    console.log('Drag over error:', err);
                    // Don't reset drag states here to avoid flickering
                  }
                }}
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Prevent event bubbling
                  if (previewRef.current) {
                    const position = calculatePositionPercentage(e, previewRef.current);
                    setDragPosition(position);
                  }
                  
                  // Only add the listener once to prevent duplicates
                  if (!dragEndListenerAddedRef.current) {
                    document.addEventListener('dragend', () => {
                      setDraggingStopId(null);
                      setDragPosition(null);
                    }, { once: true });
                    dragEndListenerAddedRef.current = true;
                  }
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Prevent event bubbling
                  // Only clear if leaving the preview element itself, not its children
                  if (e.currentTarget === e.target) {
                    setDragPosition(null);
                  }
                }}
                onDrop={(e) => {
                  try {
                    e.preventDefault();
                    e.stopPropagation(); // Prevent event bubbling
                    const stopId = e.dataTransfer.getData('text/plain');
                    setDragPosition(null); // Clear the indicator
                    setDraggingStopId(null); // Ensure dragging state is cleared
                    
                    if (!stopId || !previewRef.current) return;
                    
                    // Make sure the ID refers to an existing color stop
                    const existingStop = settings.colorStops.find(stop => stop.id === stopId);
                    if (!existingStop) return;
                    
                    // Calculate new position based on drop location
                    const newPosition = calculatePositionPercentage(e, previewRef.current);
                    
                    // Only update if position has actually changed
                    if (existingStop.position !== newPosition) {
                      // Update the color stop position
                      handleColorStopChange(stopId, 'position', newPosition);
                    }
                  } catch (err) {
                    console.log('Drop handling error:', err);
                    // Reset UI state in case of error
                    setDragPosition(null);
                    setDraggingStopId(null);
                  }
                }}
              >
                {/* Position indicators for color stops */}
                <div className="c-gradient-control-panel__gradient-markers">
                  {[...settings.colorStops]
                    .sort((a, b) => a.position - b.position)
                    .map((stop, index) => (
                      <div 
                        key={stop.id}
                        className={`c-gradient-control-panel__gradient-marker 
                          ${selectedStopId === stop.id ? 'selected' : ''} 
                          ${draggingStopId === stop.id ? 'dragging' : ''}`}
                        style={{ 
                          left: `${stop.position}%`,
                          backgroundColor: `hsla(${stop.hue}, ${stop.saturation}%, ${stop.lightness}%, ${stop.opacity})`
                        }}
                        title={`Stop ${index + 1}: ${stop.position}%`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent creating a new stop
                          setSelectedStopId(stop.id);
                          // Expand this color stop if it's not already expanded
                          if (!expandedStops[stop.id]) {
                            toggleExpandedStop(stop.id);
                          }
                          // Scroll to the color stop
                          document.getElementById(`color-stop-${stop.id}`)?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                          });
                        }}
                        draggable={true}
                        onDragStart={(e) => {
                          e.stopPropagation(); // Prevent event bubbling
                          e.dataTransfer.setData('text/plain', stop.id);
                          e.dataTransfer.effectAllowed = 'move';
                          setSelectedStopId(stop.id);
                          setDraggingStopId(stop.id);
                          
                          try {
                            // Create a custom drag image
                            const dragImage = document.createElement('div');
                            dragImage.style.width = '10px';
                            dragImage.style.height = '20px';
                            dragImage.style.backgroundColor = `hsla(${stop.hue}, ${stop.saturation}%, ${stop.lightness}%, ${stop.opacity})`;
                            dragImage.style.position = 'absolute';
                            dragImage.style.top = '-1000px';
                            
                            // Add to document
                            document.body.appendChild(dragImage);
                            
                            // Set as drag image
                            e.dataTransfer.setDragImage(dragImage, 5, 10);
                            
                            // Remove after a short delay
                            window.requestAnimationFrame(() => {
                              if (dragImage.parentNode) {
                                dragImage.parentNode.removeChild(dragImage);
                              }
                            });
                          } catch (err) {
                            console.log('Drag image error:', err);
                            // Continue with drag operation even if drag image fails
                          }
                        }}
                        onDragEnd={(e) => {
                          e.stopPropagation(); // Prevent event bubbling
                          setDraggingStopId(null);
                        }}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Basic Settings */}
          <section className="c-gradient-control-panel__section">
            <h4>Basic Settings</h4>
            
            <div className="c-gradient-control-panel__field">
              <label htmlFor="baseAngle">Base Angle (°)</label>
              <input
                id="baseAngle"
                name="baseAngle"
                type="range"
                min="0"
                max="360"
                value={settings.baseAngle}
                onChange={handleChange}
              />
              <span className="c-gradient-control-panel__value">{settings.baseAngle}°</span>
            </div>

            <div className="c-gradient-control-panel__field">
              <label htmlFor="intensityMultiplier">Intensity Multiplier</label>
              <input
                id="intensityMultiplier"
                name="intensityMultiplier"
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={settings.intensityMultiplier}
                onChange={handleChange}
              />
              <span className="c-gradient-control-panel__value">{settings.intensityMultiplier}x</span>
            </div>
            
            <div className="c-gradient-control-panel__field">
              <label htmlFor="springTension">Spring Tension</label>
              <input
                id="springTension"
                name="springTension"
                type="range"
                min="0.05"
                max="0.5"
                step="0.05"
                value={settings.springTension}
                onChange={handleChange}
              />
              <span className="c-gradient-control-panel__value">{settings.springTension}</span>
            </div>
          </section>

          {/* Color Settings */}
          <section className="c-gradient-control-panel__section">
            <h4>Gradient Colors</h4>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="color-stops">
                {(provided: DroppableProvided) => (
                  <div 
                    {...provided.droppableProps} 
                    ref={provided.innerRef} 
                    className="c-gradient-control-panel__droppable"
                    data-testid="color-stops-droppable"
                  >
                    {/* Use the original array for drag and drop, not sorted */}
                    {settings.colorStops.map((stop, index) => {
                      // Calculate display index based on position for label display
                      const sortedIndex = [...settings.colorStops]
                        .sort((a, b) => a.position - b.position)
                        .findIndex(s => s.id === stop.id);
                      
                      return (
                        <Draggable 
                          key={stop.id} 
                          draggableId={stop.id} 
                          index={index}
                        >
                          {(provided: DraggableProvided) => (
                            <div
                              id={`color-stop-${stop.id}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`c-gradient-control-panel__color-section ${selectedStopId === stop.id ? 'selected' : ''}`}
                            >
                              <div className="c-gradient-control-panel__color-header">
                                <div {...provided.dragHandleProps} className="c-gradient-control-panel__drag-handle">
                                  ⋮⋮
                                </div>
                                <h5>
                                  Color Stop {sortedIndex + 1}
                                  <span 
                                    className="c-gradient-control-panel__color-preview" 
                                    style={{ 
                                      backgroundColor: `hsla(${stop.hue}, ${stop.saturation}%, ${stop.lightness}%, ${stop.opacity})` 
                                    }}
                                    data-position={`${stop.position}%`}
                                  />
                                </h5>
                                <input 
                                  type="color" 
                                  className="c-gradient-control-panel__color-picker"
                                  value={hslToHex(stop.hue, stop.saturation, stop.lightness)}
                                  onChange={(e) => handleColorPickerChange(stop.id, e.target.value)}
                                  title="Pick a color"
                                />
                                <button 
                                  className="c-gradient-control-panel__remove-stop"
                                  onClick={() => handleRemoveColorStop(stop.id)}
                                  disabled={settings.colorStops.length <= 2}
                                >
                                  ×
                                </button>
                              </div>

                              <div className="c-gradient-control-panel__color-info">
                                <span 
                                  className="c-gradient-control-panel__color-hex" 
                                  onClick={() => copyToClipboard(hslToHex(stop.hue, stop.saturation, stop.lightness), `hex-${stop.id}`)}
                                  title="Click to copy HEX"
                                >
                                  {copiedValue === `hex-${stop.id}` ? "Copied!" : hslToHex(stop.hue, stop.saturation, stop.lightness)}
                                </span>
                                <span 
                                  className="c-gradient-control-panel__color-hsl"
                                  onClick={() => copyToClipboard(`hsla(${stop.hue}, ${stop.saturation}%, ${stop.lightness}%, ${stop.opacity})`, `hsl-${stop.id}`)}
                                  title="Click to copy HSLA"
                                >
                                  {copiedValue === `hsl-${stop.id}` ? "Copied!" : `hsla(${stop.hue}, ${stop.saturation}%, ${stop.lightness}%, ${stop.opacity})`}
                                </span>
                              </div>

                              <div className="c-gradient-control-panel__field">
                                <label>Position</label>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={stop.position}
                                  onChange={(e) => handleColorStopChange(stop.id, 'position', parseFloat(e.target.value))}
                                  className="position-slider"
                                />
                                <div className="c-gradient-control-panel__value-input">
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={stop.position}
                                    onChange={(e) => handleColorStopChange(stop.id, 'position', Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                                    className="c-gradient-control-panel__number-input"
                                  />
                                  <span>%</span>
                                </div>
                              </div>

                              <div className="c-gradient-control-panel__field">
                                <label>Hue</label>
                                <input
                                  type="range"
                                  min="0"
                                  max="360"
                                  value={stop.hue}
                                  onChange={(e) => handleColorStopChange(stop.id, 'hue', parseFloat(e.target.value))}
                                />
                                <div className="c-gradient-control-panel__value-input">
                                  <input
                                    type="number"
                                    min="0"
                                    max="360"
                                    value={stop.hue}
                                    onChange={(e) => handleColorStopChange(stop.id, 'hue', Math.min(360, Math.max(0, parseFloat(e.target.value) || 0)))}
                                    className="c-gradient-control-panel__number-input"
                                  />
                                  <span>°</span>
                                </div>
                              </div>

                              <div className="c-gradient-control-panel__field">
                                <label>Saturation</label>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={stop.saturation}
                                  onChange={(e) => handleColorStopChange(stop.id, 'saturation', parseFloat(e.target.value))}
                                />
                                <div className="c-gradient-control-panel__value-input">
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={stop.saturation}
                                    onChange={(e) => handleColorStopChange(stop.id, 'saturation', Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                                    className="c-gradient-control-panel__number-input"
                                  />
                                  <span>%</span>
                                </div>
                              </div>

                              <div className="c-gradient-control-panel__field">
                                <label>Lightness</label>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={stop.lightness}
                                  onChange={(e) => handleColorStopChange(stop.id, 'lightness', parseFloat(e.target.value))}
                                />
                                <div className="c-gradient-control-panel__value-input">
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={stop.lightness}
                                    onChange={(e) => handleColorStopChange(stop.id, 'lightness', Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                                    className="c-gradient-control-panel__number-input"
                                  />
                                  <span>%</span>
                                </div>
                              </div>

                              <div className="c-gradient-control-panel__field">
                                <label>Opacity</label>
                                <input
                                  type="range"
                                  min="0"
                                  max="1"
                                  step="0.1"
                                  value={stop.opacity}
                                  onChange={(e) => handleColorStopChange(stop.id, 'opacity', parseFloat(e.target.value))}
                                />
                                <div className="c-gradient-control-panel__value-input">
                                  <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={stop.opacity}
                                    onChange={(e) => handleColorStopChange(stop.id, 'opacity', Math.min(1, Math.max(0, parseFloat(e.target.value) || 0)))}
                                    className="c-gradient-control-panel__number-input"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <button 
              className="c-gradient-control-panel__add-stop"
              onClick={() => handleAddColorStop()}
            >
              Add Color Stop
            </button>
          </section>

          {/* Performance Settings */}
          <section className="c-gradient-control-panel__section">
            <h4>Performance Settings</h4>
            
            <div className="c-gradient-control-panel__field c-gradient-control-panel__field--checkbox">
              <input
                type="checkbox"
                id="performanceMode"
                name="performanceMode"
                checked={settings.performanceMode}
                onChange={handleChange}
              />
              <label htmlFor="performanceMode">Performance Mode</label>
            </div>

            <div className="c-gradient-control-panel__field c-gradient-control-panel__field--checkbox">
              <input
                type="checkbox"
                id="disableAnimation"
                name="disableAnimation"
                checked={settings.disableAnimation}
                onChange={handleChange}
              />
              <label htmlFor="disableAnimation">Disable Animation</label>
            </div>

            <div className="c-gradient-control-panel__field">
              <label htmlFor="throttleMs">Throttle Time (ms)</label>
              <input
                id="throttleMs"
                name="throttleMs"
                type="range"
                min="0"
                max="100"
                step="1"
                value={settings.throttleMs}
                onChange={handleChange}
                disabled={settings.disableAnimation}
              />
              <span className="c-gradient-control-panel__value">{settings.throttleMs}ms</span>
            </div>
          </section>
        </div>
      )}
    </div>
  );
} 