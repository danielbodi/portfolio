import { GradientSettings } from '../ui/components/GradientControlPanel';

/**
 * Save gradient settings as default by writing to a file
 * This uses the Fetch API to send a request to a backend endpoint
 * @param settings The formatted settings string to save
 */
export async function saveSettingsToFile(formattedSettings: string): Promise<void> {
  try {
    // Add current date and helpful comment
    const content = `// Generated gradient settings - ${new Date().toLocaleString()}
// This file was automatically generated and can be imported anywhere gradient settings are needed

${formattedSettings}`;

    // Send request to save the file
    const response = await fetch('/api/save-gradient-settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`Failed to save settings: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
}

/**
 * Format the gradient settings as TypeScript code
 * @param settings The settings object to format
 */
export function formatGradientSettings(settings: GradientSettings): string {
  return `export const defaultGradientSettings: GradientSettings = ${JSON.stringify(settings, null, 2)};`;
} 