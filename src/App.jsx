import React, { useMemo, useState } from 'react'
import StudentForm from './components/StudentForm'
import StudentTable from './components/StudentTable';
import SearchAndFilter from './components/SearchAndFilter';
import { GraduationCap } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('')

  const handleSubmit = (student) => {
    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === student.id ? student : s));
      setEditingStudent(null);
        toast.success('Student updated successfully!');
    } else {
      setStudents(prev => [...prev, student]);
      toast.success('Student added successfully!');
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  }
  const handleEdit = (student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id))
  };


  const divisions = useMemo(() => {
    return Array.from(new Set(students.map(student => student.division))).sort();
  }, [students]);


  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDivision = selectedDivision === '' || student.division === selectedDivision;
      return matchesName && matchesDivision;
    });
  }, [students, searchTerm, selectedDivision]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200">
      
      <div className="container mx-auto px-4 py-8">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="w-12 h-12 text-blue-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Student Management System</h1>
          </div>
          <p className="text-gray-600 text-lg">Manage student records with ease</p>

          {/* Statistics
          {students.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 max-w-2xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-blue-600">{statistics.total}</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-green-600">{statistics.passed}</div>
                <div className="text-sm text-gray-600">Passed</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-red-600">{statistics.failed}</div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-purple-600">{statistics.avgPercentage}%</div>
                <div className="text-sm text-gray-600">Avg Score</div>
              </div>
            </div>
          )} */}
        </div>


        <StudentForm
          onSubmit={handleSubmit}
          editingStudent={editingStudent}
          onCancelEdit={handleCancelEdit}
        />


        {students.length > 0 && (
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedDivision={selectedDivision}
            onDivisionChange={setSelectedDivision}
            divisions={divisions}
          />
        )}


        <StudentTable
          students={filteredStudents}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ToastContainer />
      </div>
    </div>
  )
}

export default App
