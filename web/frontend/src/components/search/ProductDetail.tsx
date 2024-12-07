import { useLocation } from 'react-router-dom';

function ProductDetail() {
  const location = useLocation();
  const product = location.state; // This is the product data passed from the Search component
  
  if (!product) {
    return <p>Product not found.</p>; // Handle the case when no product is passed
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>Price: {product.price}</p>
      <a href={product.link} target="_blank" rel="noopener noreferrer">Buy Now</a>
    </div>
  );
}

export default ProductDetail;
