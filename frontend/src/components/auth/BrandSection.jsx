// BrandSection.jsx
import cookingPict from "../../assets/images/cooking-pict.png";

const BrandSection = () => (
  <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-center justify-center p-12 overflow-hidden group">
    <div
      className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
      style={{
        backgroundImage: `url(${cookingPict})`,
      }}
    />
    <div className="absolute inset-0 z-10 bg-gradient-to-t from-background-dark/90 via-background-dark/50 to-transparent" />

    <div className="relative z-20 max-w-lg">
      <div className="mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-4xl">
          restaurant_menu
        </span>
        <span className="text-white text-xl font-bold">ChefCalc</span>
      </div>
      <h1 className="text-white text-5xl font-black leading-tight tracking-tight mb-6">
        Maximize Your <br />
        <span className="text-primary">Kitchen Profits</span>
      </h1>
      <p className="text-slate-200 text-lg mb-8">
        Welcome back to the Recipe Margin Calculator. Manage ingredients,
        calculate food costs accurately, and set prices with confidence.
      </p>
      {/* Feature Tags */}
      <div className="flex gap-4">
        <FeatureTag icon="analytics" label="Recipe Cost Analysis" />
        <FeatureTag icon="inventory_2" label="Ingredient Management" />
      </div>
    </div>
  </div>
);

const FeatureTag = ({ icon, label }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10">
    <span className="material-symbols-outlined text-primary">{icon}</span>
    <span className="text-white text-sm font-medium">{label}</span>
  </div>
);

export default BrandSection;
