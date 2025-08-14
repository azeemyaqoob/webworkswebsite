'use client';

import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaTrash } from 'react-icons/fa';

export default function EditExpertModal({ 
  isOpen, 
  onClose, 
  expert, 
  onSave,
  onDelete 
}) {
  const [editedExpert, setEditedExpert] = useState({
    name: '',
    picture: null,
    designation: '',
    social: {
      github: '',
      linkedin: '',
      twitter: ''
    }
  });
  
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (expert) {
      setEditedExpert(expert);
      if (typeof expert.picture === 'string') {
        setPreview(expert.picture);
      } else if (expert.picture instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(expert.picture);
      }
    }
  }, [expert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpert(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setEditedExpert(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [name]: value
      }
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedExpert(prev => ({
        ...prev,
        picture: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setEditedExpert(prev => ({
      ...prev,
      picture: null
    }));
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedExpert);
    onClose();
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this expert?')) {
      onDelete(expert.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center sticky top-0 bg-white p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Edit Expert</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={editedExpert.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative">
                {preview ? (
                  <>
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <FaTrash className="h-3 w-3" />
                    </button>
                  </>
                ) : (
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">No image</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 2MB</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
            <input
              type="text"
              name="designation"
              value={editedExpert.designation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Social Links</label>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaGithub className="h-5 w-5 mr-2 text-gray-600" />
                <input
                  type="text"
                  name="github"
                  value={editedExpert.social.github}
                  onChange={handleSocialChange}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="GitHub URL"
                />
              </div>
              <div className="flex items-center">
                <FaLinkedin className="h-5 w-5 mr-2 text-blue-600" />
                <input
                  type="text"
                  name="linkedin"
                  value={editedExpert.social.linkedin}
                  onChange={handleSocialChange}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="LinkedIn URL"
                />
              </div>
              <div className="flex items-center">
                <FaTwitter className="h-5 w-5 mr-2 text-blue-400" />
                <input
                  type="text"
                  name="twitter"
                  value={editedExpert.social.twitter}
                  onChange={handleSocialChange}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Twitter URL"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Expert
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}