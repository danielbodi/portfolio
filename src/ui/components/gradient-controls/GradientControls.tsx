import React from 'react';
import { Card } from '../cards/Card';
import { RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

interface GradientSettings {
  multx: number;
  multy: number;
  hue: number;
  brightness: number;
  mouse: number;
  scale: number;
  scale2: number;
  noise: number;
  time: number;
  bw: number;
  bw2: number;
  red: number;
  green: number;
  blue: number;
  red2: number;
  green2: number;
  blue2: number;
}

interface GradientControlsProps {
  settings: GradientSettings;
  onChange: (settings: GradientSettings) => void;
  onReset: () => void;
}

const defaultSettings: GradientSettings = {
  multx: 2,
  multy: 2,
  hue: 180,
  brightness: 0.8,
  mouse: 0.3,
  scale: 1,
  scale2: 1,
  noise: 1.5,
  time: 0.2,
  bw: 0,
  bw2: 0,
  red: 0.706,    // #B490FF (Primary purple)
  green: 0.565,
  blue: 1.0,
  red2: 0.412,   // #6964F7 (Secondary purple)
  green2: 0.392,
  blue2: 0.969
};

const controlRanges = {
  multx: { min: 0, max: 5, step: 0.1 },
  multy: { min: 0, max: 5, step: 0.1 },
  hue: { min: 0, max: 360, step: 1 },
  brightness: { min: 0, max: 2, step: 0.1 },
  mouse: { min: -2, max: 2, step: 0.1 },
  scale: { min: 0.1, max: 5, step: 0.1 },
  scale2: { min: 0.1, max: 5, step: 0.1 },
  noise: { min: 0, max: 3, step: 0.1 },
  time: { min: 0, max: 1, step: 0.1 },
  bw: { min: 0, max: 1, step: 0.1 },
  bw2: { min: 0, max: 1, step: 0.1 },
  red: { min: 0, max: 1, step: 0.01 },
  green: { min: 0, max: 1, step: 0.01 },
  blue: { min: 0, max: 1, step: 0.01 },
  red2: { min: 0, max: 1, step: 0.01 },
  green2: { min: 0, max: 1, step: 0.01 },
  blue2: { min: 0, max: 1, step: 0.01 }
};

const controlLabels = {
  multx: 'Mult X',
  multy: 'Mult Y',
  hue: 'Hue',
  brightness: 'Brightness',
  mouse: 'Mouse Influence',
  scale: 'Scale',
  scale2: 'Scale 2',
  noise: 'Noise',
  time: 'Time Speed',
  bw: 'B&W',
  bw2: 'B&W 2',
  red: 'Red',
  green: 'Green',
  blue: 'Blue',
  red2: 'Red 2',
  green2: 'Green 2',
  blue2: 'Blue 2'
};

export function GradientControls({ settings, onChange, onReset }: GradientControlsProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState<'main' | 'colors'>('main');

  const handleChange = (key: keyof GradientSettings, value: number) => {
    onChange({ ...settings, [key]: value });
  };

  const mainControls = ['multx', 'multy', 'hue', 'brightness', 'mouse', 'scale', 'scale2', 'noise', 'time', 'bw', 'bw2'];
  const colorControls = ['red', 'green', 'blue', 'red2', 'green2', 'blue2'];

  return (
    <div className="fixed bottom-0 right-0 md:bottom-8 md:right-8 z-[100] pointer-events-auto gradient-controls">
      <Card className="w-72 md:w-80 backdrop-blur-md">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Controls</h4>
            <div className="flex items-center gap-2">
              <button 
                onClick={onReset}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                title="Reset to defaults"
              >
                <RotateCcw size={16} />
              </button>
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>

          {!isCollapsed && (
            <div className="space-y-4">
              {/* Section tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveSection('main')}
                  className={`flex-1 py-1 px-3 rounded-full text-sm transition-colors ${
                    activeSection === 'main' 
                      ? 'bg-purple-400 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Main
                </button>
                <button
                  onClick={() => setActiveSection('colors')}
                  className={`flex-1 py-1 px-3 rounded-full text-sm transition-colors ${
                    activeSection === 'colors' 
                      ? 'bg-purple-400 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Colors
                </button>
              </div>

              {/* Controls */}
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {(activeSection === 'main' ? mainControls : colorControls).map((key) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-sm text-gray-400">{controlLabels[key as keyof typeof controlLabels]}</label>
                      <span className="text-sm text-gray-400">
                        {settings[key as keyof GradientSettings].toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={controlRanges[key as keyof typeof controlRanges].min}
                      max={controlRanges[key as keyof typeof controlRanges].max}
                      step={controlRanges[key as keyof typeof controlRanges].step}
                      value={settings[key as keyof GradientSettings]}
                      onChange={(e) => handleChange(key as keyof GradientSettings, parseFloat(e.target.value))}
                      className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                        [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:bg-purple-400 [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:w-3 
                        [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full 
                        [&::-moz-range-thumb]:bg-purple-400 [&::-moz-range-thumb]:cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export { defaultSettings };
export type { GradientSettings };