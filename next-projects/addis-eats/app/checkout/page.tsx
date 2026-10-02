export default function Checkout() {
  return (
    <div className="form-container">
      <form>
        <div>
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" placeholder="Your name" />
        </div>

        <div>
          <label htmlFor="phone">TeleBirr phone</label>
          <input id="phone" name="phone" placeholder="09... or +2519..." />
        </div>

        <div>
          <label htmlFor="area">Delivery area</label>
          <input id="area" name="area" placeholder="Your area" />
        </div>

        <div>
          <label htmlFor="notes">Notes (optional)</label>
          <textarea id="notes" name="notes" placeholder="Any delivery notes?" />
        </div>

        <button type="submit">Pay with TeleBirr - 0 ETB</button>
      </form>
    </div>
  );
}
