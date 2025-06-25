
export function BrandHeader() {
  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center mb-8">
        {/* SVG Logo */}
        <svg width="80" height="80" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-6">
          <rect x="16" y="16" width="224" height="224" rx="38" fill="#41976b"/>
          <text x="128" y="144" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="56" fontWeight="700" fill="#fff">&lt;/w5z/&gt;</text>
        </svg>
        
        {/* Brand Name */}
        <h1 className="text-5xl md:text-6xl font-bold text-white text-shadow">
          web500za
        </h1>
      </div>
    </div>
  );
}
