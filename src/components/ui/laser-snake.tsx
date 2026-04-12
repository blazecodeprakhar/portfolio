import { useEffect, useRef } from "react";

export const LaserSnake = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Desktop only protection (as requested)
    if (window.innerWidth < 768) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    const TRAIL_LENGTH = 50;
    const points: { x: number; y: number }[] = [];

    // Track mouse speed for dynamic glow
    let prevMouse = { x: 0, y: 0 };
    let mouseSpeed = 0;

    const mouse = { x: width / 2, y: height / 2, isActive: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      
      const dx = mouse.x - prevMouse.x;
      const dy = mouse.y - prevMouse.y;
      mouseSpeed = Math.sqrt(dx * dx + dy * dy);
      prevMouse = { x: mouse.x, y: mouse.y };
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      prevMouse = { x: mouse.x, y: mouse.y };
      mouse.isActive = true;

      // Initialize trail immediately at cursor to avoid teleporting snake
      if (points.length === 0) {
        for (let i = 0; i < TRAIL_LENGTH; i++) {
          points.push({ x: mouse.x, y: mouse.y });
        }
      } else {
        // Snap instantly back on re-enter
        for (let i = 0; i < TRAIL_LENGTH; i++) {
          points[i].x = mouse.x;
          points[i].y = mouse.y;
        }
      }
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
    };

    // Attach listeners to strict boundaries of the footer wrapper
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseenter", handleMouseEnter);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    let animationId: number;
    let currentOpacity = 0;
    let currentGlow = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      ctx.clearRect(0, 0, width, height);

      // Math for buttery smooth fade in/out sequence
      if (mouse.isActive) {
        currentOpacity += (1 - currentOpacity) * 0.05;
      } else {
        currentOpacity += (0 - currentOpacity) * 0.05;
      }

      // Glow physics based purely on velocity
      const targetGlow = mouse.isActive ? Math.min(mouseSpeed * 0.5 + 5, 25) : 0;
      currentGlow += (targetGlow - currentGlow) * 0.1;
      
      // Momentum decay for speed
      mouseSpeed *= 0.8;

      if (currentOpacity < 0.01 && !mouse.isActive) return;
      if (points.length === 0) return;

      // Highly tuned interpolation constants for slinky snaking motion
      points[0].x += (mouse.x - points[0].x) * 0.18;
      points[0].y += (mouse.y - points[0].y) * 0.18;

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.35;
        points[i].y += (points[i - 1].y - points[i].y) * 0.35;
      }

      // Core aesthetic gradient (Purple tail fading into bright orange head)
      const gradient = ctx.createLinearGradient(
        points[TRAIL_LENGTH - 1].x, points[TRAIL_LENGTH - 1].y,
        points[0].x, points[0].y
      );
      
      gradient.addColorStop(0, "rgba(168, 85, 247, 0)"); // Faded purple tail
      gradient.addColorStop(0.5, `rgba(168, 85, 247, ${currentOpacity * 0.8})`); 
      gradient.addColorStop(1, `rgba(249, 115, 22, ${currentOpacity})`); // Hot orange leading head

      // Begin rendering geometry
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      // Quadratic bezier spline approximation for flawless flowing edges
      for (let i = 1; i < TRAIL_LENGTH - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[TRAIL_LENGTH - 1].x, points[TRAIL_LENGTH - 1].y);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.2; // Extra thin specification
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.shadowBlur = currentGlow; // Glow directly tethered to your physical mouse speed
      ctx.shadowColor = `rgba(249, 115, 22, ${currentOpacity * 0.8})`;

      ctx.stroke();
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateSize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseenter", handleMouseEnter);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none hidden md:block"
      style={{ zIndex: 0 }}
    />
  );
};
