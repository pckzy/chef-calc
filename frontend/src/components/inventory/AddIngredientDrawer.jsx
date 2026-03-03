import { useEffect, useState, useRef } from "react";
import api from "../../lib/axios";
import supabase from "../../lib/supabase";

const AddIngredientDrawer = ({
  isOpen,
  onClose,
  categories,
  onSaveSuccess,
  editData,
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    purchase_price: "",
    unit: "kg",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      if (editData) {
        console.log("im here");
        setFormData({
          name: editData.name,
          category_id: editData.category_id,
          purchase_price: editData.purchase_price,
          unit: editData.unit,
        });
        setImagePreview(editData.image_url);
      }
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false);
        resetForm();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, editData]);

  const resetForm = () => {
    setFormData({ name: "", category_id: "", purchase_price: "", unit: "kg" });
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      let final_image_url = imagePreview;

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `ingredient-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("ingredients")
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("ingredients").getPublicUrl(filePath);
        final_image_url = publicUrl;
      }

      const payload = { ...formData, image_url: final_image_url };

      if (editData) {
        await api.put(`/ingredients/${editData.id}`, payload);
      } else {
        await api.post("/ingredients", payload);
      }

      if (onSaveSuccess) onSaveSuccess();
      onClose();
    } catch (err) {
      console.error("Error saving ingredient:", err);
      alert("Failed to save ingredient");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop - Fade in/out */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Slide-over Panel - Slide in/out from right */}
      <div
        className={`relative w-full max-w-lg bg-white dark:bg-background-dark h-full shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out border-l border-neutral-border dark:border-gray-800 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-border dark:border-gray-800 bg-background-light dark:bg-gray-900/50">
          <div>
            <h2 className="text-xl font-black text-neutral-text-main dark:text-white tracking-tight">
              {editData ? "Update Ingredient" : "Add New Ingredient"}
            </h2>
            <p className="text-xs text-neutral-text-secondary mt-0.5">
              Enter details to {editData ? "edit the ingredient." : "add to inventory."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-text-secondary hover:text-neutral-text-main transition-colors p-1 rounded-md hover:bg-neutral-surface dark:hover:bg-gray-800"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-neutral-text-main dark:text-white">
              Ingredient Image
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current.click()}
              className="relative flex justify-center items-center rounded-xl border-2 border-dashed border-neutral-border dark:border-gray-700 hover:border-primary hover:bg-neutral-surface/30 dark:hover:bg-gray-800/30 transition-all cursor-pointer group overflow-hidden h-52 w-full" // เพิ่ม h-52 และ overflow-hidden
            >
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover" // ใช้ object-cover เพื่อให้รูปเต็มกล่องโดยไม่เสียสัดส่วน
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined">edit</span>
                      Change Photo
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6">
                  {" "}
                  <div className="mx-auto h-12 w-12 text-neutral-text-secondary group-hover:text-primary transition-colors flex items-center justify-center rounded-full bg-neutral-surface dark:bg-gray-800 group-hover:scale-110 duration-200">
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
            </div>
          </div>

          {/* Inputs Section */}
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-neutral-text-main dark:text-white">
                Ingredient Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                className="block w-full rounded-lg border-neutral-border dark:border-gray-700 bg-white dark:bg-gray-800 py-2.5 px-3.5 text-neutral-text-main dark:text-white focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="e.g. Extra Virgin Olive Oil"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="block text-sm font-bold text-neutral-text-main dark:text-white"
                htmlFor="category"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="block w-full appearance-none rounded-lg border-neutral-border dark:border-gray-700 bg-white dark:bg-gray-800 py-2.5 pl-3.5 pr-10 text-neutral-text-main dark:text-white focus:border-primary focus:ring-primary sm:text-sm"
                  id="category"
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({ ...formData, category_id: e.target.value })
                  }
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-text-secondary">
                  <span className="material-symbols-outlined text-sm">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-neutral-border dark:border-gray-800">
            <h3 className="text-sm font-bold text-neutral-text-secondary uppercase tracking-wider mb-4">
              Purchase Details
            </h3>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div className="space-y-1.5">
                <label
                  className="block text-sm font-bold text-neutral-text-main dark:text-white"
                  htmlFor="price"
                >
                  Purchase Price <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-neutral-text-secondary sm:text-sm">
                      ฿
                    </span>
                  </div>
                  <input
                    className="block w-full rounded-lg border-neutral-border dark:border-gray-700 bg-white dark:bg-gray-800 py-2.5 pl-7 pr-3.5 text-neutral-text-main dark:text-white placeholder-neutral-text-secondary/50 focus:border-primary focus:ring-primary sm:text-sm"
                    id="price"
                    name="price"
                    placeholder="0.00"
                    min="0"
                    type="number"
                    value={formData.purchase_price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        purchase_price: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  className="block text-sm font-bold text-neutral-text-main dark:text-white"
                  htmlFor="unit"
                >
                  Unit <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    className="block w-full appearance-none rounded-lg border-neutral-border dark:border-gray-700 bg-white dark:bg-gray-800 py-2.5 pl-3.5 pr-10 text-neutral-text-main dark:text-white focus:border-primary focus:ring-primary sm:text-sm"
                    id="unit"
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData({ ...formData, unit: e.target.value })
                    }
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="L">L</option>
                    <option value="ml">ml</option>
                    <option value="unit">Unit (ea)</option>
                    <option value="pack">Pack</option>
                    <option value="can">Can</option>
                    <option value="box">Box</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-text-secondary">
                    <span className="material-symbols-outlined text-sm">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-neutral-surface dark:bg-gray-800/50 rounded-lg p-4 border border-neutral-border dark:border-gray-800">
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-text-secondary">
                Cost per Unit (Est.)
              </span>
              <span className="font-bold text-neutral-text-main dark:text-white text-lg">
                -
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-neutral-border dark:border-gray-800 p-6 bg-background-light dark:bg-gray-900/50">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-border bg-white dark:bg-gray-800 text-neutral-text-main dark:text-white text-sm font-bold hover:bg-neutral-surface transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className={`flex-1 px-4 py-2.5 rounded-lg bg-primary text-neutral-text-main text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "opacity-80 cursor-not-allowed"
                  : "hover:brightness-110"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-neutral-text-main/30 border-t-neutral-text-main"></div>
                  <span>Saving...</span>
                </>
              ) : (
                "Save Ingredient"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIngredientDrawer;
