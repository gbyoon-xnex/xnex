"use client";

import React, { useEffect, useRef, useState } from "react";

export default function MarketingFaq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

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

  const faqs = [
    {
      q: "브랜드 에이전시와 퍼포먼스 마케팅 에이전시, 뭐가 다른가요?",
      a: "대부분의 에이전시는 둘 중 하나만 합니다. 브랜드 에이전시는 감성적 포지셔닝에 집중하고, 퍼포먼스 에이전시는 단기 전환에 집중합니다. X-그로스는 브랜드 설계(who we are)와 캠페인 성과(what we achieve)를 동시에 설계합니다. 좋은 브랜드는 퍼포먼스를 만들고, 좋은 퍼포먼스는 브랜드를 강화합니다.",
    },
    {
      q: "바이럴 확산은 어떻게 설계하나요?",
      a: "바이럴은 운이 아닙니다. 콘텐츠를 만들 때부터 공유 동기를 내재해야 합니다. X-그로스는 소비자가 '이거 공유하고 싶다'는 감정이 드는 훅 포인트를 콘텐츠 기획 단계에서 설계합니다. 커뮤니티 배포 전략, 인플루언서 앰플리파이, 2차 확산 구조를 동시에 설계합니다.",
    },
    {
      q: "KPI 미달 시 어떻게 되나요?",
      a: '사전 협의한 KPI 기준 미달 시 추가 운영 기간을 무상으로 제공합니다. 단, KPI는 계약 전 협의를 통해 현실적인 수준으로 설정됩니다. "성과 없으면 무료"보다 중요한 것은 처음부터 성과 나는 구조를 함께 설계하는 것입니다.',
    },
    {
      q: "최소 계약 규모 및 기간은?",
      a: "캠페인 기획 + 운영 기준 월 300만원부터, 최소 3개월 계약을 원칙으로 합니다. 브랜드 아이덴티티 설계는 별도 프로젝트로 진행합니다. 예산보다 목표의 명확성이 더 중요합니다. 상담에서 솔직하게 논의합니다.",
    },
    {
      q: "한 달에 몇 개 기업과 일하나요?",
      a: "월 최대 5개 기업과 계약합니다. 전략가가 직접 투입되는 구조상 동시에 많은 기업을 운영하면 품질을 보장할 수 없습니다. 에프터&비포가 명확히 차이나는 브랜드하고만 일합니다.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="s mg-faq" id="faq" ref={sectionRef}>
      <div className="sw">
        <div className="rv">
          <div className="stag">{"// 자주 묻는 질문"}</div>
        </div>
        <h2 className="sh2 rv" style={{ marginTop: "16px" }}>
          자주 묻는 <em>질문</em>
        </h2>
        <div className="fq-list rv" style={{ marginTop: "72px" }}>
          {faqs.map((item, idx) => (
            <div key={idx} className={`fq-item ${openIdx === idx ? "open" : ""}`}>
              <div className="fq-q" onClick={() => toggleFaq(idx)}>
                <span className="fq-t">{item.q}</span>
                <span className="fq-ic">+</span>
              </div>
              <div className="fq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}