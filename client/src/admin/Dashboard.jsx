import React, { useState, useEffect } from 'react';
import ArtworkForm from './ArtworkForm';

const Dashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [artworks, setArtworks] = useState([]);
    const [editingArtwork, setEditingArtwork] = useState(null);
    
    // Fetch artworks on mount
    useEffect(() => {
        fetchArtworks();
    }, []);

    const fetchArtworks = async () => {
        try {
            const res = await fetch('/api/artworks');
            const data = await res.json();
            setArtworks(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAdd = async (data) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) return alert('Not authenticated');

        try {
            const res = await fetch('/api/artworks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify(data),
            });
            
            if (res.ok) {
                fetchArtworks(); // Refresh list
                setShowForm(false);
            } else {
                const err = await res.json();
                alert(err.message);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to add artwork');
        }
    };

    const handleUpdate = async (data) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) return alert('Not authenticated');

        try {
            const res = await fetch(`/api/artworks/${editingArtwork._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                fetchArtworks();
                setShowForm(false);
                setEditingArtwork(null);
            } else {
                const err = await res.json();
                alert(err.message);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to update artwork');
        }
    };

    const handleEdit = (artwork) => {
        setEditingArtwork(artwork);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingArtwork(null);
    };

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure?')) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo || !userInfo.token) return alert('Not authenticated');

            try {
                const res = await fetch(`/api/artworks/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                });

                if (res.ok) {
                    setArtworks(artworks.filter(a => a._id !== id));
                } else {
                    alert('Failed to delete');
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-sans text-gray-800">Admin Dashboard</h1>
                    <button 
                        onClick={() => { setShowForm(!showForm); setEditingArtwork(null); }}
                        className="bg-black text-white px-6 py-2 text-sm uppercase tracking-wide hover:bg-gray-800"
                    >
                        {showForm ? 'Close Form' : 'Add Artwork'}
                    </button>
                </header>

                {showForm && (
                    <ArtworkForm 
                        onCancel={handleCancel} 
                        onSubmit={editingArtwork ? handleUpdate : handleAdd} 
                        initialData={editingArtwork}
                    />
                )}

                <div className="bg-white border border-gray-200 shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-6 py-3 font-medium">Artwork</th>
                                <th className="px-6 py-3 font-medium">Title</th>
                                <th className="px-6 py-3 font-medium">Medium</th>
                                <th className="px-6 py-3 font-medium">Price</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {artworks.map(artwork => (
                                <tr key={artwork._id} className="text-sm hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 bg-gray-200 overflow-hidden">
                                            {artwork.images && artwork.images[0] && (
                                                <img src={artwork.images[0]} alt={artwork.title} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{artwork.title}</td>
                                    <td className="px-6 py-4 text-gray-600">{artwork.medium}</td>
                                    <td className="px-6 py-4 font-medium">₹{artwork.price.toLocaleString()}<sup>*</sup></td>
                                    <td className="px-6 py-4 text-right space-x-4">
                                        <button onClick={() => handleEdit(artwork)} className="text-blue-600 hover:text-blue-800 transition-colors">Edit</button>
                                        <button onClick={() => handleDelete(artwork._id)} className="text-red-600 hover:text-red-800 transition-colors">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
