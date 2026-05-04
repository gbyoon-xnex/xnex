"use client";

import React, { useEffect, useRef } from "react";

export default function MarketingAnatomy() {
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

  const steps = [
    {
      num: "01",
      title: "리서치",
      desc: "시장·경쟁·소비자\n인사이트 발굴",
    },
    {
      num: "02",
      title: "브랜드 설계",
      desc: "포지셔닝·메시지\n구조 정의",
    },
    {
      num: "03",
      title: "캠페인 기획",
      desc: "KPI 역산 캠페인\n훅 콘텐츠 설계",
    },
    {
      num: "04",
      title: "멀티채널 확산",
      desc: "동시 배포·앰플리파이\n인플루언서 투입",
    },
    {
      num: "05",
      title: "성과 최적화",
      desc: "실시간 데이터\n지속 개선",
    },
  ];

  return (
    <section className="s mg-anatomy" id="anatomy" ref={sectionRef}>
      <div className="sw">
        <div className="anat-head">
          <div>
            <div className="stag rv">{"// 브랜드 확산의 구조"}</div>
            <h2 className="sh2 rv" style={{ marginTop: "16px" }}>
              소문은 <em>우연이 아닙니다.</em>
            </h2>
          </div>
          <p className="rv d2" style={{ fontSize: "14px", color: "var(--mg-muted)", maxWidth: "320px", lineHeight: "1.8", alignSelf: "flex-end" }}>
            X-그로스는 브랜드가 소문나는 5단계 구조를 전략적으로 설계합니다.
          </p>
        </div>
        <div className="anat-steps rv">
          {steps.map((step, idx) => (
            <div key={idx} className="ast">
              <div className="ast-circle">
                <span className="ast-num">{step.num}</span>
              </div>
              <div className="ast-title">{step.title}</div>
              <div className="ast-desc">
                {step.desc.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i !== step.desc.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}