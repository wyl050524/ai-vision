"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type Product = {
  id: string;
  short: string;
  name: string;
  category: string;
  image: string;
  confidence: string;
  match: string;
  status: "verified" | "review";
  tech: string[];
  ingredients: { name: string; role: string }[];
  effects: string[];
  audience: string[];
  source: { label: string; href: string };
  note: string;
};

const products: Product[] = [
  {
    id: "ruby-serum",
    short: "红宝石精华",
    name: "珀莱雅红宝石淡纹紧致精华 2.0",
    category: "抗老精华 · 30 ml",
    image: "/珀莱雅产品图/2021042918330812.png",
    confidence: "96.8%",
    match: "SKU 级匹配",
    status: "verified",
    tech: ["黄金「胜A」协同抗皱", "超分子包裹缓释", "AirFree 真空锁鲜包装"],
    ingredients: [
      { name: "20% 双效六胜肽溶液", role: "针对动态纹路" },
      { name: "1% 超分子维A醇", role: "针对静态纹路" },
      { name: "三重抗老组合成分", role: "协同提升抗皱力" },
    ],
    effects: ["淡化可见纹路", "改善肌肤紧致度", "水润丝滑、快速吸收"],
    audience: ["有初老、淡纹需求", "希望改善松弛与纹路", "需逐步建立 A 醇耐受"],
    source: {
      label: "珀莱雅官网 · 产品详情",
      href: "https://www.proya.com/product_detail-pId-695.html",
    },
    note: "产品名称与核心成分已由品牌官网交叉确认；实际使用请以包装标识为准。",
  },
  {
    id: "soothing-mask",
    short: "肌源舒缓面膜",
    name: "珀莱雅肌源舒缓优效面膜",
    category: "舒缓面膜 · 28 ml × 5",
    image: "/珀莱雅产品图/bkkqEwFfe1uJ2WQhRGnw1Q.jpg",
    confidence: "98.2%",
    match: "SKU 级匹配",
    status: "verified",
    tech: ["多路径温和舒缓", "全谱透明质酸补水", "冰氨纤维安心膜布"],
    ingredients: [
      { name: "神经舒缓肽", role: "缓解脆弱不适" },
      { name: "鼠李糖舒缓剂", role: "温和舒缓泛红" },
      { name: "Aquaxyl™", role: "深润保湿" },
    ],
    effects: ["镇定舒缓", "改善干燥缺水", "轻薄服帖、清爽不黏腻"],
    audience: ["干燥缺水肌", "脆弱、易泛红肌肤", "偏好温和密集护理"],
    source: {
      label: "珀莱雅官网 · 产品详情",
      href: "https://www.proya.com/product_detail-pId-702.html",
    },
    note: "包装文字与官网产品图高度一致，功效及成分名称来自品牌公开页面。",
  },
  {
    id: "ruby-cream",
    short: "赋能鲜颜面霜",
    name: "赋能鲜颜淡纹紧致轻盈霜 2.0",
    category: "淡纹面霜 · 50 g",
    image: "/珀莱雅产品图/2022071118255011.jpg",
    confidence: "92.4%",
    match: "系列级匹配",
    status: "review",
    tech: ["六重胜肽协同体系", "羽感呼吸微粒", "柔焦控油因子"],
    ingredients: [
      { name: "10% 五种胜肽", role: "紧致与淡纹支持" },
      { name: "玻尿酸胜肽", role: "补水充盈" },
      { name: "微红藻", role: "滋养与抗老协同" },
    ],
    effects: ["改善干纹细纹", "饱满紧实", "锁水同时减少油光"],
    audience: ["有紧致淡纹需求", "偏好轻盈哑光肤感", "混合肌或易出油人群"],
    source: {
      label: "珀莱雅官网 · 产品详情",
      href: "https://www.proya.com/product_detail-pId-652.html",
    },
    note: "图片缺少完整背标，系统完成系列级匹配；正式结论建议扫描条码或背标复核。",
  },
  {
    id: "aqua-set",
    short: "水漾芯肌套装",
    name: "珀莱雅水漾芯肌透润系列",
    category: "水 · 乳 · 精华组合",
    image: "/珀莱雅产品图/2022112813272813.png",
    confidence: "99.1%",
    match: "系列级匹配",
    status: "verified",
    tech: ["补水—储水—锁水路径", "海洋高保湿精萃", "保湿屏障强化"],
    ingredients: [
      { name: "大溪地泻湖藻", role: "海洋保湿精萃" },
      { name: "EPS 奇迹因子", role: "帮助强化保湿屏障" },
      { name: "琼崖海棠果油", role: "滋养修护" },
    ],
    effects: ["清润补水", "改善干燥紧绷", "提升柔软与通透光泽"],
    audience: ["缺水、干燥肌肤", "日常基础保湿需求", "偏好清润肤感"],
    source: {
      label: "珀莱雅官网 · 系列详情",
      href: "https://www.proya.com/product_query-xId-597.html",
    },
    note: "系列名称与包装容量可见；不同清润/倍润版本应结合瓶身背标进一步区分。",
  },
  {
    id: "proya-set",
    short: "多品类套装",
    name: "珀莱雅多品类护理套装",
    category: "组合产品 · 多 SKU",
    image: "/珀莱雅产品图/1715258933910790144.jpg",
    confidence: "84.6%",
    match: "候选集合",
    status: "review",
    tech: ["多目标产品分割", "包装正面 OCR", "逐件 SKU 候选召回"],
    ingredients: [
      { name: "当前图像为组合场景", role: "需逐件识别" },
      { name: "缺少完整背标", role: "不推测 INCI" },
      { name: "候选资料待复核", role: "避免错误归因" },
    ],
    effects: ["覆盖多步骤护理", "可能包含面膜与精华", "功效需按单品分别核验"],
    audience: ["暂不自动推断", "需确认每件产品版本", "建议补充背标或条码图"],
    source: {
      label: "珀莱雅官网 · 品牌产品库",
      href: "https://www.proya.com/",
    },
    note: "演示系统主动降低置信度：多产品合照不应被压缩成一个未经核验的功效结论。",
  },
];

