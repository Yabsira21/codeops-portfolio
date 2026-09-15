import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCartSummary } from "../util/cart";
import { useCart } from "../store/cart";

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required";
  }

  if (!/^(?:\+251|0)9\d{8}$/.test(form.phone)) {
    errors.phone = "Use 09… or +2519…";
  }

  if (!form.area.trim()) {
    errors.area = "Delivery area is required";
  }

  return errors;
}

function Form() {
  const navigate = useNavigate();

  const clear = useCart((s) => s.clear);
  const items = useCart((s) => s.items);

  const { total } = getCartSummary(items);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    notes: "",
  });

  const [touched, setTouched] = useState({});

  const [submitting, setSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState("");

  const errors = validate(form);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleBlur(e) {
    const { name } = e.target;

    setTouched({
      ...touched,
      [name]: true,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const errors = validate(form);

    if (Object.keys(errors).length > 0) {
      setTouched({
        name: true,
        phone: true,
        area: true,
      });

      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      clear();
      navigate("/thank-you");
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Your name</label>

          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={
              touched.name && errors.name ? "name-error" : undefined
            }
            placeholder="Your name"
          />

          {touched.name && errors.name && (
            <p className="error-msg" id="name-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone">TeleBirr phone</label>

          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.phone && !!errors.phone}
            aria-describedby={
              touched.phone && errors.phone ? "phone-error" : undefined
            }
            placeholder="09... or +2519..."
          />

          {touched.phone && errors.phone && (
            <p className="error-msg" id="phone-error" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="area">Delivery area</label>

          <input
            id="area"
            name="area"
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.area && !!errors.area}
            aria-describedby={
              touched.area && errors.area ? "area-error" : undefined
            }
            placeholder="Your area"
          />

          {touched.area && errors.area && (
            <p className="error-msg" id="area-error" role="alert">
              {errors.area}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="notes">Notes (optional)</label>

          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Any delivery notes?"
          />
        </div>

        {submitError && (
          <p className="error-msg" role="alert">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || Object.keys(errors).length > 0}
        >
          {submitting ? "Processing..." : `Pay with TeleBirr - ${total} ETB`}
        </button>
      </form>
    </div>
  );
}

export default Form;
