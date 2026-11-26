import { useEffect, useRef } from "react";

const colors = ["#3d7398", "#3f91b6", "#37afc5", "#3dc9c2", "#76e5c4", "#d4fff0"];
const digits = "0123456789";
const feed = 0.0545;
const kill = 0.062;

const ReactionDiffusionBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      console.error("Unable to initialize the reaction-diffusion background canvas.");
      return;
    }

    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let cellWidth = 0;
    let cellHeight = 0;
    let u = new Float32Array(0);
    let v = new Float32Array(0);
    let nextU = new Float32Array(0);
    let nextV = new Float32Array(0);
    let frame = 0;
    let animationFrame = 0;
    let lastFrameTime = 0;

    const step = () => {
      for (let y = 0; y < rows; y++) {
        const row = y * columns;
        const above = ((y + rows - 1) % rows) * columns;
        const below = ((y + 1) % rows) * columns;

        for (let x = 0; x < columns; x++) {
          const index = row + x;
          const left = row + (x + columns - 1) % columns;
          const right = row + (x + 1) % columns;
          const chemicalU = u[index];
          const chemicalV = v[index];
          const laplacianU = u[left] + u[right] + u[above + x] + u[below + x] - 4 * chemicalU;
          const laplacianV = v[left] + v[right] + v[above + x] + v[below + x] - 4 * chemicalV;
          const reaction = chemicalU * chemicalV * chemicalV;

          nextU[index] =
            chemicalU + 0.2 * laplacianU - reaction + feed * (1 - chemicalU);
          nextV[index] =
            chemicalV + 0.1 * laplacianV + reaction - (feed + kill) * chemicalV;
        }
      }

      [u, nextU] = [nextU, u];
      [v, nextV] = [nextV, v];
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.font = "10px Consolas, 'Courier New', monospace";
      context.textBaseline = "middle";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const index = y * columns + x;
          const concentration = Math.min(1, v[index] * 3);
          const shade = Math.min(colors.length - 1, Math.floor(concentration * colors.length));
          const digit =
            (Math.floor(concentration * 9) + x * 3 + y * 7 + Math.floor(frame / 4)) % 10;

          context.fillStyle = colors[shade];
          context.fillText(digits[digit], x * cellWidth, (y + 0.5) * cellHeight);
        }
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;

      if (!width || !height) return;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      columns = Math.ceil(width / 7);
      rows = Math.ceil(height / 14);
      cellWidth = width / columns;
      cellHeight = height / rows;
      u = new Float32Array(columns * rows).fill(1);
      v = new Float32Array(columns * rows);
      nextU = new Float32Array(columns * rows);
      nextV = new Float32Array(columns * rows);

      for (let seed = 0; seed < 18; seed++) {
        const centerX = Math.floor(Math.random() * columns);
        const centerY = Math.floor(Math.random() * rows);

        for (let offsetY = -2; offsetY <= 2; offsetY++) {
          for (let offsetX = -2; offsetX <= 2; offsetX++) {
            const x = (centerX + offsetX + columns) % columns;
            const y = (centerY + offsetY + rows) % rows;
            const index = y * columns + x;
            u[index] = 0.5 + Math.random() * 0.1;
            v[index] = 0.25 + Math.random() * 0.1;
          }
        }
      }

      for (let iteration = 0; iteration < 40; iteration++) step();
      draw();
    };

    const animate = (time: number) => {
      animationFrame = window.requestAnimationFrame(animate);

      if (time - lastFrameTime < 1000 / 24) return;
      lastFrameTime = time;
      frame++;

      for (let iteration = 0; iteration < 4; iteration++) step();
      draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animationFrame = window.requestAnimationFrame(animate);
    }

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
};

export default ReactionDiffusionBackground;
