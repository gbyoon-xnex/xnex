"use client"

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
  const pathname = usePathname();

  const accentColor = (() => {
    if (pathname.startsWith('/ax')) return '#FF6B35';
    if (pathname.startsWith('/aeo')) return '#ff4d4d';
    if (pathname.startsWith('/marketing')) return '#C6FF4E';
    return '#ffffff';
  })();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 md:p-0"
      style={{ 
        backgroundColor: 'rgba(0,0,0,0.8)', 
        zIndex: 1000 
      }}
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-[680px] max-h-[80vh] md:max-h-[80vh] overflow-y-auto bg-[#111] border border-[#222] rounded-lg p-6 md:p-10 scrollbar-hide"
        style={{
          maxHeight: 'min(80vh, 90vh)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:hidden" style={{ maxHeight: '90vh' }}></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="close-btn absolute top-4 right-4 md:top-6 md:right-6 text-[#888] transition-colors"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="space-y-8">
          <h2 
            className="text-[20px] font-bold text-white pb-4 border-b"
            style={{ borderColor: accentColor }}
          >
            개인정보처리방침
          </h2>

          <div className="space-y-6 text-[13px] leading-[1.8] text-[#888]">
            <p>
              (주)엑스넥스(이하 &apos;회사&apos;)는 개인정보 보호법 제30조에 따라
              정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고
              원활하게 처리할 수 있도록 하기 위하여 다음과 같이
              개인정보처리방침을 수립·공개합니다.<br />
              본 방침은 2026년 5월 6일부터 적용됩니다.
            </p>

            <section>
              <h3 className="font-semibold mb-2" style={{ color: accentColor }}>제1조 (개인정보의 처리 목적)</h3>
              <p>
                회사는 다음의 목적을 위하여 개인정보를 처리합니다.
                처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의
                동의를 받는 등 필요한 조치를 이행할 예정입니다.<br />
                1. 서비스 상담 및 문의 처리<br />
                2. 계약 체결 및 이행<br />
                3. 고객 관리
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2" style={{ color: accentColor }}>제2조 (처리하는 개인정보 항목)</h3>
              <p>
                [필수] 이름, 회사명, 연락처, 이메일, 업종<br />
                [선택] 관심 서비스, 문의 내용<br />
                [자동수집] IP주소, 쿠키, 방문기록
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2" style={{ color: accentColor }}>제3조 (개인정보의 보유 및 이용기간)</h3>
              <p>
                1. 상담 및 계약 관련 정보: 상담 완료 또는 계약 종료 후 3년<br />
                2. 관련 법령에 의한 보유기간<br />
                &nbsp;&nbsp;&nbsp;- 계약·청약철회 기록: 5년 (전자상거래법)<br />
                &nbsp;&nbsp;&nbsp;- 대금결제·재화공급 기록: 5년 (전자상거래법)<br />
                &nbsp;&nbsp;&nbsp;- 소비자 불만·분쟁처리 기록: 3년 (전자상거래법)<br />
                &nbsp;&nbsp;&nbsp;- 접속 기록: 3개월 (통신비밀보호법)
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2" style={{ color: accentColor }}>제4조 (개인정보의 제3자 제공)</h3>
              <p>
                회사는 정보주체의 동의 없이 제3자에게 개인정보를
                제공하지 않습니다. 단, 법령의 규정 또는 수사기관의
                적법한 요구가 있는 경우는 예외로 합니다.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2" style={{ color: accentColor }}>제5조 (개인정보 처리의 위탁)</h3>
              <p>
                수탁업체: Supabase, Inc.<br />
                위탁업무: 데이터베이스 운영 및 관리 (서버 인프라)<br />
                보유기간: 위탁 계약 종료 시까지
              </p>
              <p className="mt-2">
                [국외 이전 안내]<br />
                이전 국가: 미국 / 이전 방법: 네트워크를 통한 전송<br />
                이전받는 자 이용목적: 데이터베이스 관리 및 인프라 운영
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2" style={{ color: accentColor }}>제6조 (정보주체의 권리·의무 및 행사 방법)</h3>
              <p>
                정보주체는 회사에 대해 언제든지 개인정보 열람, 정정,
                삭제, 처리정지를 요구할 수 있습니다.<br />
                문의: contact@xnex.kr
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2" style={{ color: accentColor }}>제7조 (개인정보의 파기)</h3>
              <p>
                보유기간 경과 또는 처리목적 달성 시 지체 없이 파기합니다.<br />
                - 전자적 파일: 영구삭제<br />
                - 종이 문서: 분쇄 또는 소각
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2" style={{ color: accentColor }}>제8조 (안전성 확보 조치)</h3>
              <p>
                1. 관리적: 내부 관리계획 수립, 직원 교육<br />
                2. 기술적: 접근권한 관리, 암호화, 보안프로그램 설치<br />
                3. 물리적: 전산실 접근통제
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2" style={{ color: accentColor }}>제9조 (쿠키의 설치·운영 및 거부)</h3>
              <p>
                이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.<br />
                Chrome: 설정 → 개인정보 및 보안 → 쿠키 및 기타 사이트 데이터<br />
                Safari: 환경설정 → 개인정보 보호 → 쿠키 차단
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2" style={{ color: accentColor }}>제10조 (개인정보 보호책임자)</h3>
              <p>
                성명: 양인철<br />
                연락처: contact@xnex.kr
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2" style={{ color: accentColor }}>제11조 (처리방침 변경)</h3>
              <p>변경 시 시행 7일 전 홈페이지를 통해 공지합니다.</p>
            </section>

            <section>
              <h3 className="font-semibold mb-2" style={{ color: accentColor }}>제12조 (권익침해 구제 방법)</h3>
              <p>
                - 개인정보 분쟁조정위원회: 1833-6972 / www.kopico.go.kr<br />
                - 개인정보침해 신고센터: 118 / privacy.kisa.or.kr<br />
                - 대검찰청: 1301 / www.spo.go.kr<br />
                - 경찰청: 182 / ecrm.cyber.go.kr
              </p>
            </section>

            <p className="pt-4 border-t border-[#222]">
              (주)엑스넥스 | contact@xnex.kr | 시행일: 2026년 5월 6일
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .close-btn:hover {
          color: ${accentColor} !important;
        }
        @media (max-width: 768px) {
          .max-w-[680px] {
            max-width: 100%;
            margin: 16px;
            padding: 24px;
            max-height: 90vh !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyModal;