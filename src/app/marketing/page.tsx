import './marketing.css';
import MarketingHero from '@/components/sections/marketing/MarketingHero';
import MarketingMarquee from '@/components/sections/marketing/MarketingMarquee';
import MarketingPhilosophy from '@/components/sections/marketing/MarketingPhilosophy';
import MarketingWork from '@/components/sections/marketing/MarketingWork';
import MarketingAnatomy from '@/components/sections/marketing/MarketingAnatomy';
import MarketingCases from '@/components/sections/marketing/MarketingCases';
import MarketingDiagnostic from '@/components/sections/marketing/MarketingDiagnostic';
import MarketingFaq from '@/components/sections/marketing/MarketingFaq';
import MarketingCta from '@/components/sections/marketing/MarketingCta';

export default function MarketingPage() {
  return (
    <div className="marketing-page">
      <MarketingHero />
      <MarketingMarquee />
      <MarketingPhilosophy />
      <MarketingWork />
      <MarketingAnatomy />
      <MarketingCases />
      <MarketingDiagnostic />
      <MarketingFaq />
      <MarketingCta />
    </div>
  );
}