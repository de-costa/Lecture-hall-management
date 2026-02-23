import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import studentService from "../../services/studentService";

const StudentProfile = () => {
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await studentService.getProfile(user.id);
        setProfile(data);
        setFormData(data);
      } catch {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await studentService.updateProfile(user.id, {
        fullName: formData.fullName,
        phone: formData.phone,
      });

      setProfile(formData);
      setIsEditing(false);
    } catch {
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
        <nav className="space-y-4">

          <Link
            to="/student"
            className="block px-4 py-3 hover:bg-gray-100 rounded-lg"
          >
            Dashboard
          </Link>

          <Link
            to="/student/timetable"
            className="block px-4 py-3 hover:bg-gray-100 rounded-lg"
          >
            Timetable
          </Link>

          <Link
            to="/student/notices"
            className="block px-4 py-3 hover:bg-gray-100 rounded-lg"
          >
            Notice Board
          </Link>

          <Link
            to="/student/profile"
            className="block bg-indigo-50 text-indigo-600 px-4 py-3 rounded-lg font-medium"
          >
            Profile
          </Link>

        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-8">

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Profile
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage your profile information
          </p>
        </div>

        {loading && (
          <p className="text-gray-500">Loading profile...</p>
        )}

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {!loading && profile && (
          <div className="grid md:grid-cols-3 gap-10">

            {/* ================= LEFT CARD ================= */}
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">

              <div className="w-28 h-28 mx-auto rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold mb-6">
                {profile.fullName?.charAt(0)}
              </div>

              <h2 className="text-xl font-semibold">
                {profile.fullName}
              </h2>

              <p className="text-gray-500 mt-1 capitalize">
                {profile.role}
              </p>

              <span className="inline-block mt-4 px-4 py-1 text-sm rounded-full bg-green-100 text-green-600">
                Active
              </span>

            </div>

            {/* ================= RIGHT CARD ================= */}
            <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-8">

              <div className="space-y-6">

                {/* FULL NAME */}
                <Field
                  label="Full Name"
                  editable={isEditing}
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />

                {/* EMAIL (READ ONLY) */}
                <StaticField
                  label="Email Address"
                  value={profile.email}
                />

                {/* PHONE */}
                <Field
                  label="Phone Number"
                  editable={isEditing}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <StaticField
                  label="Department"
                  value={profile.department}
                />

                <StaticField
                  label="Batch"
                  value={profile.batch}
                />

                <StaticField
                  label="Current Semester"
                  value={profile.semester}
                />

              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-10 flex gap-4">

                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Save Changes
                    </button>

                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 border rounded-lg hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                  >
                    Edit Profile
                  </button>
                )}

                <Link
                  to="/student/change-password"
                  className="px-6 py-3 border rounded-lg hover:bg-gray-100 transition"
                >
                  Change Password
                </Link>

              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
};

export default StudentProfile;


/* REUSABLE FIELD COMPONENTS */

const Field = ({ label, editable, name, value, onChange }) => (
  <div>
    <label className="block text-sm text-gray-500 mb-1">
      {label}
    </label>

    {editable ? (
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
      />
    ) : (
      <div className="p-4 border rounded-lg">
        {value}
      </div>
    )}
  </div>
);

const StaticField = ({ label, value }) => (
  <div>
    <label className="block text-sm text-gray-500 mb-1">
      {label}
    </label>
    <div className="p-4 border rounded-lg bg-gray-50">
      {value}
    </div>
  </div>
);