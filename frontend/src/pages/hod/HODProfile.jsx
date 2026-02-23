import { useState, useContext } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { AuthContext } from "../../context/AuthContext";
import {
  User,
  Mail,
  Phone,
  Building,
  ShieldCheck,
  Edit,
  Lock,
} from "lucide-react";

const HODProfile = () => {
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    fullName: user?.name || "Dr. Emily Carter",
    email: user?.email || "hod@timelyx.com",
    phone: "+1 987 654 3210",
    department: "Computer Science",
    designation: "Head of Department",
  });

  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  return (
    <DashboardLayout role="hod">

      <div className="space-y-10">

        {/* PAGE HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Profile
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your personal and professional information
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT PROFILE CARD */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center">

            <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-semibold shadow-md">
              {getInitials(profile.fullName)}
            </div>

            <h2 className="mt-6 text-xl font-semibold text-gray-900">
              {profile.fullName}
            </h2>

            <p className="text-gray-500 mt-1">
              {profile.designation}
            </p>

            <span className="inline-block mt-4 px-4 py-1 bg-green-100 text-green-700 text-sm rounded-full">
              Active
            </span>

            <div className="mt-8 space-y-4">

              <button
                onClick={() => setShowEdit(true)}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm hover:bg-gray-50 transition"
              >
                <Edit size={16} />
                Edit Profile
              </button>

              <button
                onClick={() => setShowPassword(true)}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm hover:bg-gray-50 transition"
              >
                <Lock size={16} />
                Change Password
              </button>

            </div>
          </div>

          {/* RIGHT INFORMATION CARD */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-8">

            <SectionTitle title="Personal Information" />

            <InfoRow icon={<User size={18} />} label="Full Name" value={profile.fullName} />
            <InfoRow icon={<Mail size={18} />} label="Email Address" value={profile.email} />
            <InfoRow icon={<Phone size={18} />} label="Phone Number" value={profile.phone} />
            <InfoRow icon={<Building size={18} />} label="Department" value={profile.department} />
            <InfoRow icon={<ShieldCheck size={18} />} label="Role" value="Head of Department" />

          </div>
        </div>

        {showEdit && (
          <EditModal
            profile={profile}
            setProfile={setProfile}
            close={() => setShowEdit(false)}
          />
        )}

        {showPassword && (
          <PasswordModal close={() => setShowPassword(false)} />
        )}

      </div>
    </DashboardLayout>
  );
};

export default HODProfile;



/* SECTION TITLE */

const SectionTitle = ({ title }) => (
  <h3 className="text-lg font-semibold text-gray-900 border-b pb-3">
    {title}
  </h3>
);



/* INFO ROW */

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 border border-gray-200 rounded-xl p-4 hover:shadow-sm transition">

    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
      {icon}
    </div>

    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>
      <p className="font-medium text-gray-900">
        {value}
      </p>
    </div>

  </div>
);



/* EDIT PROFILE MODAL */

const EditModal = ({ profile, setProfile, close }) => {
  const [form, setForm] = useState(profile);

  const handleSave = () => {
    setProfile(form);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-lg p-8 space-y-6 shadow-xl">

        <h2 className="text-xl font-semibold text-gray-900">
          Edit Profile
        </h2>

        {["fullName", "phone", "department"].map((field) => (
          <input
            key={field}
            value={form[field]}
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder={field}
          />
        ))}

        <div className="flex justify-end gap-3 pt-4">

          <button
            onClick={close}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
};



/* PASSWORD MODAL */

const PasswordModal = ({ close }) => {
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-lg p-8 space-y-6 shadow-xl">

        <h2 className="text-xl font-semibold text-gray-900">
          Change Password
        </h2>

        <input
          type="password"
          placeholder="Current Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          onChange={(e) =>
            setForm({ ...form, current: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          onChange={(e) =>
            setForm({ ...form, newPass: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          onChange={(e) =>
            setForm({ ...form, confirm: e.target.value })
          }
        />

        <div className="flex justify-end gap-3 pt-4">

          <button
            onClick={close}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Update Password
          </button>

        </div>

      </div>
    </div>
  );
};