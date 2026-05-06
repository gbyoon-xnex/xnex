"use client";

import React, { useEffect, useRef } from "react";
import Counter from "@/components/ui/counter";

export default function MarketingHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const WORDS = ["X-GROSS", "MARKETING", "BRAND", "CAMPAIGN", "VIRAL", "GROWTH"];
    const COLORS = [
      { r: 198, g: 255, b: 78 },   // accent
      { r: 220, g: 220, b: 210 },  // off-white
      { r: 198, g: 255, b: 78 },
      { r: 170, g: 220, b: 60 },
      { r: 220, g: 220, b: 210 },
      { r: 198, g: 255, b: 78 },
    ];
    const PIXEL_STEP = 5;
    let frame = 0;
    let wordIdx = 0;
    const mouse = { x: -9999, y: -9999 };
    let animationId: number;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      tx: number;
      ty: number;
      spd: number;
      frc: number;
      sr: number;
      sg: number;
      sb: number;
      tr: number;
      tg: number;
      tb: number;
      cw: number;
      cr: number;
      dead: boolean;

      constructor() {
        const ang = Math.random() * Math.PI * 2;
        const mag = (canvas!.width + canvas!.height) * 0.5;
        this.x = canvas!.width * 0.68 + Math.cos(ang) * mag * 0.6;
        this.y = canvas!.height * 0.45 + Math.sin(ang) * mag * 0.4;
        this.vx = 0;
        this.vy = 0;
        this.tx = 0;
        this.ty = 0;
        this.spd = Math.random() * 5 + 3;
        this.frc = this.spd * 0.046;
        this.sr = 0;
        this.sg = 0;
        this.sb = 0;
        this.tr = 198;
        this.tg = 255;
        this.tb = 78;
        this.cw = 0;
        this.cr = Math.random() * 0.022 + 0.003;
        this.dead = false;
      }

      move() {
        const dx = this.tx - this.x;
        const dy = this.ty - this.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const pr = d < 80 ? d / 80 : 1;
        const sx = (dx / d) * this.spd * pr - this.vx;
        const sy = (dy / d) * this.spd * pr - this.vy;
        const sm = Math.sqrt(sx * sx + sy * sy) || 1;
        this.vx += (sx / sm) * this.frc;
        this.vy += (sy / sm) * this.frc;
        this.x += this.vx;
        this.y += this.vy;

        const mdx = this.x - mouse.x;
        const mdy = this.y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 70) {
          this.vx += (mdx / md) * 3;
          this.vy += (mdy / md) * 3;
        }
      }

      draw() {
        if (this.cw < 1) this.cw = Math.min(this.cw + this.cr, 1);
        const r = Math.round(this.sr + (this.tr - this.sr) * this.cw);
        const g = Math.round(this.sg + (this.tg - this.sg) * this.cw);
        const b = Math.round(this.sb + (this.tb - this.sb) * this.cw);
        ctx!.fillStyle = `rgb(${r},${g},${b})`;
        ctx!.fillRect(this.x, this.y, 2, 2);
      }

      kill() {
        if (!this.dead) {
          const ang = Math.random() * Math.PI * 2;
          const mag = (canvas!.width + canvas!.height) * 0.55;
          this.tx = canvas!.width * 0.68 + Math.cos(ang) * mag;
          this.ty = canvas!.height * 0.45 + Math.sin(ang) * mag * 0.7;
          const cw2 = this.cw;
          this.sr = this.sr + (this.tr - this.sr) * cw2;
          this.sg = this.sg + (this.tg - this.sg) * cw2;
          this.sb = this.sb + (this.tb - this.sb) * cw2;
          this.tr = 0;
          this.tg = 0;
          this.tb = 0;
          this.cw = 0;
          this.dead = true;
        }
      }
    }

    const particles: Particle[] = [];

    const showWord = (word: string, col: { r: number; g: number; b: number }) => {
      const off = document.createElement("canvas");
      off.width = canvas!.width;
      off.height = canvas!.height;
      const octx = off.getContext("2d")!;
      const fsize = Math.round(canvas!.width * 0.08);
      octx.font = `900 ${fsize}px "Noto Sans KR"`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText(word, canvas!.width * 0.68, canvas!.height * 0.45);

      const data = octx.getImageData(0, 0, canvas!.width, canvas!.height).data;
      const newT: { x: number; y: number }[] = [];
      for (let y = 0; y < canvas!.height; y += PIXEL_STEP) {
        for (let x = 0; x < canvas!.width; x += PIXEL_STEP) {
          const idx = (x + y * canvas!.width) * 4;
          if (data[idx + 3] > 128) newT.push({ x, y });
        }
      }

      const count = newT.length;
      if (particles.length < count) {
        for (let i = particles.length; i < count; i++) particles.push(new Particle());
      }
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (i < count) {
          if (p.dead) {
            p.dead = false;
            p.cw = 0;
            p.sr = 0;
            p.sg = 0;
            p.sb = 0;
          }
          p.tx = newT[i].x;
          p.ty = newT[i].y;
          p.tr = col.r;
          p.tg = col.g;
          p.tb = col.b;
        } else {
          p.kill();
        }
      }
    };

    const animate = () => {
      frame++;
      ctx!.fillStyle = "#080808";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach((p) => {
        p.move();
        p.draw();
      });
      if (frame % 180 === 0) {
        wordIdx = (wordIdx + 1) % WORDS.length;
        showWord(WORDS[wordIdx], COLORS[wordIdx]);
      }
      animationId = requestAnimationFrame(animate);
    };

    const resize = () => {
      canvas!.width = hero!.clientWidth || window.innerWidth;
      canvas!.height = hero!.clientHeight || window.innerHeight;
      ctx!.fillStyle = "#080808";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      showWord(WORDS[wordIdx], COLORS[wordIdx]);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    hero!.addEventListener("mousemove", handleMouseMove);
    hero!.addEventListener("mouseleave", handleMouseLeave);

    // Scroll Reveal IntersectionObserver
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const rvElements = hero!.querySelectorAll(".rv");
    rvElements.forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("resize", resize);
      hero!.removeEventListener("mousemove", handleMouseMove);
      hero!.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
      io.disconnect();
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} className="mg-hero" style={{ paddingTop: "60px" }}>
      <canvas ref={canvasRef} className="mg-ptc" style={{ pointerEvents: "none" }} />

      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <div className="he-badge">
              <span className="he-dot"></span>5월 한정 잔여 3자리
            </div>
            <span className="he-pipe">|</span>
            <span className="he-sub">브랜드 캠페인 전문 에이전시 · Seoul</span>
          </div>
          <h1 className="hero-h1">
            <span className="h1-line">
              <span>광고를 넘어,</span>
            </span>
            <span className="h1-line">
              <span>브랜드를</span>
            </span>
            <span className="h1-line">
              <span>설계합니다.</span>
            </span>
          </h1>
          <div className="hero-row">
            <p className="hero-desc">
              IT + 데이터 + 콘텐츠 기반의 마케팅 에이전시.
              <br />
              연 광고비 200억을 직접 집행한 전략가가
              <br />
              귀사의 캠페인을 직접 설계합니다.
            </p>
            <div className="hero-ctas" style={{ marginTop: "36px" }}>
              <a href="#cta" className="btn-prim">
                캠페인 시작하기 →
              </a>
              <a href="#work" className="btn-sec">
                서비스 더 보기{" "}
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M2 7.5h11M8 3l4.5 4.5L8 12"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="hs rv">
          <div className="hs-n">
            <Counter target={420} />
            <span className="acc">+</span>
          </div>
          <div className="hs-l">성공 캠페인</div>
        </div>
        <div className="hs rv d1">
          <div className="hs-n">
            <Counter target={94} />
            <span className="acc">%</span>
          </div>
          <div className="hs-l">KPI 달성률</div>
        </div>
        <div className="hs rv d2">
          <div className="hs-n">
            <Counter target={12} />
            <span className="acc">×</span>
          </div>
          <div className="hs-l">평균 바이럴 배수</div>
        </div>
        <div className="hs rv d3">
          <div className="hs-n">
            <Counter target={8} />
            <span className="acc">년</span>
          </div>
          <div className="hs-l">업력</div>
        </div>
      </div>

      <div className="scroll-hint">
        <span className="sh-bar"></span>scroll
      </div>
    </section>
  );
}