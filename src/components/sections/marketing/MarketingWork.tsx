"use client";

import React, { useEffect, useRef } from "react";

export default function MarketingWork() {
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

  const services = [
    {
      num: "01",
      cat: "Brand Identity",
      title: "브랜드 아이덴티티 · 포지셔닝",
      desc: "로고·컬러·톤 앤 매너를 넘어, 소비자의 인식 속에 어떻게 자리잡을지를 전략적으로 설계합니다. 시장 내 '유일한 브랜드'가 되는 구조를 만듭니다.",
      feat: true,
      delay: "d1",
    },
    {
      num: "02",
      cat: "Campaign",
      title: "캠페인 기획 · 운영",
      desc: "목표 KPI를 먼저 정의하고 역산한 캠페인 구조. 감이 아닌 데이터에서 전략이 시작됩니다.",
      delay: "d2",
    },
    {
      num: "03",
      cat: "Viral & WOM",
      title: "바이럴 · 입소문 설계",
      desc: "공유 동기가 내재된 훅 콘텐츠. 소비자가 자발적으로 퍼뜨리는 구조를 설계합니다.",
      delay: "d1",
    },
    {
      num: "04",
      cat: "Influencer",
      title: "인플루언서 · SNS 확산",
      desc: "팔로워 수가 아닌 전환율 기반의 정밀 인플루언서 선별. 도달이 매출로 이어지게 합니다.",
      delay: "d2",
    },
    {
      num: "05",
      cat: "Performance",
      title: "퍼포먼스 광고 운영",
      desc: "Meta · Google · 카카오. ROAS 중심의 데이터 드리븐 광고. 매일 최적화합니다.",
      delay: "d3",
    },
    {
      num: "06",
      cat: "Creative",
      title: "크리에이티브 콘텐츠 제작",
      desc: "스크롤을 멈추게 하는 영상·이미지·카피. 아름다우면서도 전환을 만드는 크리에이티브.",
      delay: "d4",
    },
  ];

  return (
    <section className="s mg-work" id="work" ref={sectionRef}>
      <div className="sw">
        <div className="rv">
          <div className="stag">{"// 서비스"}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
          <h2 className="sh2 rv" style={{ marginTop: "16px" }}>
            IT + 데이터 + 콘텐츠,<br />
            <em>무엇이든 브랜드가 됩니다.</em>
          </h2>
          <p className="rv d2" style={{ fontSize: "14px", color: "var(--mg-muted)", maxWidth: "320px", lineHeight: "1.8" }}>
            현황 분석 → 한정 예산 내 최대 효과 설계 → 캠페인 기획 → 실행
          </p>
        </div>
        <div className="work-grid">
          {services.map((svc, idx) => (
            <div key={idx} className={`wc ${svc.feat ? "feat" : ""} rv ${svc.delay || ""}`}>
              <div className="wc-num">{svc.num}</div>
              <div className="wc-bottom">
                <div className="wc-cat">{svc.cat}</div>
                <div className="wc-title">{svc.title}</div>
                <div className="wc-desc">{svc.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}