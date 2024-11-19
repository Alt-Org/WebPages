import cls from './AttributesPricing.module.scss';
import { useState, useEffect } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { statsPricingData } from '../../model/stats/statsPricingData';

/**
 * Properties for AttributesPricing component
 *
 * @property {string} name Name of the stat
 * @property {number} value Value of the stat
 * @property {number} rarityClass Rarity class of the stat. The rarity class can be one of the following numeric values: 1, 3, 5-8, 10
 * @property {string} color The stat's unique color
 */
export type Stat = {
    name: string;
    value: number;
    rarityClass: number;
    color: string;
};

export type AttributesPricingProps = {
    stats: Stat[];
};
/**
 * This component calculates the cost of upgrading a stat.
 * The maximum level is determined based on the stat pricing data.
 * The level range is defined between the initial value and the maximum.
 * This component also requires the rarity class in the stat data,
 * which can be one of the following numeric values: 1, 3, 5-8, 10.
 *
 * @param {Stat[]} props stats
 * @returns the pricing component if statsPricingData is loaded
 */
export const AttributesPricing = (props: AttributesPricingProps): JSX.Element => {
    const { stats } = props;
    const [stat, setStat] = useState(stats[0]);
    const [fromLevel, setFromLevel] = useState(stat.value);
    const [toLevel, setToLevel] = useState(stat.value);
    const maxLevel = statsPricingData[1].length + 1;
    const { t } = useClientTranslation('heroes-stats');

    const getLevelRange = (currentLevel: number) => {
        const ar = [];
        for (let i = currentLevel; i <= maxLevel; i++) ar.push(i);
        return ar;
    };
    const onStatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStat(stats.find((stat) => stat.name === event.target.value) || stat);
    };

    useEffect(() => {
        setFromLevel(stat.value);
        setToLevel(stat.value);
    }, [stat]);

    const onChangeFromLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFromLevel(Number(event.target.value));
    };
    const onChangeToLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setToLevel(Number(event.target.value));
    };

    let sum = 0;
    for (let i = fromLevel; i < toLevel; i++) {
        sum += statsPricingData[stat.rarityClass][i - 1] * statsPricingData.stepsPerLevel[i - 1];
    }
    if (fromLevel >= toLevel) sum = 0;

    return statsPricingData ? (
        <div className={cls.AttributePricing}>
            <div className={cls.InlineBlock}>
                <div className={cls.Header}>{t('stat')}</div>
                <select
                    data-testid="stat"
                    style={{
                        color: stat.color,
                        borderColor: stat.color,
                    }}
                    className={cls.Stats}
                    onChange={onStatChange}
                >
                    {stats.map((stat, key) => (
                        <option
                            style={{
                                color: stat.color,
                                fontWeight: 'bolder',
                            }}
                            key={key}
                            value={stat.name}
                        >
                            {t(stat.name)}
                        </option>
                    ))}
                </select>
            </div>
            <div className={cls.InlineBlock}>
                <div className={cls.Header}>{t('fromLevel')}</div>
                <select
                    data-testid="fromLevel"
                    className={cls.Dropdown}
                    value={fromLevel}
                    onChange={onChangeFromLevel}
                >
                    {getLevelRange(stat.value).map((value, index) => (
                        <option
                            key={index}
                            value={value}
                        >
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div className={cls.InlineBlock}>
                <div className={cls.Header}>{t('toLevel')}</div>
                <select
                    data-testid="toLevel"
                    className={cls.Dropdown}
                    value={toLevel}
                    onChange={onChangeToLevel}
                >
                    {getLevelRange(stat.value).map((value, index) => (
                        <option
                            key={index}
                            value={value}
                        >
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div className={cls.InlineBlock}>
                <div className={cls.Price}>{t('cost')}</div>
                <span
                    data-testid="price"
                    className={cls.Sum}
                >
                    {sum}
                </span>
            </div>
        </div>
    ) : (
        <h2>Stat pricing data is unavailable</h2>
    );
};
