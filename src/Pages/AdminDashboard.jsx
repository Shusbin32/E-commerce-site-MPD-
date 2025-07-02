import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { FaEdit, FaTrash, FaPlus, FaBoxOpen } from 'react-icons/fa';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    unit: 'kg',
    imagePath: '',
    category: '',
    stock: 0,
    imageFile: null,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      toast.error('Failed to load products');
    }
  };

  // Dummy sales data fetch (replace with your real API endpoint)
  const fetchSales = async () => {
    try {
      // Example: const res = await api.get('/sales');
      // setSales(res.data);
      // Dummy data for demonstration:
      setSales([
        { name: 'Jan', sales: 1200 },
        { name: 'Feb', sales: 2100 },
        { name: 'Mar', sales: 800 },
        { name: 'Apr', sales: 1600 },
        { name: 'May', sales: 900 },
        { name: 'Jun', sales: 1700 },
      ]);
    } catch {
      setSales([]);
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.unit ||
      !newProduct.category ||
      (!newProduct.imageFile && !editingId)
    ) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('unit', newProduct.unit);
      formData.append('category', newProduct.category);
      formData.append('stock', newProduct.stock);
      if (newProduct.imageFile) {
        formData.append('image', newProduct.imageFile);
      }

      if (editingId) {
        await api.put(`/products/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product updated');
      } else {
        await api.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product added');
      }
      setNewProduct({
        name: '',
        description: '',
        price: '',
        unit: 'kg',
        imagePath: '',
        category: '',
        stock: 0,
        imageFile: null,
      });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (product) => {
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      unit: product.unit,
      imagePath: product.imagePath,
      category: product.category,
      stock: product.stock,
      imageFile: null,
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-extrabold mb-8 text-center flex items-center justify-center gap-2">
        <FaBoxOpen className="text-green-600" /> Admin Dashboard
      </h2>

      {/* Sales Graph */}
      <div className="mb-10 bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-blue-700">📈 Monthly Sales Overview</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={sales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#38bdf8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Product Form */}
      <form
        onSubmit={handleAddOrUpdate}
        className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
      >
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="number"
          placeholder="Price (Rs)"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="text"
          placeholder="Unit (e.g. kg, litre)"
          value={newProduct.unit}
          onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
          className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewProduct({ ...newProduct, imageFile: e.target.files[0] })
          }
          className="px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-md hover:from-green-500 hover:to-blue-600 font-bold flex items-center justify-center gap-2 col-span-1 md:col-span-2 transition"
        >
          <FaPlus /> {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4">
        <table className="w-full table-auto border-collapse rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-green-200 to-blue-200 text-green-900 sticky top-0">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Price (Rs)</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product, idx) => (
                <tr key={product._id} className={idx % 2 === 0 ? "bg-white/60" : "bg-blue-50/40"}>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.description}</td>
                  <td className="p-2 border">Rs. {product.price}</td>
                  <td className="p-2 border">{product.unit}</td>
                  <td className="p-2 border">
                    <img
                      src={`http://localhost:5000/${product.imagePath.replace(/\\/g, '/')}`}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded shadow"
                    />
                  </td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border">{product.stock}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full shadow flex items-center gap-1 transition"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow flex items-center gap-1 transition"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
