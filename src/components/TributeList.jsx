import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";

function timeAgo(date) {
  if (!date) return "";
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"} ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d === 1 ? "" : "s"} ago`;
}


export default function TributeList() {
  const [tributes, setTributes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "tributes"),
      orderBy("createdAt", "desc"),
      orderBy("__name__", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        setError("");
        const items = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            name: data.name || "Anonymous",
            title: data.title || "",
            message: data.message || "",
            createdAt: data.createdAt?.toDate?.() || null,
          };
        });
        setTributes(items);
      },
      (err) => {
        console.error(err);
        // Show a friendly message but don't break the UI
        setError("We couldn’t load tributes yet. Please try again shortly.");
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className="space-y-4">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
          {error}
        </div>
      )}

      {tributes.length === 0 && !error ? (
        <div className="text-center text-black/60 italic">
          There are no tributes yet. Be the first to share a message.
        </div>
      ) : null}

      <AnimatePresence mode="popLayout">
        {tributes.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="card"
          >
            <p className="font-['Playfair Display'] text-[17px] leading-relaxed">
              {t.message}
            </p>
            <div className="mt-3 text-sm text-black/70">
              <span className="font-semibold">{t.name}</span>
              {t.title ? <span className="text-black/50"> — {t.title}</span> : null}
              <span className="block text-xs text-black/40 mt-1">
                {t.createdAt ? timeAgo(t.createdAt) : ""}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
