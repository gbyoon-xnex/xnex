"use client";

import React, { useEffect, useRef } from "react";

export default function MarketingPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const rvElements = sectionRef.current?.querySelectorAll(".rv");
    rvElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const philosophyItems = [
    {
      num: "01",
      title: "브랜드 아이덴티티 설계",
      desc: "시장 내 독보적인 포지셔닝. 소비자의 기억 속에 선명하게 자리잡는 브랜드 구조를 설계합니다.",
    },
    {
      num: "02",
      title: "전략적 캠페인 기획",
      desc: "KPI를 역산한 캠페인 구조. 시장 리서치부터 크리에이티브 방향까지, 전략이 선행됩니다.",
    },
    {
      num: "03",
      title: "바이럴 확산 설계",
      desc: "콘텐츠를 만들 때부터 공유 동기를 내재합니다. 소문이 나는 브랜드는 우연이 아닙니다.",
    },
    {
      num: "04",
      title: "멀티채널 앰플리파이",
      desc: "Meta · Google · 인플루언서 · 커뮤니티를 유기적으로 연결. 도달의 총량을 극대화합니다.",
    },
  ];

  return (
    <section className="s mg-philosophy" id="philosophy" ref={sectionRef}>
      <div className="sw">
        <div className="ph-layout">
          <div className="rv">
            <div className="stag">{"// 브랜드 철학"}</div>
            <div className="ph-quote">
              &quot;광고 예산은 비용이 아닙니다.
              <br />
              의사결정의 결과물입니다.&quot;
            </div>
            <p className="ph-body">
              연 광고비 200억을 직접 집행해본 사업가가 짜는 전략.
              <br />
              X-그로스는 실행 에이전시가 아닌
              <br />
              ROI 기반 캠페인을 직접 설계하는 파트너입니다.
              <br />
              <br />
              13년 글로벌 비즈니스 그룹의 자산을 응축한
              <br />
              전문 마케팅 에이전시.
            </p>
          </div>
          <div className="rv d1">
            <div className="ph-right">
              {philosophyItems.map((item, idx) => (
                <div key={idx} className="ph-row">
                  <span className="ph-num">{item.num}</span>
                  <div className="ph-main">
                    <div className="ph-title">{item.title}</div>
                    <div className="ph-sub">{item.desc}</div>
                  </div>
                  <span className="ph-arrow">→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}