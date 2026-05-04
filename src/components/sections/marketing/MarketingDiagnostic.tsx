"use client";

import React, { useEffect, useRef, useState } from "react";

export default function MarketingDiagnostic() {
  const sectionRef = useRef<HTMLElement>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(6).fill(false));

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

  const diagnosticItems = [
    "마케팅을 집행하지만 브랜드 소문이 나지 않는다",
    "광고비는 쓰는데 ROAS가 기대에 못 미친다",
    "경쟁사는 화제가 되는데 우리 브랜드는 조용하다",
    "콘텐츠를 만들어도 바이럴이 되지 않는다",
    "인플루언서 협업을 했지만 매출로 이어지지 않았다",
    "브랜드 정체성이 명확하지 않다고 느낀다",
  ];

  const messages = [
    "항목을 체크하면 브랜드 현황을 진단합니다.",
    "기초적인 브랜드 전략 검토가 도움이 될 수 있습니다.",
    "브랜드 포지셔닝을 재점검할 필요가 있습니다.",
    "캠페인 전략과 브랜드 구조를 전면 재설계할 필요가 있습니다.",
    "즉각적인 브랜드 & 마케팅 전략 개편이 필요합니다.",
    "경쟁사에 빠르게 뒤처지고 있을 가능성이 높습니다.",
    "지금 바로 전문 브랜드 전략가와 상담이 필요합니다.",
  ];

  const toggleItem = (idx: number) => {
    const newItems = [...checkedItems];
    newItems[idx] = !newItems[idx];
    setCheckedItems(newItems);
  };

  const totalChecked = checkedItems.filter(Boolean).length;
  const score = Math.round((totalChecked / 6) * 100);

  const getBarColor = () => {
    if (score >= 67) return "#ff4444";
    if (score >= 34) return "#f0a500";
    return "var(--mg-accent)";
  };

  return (
    <section className="s mg-diag" id="diag" ref={sectionRef}>
      <div className="sw">
        <div className="rv">
          <div className="stag">{"// 브랜드 진단"}</div>
        </div>
        <h2 className="sh2 rv" style={{ marginTop: "16px" }}>
          지금 귀사의<br />
          <em>브랜드 상태는?</em>
        </h2>
        <div className="diag-grid rv">
          <div id="dc-list">
            {diagnosticItems.map((item, idx) => (
              <div
                key={idx}
                className={`dc-item ${checkedItems[idx] ? "chk" : ""}`}
                onClick={() => toggleItem(idx)}
              >
                <div className="dc-box"></div>
                <div className="dc-txt">{item}</div>
              </div>
            ))}
          </div>
          <div className="diag-panel">
            <div className="dp-lbl">{"// 브랜드 개선 긴급도"}</div>
            <div className="dp-score" id="dps">
              {score}
            </div>
            <div className="dp-max">점 / 100점</div>
            <div className="dp-bar-bg">
              <div
                className="dp-bar"
                id="dpb"
                style={{
                  width: `${score}%`,
                  background: getBarColor(),
                }}
              ></div>
            </div>
            <div className="dp-msg" id="dpm">
              {messages[totalChecked]}
            </div>
            <a href="#cta" className={`dp-cta ${totalChecked >= 2 ? "vis" : ""}`} id="dpc">
              무료 브랜드 진단 신청 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}