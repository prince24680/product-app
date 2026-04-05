import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const[editId,setEditId]=useState(null);

  // 🔥 Fetch products
  const fetchProducts = () => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 Add product
  const addProduct = () => {
  // 👉 UPDATE CASE
  if (editId) {
    fetch(`http://localhost:5000/update/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        price
      })
    }).then(() => {
      fetchProducts();
      setName("");
      setPrice("");
      setEditId(null); // reset
    });
  }

  // 👉 ADD CASE
  else {
    fetch("http://localhost:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        price
      })
    }).then(() => {
      fetchProducts();
      setName("");
      setPrice("");
    });
  }
};
  const deleteProduct = (id) => {
  fetch(`http://localhost:5000/delete/${id}`, {
    method: "DELETE"
  })
    .then(res => res.text())
    .then(data => {
      console.log(data); // check response
      fetchProducts();   // refresh list
    })
    .catch(err => console.log(err));
};

  return (
    <div>
      <h1>Product App 🚀</h1>

      {/* INPUTS */}
      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={addProduct}>Add Product</button>

      <hr />

      {/* PRODUCTS LIST */}
      {products.map((p, i) => (
        
  <div key={i}>
    <h3>{p.name}</h3>
    <p>Price: ₹{p.price}</p>
    <button onClick={() => {
  setName(p.name);
  setPrice(p.price);
  setEditId(p._id);
}}>
  Edit
</button>

    <button onClick={() => deleteProduct(p._id)}>
      Delete
    </button>
  </div>
))}
</div>
  );
  
}
export default App;