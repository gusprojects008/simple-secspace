import { useState, useEffect } from 'react';
import styles from '../styles/forum.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Forum() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let intervalId;
  
    async function fetchComments() {
      try {
        const res = await fetch(`${API_URL}/comments`, { credentials: 'include' });
        const data = await res.json();
  
        if (!res.ok) return;
  
        setComments(data.data);
      } catch (err) {}
    }
  
    fetchComments();
  
    intervalId = setInterval(fetchComments, 500);
  
    return () => clearInterval(intervalId);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: comment }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setMessage(data.message || 'Failed to post comment');
        return;
      }

      setComments(prev => [data.data, ...prev]);
      setComment('');
      setStatus('success');
      setMessage('Comment posted successfully');
    } catch (err) {
      setStatus('error');
      setMessage('Network error while posting comment');
    } finally {
      setTimeout(() => setStatus('idle'), 800);
    }
  }

  return (
    <div className={`container ${styles.forumContainer}`}>
      <main className={`content ${styles.content}`}>
        {status !== 'idle' && message && (
          <div className={`${styles.feedback} ${styles[status]}`}>
            {message}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            className={styles.textarea}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Write your comment..."
          />
          <button className={styles.button} type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Posting...' : 'Post'}
          </button>
        </form>

        <section className={styles.comments}>
          {comments.length === 0 && <p className={styles.empty}>No comments yet</p>}
          {comments.map(c => (
            <article key={c.id} className={styles.commentCard}>
              {c.content || c.text}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
