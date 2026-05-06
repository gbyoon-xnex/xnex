import './marketing.css';
import MarketingHero from '@/components/sections/marketing/MarketingHero';
import MarketingMarquee from '@/components/sections/marketing/MarketingMarquee';
import MarketingPhilosophy from '@/components/sections/marketing/MarketingPhilosophy';
import MarketingStrength from '@/components/sections/marketing/MarketingStrength';
import MarketingOrigin from '@/components/sections/marketing/MarketingOrigin';
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
      <MarketingStrength />
      <MarketingOrigin />
      <MarketingWork />
      <MarketingAnatomy />
      <MarketingCases />
      <MarketingDiagnostic />
      <MarketingFaq />
      <MarketingCta />
    </div>
  );
}