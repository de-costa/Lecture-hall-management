import { CheckCircle2, XCircle, Users } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";

const TOPendingUsers = () => {
  const users = [
    {
      id: 1,
      name: "John Perera",
      email: "john@example.com",
      role: "Lecturer",
      registeredDate: "2026-01-20",
    },
  ];

  const handleApprove = (id) => {
    console.log("Approved:", id);
  };

  const handleReject = (id) => {
    console.log("Rejected:", id);
  };

  return (
    <DashboardLayout role="to">
      <div className="space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Pending User Approvals
          </h1>
          <p className="text-gray-500 mt-2">
            Review and approve newly registered users
          </p>
        </div>

        {/* USERS LIST */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-6">

          {users.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Users size={40} className="mx-auto mb-3 text-gray-300" />
              No pending users found.
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="border border-gray-200 rounded-xl p-6 space-y-6 hover:shadow-sm transition"
              >

                {/* USER INFO */}
                <div className="grid md:grid-cols-2 gap-6">

                  <div>
                    <p className="text-sm text-gray-500">
                      Full Name
                    </p>
                    <p className="font-semibold text-gray-900">
                      {user.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Email Address
                    </p>
                    <p className="font-medium text-gray-900">
                      {user.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Role
                    </p>
                    <span className="inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
                      {user.role}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Registered Date
                    </p>
                    <p className="font-medium text-gray-900">
                      {user.registeredDate}
                    </p>
                  </div>

                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-4 pt-4 border-t">

                  <button
                    onClick={() => handleApprove(user.id)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} />
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(user.id)}
                    className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition flex items-center justify-center gap-2"
                  >
                    <XCircle size={18} />
                    Reject
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </DashboardLayout>
  );
};

export default TOPendingUsers;