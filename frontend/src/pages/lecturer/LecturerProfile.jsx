import { useState, useContext } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { AuthContext } from "../../context/AuthContext";
import {
  User,
  Mail,
  Phone,
  Building,
  Award,
  BookOpen,
  Lock,
  Edit,
  X,
} from "lucide-react";

const LecturerProfile = () => {
  const { user } = useContext(AuthContext);

  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [profile, setProfile] = useState({
    fullName: user?.name || "Dr. John Smith",
    email: user?.email || "lecturer@timelyx.com",
    phone: "+1 234 567 8900",
    department: "Computer Science",
    designation: "Senior Lecturer",
    courses: ["CS101 - Programming", "CS204 - Database Systems"],
  });

  const getInitials = (name) =>
    name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase();

  return (
    <DashboardLayout role="lecturer">
      <div className="space-y-12">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Profile
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your personal and professional information
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT PROFILE CARD */}
          <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center">

            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-semibold">
              {getInitials(profile.fullName)}
            </div>

            <h2 className="mt-6 text-xl font-semibold text-gray-900">
              {profile.fullName}
            </h2>

            <p className="text-gray-500 mt-1">
              {profile.designation}
            </p>

            <span className="mt-3 px-4 py-1 text-sm rounded-full bg-green-100 text-green-600">
              Active
            </span>

            <div className="w-full mt-8 space-y-4">

              <button
                onClick={() => setShowEdit(true)}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition"
              >
                <Edit size={16} />
                Edit Profile
              </button>

              <button
                onClick={() => setShowPassword(true)}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition"
              >
                <Lock size={16} />
                Change Password
              </button>

            </div>
          </div>

          {/* RIGHT INFORMATION */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-10 space-y-10">

            <SectionTitle title="Personal Information" />

            <InfoRow icon={<User size={18} />} label="Full Name" value={profile.fullName} />
            <InfoRow icon={<Mail size={18} />} label="Email Address" value={profile.email} />
            <InfoRow icon={<Phone size={18} />} label="Phone Number" value={profile.phone} />
            <InfoRow icon={<Building size={18} />} label="Department" value={profile.department} />
            <InfoRow icon={<Award size={18} />} label="Designation" value={profile.designation} />

            {/* COURSES */}
            <div>
              <SectionTitle title="Courses Teaching" />
              <div className="flex flex-wrap gap-3 mt-4">
                {profile.courses.map((course, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-lg"
                  >
                    <BookOpen size={14} />
                    {course}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {showEdit && (
          <EditProfileModal
            profile={profile}
            setProfile={setProfile}
            close={() => setShowEdit(false)}
          />
        )}

        {showPassword && (
          <ChangePasswordModal close={() => setShowPassword(false)} />
        )}

      </div>
    </DashboardLayout>
  );
};

/* COMPONENTS  */

const SectionTitle = ({ title }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900">
      {title}
    </h3>
    <div className="mt-2 h-px bg-gray-100"></div>
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-5 border border-gray-200 rounded-xl px-6 py-5">

    <div className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
      {icon}
    </div>

    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>
      <p className="text-gray-900 font-medium mt-1">
        {value}
      </p>
    </div>

  </div>
);

/* EDIT MODAL */

const EditProfileModal = ({ profile, setProfile, close }) => {
  const [form, setForm] = useState(profile);

  const handleSubmit = () => {
    setProfile(form);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-xl space-y-6 relative">

        <button
          onClick={close}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold text-gray-900">
          Edit Profile
        </h2>

        {["fullName", "phone", "department", "designation"].map((field) => (
          <div key={field}>
            <label className="text-sm text-gray-500 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              value={form[field]}
              onChange={(e) =>
                setForm({ ...form, [field]: e.target.value })
              }
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        ))}

        <div className="flex justify-end gap-4 pt-4">
          <button
            onClick={close}
            className="px-5 py-2 border border-gray-300 rounded-xl text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

/* PASSWORD MODAL */

const ChangePasswordModal = ({ close }) => {
  const [form, setForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleSubmit = () => {
    if (form.newPass !== form.confirm) {
      alert("Passwords do not match");
      return;
    }
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-xl space-y-6 relative">

        <button
          onClick={close}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold text-gray-900">
          Change Password
        </h2>

        {["Current Password", "New Password", "Confirm Password"].map((label, index) => (
          <input
            key={index}
            type="password"
            placeholder={label}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) =>
              setForm({
                ...form,
                [index === 0 ? "current" : index === 1 ? "newPass" : "confirm"]:
                  e.target.value,
              })
            }
          />
        ))}

        <div className="flex justify-end gap-4 pt-4">
          <button
            onClick={close}
            className="px-5 py-2 border border-gray-300 rounded-xl text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700 transition"
          >
            Update Password
          </button>
        </div>

      </div>
    </div>
  );
};

export default LecturerProfile;