'use client';

import { useEffect, useRef } from 'react';
import { Target, Pen, ShoppingBag } from 'lucide-react';

export default function MarketingStrength() {
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

  const strengths = [
    {
      cat: 'DATA',
      title: '객관적 데이터 분석력',
      body: '타겟의 행동 데이터를 바탕으로 오차 없는 통합 마케팅 설계',
      icon: <Target size={24} />,
    },
    {
      cat: 'CREATIVE',
      title: '시각 예술의 과학적 접근',
      body: '시선을 점유하고 즉각적인 전환을 이끌어내는 고감도 크리에이티브 제작',
      icon: <Pen size={24} />,
    },
    {
      cat: 'COMMERCE',
      title: '온·오프라인 풀커머스 연계',
      body: '마케팅의 결과물을 실제 커머스 매출 및 유통망 확장으로 직결시키는 실행력',
      icon: <ShoppingBag size={24} />,
    },
  ];

  return (
    <section className="s mg-strength" ref={sectionRef}>
      <div className="sw">
        <h2 className="sh2 rv d1">
          트래픽을 넘어 실질적<br />
          비즈니스 스케일업을 설계하는 파트너
        </h2>
        <p className="sdesc rv d2">
          소비 패턴에 대한 날카로운 분석과 감각적인 시각 기획력의 결합,<br />
          브랜드의 고민을 객관적 매출로 치환하는 실용주의 마케팅 에이전시
        </p>

        <div className="mg-strength-grid">
          {strengths.map((item, idx) => (
            <div key={idx} className={`mg-strength-card rv d${idx + 3}`}>
              <div className="mg-strength-icon">
                {item.icon}
              </div>
              <div className="mg-strength-cat">{item.cat}</div>
              <h3 className="mg-strength-title">{item.title}</h3>
              <p className="mg-strength-body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}