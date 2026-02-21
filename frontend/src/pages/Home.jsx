import heroImage from "../assets/lecture-hall.jpg";
import descriptionImage from "../assets/lecture-hall-view.jpg";

const Home = () => {
  return (
    <div className="bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-slate-100 to-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Lecture Hall Management System
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            A role-based academic scheduling platform designed to improve
            efficiency, prevent conflicts, and streamline lecture hall bookings
            across departments.
          </p>

          <div className="flex justify-center gap-5 mb-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="bg-white border border-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
              Sign In
            </button>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={heroImage}
              alt="Lecture Hall"
              className="w-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* DESCRIPTION SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Description
            </h2>

            <p className="text-gray-600 leading-relaxed text-lg">
              Timelyx provides a structured workflow for lecture hall booking
              and approval processes. Lecturers submit booking requests through
              an intelligent availability system, while the HOD evaluates
              requests via a conflict-detection mechanism. Students receive
              synchronized timetable updates in real time.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={descriptionImage}
              alt="Academic Environment"
              className="w-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-semibold text-gray-900 mb-14">
            Key Features
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
              <div className="text-blue-600 mb-4 text-3xl">✓</div>
              <h3 className="font-semibold text-lg mb-3">
                Smart Booking
              </h3>
              <p className="text-gray-600 text-sm">
                Automated hall selection based on capacity and availability.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
              <div className="text-blue-600 mb-4 text-3xl">👥</div>
              <h3 className="font-semibold text-lg mb-3">
                Role-Based Access
              </h3>
              <p className="text-gray-600 text-sm">
                Customized dashboards for lecturers, students, and HOD.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
              <div className="text-blue-600 mb-4 text-3xl">⏱</div>
              <h3 className="font-semibold text-lg mb-3">
                Real-Time Updates
              </h3>
              <p className="text-gray-600 text-sm">
                Instant approval status and timetable synchronization.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
              <div className="text-blue-600 mb-4 text-3xl">🛡</div>
              <h3 className="font-semibold text-lg mb-3">
                Conflict Detection
              </h3>
              <p className="text-gray-600 text-sm">
                Prevents double bookings and scheduling clashes automatically.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;