import React, { useState } from "react";

function FormPage({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Registration Form</h2>

        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} rows="3" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function SuccessPage({ data }) {
  return (
    <div className="container">
      <div className="success-card">
        <h2>Submitted Successfully!</h2>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Age:</strong> {data.age}</p>
        <p><strong>Phone:</strong> {data.phone}</p>
        <p><strong>Address:</strong> {data.address}</p>
        <p><strong>Message:</strong> {data.message}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("form");
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = async (data) => {
    try {
      const res = await fetch("https://backendfinal-production-fe9c.up.railway.app/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setSubmittedData(result);
      setPage("success");
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Segoe UI', sans-serif; }
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea, #764ba2);
          padding: 20px;
        }
        .form-card, .success-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        h2 { text-align: center; margin-bottom: 10px; color: #333; }
        input, textarea {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
          resize: none;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: #764ba2;
        }
        button {
          padding: 12px;
          background: #764ba2;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
        }
        button:hover { background: #5e3a85; }
        .success-card p { margin: 4px 0; color: #444; }
      `}</style>

      {page === "form" ? (
        <FormPage onSubmit={handleSubmit} />
      ) : (
        <SuccessPage data={submittedData} />
      )}
    </>
  );
}