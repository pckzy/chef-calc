import Navbar from "../components/layout/Navbar";
import Header from "../components/layout/Header";
import Button from "../components/common/Button";
import RecipeDetail from "../components/recipes/RecipeDetail";
import RecipeIngredient from "../components/recipes/RecipeIngredient";
import RecipeSummary from "../components/recipes/RecipeSummary";

const RecipePage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark h-screen text-neutral-text-main dark:text-gray-100 flex flex-col font-display overflow-hidden">
      <Navbar />

      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full flex flex-col overflow-y-auto lg:overflow-hidden">
        <div className="shrink-0 mb-6 lg:mb-0">
          <Header
            title="New Recipe"
            description="Create a new dish and calculate margins instantly."
          >
            <Button label="Publish Recipe" color="bg-primary" />
          </Header>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 lg:min-h-0">
          <div className="lg:col-span-3 flex flex-col gap-6 lg:h-full lg:min-h-0">
            <RecipeDetail />
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6 z-50 relative lg:min-h-0">
            <RecipeIngredient />
          </div>

          <div className="lg:col-span-3 flex flex-col lg:h-full lg:min-h-0">
            <RecipeSummary />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipePage;
