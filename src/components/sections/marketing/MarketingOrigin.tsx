'use client';

import { useEffect, useRef } from 'react';
import Counter from '@/components/ui/counter';

export default function MarketingOrigin() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.rv');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { target: 13, label: '글로벌 비즈니스 그룹 운영', suffix: '년' },
    { target: 14, label: '글로벌 거점', suffix: '개국+' },
    { target: 350, label: '그룹 임직원', suffix: '명+' },
    { target: 30, label: '기업 고객사', suffix: '개사+' },
  ];

  const cards = [
    {
      title: 'Brand Diagnosis',
      body: "현재 브랜드 인식, 고객 지각, 메시지 구조를 분석해 문제의 '근본 원인'을 찾습니다",
    },
    {
      title: 'Renovation & Repositioning',
      body: '브랜드의 방향성과 가치를 재정의하고 새로운 포지션을 설계합니다',
    },
    {
      title: 'IMC Strategy Design',
      body: '브랜드 메시지를 중심으로 크리에이티브·퍼포먼스·바이럴을 통합한 IMC 전략을 디자인합니다',
    },
    {
      title: 'Creative & Performance',
      body: '전략과 메시지를 기반으로 한 콘텐츠 제작과 지속 가능한 퍼포먼스로 성장을 완성합니다',
    },
  ];

  return (
    <section className="s mg-origin" ref={sectionRef}>
      <div className="sw">
        <h2 className="sh2 rv d1">
          RIGHT STRATEGY,<br />
          REAL GROWTH
        </h2>
        <p className="sdesc rv d2">
          연 광고비 200억을 직접 집행한 사업가 관점의 전략가가<br />
          직접 설계하고 실행합니다
        </p>

        <div className="mg-origin-stats rv d3">
          {stats.map((stat, idx) => (
            <div key={idx} className="mg-origin-stat">
              <div className="mg-origin-n">
                <Counter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="mg-origin-l">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mg-origin-grid">
          {cards.map((card, idx) => (
            <div key={idx} className={`mg-origin-card rv d${idx + 4}`}>
              <h3 className="mg-origin-card-title">{card.title}</h3>
              <p className="mg-origin-card-body">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="mg-origin-clients rv d8">
          주요 고객사: CJ ENM · 빙그레 · 카카오모빌리티 · 현대자동차그룹 · 롯데칠성음료 외 30+
        </div>
      </div>
    </section>
  );
}