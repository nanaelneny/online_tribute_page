import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

export default function TributeForm() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Please fill your name and tribute message.");
      return;
    }
    try {
      setLoading(true);
      await addDoc(collection(db, "tributes"), {
        name: name.trim(),
        title: title.trim(),
        message: message.trim(),
        createdAt: serverTimestamp(),
      });
      setName("");
      setTitle("");
      setMessage("");
      toast.success("Your tribute has been shared successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Could not post tribute. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-black/70">
            Your Name
          </label>
          <input
            className="gold-outline-input w-full"
            placeholder="Your full name (e.g., Dr. Ada Lovelace)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-black/70">
            Title / Organization (optional)
          </label>
          <input
            className="gold-outline-input w-full"
            placeholder="Title / Organization (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-black/70">
            Tribute Message
          </label>
          <textarea
            className="gold-outline-input w-full"
            rows={5}
            placeholder="Share your heartfelt tribute…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="gold-button" disabled={loading}>
            {loading ? "Posting…" : "Post Tribute"}
          </button>
        </div>
      </div>
    </form>
  );
}