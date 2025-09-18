import React, { useRef, useState, useEffect } from "react";
import image from "./national.jpg";

const CARD_IMG = image;
const CANVAS_WIDTH = 2000;
const CANVAS_HEIGHT = 2000;
const NAME_BOX = { x: 600, y: 1600, w: 800, h: 200 };

export default function App() {
  const [name, setName] = useState("");
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new window.Image();
    img.src = CARD_IMG;
    img.onload = () => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.font = "bold 60px 'Tajawal', Arial, sans-serif";
      ctx.direction = "rtl";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 8;

      let lines = [];
      if (name.length > 27) {
        let splitAt = name.lastIndexOf(" ", 27);
        if (splitAt === -1) splitAt = 27;
        lines = [name.slice(0, splitAt).trim(), name.slice(splitAt).trim()];
      } else {
        lines = [name];
      }

      const centerX = NAME_BOX.x + NAME_BOX.w / 2;
      const centerY = NAME_BOX.y + NAME_BOX.h / 2;

      ctx.shadowBlur = 8;
      // For two lines:
      if (lines.length === 2) {
        ctx.fillText(lines[0], centerX, centerY - 30);
        ctx.fillText(lines[1], centerX, centerY + 30);
      } else {
        ctx.fillText(lines[0], centerX, centerY);
      }
      ctx.shadowBlur = 0;
    };
  }, [name]);


  const handleDownload = () => {
    const url = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "national-day-card.png";
    link.click();
  };

  return (
    <div className="container" style={{ maxWidth: 600, margin: "0 auto", minHeight: "100vh" }}>
      <div style={{ textAlign: "center" }}>
        <h3 className="my-4" style={{ fontWeight: "bold", flex: 1 }}>بطاقة اليوم الوطني السعودي</h3>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="أدخل اسمك هنا"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={35}
          style={{
            direction: "rtl",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "clamp(1.2rem, 4vw, 2.2rem)",
            borderRadius: "2rem",
            boxShadow: "0 2px 12px #0001",
            width: "min(400px, 90vw)",
            height: "3.5rem",
            margin: "0 auto 32px auto",
            border: "2px solid #0091ea",
            outline: "none",
            transition: "border 0.2s",
            padding: "0 20px",
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{
            maxWidth: "100%",
            borderRadius: 18,
            boxShadow: "0 6px 30px #0002",
            background: "#333",
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          className="btn mt-4"
          onClick={handleDownload}
          style={{
            background: "linear-gradient(90deg, #28ac59 0%, #010101 100%)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.5rem",
            padding: "1rem 3rem",
            borderRadius: "2rem",
            boxShadow: "0 2px 12px #28ac5980",
            border: "2px solid #28ac59",
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            letterSpacing: "0.5px"
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v12M12 16l-4-4M12 16l4-4M4 20h16" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          تحميل البطاقة
        </button>
      </div>
    </div>
  );
}