const pipeline = [
  ["01", "视觉定位", "检测包装轮廓与多产品边界"],
  ["02", "文字提取", "读取品牌、品名、规格与标签"],
  ["03", "知识匹配", "召回候选 SKU 与官方资料"],
  ["04", "可信生成", "归纳技术、成分、功效与人群"],
];

export function ProductVision() {
  const [selected, setSelected] = useState(0);
  const [phase, setPhase] = useState<"idle" | "scanning" | "done">("done");
  const [progress, setProgress] = useState(100);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [customName, setCustomName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const current = products[selected];

  useEffect(() => {
    return () => {
      if (customImage) URL.revokeObjectURL(customImage);
    };
  }, [customImage]);

  const runScan = (nextIndex = selected) => {
    setSelected(nextIndex);
    setCustomImage(null);
    setPhase("scanning");
    setProgress(14);
    const steps = [31, 52, 76, 94, 100];
    steps.forEach((value, index) => {
      window.setTimeout(() => setProgress(value), 260 * (index + 1));
    });
    window.setTimeout(() => setPhase("done"), 1650);
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (customImage) URL.revokeObjectURL(customImage);
    setCustomImage(URL.createObjectURL(file));
    setCustomName(file.name);
    setPhase("scanning");
    setProgress(12);
    [38, 63, 82, 100].forEach((value, index) => {
      window.setTimeout(() => setProgress(value), 320 * (index + 1));
    });
    window.setTimeout(() => setPhase("done"), 1650);
  };

  const activeImage = customImage || current.image;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="返回顶部">
          <span className="brand-mark">V</span>
          <span>VISION / 01</span>
        </a>
        <nav aria-label="主导航">
          <a href="#demo">识别演示</a>
          <a href="#pipeline">技术流程</a>
          <a href="#sources">数据来源</a>
        </nav>
        <div className="author">A PROJECT BY <strong>王云龙</strong></div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span /> AI PRODUCT INTELLIGENCE</div>
          <h1>看见包装，<br /><em>更读懂配方。</em></h1>
          <p className="hero-lead">
            从一张产品图出发，将包装文字、官方资料与成分知识图谱连接起来，
            输出一份可读、可核验的产品档案。
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => fileRef.current?.click()}>
              <span>上传产品图</span><b>↗</b>
            </button>
            <button className="text-button" onClick={() => document.querySelector("#demo")?.scrollIntoView({ behavior: "smooth" })}>
              查看示例 <span>↓</span>
            </button>
          </div>
          <input
            ref={fileRef}
            className="visually-hidden"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleUpload}
          />
          <div className="hero-footnote">
            <span className="pulse-dot" /> DEMO MODE
            <i />
            图片仅在当前浏览器中预览
          </div>
        </div>

        <div className="hero-visual">
          <div className={`scan-stage ${phase === "scanning" ? "is-scanning" : ""}`}>
            <div className="stage-meta">
              <span>LIVE INPUT / 01</span>
              <span>{phase === "scanning" ? `${progress}%` : "READY"}</span>
            </div>
            <div className="image-frame">
              <Image src={activeImage} alt={customImage ? "用户上传的产品图预览" : current.name} fill priority unoptimized sizes="(max-width: 900px) 86vw, 42vw" />
              <div className="scan-line" />
              <span className="corner c1" /><span className="corner c2" />
              <span className="corner c3" /><span className="corner c4" />
              <div className="target-dot d1"><span>01</span></div>
              <div className="target-dot d2"><span>02</span></div>
            </div>
            <div className="stage-footer">
              <span>OCR · PACKAGING · KNOWLEDGE GRAPH</span>
              <button onClick={() => {
                if (customImage) {
                  URL.revokeObjectURL(customImage);
                  setCustomImage(null);
                }
                runScan();
              }}>
                {phase === "scanning" ? "识别中…" : "重新扫描"}
              </button>
            </div>
          </div>
          <div className="floating-card floating-a">
            <small>OBJECT</small><strong>{customImage ? "NEW INPUT" : "SKINCARE"}</strong>
          </div>
          <div className="floating-card floating-b">
            <small>MATCH</small><strong>{customImage ? "DEMO PREVIEW" : current.confidence}</strong>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="系统能力">
        <span>PACKAGING OCR</span><i />
        <span>SKU RETRIEVAL</span><i />
        <span>INGREDIENT GRAPH</span><i />
        <span>SOURCE TRACEABILITY</span>
      </section>

      <section className="demo-section" id="demo">
        <div className="section-heading">
          <div>
            <span className="section-no">01 / LIVE DEMO</span>
            <h2>从视觉信号到产品结论</h2>
          </div>
          <p>点击任一产品样例，查看 AI 如何将识别结果整理为结构化报告。</p>
        </div>

        <div className="sample-rail" role="list" aria-label="产品样例">
          {products.map((product, index) => (
            <button
              key={product.id}
              role="listitem"
              className={selected === index && !customImage ? "sample-card active" : "sample-card"}
              onClick={() => runScan(index)}
            >
              <span className="sample-index">0{index + 1}</span>
              <span className="sample-thumb">
                <Image src={product.image} alt="" fill unoptimized sizes="100px" />
              </span>
              <span className="sample-label">{product.short}</span>
              <span className={`sample-status ${product.status}`}>{product.status === "verified" ? "已核验" : "待复核"}</span>
            </button>
          ))}
        </div>

        <div className="result-shell">
          <div className="result-media">
            <div className="result-media-top">
              <span>INPUT / PRODUCT IMAGE</span>
              <span className={current.status === "verified" ? "verified-chip" : "review-chip"}>
                {customImage ? "演示上传" : current.status === "verified" ? "来源已核验" : "建议人工复核"}
              </span>
            </div>
            <div className="result-image">
              <Image src={activeImage} alt={customImage ? customName : current.name} fill unoptimized sizes="(max-width: 800px) 92vw, 38vw" />
              {phase === "scanning" && <div className="result-scan"><span /></div>}
            </div>
            <div className="recognition-log">
              <span>BRAND</span><strong>{customImage ? "待识别" : "PROYA / 珀莱雅"}</strong>
              <span>CONFIDENCE</span><strong>{customImage ? "DEMO" : current.confidence}</strong>
              <span>MATCH LEVEL</span><strong>{customImage ? "LOCAL PREVIEW" : current.match}</strong>
            </div>
          </div>

          <div className="result-content">
            <div className="result-kicker">
              <span className={phase === "scanning" ? "status-orb scanning" : "status-orb"} />
              {phase === "scanning" ? `ANALYSING · ${progress}%` : "ANALYSIS COMPLETE"}
            </div>
            <h3>{customImage ? "新上传产品 · 演示预览" : current.name}</h3>
            <p className="category">{customImage ? customName : current.category}</p>

            {customImage ? (
              <div className="custom-result">
                <h4>这张图片已在本地成功读取</h4>
                <p>当前作品是高完成度交互演示，不会把任意上传图片发送到模型，也不会凭外观虚构产品功效。接入正式视觉 API 与产品知识库后，这里将输出完整报告。</p>
                <div className="custom-steps">
                  <span>✓ 图像接收</span><span>○ 包装 OCR</span><span>○ SKU 检索</span><span>○ 资料核验</span>
                </div>
              </div>
            ) : (
              <>
                <div className="insight-grid">
                  <article>
                    <div className="card-title"><span>TECH</span><h4>核心技术</h4></div>
                    <ul>{current.tech.map(item => <li key={item}>{item}</li>)}</ul>
                  </article>
                  <article>
                    <div className="card-title"><span>FORMULA</span><h4>关键成分</h4></div>
                    <div className="ingredient-list">
                      {current.ingredients.map(item => (
                        <div key={item.name}><strong>{item.name}</strong><small>{item.role}</small></div>
                      ))}
                    </div>
                  </article>
                  <article>
                    <div className="card-title"><span>EFFECT</span><h4>主要功效</h4></div>
                    <ul>{current.effects.map(item => <li key={item}>{item}</li>)}</ul>
                  </article>
                  <article>
                    <div className="card-title"><span>FIT</span><h4>适用人群</h4></div>
                    <ul>{current.audience.map(item => <li key={item}>{item}</li>)}</ul>
                  </article>
                </div>
                <div className="evidence-row">
                  <div>
                    <span>证据说明</span>
                    <p>{current.note}</p>
                  </div>
                  <a href={current.source.href} target="_blank" rel="noreferrer">
                    查看官方来源 <b>↗</b>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="pipeline-section" id="pipeline">
        <div className="pipeline-intro">
          <span className="section-no light">02 / HOW IT WORKS</span>
          <h2>不是“看图说话”，<br />而是<span>有证据的生成。</span></h2>
          <p>视觉模型负责看见，知识库负责确认，生成模型负责把复杂资料变成清晰答案。</p>
        </div>
        <div className="pipeline-list">
          {pipeline.map(([no, title, desc], index) => (
            <article key={no}>
              <span className="pipeline-no">{no}</span>
              <div className="pipeline-icon">{index === 0 ? "⌗" : index === 1 ? "Aa" : index === 2 ? "◎" : "✓"}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <i />
            </article>
          ))}
        </div>
      </section>

      <section className="source-section" id="sources">
        <div className="section-heading source-heading">
          <div>
            <span className="section-no">03 / EVIDENCE</span>
            <h2>让每条结论，都能回到出处</h2>
          </div>
          <p>演示内容优先引用品牌官网公开页面，并保留置信度与复核状态。</p>
        </div>
        <div className="source-grid">
          <div className="source-manifest">
            <div className="manifest-top"><span>DATA MANIFEST</span><strong>05 SOURCES</strong></div>
            {products.map((product, index) => (
              <a href={product.source.href} target="_blank" rel="noreferrer" key={product.id}>
                <span>0{index + 1}</span>
                <div><strong>{product.short}</strong><small>{product.source.label}</small></div>
                <b>↗</b>
              </a>
            ))}
          </div>
          <div className="guardrail-card">
            <span className="guardrail-label">AI GUARDRAIL</span>
            <h3>不确定，<br />也是一种专业结论。</h3>
            <p>当图片缺少背标、条码或清晰品名时，系统降低置信度并请求复核，而不是补全不存在的事实。</p>
            <div className="guardrail-meter">
              <div><span>视觉可见</span><b>包装 / 品名 / 规格</b></div>
              <div><span>资料匹配</span><b>技术 / 成分 / 功效</b></div>
              <div><span>谨慎推断</span><b>肤质 / 人群 / 注意事项</b></div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-mark">VISION / 01</div>
        <div>
          <p>AI 产品视觉识别 · 高完成度交互演示</p>
          <small>内容仅用于技术展示，不构成医疗或个体护肤建议。</small>
        </div>
        <div className="footer-sign">DESIGNED & BUILT BY <strong>王云龙</strong><br /><span>© 2026</span></div>
      </footer>
    </main>
  );
}
