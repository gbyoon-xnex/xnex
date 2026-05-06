"use client";

import React, { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const formatPhone = (value: string) => {
  const numbers = value.replace(/[^\d]/g, "");
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};

export default function MarketingCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    industry: "",
    serviceInterest: "",
  });
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!agreePrivacy) {
      setErrorMsg("개인정보 수집·이용에 동의해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.from("leads").insert([
        {
          company: formData.company,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          industry: formData.industry,
          memo: formData.serviceInterest,
          source: "marketing",
          status: "new",
        },
      ]);

      if (error) throw error;

      setIsSuccess(true);
      setFormData({
        company: "",
        name: "",
        phone: "",
        email: "",
        industry: "",
        serviceInterest: "",
      });
      setAgreePrivacy(false);
    } catch (err) {
      console.error("Error submitting form:", err);
      setErrorMsg("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="s mg-cta" id="cta" ref={sectionRef}>
      <div className="sw">
        <div className="cta-grid">
          <div className="rv" style={{ alignSelf: "center" }}>
            <div className="stag">{"// 무료 브랜드 상담"}</div>
            <h2 className="cta-h2" style={{ marginTop: "16px" }}>
              지금,
              <br />
              브랜드를
              <br />
              <em>설계하세요.</em>
            </h2>
            <p style={{ fontSize: "14px", color: "#686664", marginTop: "24px", lineHeight: "1.6", wordBreak: "keep-all" }}>
              13년 그룹 자산과 200억+ 광고 집행 경험을 바탕으로
              <br />
              귀사의 마케팅 전략을 직접 설계합니다
            </p>
            <div className="urg" style={{ marginTop: "16px" }}>
              <span className="urg-d"></span>
              잔여 3자리 · 6월부터 월 100만원 인상
            </div>
          </div>
          <div className="cform rv d2">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="company"
                className="cin"
                placeholder="회사명 / 브랜드명 *"
                required
                value={formData.company}
                onChange={handleChange}
              />
              <input
                type="text"
                name="name"
                className="cin"
                placeholder="담당자명 *"
                required
                value={formData.name}
                onChange={handleChange}
                style={{ marginTop: "12px" }}
              />
              <input
                type="tel"
                name="phone"
                className="cin"
                placeholder="010-0000-0000"
                required
                maxLength={13}
                inputMode="numeric"
                value={formData.phone}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  setFormData((prev) => ({ ...prev, phone: formatted }));
                }}
                style={{ marginTop: "12px" }}
              />
              <input
                type="email"
                name="email"
                className="cin"
                placeholder="이메일 *"
                required
                value={formData.email}
                onChange={handleChange}
                style={{ marginTop: "12px" }}
              />
              <select
                name="industry"
                className="csel"
                required
                value={formData.industry}
                onChange={handleChange}
                style={{ marginTop: "12px" }}
              >
                <option value="" disabled>
                  업종 선택 *
                </option>
                <option>병원/의원</option>
                <option>법무사/변호사</option>
                <option>학원/교육</option>
                <option>쇼핑몰/이커머스</option>
                <option>인테리어/시공</option>
                <option>여행/숙박</option>
                <option>부동산/등기</option>
                <option>제조/유통</option>
                <option>IT/스타트업</option>
                <option>기타</option>
              </select>
              <select
                name="serviceInterest"
                className="csel"
                required
                value={formData.serviceInterest}
                onChange={handleChange}
                style={{ marginTop: "12px" }}
              >
                <option value="" disabled>
                  관심 서비스 선택 *
                </option>
                <option>브랜드 아이덴티티 설계</option>
                <option>캠페인 기획 · 운영</option>
                <option>바이럴 · 입소문 마케팅</option>
                <option>인플루언서 확산</option>
                <option>퍼포먼스 광고</option>
                <option>통합 마케팅 (전체)</option>
              </select>

              <label className="c-agree">
                <input
                  type="checkbox"
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                />
                <span className="c-agree-txt">
                  (필수) 개인정보 수집·이용에 동의합니다.
                </span>
              </label>

              {errorMsg && (
                <div style={{ color: "#ff4444", fontSize: "13px", marginTop: "10px", textAlign: "center" }}>
                  {errorMsg}
                </div>
              )}
              {isSuccess && (
                <div style={{ color: "var(--mg-accent)", fontSize: "13px", marginTop: "10px", textAlign: "center" }}>
                  신청이 완료되었습니다.
                </div>
              )}

              <button type="submit" className="cbtn" disabled={isLoading} style={{ width: "100%", marginTop: "12px" }}>
                {isLoading ? "처리 중..." : "무료 상담 신청하기 →"}
              </button>
            </form>
            <div className="csafe">📞 신청 후 48시간 이내 담당자가 직접 연락드립니다</div>
          </div>
        </div>
      </div>
    </section>
  );
}