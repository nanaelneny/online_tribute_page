import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import toast from 'react-hot-toast'

export default function TributeForm() {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
      toast.error('Please provide your name and a tribute message.')
      return
    }
    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'tributes'), {
        name: name.trim(),
        title: title.trim() || null,
        message: message.trim(),
        createdAt: serverTimestamp(),
      })
      toast.success('Your tribute has been shared successfully.')
      setName('')
      setTitle('')
      setMessage('')
    } catch (err) {
      toast.error('Unable to post tribute. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium">Your Name</label>
          <input
            type="text"
            className="gold-outline-input px-4 py-3"
            placeholder="e.g., Dr. Ada Lovelace"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium">Title / Organization (optional)</label>
          <input
            type="text"
            className="gold-outline-input px-4 py-3"
            placeholder="e.g., Minister of Science"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 text-sm font-medium">Tribute Message</label>
          <textarea
            className="gold-outline-input px-4 py-3 min-h-[120px]"
            placeholder="Share your heartfelt words..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button type="submit" disabled={isSubmitting} className="gold-button disabled:opacity-60">
          {isSubmitting ? 'Posting…' : 'Post Tribute'}
        </button>
      </div>
    </form>
  );
}


