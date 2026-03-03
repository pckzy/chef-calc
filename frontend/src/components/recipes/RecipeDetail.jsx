const RecipeDetail = () => (
  <div className="flex flex-col gap-6 h-full">
    {" "}
    <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-neutral-border dark:border-gray-800 shrink-0">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">
          restaurant_menu
        </span>
        Recipe Details
      </h3>
      <div className="space-y-3">
        <div className="w-full aspect-square bg-neutral-surface dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-neutral-border dark:border-gray-700 hover:border-primary cursor-pointer group transition-colors relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBPQspWHU_ME5D1MzmL8uRL9n4W_ft7ctlEN2tIe2irbHXwVzFTlGcXGq_iDmuHtbolZj_oeJ0JGp9Yzy499AcJYcJZmzbijT93inPkUEf6zSxjA9vtjok74ozhIJZOTKEvtk9iCvXANyGysbnWCMx9BFEUvsBwWgezw0QlJXwpmvdXc_rDmp7Wmfgug8Gk1gYffyhG4BNag2GkZpLznL0m7ANg_LHas1Z6Z0NwYUsDPCLwtR1sW3crPxKepIvLD4hS493n5fhe-g9M")',
            }}
          ></div>
          <div className="absolute bottom-2 right-2 z-10 p-2 bg-white/90 dark:bg-black/80 rounded-lg backdrop-blur-sm border border-neutral-border/50">
            <span className="material-symbols-outlined text-neutral-text-secondary text-xl">
              edit
            </span>
          </div>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-neutral-text-secondary mb-1 block">
            Recipe Name
          </span>
          <input
            className="w-full rounded-lg bg-neutral-surface dark:bg-gray-800 border-transparent p-3 text-sm"
            defaultValue="Truffle Mushroom Risotto"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-neutral-text-secondary mb-1 block">
            Category
          </span>
          <select className="w-full rounded-lg bg-neutral-surface dark:bg-gray-800 border-transparent p-3 text-sm">
            <option>Main Course</option>
          </select>
        </label>
      </div>
    </div>
    
    <div className="bg-primary/10 dark:bg-primary/5 rounded-xl p-5 border border-primary/20 flex-1 flex flex-col min-h-0">
      <h4 className="font-bold text-sm mb-2 text-primary shrink-0">
        Chef's Note
      </h4>
      <textarea
        className="w-full flex-1 bg-transparent border-none text-sm text-neutral-text-main dark:text-gray-300 placeholder:text-neutral-text-secondary/70 focus:ring-0 p-0 resize-none overflow-hidden"
        placeholder="Add specific instructions for plating..."
      ></textarea>
    </div>
  </div>
);

export default RecipeDetail;
