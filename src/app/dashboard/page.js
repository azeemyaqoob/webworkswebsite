'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from './components/DataTable';
import AddItemModal from './components/AddItemModal';
import AddExpertModal from './components/AddExpertModal';
import EditExpertModal from './components/EditExpertModal';
import AddProjectModal from './components/AddProjectModal';
import EditProjectModal from './components/EditProjectModal';
import EditServiceModal from './components/EditServiceModal';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const storedEmail = localStorage.getItem('userEmail');
      const storedPassword = localStorage.getItem('userPassword');
      
      if (
        storedEmail === 'naveed5050@gmail.com' && 
        storedPassword === 'naveed5050@!'
      ) {
        setIsAuthenticated(true);
      } else {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  // Logout function
  const handleLogout = () => {
    // Remove credentials from localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    
    // Redirect to login page
    router.push('/login');
  };

  // Services state
  const [services, setServices] = useState([
    {
      id: 1,
      headings: 'Project Alpha',
      descriptions: 'Main dashboard project',
    },
    {
      id: 2,
      headings: 'Marketing',
      descriptions: 'Campaign dashboard'
    },
    {
      id: 3,
      headings: 'Research',
      descriptions: 'Data visualization',
    }
  ]);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [isEditServiceModalOpen, setIsEditServiceModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  // Experts state
  const [experts, setExperts] = useState([]);
  const [isAddExpertModalOpen, setIsAddExpertModalOpen] = useState(false);
  const [isEditExpertModalOpen, setIsEditExpertModalOpen] = useState(false);
  const [currentExpert, setCurrentExpert] = useState(null);

  // Projects state
  const [projects, setProjects] = useState([]);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Services handlers
  const handleAddService = (newItem) => {
    setServices([...services, { id: Date.now(), ...newItem }]);
    setIsServicesModalOpen(false);
  };

  const handleEditService = (updatedService) => {
    setServices(services.map(service => 
      service.id === updatedService.id ? updatedService : service
    ));
    setIsEditServiceModalOpen(false);
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  // Expert handlers
  const handleAddExpert = (newExpert) => {
    setExperts([...experts, { ...newExpert, id: Date.now() }]);
  };

  const handleEditExpert = (expert) => {
    setExperts(experts.map(e => e.id === expert.id ? expert : e));
  };

  const handleDeleteExpert = (id) => {
    setExperts(experts.filter(expert => expert.id !== id));
  };

  // Project handlers
  const handleAddProject = (newProject) => {
    setProjects([...projects, { ...newProject, id: Date.now() }]);
  };

  const handleEditProject = (project) => {
    setProjects(projects.map(p => p.id === project.id ? project : p));
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  // Only render the dashboard if authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Services Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Services Page Data</h2>
          <button
            onClick={() => setIsServicesModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Add New Item
          </button>
        </div>
        <DataTable
          data={services}
          type="services"
          onEdit={(service) => {
            setCurrentService(service);
            setIsEditServiceModalOpen(true);
          }}
          onDelete={handleDeleteService}
        />
      </div>

      {/* Experts Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Experts</h2>
          <button
            onClick={() => setIsAddExpertModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Expert
          </button>
        </div>
        <DataTable
          data={experts}
          type="experts"
          onEdit={(expert) => {
            setCurrentExpert(expert);
            setIsEditExpertModalOpen(true);
          }}
          onDelete={handleDeleteExpert}
        />
      </div>

      {/* Projects Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Projects</h2>
          <button
            onClick={() => setIsAddProjectModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Project
          </button>
        </div>
        <DataTable
          data={projects}
          type="projects"
          onEdit={(project) => {
            setCurrentProject(project);
            setIsEditProjectModalOpen(true);
          }}
          onDelete={handleDeleteProject}
        />
      </div>

      {/* Modals */}
      <AddItemModal
        isOpen={isServicesModalOpen}
        onClose={() => setIsServicesModalOpen(false)}
        onSave={handleAddService}
      />
      
      <EditServiceModal
        isOpen={isEditServiceModalOpen}
        onClose={() => setIsEditServiceModalOpen(false)}
        service={currentService}
        onSave={handleEditService}
      />
      
      <AddExpertModal
        isOpen={isAddExpertModalOpen}
        onClose={() => setIsAddExpertModalOpen(false)}
        onSave={handleAddExpert}
      />
      
      <EditExpertModal
        isOpen={isEditExpertModalOpen}
        onClose={() => setIsEditExpertModalOpen(false)}
        expert={currentExpert}
        onSave={handleEditExpert}
        onDelete={handleDeleteExpert}
      />
      
      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        onSave={handleAddProject}
      />
      
      <EditProjectModal
        isOpen={isEditProjectModalOpen}
        onClose={() => setIsEditProjectModalOpen(false)}
        project={currentProject}
        onSave={handleEditProject}
        onDelete={handleDeleteProject}
      />
    </div>
  );
}