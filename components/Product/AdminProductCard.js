// import Image from 'next/image';
import styles from './AdminProductCard.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';


const ProductCard = ({ product,onEdit, onDelete }) => {
    
  return (
    <div className={styles.card}>
      <img 
      src={product.image} 
      alt={product.name} 
      className={styles.image} />
      <div className={styles.info}>
        <h2 className={styles.title}>{product.name}</h2>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <div className={styles.actions}>
          <button onClick={() => onEdit(product._id)} className={styles.editBtn}>
            <FaEdit /> Edit
          </button>
          <button onClick={() => onDelete(product._id)} className={styles.deleteBtn}>
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};



export default ProductCard;
