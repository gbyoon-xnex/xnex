'use client';

import { useEffect, useRef } from 'react';

export default function AeoHeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    let W: number, H: number;
    let pts: { x: number; y: number; vx: number; vy: number; r: number; col: string }[] = [];
    
    const resize = () => {
      if (!c) return;
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
    };
    
    const init = () => {
      pts = [];
      const n = Math.floor(W * H / 8000);
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.5 + 0.5,
          col: Math.random() < 0.15 ? 'rgba(224,32,32,' : 'rgba(255,255,255,'
        });
      }
    };

    resize();
    init();

    const handleResize = () => {
      resize();
      init();
    };

    window.addEventListener('resize', handleResize);

    let frame = 0;
    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      
      // bg gradient
      const grd = ctx.createRadialGradient(W * 0.3, H * 0.4, 0, W * 0.3, H * 0.4, W * 0.7);
      grd.addColorStop(0, 'rgba(224,32,32,0.04)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
      
      // lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      // dots
      pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col + '0.7)';
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });
      
      // scan line
      frame++;
      const sl = ((frame * 0.5) % H);
      ctx.beginPath();
      ctx.moveTo(0, sl);
      ctx.lineTo(W, sl);
      ctx.strokeStyle = 'rgba(224,32,32,0.04)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById('s9');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="s1" className="aeo-section">
      <canvas id="heroCanvas" ref={canvasRef}></canvas>
      <div className="hero-content">
        <div className="hero-eyebrow">한국 홈페이지의 95%는 AI가 인용조차 못 합니다</div>
        <h1 className="hero-h1">
          AI에게<br className="md:hidden" /> 우리 브랜드가<br />
          <span className="line-red"><em>인용되게</em> 만듭니다.</span>
        </h1>
        <p className="hero-sub">
          ChatGPT·Gemini·Perplexity는<br className="sm:hidden" /> 한 번에 3~5개만 답합니다.<br />
          그 안에 없으면, 당신의 브랜드는<br className="sm:hidden" /> <strong>존재하지 않는 것</strong>입니다.
        </p>
        <div className="hero-cta-group">
          <button className="btn-r" onClick={scrollToForm}>지금 상담 신청 →</button>
          <button className="btn-o" onClick={scrollToForm}>레퍼런스 자료 받기</button>
        </div>
        <div className="hero-trust">
          <div className="hero-trust-item">6개 업종 AI 답변 진입 완료</div>
          <div className="hero-trust-item">4개 AI 채널 동시 최적화</div>
          <div className="hero-trust-item">신청 즉시 자료 자동 발송</div>
        </div>
      </div>
      <div className="scroll-hint">
        <span>scroll</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
}