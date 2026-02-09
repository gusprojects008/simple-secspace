import { useState, useEffect } from 'react';
import styles from '../styles/forum.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Forum() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const currentUserId = currentUser?.id;

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          credentials: 'include'
        });
  
        if (!res.ok) return;
  
        const data = await res.json();
        setCurrentUser(data.data);
      } catch (err) {}
    }
  
    fetchMe();
  }, []);

  useEffect(() => {
    let intervalId;
  
    async function fetchComments() {
      try {
        const res = await fetch(`${API_URL}/comments`, {credentials: 'include'});
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

  async function handleUpdate(id) {
    if (!editingContent.trim()) return;
  
    try {
      const res = await fetch(`${API_URL}/comments/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editingContent })
      });
  
      const data = await res.json();
  
      if (!res.ok) return;
  
      setComments(prev =>
        prev.map(c => c.id === id ? { ...c, content: data.data.content } : c)
      );
  
      setEditingId(null);
      setEditingContent('');
    } catch (err) {}
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`${API_URL}/comments/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
  
      if (!res.ok) return;
  
      setComments(prev => prev.filter(c => c.id !== id));
    } catch (err) {}
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
              {editingId === c.id ? (
                <>
                  <textarea
                    value={editingContent}
                    onChange={e => setEditingContent(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(c.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p>{c.content}</p>
          
                  {c.user_id === currentUserId && (
                    <div className={styles.actions}>
                      <button
                        onClick={() => {
                          setEditingId(c.id);
                          setEditingContent(c.content);
                        }}
                      >
                        Edit
                      </button>
          
                      <button onClick={() => handleDelete(c.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
