'use client';

import { useState, useEffect, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';

export default function EditProjectModal({ 
  isOpen, 
  onClose, 
  project, 
  onSave,
  onDelete 
}) {
  const [editedProject, setEditedProject] = useState({
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

  useEffect(() => {
    if (project) {
      setEditedProject(project);
      if (typeof project.projectPicture === 'string') {
        setPreview(project.projectPicture);
      } else if (project.projectPicture instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(project.projectPicture);
      } else {
        setPreview(null);
      }
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedProject(prev => ({
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
    setEditedProject(prev => ({
      ...prev,
      projectPicture: null
    }));
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddStack = () => {
    if (currentStack.trim() && !editedProject.stacks.includes(currentStack.trim())) {
      setEditedProject(prev => ({
        ...prev,
        stacks: [...prev.stacks, currentStack.trim()]
      }));
      setCurrentStack('');
    }
  };

  const handleRemoveStack = (stackToRemove) => {
    setEditedProject(prev => ({
      ...prev,
      stacks: prev.stacks.filter(stack => stack !== stackToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedProject);
    onClose();
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this project?')) {
      onDelete(project.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 w-full max-w-2xl mx-auto my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit Project</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
            <input
              type="text"
              name="projectType"
              value={editedProject.projectType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={editedProject.projectName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Picture</label>
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
                      aria-label="Remove image"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
            <textarea
              name="projectDescription"
              value={editedProject.projectDescription}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Year of Completion</label>
            <input
              type="date"
              name="yearOfCompletion"
              value={editedProject.yearOfCompletion}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Technology Stacks</label>
            <div className="flex flex-col sm:flex-row mb-2 gap-2">
              <input
                type="text"
                value={currentStack}
                onChange={(e) => setCurrentStack(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md sm:rounded-r-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a technology stack"
              />
              <button
                type="button"
                onClick={handleAddStack}
                className="bg-blue-500 text-white px-4 py-2 rounded-md sm:rounded-l-none hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editedProject.stacks.map((stack, index) => (
                <div key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
                  <span className="mr-1 text-sm">{stack}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStack(stack)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label={`Remove ${stack}`}
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
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Project
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}