import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { GradientSettings } from '../ui/components/GradientControlPanel';
import { defaultGradientSettings } from '../utils/defaultGradientSettings';

// Generate default color stops if none provided
function generateDefaultColorStops() {
  return [
    {
      id: 'color-stop-0',
      hue: 240,
      saturation: 5,
      lightness: 23,
      opacity: 0.9,
      position: 0
    },
    {
      id: 'color-stop-50',
      hue: 247,
      saturation: 60,
      lightness: 68,
      opacity: 0.8,
      position: 50
    },
    {
      id: 'color-stop-100',
      hue: 270,
      saturation: 100,
      lightness: 78,
      opacity: 0.9,
      position: 100
    }
  ];
}

// Default gradient settings - using imported defaults
const defaultSettings: GradientSettings = {
  "baseAngle": 45,
  "intensityMultiplier": 0.5,
  "colorStops": [
    {
      "id": "color-stop-0",
      "hue": 240,
      "saturation": 5,
      "lightness": 23,
      "opacity": 0.9,
      "position": 83
    },
    {
      "id": "color-stop-50",
      "hue": 247,
      "saturation": 60,
      "lightness": 68,
      "opacity": 0.9,
      "position": 98
    },
    {
      "id": "color-stop-1742331164721-5nzbzt1",
      "hue": 0,
      "saturation": 0,
      "lightness": 100,
      "opacity": 0.7,
      "position": 99
    },
    {
      "id": "color-stop-100",
      "hue": 270,
      "saturation": 100,
      "lightness": 78,
      "opacity": 0.9,
      "position": 100
    }
  ],
  "springTension": 0.5,
  "performanceMode": false,
  "disableAnimation": false,
  "throttleMs": "0"
};

// Context interface
interface GradientSettingsContextType {
  settings: GradientSettings;
  updateSettings: (newSettings: Partial<GradientSettings>) => void;
  resetSettings: () => void;
  getComputedGradientColors: (intensity: number, isNested: boolean) => {
    startColor: string;
    midColor: string;
    endColor: string;
  };
}

// Create context with default values
const GradientSettingsContext = createContext<GradientSettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
  resetSettings: () => {},
  getComputedGradientColors: () => ({ startColor: '', midColor: '', endColor: '' })
});

// Hook to use the gradient settings context
export const useGradientSettings = () => useContext(GradientSettingsContext);

// Provider props
interface GradientSettingsProviderProps {
  children: ReactNode;
  initialSettings?: Partial<GradientSettings>;
}

export function GradientSettingsProvider({ 
  children, 
  initialSettings = {} 
}: GradientSettingsProviderProps) {
  const [settings, setSettings] = useState<GradientSettings>({
    ...defaultSettings,
    ...initialSettings
  });

  // Update settings
  const updateSettings = useCallback((newSettings: Partial<GradientSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  }, []);

  // Reset to defaults
  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  // Helper to compute actual gradient colors based on intensity and card variant
  const getComputedGradientColors = useCallback((intensity: number, isNested: boolean) => {
    // Apply intensity multiplier
    const adjustedIntensity = intensity * settings.intensityMultiplier;
    
    // Sort color stops by position
    const sortedStops = [...settings.colorStops].sort((a, b) => a.position - b.position);
    
    // Get the first, middle, and last color stops
    const startStop = sortedStops[0] || { hue: 240, saturation: 5, lightness: 23, opacity: 0.9 };
    const endStop = sortedStops[sortedStops.length - 1] || { hue: 270, saturation: 100, lightness: 78, opacity: 0.9 };
    
    // Find a middle stop or create one
    let midStop;
    if (sortedStops.length === 2) {
      // If only two stops, create a virtual middle stop
      midStop = {
        hue: (startStop.hue + endStop.hue) / 2,
        saturation: (startStop.saturation + endStop.saturation) / 2,
        lightness: (startStop.lightness + endStop.lightness) / 2,
        opacity: (startStop.opacity + endStop.opacity) / 2
      };
    } else {
      // Find the middle stop - either the exact middle or closest to 50%
      const middleIndex = Math.floor(sortedStops.length / 2);
      midStop = sortedStops[middleIndex];
    }
    
    // Calculate opacity adjustments based on card type and intensity
    const startColorOpacity = isNested 
      ? Math.max(0.5, 0.9 - adjustedIntensity * 0.4) * startStop.opacity
      : Math.max(0.3, 0.9 - adjustedIntensity * 0.7) * startStop.opacity;
      
    const midColorOpacity = isNested
      ? Math.min(0.5, adjustedIntensity * 0.6) * midStop.opacity
      : Math.min(0.6, adjustedIntensity * 0.8) * midStop.opacity;
      
    const endColorOpacity = isNested
      ? Math.min(0.6, adjustedIntensity * 0.7) * endStop.opacity
      : Math.min(1, adjustedIntensity * 1.5) * endStop.opacity;
    
    // Format colors as HSLA
    const startColor = `hsla(${startStop.hue}, ${startStop.saturation}%, ${startStop.lightness}%, ${startColorOpacity})`;
    const midColor = `hsla(${midStop.hue}, ${midStop.saturation}%, ${midStop.lightness}%, ${midColorOpacity})`;
    const endColor = `hsla(${endStop.hue}, ${endStop.saturation}%, ${endStop.lightness}%, ${endColorOpacity})`;
    
    return {
      startColor,
      midColor,
      endColor
    };
  }, [settings]);

  // Provide context value using useMemo to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    settings,
    updateSettings,
    resetSettings,
    getComputedGradientColors
  }), [settings, updateSettings, resetSettings, getComputedGradientColors]);

  return (
    <GradientSettingsContext.Provider value={contextValue}>
      {children}
    </GradientSettingsContext.Provider>
  );
} 