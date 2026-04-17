/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Unit {
  label: string;
  value: string;
  ratio: number; // Ratio to base unit
}

export interface UnitCategory {
  name: string;
  baseUnit: string;
  units: Unit[];
}

export const unitCategories: UnitCategory[] = [
  {
    name: 'Massa',
    baseUnit: 'g',
    units: [
      { label: 'Miligramas (mg)', value: 'mg', ratio: 0.001 },
      { label: 'Gramas (g)', value: 'g', ratio: 1 },
      { label: 'Quilos (kg)', value: 'kg', ratio: 1000 },
      { label: 'Libras (lb)', value: 'lb', ratio: 453.592 },
    ]
  },
  {
    name: 'Volume',
    baseUnit: 'L',
    units: [
      { label: 'Mililitros (mL)', value: 'mL', ratio: 0.001 },
      { label: 'Litros (L)', value: 'L', ratio: 1 },
      { label: 'Centímetros Cúbicos (cm³)', value: 'cm3', ratio: 0.001 },
      { label: 'Metros Cúbicos (m³)', value: 'm3', ratio: 1000 },
    ]
  },
  {
    name: 'Temperatura',
    baseUnit: 'C',
    units: [
      { label: 'Celsius (°C)', value: 'C', ratio: 1 },
      { label: 'Kelvin (K)', value: 'K', ratio: 1 }, // Handled specially in logic
      { label: 'Fahrenheit (°F)', value: 'F', ratio: 1 }, // Handled specially
    ]
  },
  {
    name: 'Pressão',
    baseUnit: 'atm',
    units: [
      { label: 'Atmosferas (atm)', value: 'atm', ratio: 1 },
      { label: 'Pascal (Pa)', value: 'Pa', ratio: 0.000009869 },
      { label: 'mmHg / Torr', value: 'mmHg', ratio: 0.00131579 },
      { label: 'Bar', value: 'bar', ratio: 0.986923 },
    ]
  },
  {
    name: 'Energia',
    baseUnit: 'J',
    units: [
      { label: 'Joules (J)', value: 'J', ratio: 1 },
      { label: 'Calorias (cal)', value: 'cal', ratio: 4.184 },
      { label: 'Quilocalorias (kcal)', value: 'kcal', ratio: 4184 },
      { label: 'Watt-hora (Wh)', value: 'Wh', ratio: 3600 },
      { label: 'Eletron-volt (eV)', value: 'eV', ratio: 1.60218e-19 },
    ]
  },
  {
    name: 'Velocidade',
    baseUnit: 'm/s',
    units: [
      { label: 'Metros por segundo (m/s)', value: 'ms', ratio: 1 },
      { label: 'Quilômetros por hora (km/h)', value: 'kmh', ratio: 1/3.6 },
      { label: 'Milhas por hora (mph)', value: 'mph', ratio: 0.44704 },
      { label: 'Nós (kn)', value: 'kn', ratio: 0.514444 },
    ]
  },
  {
    name: 'Densidade',
    baseUnit: 'kg/m³',
    units: [
      { label: 'kg/m³', value: 'kgm3', ratio: 1 },
      { label: 'g/cm³', value: 'gcm3', ratio: 1000 },
      { label: 'lb/ft³', value: 'lbft3', ratio: 16.0185 },
      { label: 'lb/in³', value: 'lbin3', ratio: 27679.9 },
    ]
  }
];

export const convertUnits = (value: number, from: string, to: string, categoryName: string): number => {
  if (categoryName === 'Temperatura') {
    // Special logic for temperature
    let celsius = 0;
    if (from === 'C') celsius = value;
    else if (from === 'K') celsius = value - 273.15;
    else if (from === 'F') celsius = (value - 32) * 5/9;

    if (to === 'C') return celsius;
    else if (to === 'K') return celsius + 273.15;
    else if (to === 'F') return (celsius * 9/5) + 32;
    return value;
  }

  const category = unitCategories.find(c => c.name === categoryName);
  if (!category) return value;

  const fromUnit = category.units.find(u => u.value === from);
  const toUnit = category.units.find(u => u.value === to);

  if (!fromUnit || !toUnit) return value;

  // Convert to base unit then to target unit
  const baseValue = value * fromUnit.ratio;
  return baseValue / toUnit.ratio;
};
