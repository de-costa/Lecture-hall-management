import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import hodService from "../../services/hodService";
import {
  Plus,
  Edit3,
  Trash2,
  Send,
  Bell,
} from "lucide-react";

const HODNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);

  const [form, setForm] = useState({
    title: "",
    message: "",
    audience: "students",
    priority: "medium",
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const data = await hodService.getNotices();
      setNotices(data || []);
    } catch (err) {
      console.error("Failed to load notices");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.message) return;

    try {
      if (editingNotice) {
        await hodService.updateNotice(editingNotice.id, form);
      } else {
        await hodService.createNotice(form);
      }

      resetModal();
      fetchNotices();
    } catch (err) {
      console.error("Submit failed");
    }
  };

  const handleDelete = async (id) => {
    await hodService.deleteNotice(id);
    fetchNotices();
  };

  const resetModal = () => {
    setShowModal(false);
    setEditingNotice(null);
    setForm({
      title: "",
      message: "",
      audience: "students",
      priority: "medium",
    });
  };

  const openEdit = (notice) => {
    setEditingNotice(notice);
    setForm(notice);
    setShowModal(true);
  };

  return (
    <DashboardLayout role="hod">

      <div className="space-y-10">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Notice Management
            </h1>
            <p className="text-gray-500 mt-2">
              Create announcements and send booking decision notifications
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-xl hover:opacity-90 transition"
          >
            <Plus size={18} />
            Post New Notice
          </button>
        </div>

        {/* NOTICE LIST */}
        {loading ? (
          <p className="text-gray-500">Loading notices...</p>
        ) : notices.length === 0 ? (
          <p className="text-gray-500">No notices available.</p>
        ) : (
          <div className="space-y-6">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
              >

                <div className="flex justify-between items-start">

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {notice.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {notice.courseCode || ""}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-1 text-xs rounded-full font-medium
                      ${
                        notice.priority === "high"
                          ? "bg-red-100 text-red-600"
                          : notice.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                  >
                    {notice.priority}
                  </span>

                </div>

                <p className="mt-4 text-gray-700 leading-relaxed">
                  {notice.message}
                </p>

                <div className="flex justify-between items-center mt-6 text-sm">

                  <p className="text-gray-400">
                    Posted on {notice.date}
                  </p>

                  <div className="flex gap-6 items-center">

                    <button
                      onClick={() => openEdit(notice)}
                      className="flex items-center gap-1 text-indigo-600 hover:underline"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(notice.id)}
                      className="flex items-center gap-1 text-red-600 hover:underline"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

        {showModal && (
          <NoticeModal
            form={form}
            setForm={setForm}
            editingNotice={editingNotice}
            onClose={resetModal}
            onSubmit={handleSubmit}
          />
        )}

      </div>
    </DashboardLayout>
  );
};

export default HODNotices;


const NoticeModal = ({ form, setForm, editingNotice, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-xl p-8 space-y-6 shadow-2xl">

        <h2 className="text-xl font-semibold text-gray-900">
          {editingNotice ? "Edit Notice" : "Create Notice"}
        </h2>

        <input
          type="text"
          placeholder="Notice Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          rows="4"
          placeholder="Notice Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
        />

        <div className="grid grid-cols-2 gap-4">

          <select
            value={form.audience}
            onChange={(e) => setForm({ ...form, audience: e.target.value })}
            className="border rounded-lg px-4 py-2"
          >
            <option value="students">Students</option>
            <option value="lecturers">Lecturers</option>
            <option value="all">All</option>
          </select>

          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="border rounded-lg px-4 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

        </div>

        <div className="flex justify-end gap-4 pt-4">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-lg hover:opacity-90"
          >
            <Send size={16} />
            {editingNotice ? "Update" : "Publish"}
          </button>

        </div>

      </div>
    </div>
  );
};