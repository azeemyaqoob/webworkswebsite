'use client';

import { useState, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';

export default function AddProjectModal({ isOpen, onClose, onSave }) {
  const [newProject, setNewProject] = useState({
    projectType: '',
    projectName: '',
    projectDescription: '',
    yearOfCompletion: '',
    projectPicture: null,
    stacks: []
  });
  
  const [currentStack, setCurrentStack] = useState('');
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProject(prev => ({
        ...prev,
        projectPicture: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setNewProject(prev => ({
      ...prev,
      projectPicture: null
    }));
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddStack = () => {
    if (currentStack.trim() && !newProject.stacks.includes(currentStack.trim())) {
      setNewProject(prev => ({
        ...prev,
        stacks: [...prev.stacks, currentStack.trim()]
      }));
      setCurrentStack('');
    }
  };

  const handleRemoveStack = (stackToRemove) => {
    setNewProject(prev => ({
      ...prev,
      stacks: prev.stacks.filter(stack => stack !== stackToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newProject);
    // Reset form
    setNewProject({
      projectType: '',
      projectName: '',
      projectDescription: '',
      yearOfCompletion: '',
      projectPicture: null,
      stacks: []
    });
    setCurrentStack('');
    setPreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center sticky top-0 bg-white p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Add New Project</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
              <input
                type="text"
                name="projectType"
                value={newProject.projectType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
              <input
                type="text"
                name="projectName"
                value={newProject.projectName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Picture</label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative">
                {preview ? (
                  <>
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="h-16 w-16 rounded object-cover"
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
                  <div className="h-16 w-16 rounded bg-gray-200 flex items-center justify-center">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
            <textarea
              name="projectDescription"
              value={newProject.projectDescription}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Year of Completion</label>
            <input
              type="date"
              name="yearOfCompletion"
              value={newProject.yearOfCompletion}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Technology Stacks</label>
            <div className="flex flex-col sm:flex-row gap-2 mb-2">
              <input
                type="text"
                value={currentStack}
                onChange={(e) => setCurrentStack(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a technology stack"
              />
              <button
                type="button"
                onClick={handleAddStack}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newProject.stacks.map((stack, index) => (
                <div key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
                  <span className="mr-1 text-sm">{stack}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStack(stack)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
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
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}