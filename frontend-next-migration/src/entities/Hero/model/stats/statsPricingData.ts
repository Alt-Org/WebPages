export type Prices = {
    [key: number]: number[];
    stepsPerLevel: number[];
};

export const statsPricingData: Prices = {
    1: [5, 10, 20, 30, 45, 60, 80, 100, 140],
    3: [15, 30, 60, 90, 135, 180, 240, 300, 420],
    5: [25, 50, 100, 150, 225, 300, 400, 500, 700],
    6: [30, 60, 120, 180, 270, 360, 480, 600, 840],
    7: [35, 70, 140, 210, 315, 420, 560, 700, 890],
    8: [40, 80, 160, 240, 360, 480, 640, 800, 1120],
    10: [50, 100, 200, 300, 450, 600, 800, 1000, 1400],
    stepsPerLevel: [5, 5, 5, 10, 10, 10, 15, 15, 25],
};

export type Prices2 = {
    [key: number]: {
        prices: number[];
        value?: number;
    };
    stepsPerLevel: number[];
    multipliers: number[];
};

export const statsPricingData2: Prices2 = {
    1: { prices: [5, 10, 20, 30, 45, 60, 80, 100, 140], value: 100 },
    2: { prices: [5, 10, 20, 30, 45, 60, 80, 100, 140], value: 100 },
    3: { prices: [15, 30, 60, 90, 135, 180, 240, 300, 420], value: 300 },
    4: { prices: [15, 30, 60, 90, 135, 180, 240, 300, 420], value: 300 },
    5: { prices: [25, 50, 100, 150, 225, 300, 400, 500, 700], value: 500 },
    6: { prices: [30, 60, 120, 180, 270, 360, 480, 600, 840], value: 600 },
    7: { prices: [35, 70, 140, 210, 315, 420, 560, 700, 890], value: 700 },
    8: { prices: [40, 80, 160, 240, 360, 480, 640, 800, 1120], value: 800 },
    10: { prices: [50, 100, 200, 300, 450, 600, 800, 1000, 1400], value: 1000 },
    stepsPerLevel: [5, 5, 5, 10, 10, 10, 15, 15, 25],
    multipliers: [1, 1.1, 1.2, 1.3, 1.5, 1.7, 2, 2.5, 3],
};
