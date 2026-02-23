import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Plus, Pencil, Trash2 } from "lucide-react";

const LecturerNoticeManagement = () => {

  /* SAMPLE DATA */
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Class Cancellation",
      content: "Software Engineering lecture on Monday is cancelled.",
      courseCode: "SE301",
      audience: "Batch 2024",
      priority: "High",
      date: "2026-01-20",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    courseCode: "",
    audience: "",
    priority: "",
  });

  /* HANDLERS */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {

    if (editingNotice) {
      setNotices(
        notices.map((n) =>
          n.id === editingNotice.id ? { ...editingNotice, ...formData } : n
        )
      );
    } else {
      setNotices([
        ...notices,
        {
          id: Date.now(),
          ...formData,
          date: new Date().toISOString().split("T")[0],
        },
      ]);
    }

    setShowModal(false);
    setEditingNotice(null);
    setFormData({
      title: "",
      content: "",
      courseCode: "",
      audience: "",
      priority: "",
    });
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setFormData(notice);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setNotices(notices.filter((n) => n.id !== id));
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <DashboardLayout role="lecturer">

      <div className="space-y-10">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Notice Management
            </h1>
            <p className="text-gray-500 mt-2">
              Create and manage notices for your students
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            <Plus size={18} />
            Post New Notice
          </button>
        </div>

        {/* NOTICE LIST */}
        <div className="space-y-6">

          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 hover:shadow-md transition"
            >

              <div className="flex justify-between items-start mb-4">

                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {notice.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {notice.courseCode} • {notice.audience}
                  </p>
                </div>

                <span
                  className={`text-sm px-4 py-1 rounded-full ${getPriorityStyle(
                    notice.priority
                  )}`}
                >
                  {notice.priority}
                </span>

              </div>

              <p className="text-gray-600 mb-6">
                {notice.content}
              </p>

              <div className="flex justify-between items-center">

                <span className="text-sm text-gray-400">
                  Posted on {notice.date}
                </span>

                <div className="flex gap-4">

                  <button
                    onClick={() => handleEdit(notice)}
                    className="flex items-center gap-2 text-indigo-600 hover:underline text-sm"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(notice.id)}
                    className="flex items-center gap-2 text-red-600 hover:underline text-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </div>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-2xl rounded-2xl p-8 shadow-xl space-y-6">

            <h2 className="text-xl font-semibold">
              {editingNotice ? "Edit Notice" : "Create New Notice"}
            </h2>

            <div className="space-y-4">

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Notice Title"
                className="w-full border rounded-lg px-4 py-3"
              />

              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your notice here..."
                rows="4"
                className="w-full border rounded-lg px-4 py-3"
              />

              <div className="grid grid-cols-2 gap-4">

                <select
                  name="courseCode"
                  value={formData.courseCode}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-3"
                >
                  <option value="">Select Course</option>
                  <option value="SE301">SE301</option>
                  <option value="DB302">DB302</option>
                </select>

                <select
                  name="audience"
                  value={formData.audience}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-3"
                >
                  <option value="">Select Audience</option>
                  <option value="Batch 2024">Batch 2024</option>
                  <option value="Batch 2025">Batch 2025</option>
                </select>

              </div>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Normal">Normal</option>
              </select>

            </div>

            <div className="flex justify-end gap-4 pt-4">

              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-black text-white rounded-lg"
              >
                {editingNotice ? "Update Notice" : "Post Notice"}
              </button>

            </div>

          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default LecturerNoticeManagement;