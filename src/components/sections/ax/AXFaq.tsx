'use client'

import { useState } from 'react'

const faqs = [
  { q: '무료 미팅에서 정확히 뭘 하나요?', a: '현황 파악과 니즈 인터뷰를 진행합니다. 영업이 아닌 진단 미팅입니다. 담당 PM이 직접 업무 프로세스를 분석하고 AI 적용 포인트를 찾아드립니다.' },
  { q: '교육 인원은 몇 명까지 가능한가요?', a: '10명 미만 소규모부터 50명 규모까지 맞춤 운영합니다.' },
  { q: '교육 후 실제로 남는 산출물은?', a: '프롬프트 라이브러리, 직무별 SOP, 커스텀 AI봇, AI 도입 로드맵 보고서가 납품됩니다.' },
  { q: '자동화 도구 개발도 가능한가요?', a: '교육 과정에서 도출된 니즈 기반으로 맞춤 자동화 도구 설계·개발까지 원스톱으로 진행합니다.' },
  { q: '다른 AI 교육과 뭐가 다른가요?', a: '강사 1인이 아닌 5개 전문 법인의 현업 전문가가 동시 투입됩니다. 업무 방식 자체를 바꿉니다.' },
  { q: '월 2개 기업 한정인 이유는?', a: '5개 법인의 현업 전문가가 직접 투입되는 구조상, 품질 보장을 위해 수량을 제한합니다.' },
]

export default function AXFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section style={{ padding: '100px 0', background: '#0c0c10', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px,6vw,80px)', lineHeight: 0.92, letterSpacing: '-0.01em', color: '#fff' }}>
            자주 묻는 <span style={{ color: '#FF6B35' }}>질문</span>
          </h2>
        </div>
        <div>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', ...(i === 0 ? { borderTop: '1px solid rgba(255,255,255,0.07)' } : {}) }}
            >
              <div
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '24px 0 24px 40px',
                  cursor: 'pointer',
                  position: 'relative',
                  gap: '20px',
                }}
              >
                <span style={{
                  position: 'absolute',
                  left: 0,
                  top: '28px',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '13px',
                  color: openIdx === i ? '#FF6B35' : 'rgba(255,107,53,0.35)',
                  letterSpacing: '0.1em',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: openIdx === i ? '#FF6B35' : '#f0f0f4',
                  lineHeight: 1.3,
                }}>
                  {faq.q}
                </span>
                <span style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: `1.5px solid ${openIdx === i ? '#FF6B35' : 'rgba(255,255,255,0.15)'}`,
                  background: openIdx === i ? '#FF6B35' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '20px',
                  color: openIdx === i ? '#000' : 'rgba(255,255,255,0.4)',
                  transform: openIdx === i ? 'rotate(45deg)' : 'none',
                  transition: 'all 0.3s',
                }}>
                  +
                </span>
              </div>
              <div style={{
                maxHeight: openIdx === i ? '300px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s ease',
              }}>
                <p style={{
                  padding: '0 0 24px 40px',
                  fontSize: '15px',
                  color: 'rgba(240,240,244,0.65)',
                  lineHeight: 1.9,
                  maxWidth: '800px',
                }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}