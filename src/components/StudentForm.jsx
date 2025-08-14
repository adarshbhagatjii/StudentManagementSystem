import React, { useState, useEffect } from 'react';
import { User, Hash, BookOpen, Plus, Edit3 } from 'lucide-react';

const StudentForm = ({ onSubmit, editingStudent, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    subject1: '',
    subject2: '',
    subject3: '',
    subject4: '',
    subject5: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        age: editingStudent.age.toString(),
        subject1: editingStudent.subjects.subject1.toString(),
        subject2: editingStudent.subjects.subject2.toString(),
        subject3: editingStudent.subjects.subject3.toString(),
        subject4: editingStudent.subjects.subject4.toString(),
        subject5: editingStudent.subjects.subject5.toString(),
      });
    }
  }, [editingStudent]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const age = parseInt(formData.age);
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(age) || age < 5 || age > 100) {
      newErrors.age = 'Age must be between 5 and 100';
    }

    const subjects = ['subject1', 'subject2', 'subject3', 'subject4', 'subject5'];
    subjects.forEach((subject, index) => {
      const marks = parseInt(formData[subject]);
      if (!formData[subject]) {
        newErrors[subject] = `Subject ${index + 1} marks are required`;
      } else if (isNaN(marks) || marks < 0 || marks > 100) {
        newErrors[subject] = `Subject ${index + 1} marks must be between 0 and 100`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 

  const calculateGrade = (percentage, hasFailedSubject) => {
     if (hasFailedSubject) return 'Fail';
    if (percentage >= 60) return 'First Division';
    if (percentage >= 50) return 'Second Division';
    if (percentage >= 40) return 'Third Division';
    return 'Fail';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const subjects = {
      subject1: parseInt(formData.subject1),
      subject2: parseInt(formData.subject2),
      subject3: parseInt(formData.subject3),
      subject4: parseInt(formData.subject4),
      subject5: parseInt(formData.subject5),
    };

     const hasFailedSubject = Object.values(subjects).some(marks => marks < 33);

    const totalMarks = Object.values(subjects).reduce((sum, marks) => sum + marks, 0);
    const percentage = Math.round((totalMarks / 500) * 100 * 100) / 100;
    const division = calculateGrade(percentage, hasFailedSubject);

    const student = {
      id: editingStudent?.id || Date.now().toString(),
      name: formData.name.trim(),
      age: parseInt(formData.age),
      subjects,
      percentage,
      division,
      createdAt: editingStudent?.createdAt || new Date(),
    };

    onSubmit(student);
    
    if (!editingStudent) {
      setFormData({
        name: '',
        age: '',
        subject1: '',
        subject2: '',
        subject3: '',
        subject4: '',
        subject5: '',
      });
    }
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      age: '',
      subject1: '',
      subject2: '',
      subject3: '',
      subject4: '',
      subject5: '',
    });
    setErrors({});
    onCancelEdit?.();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          {editingStudent ? <Edit3 className="w-6 h-6 mr-2 text-blue-500" /> : <Plus className="w-6 h-6 mr-2 text-green-500" />}
          {editingStudent ? 'Edit Student' : 'Add New Student'}
        </h2>
        {editingStudent && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Student Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter student name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Hash className="w-4 h-4 inline mr-1" />
              Age
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors.age ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter age"
              min="5"
              max="100"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Subject Marks (out of 100)
          </h3>
          
          {['subject1', 'subject2', 'subject3', 'subject4', 'subject5'].map((subject, index) => (
            <div key={subject}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject {index + 1}
              </label>
              <input
                type="number"
                value={formData[subject]}
                onChange={(e) => handleInputChange(subject, e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  errors[subject] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter marks"
                min="0"
                max="100"
              />
              {errors[subject] && <p className="text-red-500 text-sm mt-1">{errors[subject]}</p>}
            </div>
          ))}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center"
          >
            {editingStudent ? <Edit3 className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
            {editingStudent ? 'Update Student' : 'Add Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;