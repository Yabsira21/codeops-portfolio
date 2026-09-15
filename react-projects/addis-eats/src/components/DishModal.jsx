import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function DishModal({ dish, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        <button ref={closeButtonRef} onClick={onClose}>
          Close
        </button>

        <h2>{dish.name}</h2>
        <p>Price: {dish.price} ETB</p>
        <p>{dish.spicy ? "Spicy 🌶️" : "Not spicy"}</p>
      </div>
    </div>,
    document.body,
  );
}

export default DishModal;
