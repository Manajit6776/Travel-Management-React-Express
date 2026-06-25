import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const USD_TO_INR = 84;

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    package_name: '',
    description: '',
    price: '',
    package_type: 'Family Package',
    location: 'Unknown',
    features: 'Free Breakfast, Free Wi-Fi',
    image: null
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.is_admin) {
      navigate('/login');
      return;
    }
    fetchPackages();
  }, [user, navigate]);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/packages', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('package_name', formData.package_name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('package_type', formData.package_type);
    data.append('location', formData.location);
    data.append('features', formData.features);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingPackage) {
        await axios.put(`http://localhost:5000/api/packages/${editingPackage.id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post('http://localhost:5000/api/packages', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      setShowModal(false);
      setEditingPackage(null);
      resetForm();
      fetchPackages();
    } catch (error) {
      console.error('Error saving package:', error);
      alert('Failed to save package');
    }
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      package_name: pkg.package_name,
      description: pkg.description,
      price: pkg.price,
      package_type: pkg.package_type,
      location: pkg.location,
      features: pkg.features,
      image: null
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/packages/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Failed to delete package');
    }
  };

  const resetForm = () => {
    setFormData({
      package_name: '',
      description: '',
      price: '',
      package_type: 'Family Package',
      location: 'Unknown',
      features: 'Free Breakfast, Free Wi-Fi',
      image: null
    });
  };

  const openAddModal = () => {
    setEditingPackage(null);
    resetForm();
    setShowModal(true);
  };

  if (!user || !user.is_admin) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1 bg-white border border-zinc-200/80 p-6 rounded-2xl h-fit space-y-4 shadow-sm">
          <div className="pb-3 border-b border-zinc-100">
            <h3 className="font-bold text-zinc-400 text-[10px] uppercase tracking-wider">General Menu</h3>
          </div>
          <nav className="flex flex-col space-y-1.5">
            <Link 
              className="flex items-center space-x-2.5 px-3 py-2 text-sm font-medium rounded-xl text-zinc-600 hover:text-emerald-600 hover:bg-zinc-50/55 transition-colors" 
              to="/admin/dashboard"
            >
              <i className="fa-solid fa-chart-pie text-sm"></i>
              <span>Dashboard Overview</span>
            </Link>
            <Link 
              className="flex items-center space-x-2.5 px-3 py-2 text-sm font-semibold rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100" 
              to="/admin/packages"
            >
              <i className="fa-solid fa-map text-sm"></i>
              <span>Manage Packages</span>
            </Link>
            <Link 
              className="flex items-center space-x-2.5 px-3 py-2 text-sm font-medium rounded-xl text-zinc-600 hover:text-emerald-600 hover:bg-zinc-50/50 transition-colors" 
              to="/admin/bookings"
            >
              <i className="fa-solid fa-calendar-check text-sm"></i>
              <span>Manage Bookings</span>
            </Link>
          </nav>
        </aside>

        {/* Packages Panel */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-4">
            <div>
              <h1 className="text-2xl font-extrabold text-zinc-950">Manage Tour Packages</h1>
              <p className="text-zinc-500 text-sm">Create, edit, or remove travel packages offered by Voyage Vista.</p>
            </div>
            <button 
              onClick={openAddModal}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all duration-300 flex items-center justify-center space-x-2 w-fit"
            >
              <i className="fa-solid fa-plus text-xs"></i>
              <span>Add New Package</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse text-zinc-600 text-sm">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200/60 font-semibold text-zinc-800 uppercase tracking-wider text-[10px]">
                  <th className="px-6 py-4">Thumbnail</th>
                  <th className="px-6 py-4">Package Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-150/60 font-light">
                {packages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-zinc-50/40 transition-colors">
                    <td className="px-6 py-4 shrink-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-100">
                        <img
                          src={pkg.image ? `http://localhost:5000/uploads/${pkg.image}` : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=100&q=85'}
                          alt={pkg.package_name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=100&q=85";
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-bold text-zinc-900 line-clamp-1">{pkg.package_name}</div>
                        <div className="text-xs text-zinc-400 flex items-center mt-0.5"><i className="fa-solid fa-location-dot mr-1 text-[10px]"></i>{pkg.location}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-normal">
                      <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        {pkg.package_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-zinc-950">₹{(pkg.price * USD_TO_INR).toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleEdit(pkg)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300"
                        title="Edit Details"
                      >
                        <i className="fa-solid fa-pen text-xs"></i>
                      </button>
                      <button 
                        onClick={() => handleDelete(pkg.id)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50 transition-all duration-300"
                        title="Delete"
                      >
                        <i className="fa-solid fa-trash-can text-xs"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6">
          {/* Modal Background Overlay with blur */}
          <div className="fixed inset-0 bg-zinc-900/50 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)}></div>

          {/* Modal Content Card */}
          <div className="relative bg-white border border-zinc-200 shadow-xl rounded-3xl w-full max-w-xl overflow-hidden z-10 my-8">
            <header className="px-6 py-4 bg-zinc-50 border-b border-zinc-150/80 flex items-center justify-between">
              <h2 className="font-extrabold text-zinc-900 text-base">{editingPackage ? 'Edit Travel Package' : 'Create Travel Package'}</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full hover:bg-zinc-150/80 flex items-center justify-center text-zinc-400 hover:text-zinc-650 transition-colors"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </header>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[480px] overflow-y-auto">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700">Package Name</label>
                <input
                  type="text"
                  name="package_name"
                  value={formData.package_name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Hawaiian Paradise Getaway"
                  className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700">Price (₹ INR)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. 1500"
                    className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700">Package Type</label>
                  <input
                    type="text"
                    name="package_type"
                    value={formData.package_type}
                    onChange={handleInputChange}
                    placeholder="e.g. Adventure Pack"
                    className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Hawaii, USA"
                    className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700">Image Upload</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full text-xs text-zinc-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-50 file:text-zinc-700 hover:file:bg-zinc-100 file:cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  placeholder="Describe details, accommodations, sightseeing itineraries..."
                  className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700">Features (comma separated)</label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  placeholder="e.g. Free Breakfast, Tour Guide, Airport Transfer"
                  className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50"
                />
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-zinc-200 text-zinc-700 font-semibold text-xs rounded-xl hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  {editingPackage ? 'Update Details' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePackages;
