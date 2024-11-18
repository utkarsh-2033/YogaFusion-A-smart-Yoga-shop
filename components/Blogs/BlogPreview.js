import styles from './BlogPreview.module.css';
// import Image from 'next/image';

export default function BlogPreview({ blog }) {
  return (
    <div className={styles.card}>
      <img src={blog.image} 
      alt={blog.title}  
      className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title}>{blog.title}</h3>
        <p className={styles.preview}>{blog.preview}</p>
        <p className={styles.author}>By {blog.author}</p>
        <a href={`/blogs/${blog._id}`} className={styles.link}>Read More</a>
      </div>
    </div>
  );
}
