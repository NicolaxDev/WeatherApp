import React, { useState, useEffect } from "react";

export default function BgModal({ onClose, onSave }) {
  const [inputUrl, setInputUrl] = useState("");

  const handleSave = () => {
    onSave(inputUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
      <div className="bg-transparent backdrop-blur-sm border border-[#333333] p-6 rounded-xl shadow-lg w-[600px]">
        <h2 className="text-xl mb-4 font-quicksand">Paste the URL of your background image</h2>
        <input
          type="text"
          placeholder="Image URL"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="border border-[#333333] w-full p-2 rounded mb-4 outline-none bg-transparent"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-transparent border border-[#333333] px-4 py-1 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-white text-black px-4 py-1 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
