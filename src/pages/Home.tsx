import React from 'react';
import { Hero } from '../components/Hero';
import { ExecutionGap } from '../components/ExecutionGap';
import { StrategyInput } from '../components/StrategyInput';
import { TradingHistoryInput } from '../components/TradingHistoryInput';
import { MirrorComparison } from '../components/MirrorComparison';
import { HistoricalEvidence } from '../components/HistoricalEvidence';
import { ReviewRefine } from '../components/ReviewRefine';
import { StrategyLoop } from '../components/StrategyLoop';
import { EarlyAccess } from '../components/EarlyAccess';

export const Home = () => {
  return (
    <>
      <Hero />
      <ExecutionGap />
      <StrategyInput />
      <TradingHistoryInput />
      <MirrorComparison />
      <HistoricalEvidence />
      <ReviewRefine />
      <StrategyLoop />
      <div id="early-access">
        <EarlyAccess />
      </div>
    </>
  );
};
