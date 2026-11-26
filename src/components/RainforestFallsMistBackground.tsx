import { useEffect, useRef } from "react";

const foliageGlyphs = ".,:;!|/\\{}[]()<>^v~+=*#%";
const waterGlyphs = "|!:;~=+*";
const poolGlyphs = ".:-=~+*";

const darkPalette = {
  foliage: ["#2b5b25", "#568130", "#8bab45"],
  trunk: "#23451d",
  upperTrunk: "#52772c",
  waterfall: ["#57938b", "#85bab2", "#b9d8d1"],
  pool: ["#12645f", "#20847c", "#48aaa0"],
  mist: "#7bb6a5",
  distant: "#72956a",
};

const lightPalette = {
  foliage: ["#214d29", "#386e36", "#638943"],
  trunk: "#284d30",
  upperTrunk: "#527238",
  waterfall: ["#397b7b", "#347f83", "#466f78"],
  pool: ["#176b65", "#207c73", "#388f85"],
  mist: "#638d82",
  distant: "#71866c",
};

const RainforestFallsMistBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      console.error("Unable to initialize the rainforest falls background canvas.");
      return;
    }

    let columns = 0;
    let rows = 0;
    let cellWidth = 0;
    let cellHeight = 0;
    let frame = 0;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let backgroundColor = "#020603";
    let isLightTheme = false;

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;

      const palette = isLightTheme ? lightPalette : darkPalette;
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, width, height);
      context.font = `${Math.max(8, Math.floor(cellHeight * 0.82))}px Consolas, 'Courier New', monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      const phase = frame * 0.045;

      for (let y = 0; y < rows; y++) {
        const ny = (y + 0.5) / rows;

        for (let x = 0; x < columns; x++) {
          const nx = (x + 0.5) / columns;
          const turbulence = Math.sin(ny * 17 + phase) * 0.006;
          const progress = Math.max(0, Math.min(1, (ny - 0.18) / 0.66));
          const fallCenter = 0.5 + Math.sin(ny * 8 + phase) * 0.009;
          const fallWidth = 0.055 + progress * 0.047 + turbulence;
          const inWaterfall = ny > 0.18 && ny < 0.84 && Math.abs(nx - fallCenter) < fallWidth;
          const inPool = ny > 0.81 && nx > 0.025 && nx < 0.975;
          const noiseValue = Math.sin(x * 127.1 + y * 311.7 + 19.19) * 43758.5453;
          const noise = noiseValue - Math.floor(noiseValue);
          const flicker = Math.sin(phase * 2 + x * 0.23 + y * 0.11) * 0.12;
          const trunk = [0.075, 0.12, 0.88, 0.935].some(
            (position) => Math.abs(nx - position) < 0.009 + ny * 0.008,
          );
          const canopy = ny < 0.3 && (ny < 0.2 || Math.abs(nx - 0.5) > 0.085 + ny * 0.08);
          const bank = ny < 0.82 && ny > 0.28 && (nx < 0.2 || nx > 0.8);
          const forest = canopy || bank;
          let glyph = "";
          let color = "";

          if (inWaterfall) {
            const centerRatio = Math.abs(nx - fallCenter) / fallWidth;
            const flow = Math.floor(y * 0.8 - frame * 0.7 + x * 0.35 + noise * 5);
            glyph = waterGlyphs[(flow % waterGlyphs.length + waterGlyphs.length) % waterGlyphs.length];
            color = centerRatio < 0.34 ? palette.waterfall[2] : centerRatio < 0.7 ? palette.waterfall[1] : palette.waterfall[0];
          } else if (inPool) {
            const ripple = Math.sin(nx * 75 + phase * 1.6 + ny * 16);
            if (noise + ripple * 0.13 > 0.11) {
              const flow = Math.floor(x * 0.6 + frame * 0.45 + ny * 24);
              glyph = poolGlyphs[(flow % poolGlyphs.length + poolGlyphs.length) % poolGlyphs.length];
              color = ripple > 0.45 ? palette.pool[2] : ripple > -0.15 ? palette.pool[1] : palette.pool[0];
            }
          } else if (ny > 0.71 && ny < 0.88 && Math.abs(nx - 0.5) < 0.31 && noise > 0.76) {
            glyph = noise > 0.94 ? ":" : ".";
            color = palette.mist;
          } else if (trunk && noise > 0.06) {
            glyph = ["|", "!", "/", "\\", "I"][Math.floor(noise * 5)];
            color = ny < 0.36 ? palette.upperTrunk : palette.trunk;
          } else if (forest && noise + flicker > (canopy ? 0.22 : 0.43)) {
            glyph = foliageGlyphs[Math.floor(noise * foliageGlyphs.length)];
            color = noise > 0.84 ? palette.foliage[2] : noise > 0.62 ? palette.foliage[1] : palette.foliage[0];
          } else if (ny < 0.78 && noise > 0.989) {
            glyph = ".";
            color = palette.distant;
          }

          if (glyph) {
            context.fillStyle = color;
            context.fillText(glyph, (x + 0.5) * cellWidth, (y + 0.5) * cellHeight);
          }
        }
      }

      frame++;
    };

    const updateTheme = () => {
      const hero = canvas.closest("section");
      const nextBackground = hero ? window.getComputedStyle(hero).backgroundColor : "";
      const channels = nextBackground.match(/[\d.]+/g)?.slice(0, 3).map(Number);

      if (channels?.length === 3) {
        backgroundColor = nextBackground;
        const [red, green, blue] = channels;
        isLightTheme = red * 0.2126 + green * 0.7152 + blue * 0.0722 > 140;
      }

      draw();
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * pixelRatio);
      canvas.height = Math.round(bounds.height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      columns = Math.ceil(bounds.width / 7);
      rows = Math.ceil(bounds.height / 14);
      cellWidth = bounds.width / columns;
      cellHeight = bounds.height / rows;
      updateTheme();
      draw();
    };

    const animate = (time: number) => {
      animationFrame = window.requestAnimationFrame(animate);
      if (time - lastFrameTime < 1000 / 24) return;
      lastFrameTime = time;
      draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const themeObserver = new MutationObserver(updateTheme);
    for (const element of [document.documentElement, document.body]) {
      if (element) {
        themeObserver.observe(element, {
          attributes: true,
          attributeFilter: ["class", "data-theme", "style"],
        });
      }
    }

    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    colorScheme.addEventListener("change", updateTheme);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animationFrame = window.requestAnimationFrame(animate);
    }

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      colorScheme.removeEventListener("change", updateTheme);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
};

export default RainforestFallsMistBackground;
