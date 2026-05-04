export default function MarketingMarquee() {
  const items = [
    { label: "브랜드 설계", en: "Brand Design", highlight: true },
    { label: "캠페인 기획", en: "Campaign Strategy", highlight: false },
    { label: "바이럴 확산", en: "Viral Growth", highlight: false },
    { label: "광고를 넘어", en: "Beyond Advertising", highlight: false },
    { label: "인게이지먼트", en: "Engagement", highlight: false },
    { label: "퍼포먼스", en: "Performance", highlight: false },
  ];

  return (
    <div className="mband">
      <div className="mtrack">
        {/* First set */}
        {items.map((item, idx) => (
          <span key={`set1-${idx}`} className={`mi ${item.highlight ? "hi" : ""}`}>
            {item.label}
            <span className="mi">
              <span className="mdot">✦</span>
              {item.en}
            </span>
          </span>
        ))}
        {/* Second set (cloned for infinite loop) */}
        {items.map((item, idx) => (
          <span key={`set2-${idx}`} className={`mi ${item.highlight ? "hi" : ""}`}>
            {item.label}
            <span className="mi">
              <span className="mdot">✦</span>
              {item.en}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}