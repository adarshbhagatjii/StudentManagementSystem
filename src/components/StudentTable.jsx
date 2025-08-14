import React from 'react';
import { Edit, Trash2, Trophy, Clock, TrendingUp } from 'lucide-react';

const StudentTable = ({ students, onEdit, onDelete }) => {
  const getDivisionColor = (division) => {
    switch (division) {
      case 'First Division':
        return 'text-green-600 bg-green-100';
      case 'Second Division':
        return 'text-blue-600 bg-blue-100';
      case 'Third Division':
        return 'text-yellow-600 bg-yellow-100';
      case 'Fail':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 60) return 'text-green-600';
    if (percentage >= 50) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Students Found</h3>
        <p className="text-gray-500">Add some students to see them listed here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          Student Records ({students.length})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject Marks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student, index) => (
              <tr key={student.id} className={`hover:bg-gray-50 transition-colors duration-200 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Age: {student.age}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <div className="grid grid-cols-5 gap-1">
                      {Object.values(student.subjects).map((mark, index) => (
                        <span key={index} className="text-xs bg-gray-200 px-2 py-1 rounded">
                          {mark}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Total: {Object.values(student.subjects).reduce((sum, mark) => sum + mark, 0)}/500
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className={`text-sm font-semibold flex items-center ${getPercentageColor(student.percentage)}`}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {student.percentage}%
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDivisionColor(student.division)}`}>
                      {student.division}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(student)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors duration-200 hover:bg-blue-100"
                      title="Edit student"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(student.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded transition-colors duration-200 hover:bg-red-100"
                      title="Delete student"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;