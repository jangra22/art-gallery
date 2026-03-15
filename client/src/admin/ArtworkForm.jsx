import React, { useState } from 'react';

const ArtworkForm = ({ onCancel, onSubmit, initialData }) => {
    const [formData, setFormData] = useState(initialData ? {
        ...initialData,
        images: initialData.images && initialData.images.length > 0 ? initialData.images[0] : ''
    } : {
        title: '',
        medium: '',
        dimensions: '',
        price: '',
        description: '',
        images: '', // Comma separated for MVP
        limitedEditionCount: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, images: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Backend expects array of strings
        const processedData = {
            ...formData,
            images: [formData.images], // Wrap single image in array for now
            price: Number(formData.price),
            limitedEditionCount: formData.limitedEditionCount ? Number(formData.limitedEditionCount) : null
        };
        onSubmit(processedData);
    };

    return (
        <div className="bg-white p-6 border border-gray-200 mb-8 animate-fade-in">
            <h2 className="text-lg font-medium mb-4">{initialData ? 'Edit Artwork' : 'Add New Artwork'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="border p-2 w-full text-sm focus:outline-none focus:border-black" required />
                <input name="medium" value={formData.medium} onChange={handleChange} placeholder="Medium (e.g. Oil on Canvas)" className="border p-2 w-full text-sm focus:outline-none focus:border-black" required />

                <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" type="number" className="border p-2 w-full text-sm focus:outline-none focus:border-black" required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full text-sm h-24 focus:outline-none focus:border-black" required />
                
                <div className="border p-4 border-dashed border-gray-300 text-center">
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                        {formData.images ? (
                           <div className="relative">
                                <img src={formData.images} alt="Preview" className="h-40 object-cover mb-2 shadow-sm" />
                                <span className="text-xs text-blue-600 hover:text-blue-800">Change Image</span>
                           </div>
                        ) : (
                            <div className="py-4">
                                <span className="text-sm text-gray-500">Click to upload artwork image</span>
                            </div>
                        )}
                    </label>
                </div>

                <input name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="Dimensions (e.g. 24x36 inches)" className="border p-2 w-full text-sm focus:outline-none focus:border-black" />
                <input name="limitedEditionCount" value={formData.limitedEditionCount} onChange={handleChange} placeholder="Limited Edition Count (optional)" type="number" className="border p-2 w-full text-sm focus:outline-none focus:border-black" />
                
                <div className="flex justify-end space-x-2 mt-4">
                    <button type="button" onClick={onCancel} className="px-4 py-2 text-sm border hover:bg-gray-50 transition-colors">Cancel</button>
                    <button type="submit" className="px-4 py-2 text-sm bg-black text-white hover:bg-gray-800 transition-colors">Save Artwork</button>
                </div>
            </form>
        </div>
    );
};

export default ArtworkForm;
