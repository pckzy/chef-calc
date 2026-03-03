import { useRef, useState } from "react";
import toast from "react-hot-toast";

const RecipeDetail = ({
  recipeData,
  setRecipeData,
  categories,
  selectedFile,
  setSelectedFile,
}) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("File size is too large (limit 5MB)");
    }

    const previewUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setRecipeData({ ...recipeData, image_url: previewUrl });
  };

  return (
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
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div
            onClick={handleImageClick}
            className={`w-full aspect-square bg-neutral-surface dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-neutral-border dark:border-gray-700 hover:border-primary cursor-pointer group transition-colors relative overflow-hidden ${uploading ? "opacity-50 pointer-events-none" : ""}`}
          >
            {recipeData.image_url ? (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("${recipeData.image_url}")`,
                  }}
                ></div>
                <div className="absolute bottom-2 right-2 z-10 p-2 bg-white/90 dark:bg-black/80 rounded-lg backdrop-blur-sm border border-neutral-border/50 group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-neutral-text-secondary dark:text-gray-300 text-xl group-hover:text-white">
                    edit
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center p-6">
                <div className="mx-auto h-12 w-12 text-neutral-text-secondary group-hover:text-primary transition-colors flex items-center justify-center rounded-full bg-white/50 dark:bg-gray-700 group-hover:scale-110 duration-200">
                  <span className="material-symbols-outlined text-[24px]">
                    add_a_photo
                  </span>
                </div>
                <div className="mt-3 flex text-sm leading-6 text-neutral-text-secondary justify-center">
                  <span className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-green-400">
                    Upload a file
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-text-secondary/70">
                  PNG, JPG up to 5MB
                </p>
              </div>
            )}

            {uploading && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20 backdrop-blur-[2px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
          </div>

          <label className="block">
            <span className="text-sm font-medium text-neutral-text-secondary mb-1 block">
              Recipe Name
            </span>
            <input
              className="w-full rounded-lg bg-neutral-surface dark:bg-gray-800 border-transparent p-3 text-sm"
              placeholder="e.g. Truffle Mushroom Risotto"
              type="text"
              value={recipeData.name}
              onChange={(e) =>
                setRecipeData({ ...recipeData, name: e.target.value })
              }
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-neutral-text-secondary mb-1 block">
              Category
            </span>
            <select
              className="w-full rounded-lg bg-neutral-surface dark:bg-gray-800 border-transparent p-3 text-sm focus:border-primary focus:ring-0 text-neutral-text-main dark:text-white transition-all cursor-pointer"
              value={recipeData.categoryId}
              onChange={(e) =>
                setRecipeData({ ...recipeData, categoryId: e.target.value })
              }
            >
              <option value="">Select Category...</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
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
          placeholder="Add specific instructions for plating or preparation nuances..."
          value={recipeData.note}
          onChange={(e) =>
            setRecipeData({ ...recipeData, note: e.target.value })
          }
        ></textarea>
      </div>
    </div>
  );
};

export default RecipeDetail;
