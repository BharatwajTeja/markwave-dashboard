import { useEffect, useState } from "react";
import buffaloData from "../assets/Product.json";

function Product() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const [hoverIndex, setHoverIndex] = useState(null);
  const [imageSlide, setImageSlide] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    destination: "",
    amount: "",
    stock: "",
    images: [],
  });

  const generateID = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "BUF-";
    for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products"));

    if (saved && saved.length > 0) {
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
      const mapped = buffaloData.map((item) => ({
  ...item,
  images: item.images.map(
    (img) => new URL(`../assets/images/${img}`, import.meta.url).href
  ),
}));

      setProducts(mapped);
      localStorage.setItem("products", JSON.stringify(mapped));
    }
  }, []);

  const saveProducts = (data) => {
    setProducts(data);
    localStorage.setItem("products", JSON.stringify(data));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: urls });
  };

  const handleSubmit = () => {
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
      return;
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

  const editProduct = (item) => {
    setFormData(item);
    setEditItem(item);
    setShowForm(true);
  };

  useEffect(() => {
    if (hoverIndex === null) return;
    const interval = setInterval(() => {
      setImageSlide((prev) => prev + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, [hoverIndex]);

  return (
    <div className="min-h-screen p-4 sm:p-6">

      {/* Add Product */}
      <button
        className="bg-green-600 hover:bg-green-300 text-white font-medium px-6 py-3 rounded-xl shadow-lg mb-6 w-full sm:w-auto"
        onClick={() => {
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
          setShowForm(true);
        }}
      >
        + Add Product
      </button>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item, index) => {
          const imageToShow = item.images[imageSlide % item.images.length];

          return (
            <div
              key={item.id}
              className="bg-gray-200 shadow-xl rounded-3xl p-4"
              onMouseEnter={() => { setHoverIndex(index); setImageSlide(0); }}
              onMouseLeave={() => { setHoverIndex(null); setImageSlide(0); }}
            >
              <img
                src={hoverIndex === index ? imageToShow : item.images[0]}
                className="h-56 w-full object-cover rounded-3xl"
                alt="buffalo"
              />

              <h2 className="text-xl font-bold mt-2">{item.name}</h2>
              <p className="text-sm font-semibold text-gray-600">ID: {item.id}</p>

              <div className="mt-2 text-gray-700 font-medium text-sm">
                <p>Age: {item.age}</p>
                <p>Location: {item.location}</p>
                <p>Destination: {item.destination}</p>
                <p>Amount: ₹{item.amount}</p>
                <p className="font-bold text-yellow-700 bg-yellow-200 px-2 py-1 rounded-lg inline-block">
                  Stock: {item.stock}
                </p>
              </div>

              <div className="flex justify-end mt-4">
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

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 overflow-y-auto">
          <div className="bg-gray-100 w-full max-w-md p-6 rounded-3xl text-center">
            <h2 className="text-3xl font-extrabold text-blue-600 mb-4">
              {editItem ? "Edit Product" : "Add Product"}
            </h2>

            {["name","age","location","destination","amount","stock"].map((field) => (
              <input
                key={field}
                type={field === "age" || field === "amount" || field === "stock" ? "number" : "text"}
                placeholder={field.toUpperCase()}
                className="w-full border rounded-2xl p-2 mb-2"
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              />
            ))}

            <input
              type="file"
              multiple
              className="w-full border rounded-2xl p-2 mb-4"
              onChange={handleImages}
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSubmit}
                className="bg-amber-950 text-white px-6 py-2 rounded-xl"
              >
                {editItem ? "Update" : "Add"}
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="bg-blue-950 text-white px-6 py-2 rounded-xl"
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
