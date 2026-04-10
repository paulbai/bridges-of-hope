export function Logo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <img
      src="/Bridges_of_Hope_logo_variation_5__1_-removebg-preview.png"
      alt="Bridges of Hope logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
