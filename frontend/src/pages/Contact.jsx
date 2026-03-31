import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* 🔥 HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-gray-500 mt-2">
          We’d love to hear from you. Get in touch with us!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 🔥 LEFT - CONTACT INFO */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Our Information</h2>

          <p>
            📍 <strong>Address:</strong> 123 Laptop Lane, Tech City
          </p>

          <p>
            📧 <strong>Email:</strong> support@laptopstore.com
          </p>

          <p>
            📞 <strong>Phone:</strong> +91 9876543210
          </p>

          <div className="mt-6">
            <p className="font-semibold mb-2">Follow Us</p>
            <div className="flex gap-3">
              <span className="bg-black text-white px-3 py-1 rounded">
                Facebook
              </span>
              <span className="bg-black text-white px-3 py-1 rounded">
                Instagram
              </span>
              <span className="bg-black text-white px-3 py-1 rounded">
                Twitter
              </span>
            </div>
          </div>
        </div>

        {/* 🔥 RIGHT - FORM */}
        <form onSubmit={handleSubmit} className="border p-6 rounded space-y-4">
          <h2 className="text-xl font-semibold">Send Message</h2>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border p-2 rounded"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border p-2 rounded"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className="w-full border p-2 rounded"
          />

          <button className="bg-black text-white px-4 py-2 w-full">
            Send Message
          </button>
        </form>
      </div>

      {/* 🔥 FOOTER */}
      <div className="mt-10 text-center text-gray-500">
        <p>© 2026 Laptop Store | All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Contact;
