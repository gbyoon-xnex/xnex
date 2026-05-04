'use client';

import Image from 'next/image';

const nodeConfigs = [
  { title: 'CLASSX', sub: '교육', color: '#FFD700' },
  { title: 'X-그로스', sub: '마케팅', color: '#4A90E2' },
  { title: 'X-뷰티', sub: '브랜드', color: '#FF69B4' },
  { title: '스튜디오X', sub: 'AI 영상', color: '#8A2BE2' },
  { title: '사이트X', sub: 'AEO', color: '#7B68EE' },
  { title: 'X-빌드', sub: 'AX 컨설팅', color: '#9370DB' },
  { title: 'X-nest', sub: '공간', color: '#FFA500' },
  { title: 'X-허브', sub: 'SaaS', color: '#00FA9A' },
];

export default function OrbitHero() {
  return (
    <section className="relative max-w-[1600px] mx-auto my-8 md:my-32 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between min-h-[auto] md:h-[40rem] border border-dashed border-white/40 bg-white dark:bg-black overflow-hidden w-full" style={{ fontFamily: 'var(--font-sora)' }}>
      <span className="absolute -left-px -top-px block size-4 border-l-2 border-t-2" style={{ borderColor: 'var(--primary)' }} />
      <span className="absolute -right-px -top-px block size-4 border-r-2 border-t-2" style={{ borderColor: 'var(--primary)' }} />
      <span className="absolute -bottom-px -left-px block size-4 border-b-2 border-l-2" style={{ borderColor: 'var(--primary)' }} />
      <span className="absolute -bottom-px -right-px block size-4 border-b-2 border-r-2" style={{ borderColor: 'var(--primary)' }} />

      <div className="w-full md:w-1/2 z-10 text-center md:text-left pt-16 md:pt-0">
        <p className="text-[10px] md:text-sm font-bold tracking-widest text-blue-400 uppercase mb-4">AI Native Business Scale-up Partner</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-gray-900 dark:text-white leading-[1.2] md:leading-tight tracking-tight">
          AI 네이티브 전문가들이<br /> 클라이언트의 <span className="text-blue-500">X</span>를<br className="hidden lg:block" /> 만들어내는 기업.
        </h1>
        <p className="text-gray-400 dark:text-gray-400 text-sm sm:text-lg max-w-md mx-auto md:mx-0 leading-relaxed mb-10">
          X = Unknown · Exponential · Cross · Transformation<br className="hidden sm:block" />
          기존 공식으로 풀 수 없는 성장을, 엑스넥스가 설계합니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pb-4 md:pb-0">
          <a href="mailto:contact@xnex.kr" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-base font-bold hover:bg-gray-100 transition-colors">
            무료 AX 진단 →
          </a>
          <a href="#why" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 text-base font-medium hover:text-white transition-colors">
            왜 XNEX인가
          </a>
        </div>
      </div>

      <div className="relative w-full md:w-1/2 h-full flex items-center justify-center md:justify-start overflow-hidden py-4 md:py-0">
        <div className="relative w-[30rem] h-[30rem] sm:w-[40rem] sm:h-[40rem] md:w-[50rem] md:h-[50rem] md:translate-x-[20%] flex items-center justify-center scale-90 sm:scale-75 md:scale-100">
          {/* Center image (float) */}
          <div className="w-32 h-32 rounded-full flex items-center justify-center z-20 relative overflow-hidden orbit-float">
            <Image
              src="/images/bubble1.png"
              alt="XNEX background"
              fill
              sizes="(max-width: 768px) 100vw, 128px"
              className="object-cover rounded-full"
            />
            <div className="absolute inset-0 bg-black/10 z-[5]" />
            <span
              className="text-white font-black text-2xl tracking-tighter relative z-10"
              style={{
                fontFamily: 'var(--font-sora)',
                filter: 'drop-shadow(0 0 15px rgba(0,0,0,0.9))',
              }}
            >
              XNEX
            </span>
          </div>

          {/* Orbit lines (rotate) */}
          <div className="absolute inset-0 flex items-center justify-center orbit-container">
            <div className="absolute rounded-full border border-dashed border-white/25 w-[25rem] h-[25rem]" />
            <div className="absolute rounded-full border border-dashed border-white/25 w-[35rem] h-[35rem]" />
            <div className="absolute rounded-full border border-dashed border-white/25 w-[45rem] h-[45rem]" />
          </div>

          {/* Nodes (rotate) */}
          <div className="absolute w-full h-full orbit-spin">
            {nodeConfigs.map((node, idx) => {
              const angle = (idx * (2 * Math.PI)) / nodeConfigs.length;
              const x = 50 + 40 * Math.cos(angle);
              const y = 50 + 40 * Math.sin(angle);
              return (
                <div
                  key={node.title}
                  className="absolute"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="orbit-node-content bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 w-40 flex flex-col justify-center items-center" style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.2)' }}>
                    <div
                      className="text-lg font-black text-center leading-tight"
                      style={{ color: node.color }}
                    >
                      {node.title}
                    </div>
                    <div className="text-sm font-medium text-gray-200 text-center mt-1.5">
                      {node.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}