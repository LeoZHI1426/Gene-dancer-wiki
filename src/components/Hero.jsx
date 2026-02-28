import { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const FLOATING_DOTS = [
  { size: 6, left: "12%", top: "20%", delay: 0, duration: 5 },
  { size: 4, left: "85%", top: "15%", delay: 1.2, duration: 6 },
  { size: 5, left: "78%", top: "70%", delay: 0.6, duration: 5.5 },
  { size: 3, left: "18%", top: "65%", delay: 2, duration: 4.5 },
  { size: 4, left: "50%", top: "10%", delay: 0.3, duration: 6.5 },
  { size: 3, left: "25%", top: "80%", delay: 1.5, duration: 5 },
  { size: 5, left: "90%", top: "45%", delay: 0.9, duration: 4.8 },
];

export default function Hero() {
  const cubeRef = useRef(null);
  const rotateX = useMotionValue(-2);
  const rotateY = useMotionValue(4);

  const handleMouseMove = (e) => {
    if (!cubeRef.current) return;
    const rect = cubeRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientY - centerY) / 28;
    const deltaY = (e.clientX - centerX) / 28;
    rotateX.set(-2 - deltaX);
    rotateY.set(4 + deltaY);
  };

  const handleMouseLeave = () => {
    rotateX.set(-2);
    rotateY.set(4);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col lg:flex-row items-center justify-between px-6 md:px-10 lg:px-20 pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-white">
      {/* Background: soft blurred mesh gradients */}
      <div
        className="absolute top-0 right-0 w-[min(100%,720px)] h-[min(80vh,640px)] rounded-full opacity-40 blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 20%, rgba(204, 251, 241, 0.5) 0%, transparent 55%)",
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 w-[min(100%,560px)] h-[min(60vh,480px)] rounded-full opacity-35 blur-[90px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 15% 85%, rgba(207, 250, 254, 0.45) 0%, transparent 55%)",
        }}
        aria-hidden
      />

      {/* Left: typography only */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col max-w-2xl lg:max-w-3xl z-10"
      >
        <motion.h1
          variants={item}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-tight text-gray-900 leading-[1.1]"
        >
          Smart Acne Patch with Engineered Bacteria.
        </motion.h1>
        <motion.p
          variants={item}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-xl md:text-2xl font-medium text-teal-400"
        >
          Precise treatment, improvement from the root.
        </motion.p>
        <motion.p
          variants={item}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 md:mt-10 max-w-lg border-l-2 border-teal-400 pl-6 text-base md:text-lg text-slate-500 leading-relaxed"
        >
          搭载 AiiA 群体感应淬灭酶的工程菌由水凝胶包裹，通过双输入 AND 门（油脂 + 低 pH）仅在痤疮毛囊激活，分泌 AiiA 酶降解 CAMP 致炎因子，精准清除炎症信号，不破坏皮肤原生菌群。
        </motion.p>
      </motion.div>

      {/* Right: 3D cube + floating dots */}
      <motion.div
        ref={cubeRef}
        variants={container}
        initial="hidden"
        animate="show"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex-1 flex justify-center lg:justify-end mt-14 lg:mt-0 min-h-[320px] lg:min-h-0 z-10"
      >
        {/* Floating dots (molecules / engineered bacteria) */}
        {FLOATING_DOTS.map((dot, i) => (
          <motion.div
            key={i}
            variants={item}
            className="absolute rounded-full bg-healing-teal/30 pointer-events-none"
            style={{
              width: dot.size,
              height: dot.size,
              left: dot.left,
              top: dot.top,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          variants={item}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
        >
          {/* Glassmorphism base / ambient shadow */}
          <div
            className="absolute -inset-8 rounded-[2rem] opacity-40 blur-2xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(79, 209, 197, 0.25) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-12 rounded-full opacity-20 blur-xl pointer-events-none bg-gray-400"
            style={{ filter: "blur(20px)" }}
          />

          {/* Cube */}
          <motion.div
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl cursor-default"
            style={{
              background: "linear-gradient(145deg, #E6FFFA 0%, #B2F5EA 38%, #5EEAD4 100%)",
              boxShadow:
                "0 25px 50px -12px rgba(79, 209, 197, 0.35), 0 0 0 1px rgba(255,255,255,0.6) inset, 0 20px 40px -20px rgba(0,0,0,0.08)",
              transform: "perspective(1000px) rotateX(-2deg) rotateY(4deg)",
              transformStyle: "preserve-3d",
            }}
            whileHover={{
              boxShadow:
                "0 32px 60px -14px rgba(79, 209, 197, 0.4), 0 0 0 1px rgba(255,255,255,0.7) inset, 0 24px 48px -24px rgba(0,0,0,0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Inner glass layer */}
            <div
              className="absolute inset-6 md:inset-8 rounded-2xl"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 100%)",
                boxShadow: "inset 0 2px 24px rgba(255,255,255,0.5)",
                backdropFilter: "blur(8px)",
              }}
            />
            {/* Center sensor dot */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, #fff, #4FD1C5)",
                boxShadow: "0 4px 24px rgba(79, 209, 197, 0.5)",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
