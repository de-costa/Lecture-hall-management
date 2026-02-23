import { useEffect, useState } from "react";
import { Plus, Edit3, Trash2, Send } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import toService from "../../services/toService";

const TONotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);

  const [form, setForm] = useState({
    title: "",
    message: "",
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const data = await toService.getNotices();
      setNotices(data || []);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.message.trim()) return;

    try {
      if (editingNotice) {
        await toService.updateNotice(editingNotice.id, form);
      } else {
        await toService.createNotice(form);
      }

      resetModal();
      fetchNotices();
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await toService.deleteNotice(id);
      fetchNotices();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const resetModal = () => {
    setShowModal(false);
    setEditingNotice(null);
    setForm({ title: "", message: "" });
  };

  return (
    <DashboardLayout role="to">
      <div className="space-y-10">

        {/* HEADER  */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Notice Management
            </h1>
            <p className="text-gray-500 mt-2">
              Create and manage announcements for the system
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition shadow-sm"
          >
            <Plus size={18} />
            Post Notice
          </button>
        </div>

        {/* NOTICE LIST */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-6">

          {loading ? (
            <p className="text-gray-500">Loading notices...</p>
          ) : notices.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No notices published yet.
            </div>
          ) : (
            notices.map((notice) => (
              <div
                key={notice.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-sm transition"
              >
                <div className="flex justify-between items-start">

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {notice.title}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      {notice.date || "Recently published"}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setEditingNotice(notice);
                        setForm({
                          title: notice.title,
                          message: notice.message,
                        });
                        setShowModal(true);
                      }}
                      className="text-gray-500 hover:text-indigo-600 transition"
                    >
                      <Edit3 size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(notice.id)}
                      className="text-gray-500 hover:text-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                </div>

                <p className="mt-4 text-gray-700 leading-relaxed">
                  {notice.message}
                </p>
              </div>
            ))
          )}

        </div>

        {/* MODAL */}
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

export default TONotices;

const NoticeModal = ({ form, setForm, editingNotice, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-lg p-8 space-y-6 shadow-2xl">

        <h2 className="text-xl font-semibold text-gray-900">
          {editingNotice ? "Edit Notice" : "Create Notice"}
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Notice Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <textarea
            rows="5"
            placeholder="Notice Message"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

        </div>

        <div className="flex justify-end gap-3 pt-4">

          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Send size={16} />
            {editingNotice ? "Update Notice" : "Publish Notice"}
          </button>

        </div>

      </div>
    </div>
  );
};