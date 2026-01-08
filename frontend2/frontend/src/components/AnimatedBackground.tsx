"use client";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Glow Blob 1 */}
      <div
        className="absolute -top-40 -left-40 h-[550px] w-[300px] rounded-full
        bg-fuchsia-500 blur-[160px] opacity-90
        mix-blend-screen"
        style={{
          animation: "floatSlow 7s ease-in-out infinite",
        }}
      />

      {/* Glow Blob 2 */}
      <div
        className="absolute top-1/2 -right-40 h-[300px] w-[600px] rounded-full
        bg-cyan-400 blur-[180px] opacity-80
        mix-blend-screen"
        style={{
          animation: "floatMedium 10s ease-in-out infinite",
        }}
      />

      {/* Glow Blob 3 */}
      <div
        className="absolute bottom-[-220px] left-1/3 h-[500px] w-[400px] rounded-full
        bg-purple-500 blur-[160px] opacity-85
        mix-blend-screen"
        style={{
          animation: "floatFast 4s ease-in-out infinite",
        }}
      />

      {/* Glow enhancer */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
    </div>
  );
}
