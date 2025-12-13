import { useEffect, useState } from "react";
import buffaloData from "../assets/Product.json";

function Product() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const [hoverIndex, setHoverIndex] = useState(null); // For image slideshow
  const [imageSlide, setImageSlide] = useState(0); // Track which image shown

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    destination: "",
    amount: "",
    stock: "",
    images: [],
  });

  // Generate ID
  const generateID = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "BUF-";
    for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
  };

  // Load JSON + localStorage
  // Load JSON + Clean localStorage + Remove empty products
useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("products"));

  if (saved && saved.length > 0) {

    //  Remove empty/invalid products that were added earlier
    const cleaned = saved.filter(
      (p) =>
        p.name &&
        p.age &&
        p.location &&
        p.destination &&
        p.amount &&
        p.stock &&
        p.images &&
        p.images.length > 0
    );

    setProducts(cleaned);
    localStorage.setItem("products", JSON.stringify(cleaned));

  } else {
    // Load JSON only once
    const mapped = buffaloData.map((item) => ({
      ...item,
      images: item.images.map((img) => `/src/assets/images/${img}`),
    }));

    setProducts(mapped);
    localStorage.setItem("products", JSON.stringify(mapped));
  }
}, []);

  const saveProducts = (data) => {
    setProducts(data);
    localStorage.setItem("products", JSON.stringify(data));
  };

  // Image Upload
  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: urls });
  };

  // Add or Update
const handleSubmit = () => {
  // Validation — Do NOT allow empty fields
  if (
    !formData.name.trim() ||
    !formData.age.trim() ||
    !formData.location.trim() ||
    !formData.destination.trim() ||
    !formData.amount.trim() ||
    !formData.stock.trim() ||
    formData.images.length === 0
  ) {
    alert("Please fill all fields and upload at least one image!");
    return; // Stop here
  }

  let updated = [];

  if (editItem) {
    updated = products.map((p) =>
      p.id === editItem.id ? { ...formData, id: editItem.id } : p
    );
  } else {
    updated = [...products, { id: generateID(), ...formData }];
  }

  saveProducts(updated);

  // Reset
  setFormData({
    name: "",
    age: "",
    location: "",
    destination: "",
    amount: "",
    stock: "",
    images: [],
  });

  setEditItem(null);
  setShowForm(false);
};


  // Edit
  const editProduct = (item) => {
    setFormData(item);
    setEditItem(item);
    setShowForm(true);
  };

  // IMAGE SLIDESHOW ON HOVER
  useEffect(() => {
    if (hoverIndex === null) return;

    const interval = setInterval(() => {
      setImageSlide((prev) => prev + 1);
    }, 1200); // Change image every 1.2 sec

    return () => clearInterval(interval);
  }, [hoverIndex]);








  
  return (
    <div className="p-6">

      {/* Add Product */}
      <button
  className="bg-green-600 hover:bg-green-300 text-white font-medium px-6 py-3 rounded-xl shadow-lg mb-6"
  onClick={() => {
    setEditItem(null);   // important
    setFormData({
      name: "",
      age: "",
      location: "",
      destination: "",
      amount: "",
      stock: "",
      images: [],
    });
    setShowForm(true);
  }}
>
  + Add Product
</button>


      {/* Buffalo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {products.map((item, index) => {
          const imageToShow = item.images[imageSlide % item.images.length];

          return (
            <div
              key={item.id}
              className="bg-gray-200 shadow-xl rounded-4xl p-4 transition duration-300"
              onMouseEnter={() => { setHoverIndex(index); setImageSlide(0); }}
              onMouseLeave={() => { setHoverIndex(null); setImageSlide(0); }}
            >

              {/* Slideshow Image */}
              <img
                src={hoverIndex === index ? imageToShow : item.images[0]}
                className="h-56 w-full object-cover rounded-4xl transition-all duration-700"
                alt="buffalo"
              />

              <h2 className="text-xl font-bold mt-2">{item.name}</h2>
              <p className="text-sm font-semibold text-gray-600">ID: {item.id}</p>

              <div className="mt-2 text-gray-700 font-medium">
                <p>Age: {item.age}</p>
                <p>Location: {item.location}</p>
                <p>Destination: {item.destination}</p>
                <p>Amount: ₹{item.amount}</p>
                <p className="font-bold text-yellow-700 bg-yellow-200 px-2 py-1 rounded-lg inline-block">Stock: {item.stock}</p>
              </div>

              <div className="flex justify-end-safe gap-3 mt-4">
                <button
                  onClick={() => editProduct(item)}
                  className="bg-yellow-900 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
              </div>

            </div>
          );
        })}

      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-gray-100 w-75 p-5 rounded-4xl text-center">

            <h2 className="text-4xl font-extrabold text-blue-600 mb-4 ">
              {editItem ? "Edit Product" : "Add Product"}
            </h2>

            <input 
              type="text"
              placeholder="Name of the Product" required
              className="w-60 border  rounded-2xl p-2 mb-2 "
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input
              type="number"
              placeholder="Age of the Produt" required
              className="w-60 border  rounded-2xl  p-2  mb-2 "
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />

            <input
              type="text"
              placeholder="Enter Location" required
              className="w-60 border  rounded-2xl p-2  mb-2 "
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Enter Destination" required
              className="w-60 border  rounded-2xl p-2  mb-2 "
              value={formData.destination}
              onChange={(e) =>
                setFormData({ ...formData, destination: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Enter Amount" required
              className="w-60 border  rounded-2xl p-2  mb-2 "
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Avalibility of Stock" required
              className="w-60 border  rounded-2xl p-2 mb-2 "
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
            />

            <input
              type="file" required
              multiple
              className="w-60 border  rounded-2xl p-2  mb-4 "
              onChange={handleImages}
            />

            <div className="flex gap-5">
              <button
                onClick={handleSubmit}
                className="bg-amber-950  hover:bg-blue-400 text-cyan-50 px-4 py-2 rounded-b-md"
              >
                {editItem ? "Update" : "Add"}
              </button>

              <button
  onClick={() => {
    setShowForm(false);
    setEditItem(null); 
    setFormData({
      name: "",
      age: "",
      location: "",
      destination: "",
      amount: "",
      stock: "",
      images: [],
    });
  }}
  className="bg-blue-950  hover:bg-fuchsia-300 text-cyan-50 px-4 py-2 rounded-b-md"
>
  Cancel
</button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Product;
