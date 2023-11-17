// pages/index.js
import { useState } from "react";

type Message = {
  emailErrorMessage?: string;
  userErrorMessage?: string;
};

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    userName: "",
  });
  const [message, setMessage] = useState<Message>({
    emailErrorMessage: "",
    userErrorMessage: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setMessage({
          emailErrorMessage: data.emailErrorMessage,
          userErrorMessage: data.userErrorMessage,
        });
        throw new Error(data.message);
      } else if (response.status === 201) {
        const data = await response.json();
        setMessage({ emailErrorMessage: data.message });
      }

      // Clear form and error message on successful submission
      setFormData({ name: "", email: "", description: "", userName: "" });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Create User</h1>
      {message.emailErrorMessage && (
        <p className="text-red-500 mb-4">{message.emailErrorMessage}</p>
      )}
      {message.userErrorMessage && (
        <p className="text-red-500 mb-4">{message.userErrorMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email:
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            UserName:
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Description:
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
