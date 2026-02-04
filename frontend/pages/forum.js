import {useState} from 'react';
import styles from '../styles/forum.module.css';

export default function Forum() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;

    setComments([{ text: comment, id: crypto.randomUUID() }, ...comments]);
    setComment('');
  }

  return (
    <div className={`container ${styles.forumContainer}`}>
      <main className={`content ${styles.content}`}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            className={styles.textarea}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Write your comment..."
          />
          <button className={styles.button} type="submit">
            Post
          </button>
        </form>
        <section className={styles.comments}>
          {comments.length === 0 && (
            <p className={styles.empty}>No comments yet</p>
          )}
          {comments.map(c => (
            <article key={c.id} className={styles.commentCard}>
              {c.text}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
