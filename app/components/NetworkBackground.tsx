export default function NetworkBackground() {
  const nodes = Array.from({ length: 20 }, (_, i) => ({
    x: Math.floor((i * 137.5) % 100),
    y: Math.floor((i * 97.3) % 100),
    d: parseFloat(((i * 1.7) % 6).toFixed(1)),
    s: 1 + (i % 3) * 0.5,
  }));

  return (
    <div className="network-bg" aria-hidden>
      {nodes.map((node, i) => (
        <span
          key={i}
          className="network-node"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.s}px`,
            height: `${node.s}px`,
            animationDelay: `${node.d}s`,
          }}
        />
      ))}
    </div>
  );
}
