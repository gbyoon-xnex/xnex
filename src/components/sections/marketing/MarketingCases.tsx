"use client";

import React, { useEffect, useRef, useState } from "react";

export default function MarketingCases() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setSx] = useState(0);
  const [scrollLeft, setSl] = useState(0);

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

  const handleStart = (pageX: number) => {
    setIsDragging(true);
    setSx(pageX);
    const matrix = window.getComputedStyle(trackRef.current!).transform;
    if (matrix !== "none") {
      const translateX = parseInt(matrix.split(",")[4]);
      setSl(translateX);
    } else {
      setSl(0);
    }
  };

  const handleMove = (pageX: number) => {
    if (!isDragging) return;
    const walk = pageX - startX;
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    const maxScroll = -(track.scrollWidth - wrap.offsetWidth);
    const nx = Math.min(0, Math.max(maxScroll, scrollLeft + walk));
    track.style.transform = `translateX(${nx}px)`;
    track.style.transition = "none";
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.style.transition = "";
    }
  };

  const cases = [
    {
      ind: "Beauty Brand · SNS 캠페인",
      kpi: "+340",
      body: "론칭 2주 만에 팔로워 급증. 훅 콘텐츠와 인플루언서 앰플리파이로 자발적 공유가 폭발적으로 발생했습니다.",
      brand: "뷰티 브랜드 A사",
      type: "SNS 팔로워 증가",
    },
    {
      ind: "F&B Startup · 퍼포먼스",
      kpi: "18",
      prefix: "ROAS ",
      suffix: "×",
      body: "데이터 드리븐 캠페인 설계로 광고비 대비 18배 매출. 업종 평균 ROAS 3.2배 대비 압도적 성과.",
      brand: "F&B 스타트업 B사",
      type: "광고 성과",
    },
    {
      ind: "Tech Service · 바이럴",
      kpi: "+520",
      body: "커뮤니티 확산 전략과 인플루언서 네트워크로 신규 가입자 급증. 커뮤니티 언급량 2,800% 증가.",
      brand: "테크 서비스 C사",
      type: "신규 가입자",
    },
    {
      ind: "Lifestyle · 브랜드 런칭",
      kpi: "+267",
      body: "인지도 0에서 시작, 3개월 만에 업종 내 상위 노출. 브랜드 설계부터 캠페인까지 일관성 유지.",
      brand: "라이프스타일 D사",
      type: "상담 문의 증가",
    },
    {
      ind: "E-commerce · 통합",
      kpi: "+185",
      body: "멀티채널 통합 캠페인. 검색·SNS·인플루언서 연동 전략으로 온라인 매출 급성장.",
      brand: "이커머스 E사",
      type: "온라인 매출",
    },
  ];

  return (
    <section className="s mg-cases" id="cases" ref={sectionRef}>
      <div className="sw">
        <div className="rv">
          <div className="stag">{"// 성과 사례"}</div>
        </div>
        <h2 className="sh2 rv" style={{ marginTop: "16px" }}>
          결과로 <em>말합니다.</em>
        </h2>
        <div className="drag-label rv" style={{ marginTop: "20px" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 8h12M9 3.5l4.5 4.5L9 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          드래그하여 확인
        </div>
      </div>
      <div
        className="cases-wrap rv"
        ref={wrapRef}
        onMouseDown={(e) => handleStart(e.pageX)}
        onMouseMove={(e) => handleMove(e.pageX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].pageX)}
        onTouchMove={(e) => handleMove(e.touches[0].pageX)}
        onTouchEnd={handleEnd}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div className="cases-track" ref={trackRef}>
          {cases.map((c, idx) => (
            <div key={idx} className="cc">
              <div className="cc-ind">{c.ind}</div>
              <div className="cc-kpi">
                {c.prefix}
                <span className="up">{c.kpi}</span>
                {c.suffix || "%"}
              </div>
              <div className="cc-body">{c.body}</div>
              <div className="cc-hr"></div>
              <div className="cc-brand">{c.brand}</div>
              <div className="cc-type">{c.type}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}