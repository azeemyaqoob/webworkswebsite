'use client';

import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function DataTable({ 
  data, 
  onEdit, 
  onDelete,
  type = 'services'
}) {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const renderTableHeaders = () => {
    switch (type) {
      case 'services':
        return (
          <>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Heading
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
          </>
        );
      case 'experts':
        return (
          <>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Picture
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Designation
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
              Social Links
            </th>
          </>
        );
      case 'projects':
        return (
          <>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Picture
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
              Year
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
              Stacks
            </th>
          </>
        );
      default:
        return null;
    }
  };

  const renderTableRow = (item) => {
    switch (type) {
      case 'services':
        return (
          <>
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {item.id}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
              {item.headings}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.descriptions}
            </td>
          </>
        );
      case 'experts':
        return (
          <>
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {item.id}
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              {item.picture ? (
                <img 
                  src={typeof item.picture === 'string' ? item.picture : URL.createObjectURL(item.picture)} 
                  alt={item.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-500">No image</span>
                </div>
              )}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
              {item.name}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.designation}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
              <div className="flex flex-wrap gap-2">
                {item.social.github && (
                  <a href={item.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm">
                    GitHub
                  </a>
                )}
                {item.social.linkedin && (
                  <a href={item.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 text-xs sm:text-sm">
                    LinkedIn
                  </a>
                )}
                {item.social.twitter && (
                  <a href={item.social.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 text-xs sm:text-sm">
                    Twitter
                  </a>
                )}
              </div>
            </td>
          </>
        );
      case 'projects':
        return (
          <>
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {item.id}
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              {item.projectPicture ? (
                <img 
                  src={typeof item.projectPicture === 'string' ? item.projectPicture : URL.createObjectURL(item.projectPicture)} 
                  alt={item.projectName}
                  className="h-10 w-10 rounded object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-500">No image</span>
                </div>
              )}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
              {item.projectType}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
              {item.projectName}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
              {item.yearOfCompletion}
            </td>
            <td className="px-4 py-4 whitespace-normal text-sm text-gray-500 hidden lg:table-cell">
              <div className="flex flex-wrap gap-1">
                {item.stacks.map((stack, index) => (
                  <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                    {stack}
                  </span>
                ))}
              </div>
            </td>
          </>
        );
      default:
        return null;
    }
  };

  const renderExpandedContent = (item) => {
    if (type !== 'projects') return null;
    
    return (
      <tr>
        <td colSpan="6" className="px-4 py-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Description:</h4>
              <p className="text-sm text-gray-500 mt-1">{item.projectDescription}</p>
            </div>
            <div className="md:hidden">
              <h4 className="text-sm font-medium text-gray-900">Technology Stacks:</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {item.stacks.map((stack, index) => (
                  <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                    {stack}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <h4 className="text-sm font-medium text-gray-900">Year:</h4>
              <p className="text-sm text-gray-500 mt-1">{item.yearOfCompletion}</p>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {renderTableHeaders()}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <>
                <tr 
                  key={item.id} 
                  className={expandedRow === item.id ? 'bg-gray-50' : ''}
                  onClick={() => type === 'projects' && toggleExpand(item.id)}
                  style={type === 'projects' ? { cursor: 'pointer' } : {}}
                >
                  {renderTableRow(item)}
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(item);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(item.id);
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRow === item.id && renderExpandedContent(item)}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}