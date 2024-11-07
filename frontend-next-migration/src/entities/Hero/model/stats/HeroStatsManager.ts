import { StatsStrategy, HeroStats, HeroLevel } from '../../types/HeroStats';
import { HeroSlug } from '../../types/hero';

export class HeroStatsManager {
    private strategy: StatsStrategy;

    constructor(strategy: StatsStrategy) {
        this.strategy = strategy;
    }

    // it can be useful in future if for example we will want to use some bonuses for stats
    // public setStrategy(strategy: StatsStrategy) {
    //     this.strategy = strategy;
    // }

    public getStatsForHero(slug: HeroSlug, level: HeroLevel): HeroStats {
        return this.strategy.getStatsForHero(slug, level);
    }
}
