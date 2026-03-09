import React, { useState, useRef } from "react";
import generatePDF from "react-to-pdf";

const Dashboard = () => {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const [formData, setFormData] = useState({
    // Personal
    name: "",
    dob: "",
    height: "",
    religion: "",
    caste: "",
    // Family
    fatherName: "",
    fatherJob: "",
    motherName: "",
    motherJob: "",
    siblings: "",
    // Education & Profession
    education: "",
    college: "",
    job: "",
    company: "",
    income: "",
    //Contact details
    phone: "",
    email: "",
    address: "",
    showContact: true,
    //Horoscope
    rashi: "",
    nakshatra: "",
    gothram: "",
    horoscopeShow: false,
  });

  const [activeSection, setActiveSection] = useState("personal");
  const [template, setTemplate] = useState("traditional");
  const targetRef = useRef();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age > 0 ? age : "";
  };

  const SectionHeader = ({ id, title, icon }) => (
    <button
      onClick={() => setActiveSection(activeSection === id ? "" : id)}
      className={`w-full flex justify-between items-center p-4 font-bold border-b transition ${activeSection === id ? "bg-indigo-50 text-indigo-700" : "bg-white text-gray-700"}`}
    >
      <span>
        {icon} {title}
      </span>
      <span>{activeSection === id ? "−" : "+"}</span>
    </button>
  );

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-slate-800 shadow-lg z-50 px-8 py-2">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">💍</span>

            <div>
              <h1 className="text-white text-xl md:text-2xl font-bold">
                Welcome to <span className="text-yellow-400">ShaadiBio</span>
              </h1>

              <p className="text-gray-300 text-xs md:text-sm">
                Create beautiful marriage biodata in minutes
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen bg-slate-100 p-4 gap-6 font-sans pt-20">
        {/* --- LEFT: ACCORDION FORM --- */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden h-fit lg:sticky lg:top-4">
          <h2 className="p-4 bg-slate-800 text-white font-bold text-lg text-center">
            Biodata Builder
          </h2>

          {/* PERSONAL SECTION */}
          <SectionHeader id="personal" title="Personal Details" icon="👤" />
          {activeSection === "personal" && (
            <div className="p-4 space-y-3 bg-gray-50 border-b animate-fadeIn">
              <InputField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <div className="flex gap-2">
                <div className="flex-1">
                  <InputField
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-24">
                  <InputField
                    label="Height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <InputField
                  label="Religion"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                />
                <InputField
                  label="Caste"
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                  Upload Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full text-sm"
                />
              </div>
            </div>
          )}

          {/* FAMILY SECTION */}
          <SectionHeader id="family" title="Family Details" icon="👨‍👩‍👧‍👦" />
          {activeSection === "family" && (
            <div className="p-4 space-y-3 bg-gray-50 border-b animate-fadeIn">
              <InputField
                label="Father's Name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
              />
              <InputField
                label="Father's Occupation"
                name="fatherJob"
                value={formData.fatherJob}
                onChange={handleChange}
              />
              <InputField
                label="Mother's Name"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
              />
              <InputField
                label="Mother's Occupation"
                name="motherJob"
                value={formData.motherJob}
                onChange={handleChange}
              />
              <InputField
                label="Siblings"
                name="siblings"
                value={formData.siblings}
                onChange={handleChange}
              />
            </div>
          )}

          <SectionHeader id="horoscope" title="Horoscope Details" icon="🔯" />

          {activeSection === "horoscope" && formData.horoscopeShow && (
            <div className="p-4 space-y-3 bg-gray-50 border-b">
              <InputField
                label="Rashi"
                name="rashi"
                value={formData.rashi}
                onChange={handleChange}
              />

              <InputField
                label="Nakshatra"
                name="nakshatra"
                value={formData.nakshatra}
                onChange={handleChange}
              />

              <InputField
                label="Gothram"
                name="gothram"
                value={formData.gothram}
                onChange={handleChange}
              />
            </div>
          )}

          {/* EDUCATION & PROFESSION */}
          <SectionHeader
            id="education"
            title="Education & Profession"
            icon="🎓"
          />
          {activeSection === "education" && (
            <div className="p-4 space-y-3 bg-gray-50 border-b animate-fadeIn">
              <InputField
                label="Highest Qualification"
                name="education"
                value={formData.education}
                onChange={handleChange}
              />
              <InputField
                label="School/College"
                name="college"
                value={formData.college}
                onChange={handleChange}
              />
              <InputField
                label="Job Title"
                name="job"
                value={formData.job}
                onChange={handleChange}
              />
              <InputField
                label="Company Name"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
              <InputField
                label="Annual Income"
                name="income"
                value={formData.income}
                onChange={handleChange}
              />
            </div>
          )}

          {/* CONTACT DETAILS */}
          <SectionHeader id="contact" title="Contact Details" icon="📞" />

          {activeSection === "contact" && formData.showContact && (
            <div className="p-4 space-y-3 bg-gray-50 border-b">
              <InputField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <InputField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <InputField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() =>
                setFormData({ ...formData, showContact: !formData.showContact })
              }
              className="flex-1 bg-gray-700 text-white hover:bg-gray-800 ml-4 p-2 rounded text-sm"
            >
              {formData.showContact
                ? "Hide Contact Section"
                : "Show Contact Section"}
            </button>

            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  horoscopeShow: !formData.horoscopeShow,
                })
              }
              className="flex-1 bg-gray-700 text-white hover:bg-gray-800 mr-4 p-2 rounded text-sm"
            >
              {formData.horoscopeShow
                ? "Hide Horoscope Section"
                : "Add Horoscope Section"}
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setTemplate("traditional")}
                className={`flex-1 py-2 rounded text-sm font-bold ${template === "traditional" ? "bg-red-800 text-white" : "bg-gray-200"}`}
              >
                Traditional
              </button>
              <button
                onClick={() => setTemplate("modern")}
                className={`flex-1 py-2 rounded text-sm font-bold ${template === "modern" ? "bg-indigo-900 text-white" : "bg-gray-200"}`}
              >
                Modern Look
              </button>
            </div>
            <button
              onClick={() =>
                generatePDF(targetRef, { filename: "biodata.pdf" })
              }
              className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 shadow-md"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* --- RIGHT: LIVE PREVIEW --- */}
        <div className="w-full lg:w-2/3 flex justify-center">
          <div
            ref={targetRef}
            className="w-full max-w-[800px] shadow-2xl bg-white min-h-[1000px]"
          >
            {template === "traditional" ? (
              <TraditionalTemplate
                data={formData}
                age={calculateAge(formData.dob)}
              />
            ) : (
              <ModernTemplate
                data={formData}
                age={calculateAge(formData.dob)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
    />
  </div>
);

// --- UPDATED TRADITIONAL TEMPLATE ---
const TraditionalTemplate = ({ data, age }) => (
  <div className="p-16 border-[20px] border-double border-red-900 bg-[#fffaf0] font-serif min-h-[1000px] text-gray-900">
    <div className="text-center text-red-800 mb-8">
      <span className="text-4xl italic">Biodata</span>
    </div>
    {data.photo && (
      <div className="flex justify-center mb-6">
        <img
          src={data.photo}
          alt="Profile"
          className="w-50 h-40 object-cover"
        />
      </div>
    )}
    <div className="space-y-8">
      <Section
        title="Personal Information"
        items={[
          ["Full Name", data.name],
          ["Age / DOB", `${age} Yrs / ${data.dob}`],
          ["Height", data.height],
          ["Religion/Caste", `${data.religion} (${data.caste})`],
        ]}
        color="text-red-900"
      />
      <Section
        title="Family Details"
        items={[
          ["Father's Name", data.fatherName],
          ["Father's Job", data.fatherJob],
          ["Mother's Name", data.motherName],
          ["Siblings", data.siblings],
        ]}
        color="text-red-900"
      />
      <Section
        title="Education & Career"
        items={[
          ["Qualification", data.education],
          ["Occupation", data.job],
          ["Company", data.company],
          ["Income", data.income],
        ]}
        color="text-red-900"
      />
      {data.horoscopeShow && (
        <Section
          title="Horoscope Details"
          items={[
            ["Rashi", data.rashi],
            ["Nakshatra", data.nakshatra],
            ["Gothram", data.gothram],
          ]}
          color="text-red-900"
        />
      )}
      {data.showContact && (
        <Section
          title="Contact Details"
          items={[
            ["Phone", data.phone],
            ["Email", data.email],
            ["Address", data.address],
          ]}
          color="text-red-900"
        />
      )}
    </div>
  </div>
);

// Helper for template sections

const Section = ({ title, items, color }) => (
  <div className="border-b border-red-200 pb-4">
    <h3 className={`text-xl font-bold mb-4 uppercase tracking-widest ${color}`}>
      {title}
    </h3>
    <div className="grid grid-cols-2 gap-y-2 text-lg">
      {items.map(([label, val]) => (
        <React.Fragment key={label}>
          <span className="font-bold opacity-70">{label}:</span>
          <span>{val}</span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

// --- MODERN TEMPLATE (Simplified for brevity) ---
const ModernTemplate = ({ data, age }) => (
  <div className="flex min-h-[1000px] font-sans">
    {/* LEFT SIDEBAR */}
    <div className="w-1/3 bg-slate-900 text-white p-5 flex flex-col items-center">
      {/* PHOTO */}
      {data.photo && (
        <img
          src={data.photo}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-white mb-6"
        />
      )}

      {/* NAME */}
      <h2 className="text-xl font-bold uppercase text-center">{data.name}</h2>

      <p className="text-sm text-indigo-400 mt-2 uppercase">{data.job}</p>

      {/* BASIC INFO */}
      <div className="mt-8 text-xs space-y-2 uppercase opacity-90 text-center">
        <p>AGE : {age}</p>
        <p>HEIGHT : {data.height}</p>
        <p>RELIGION : {data.religion}</p>
        <p>CASTE : {data.caste}</p>
      </div>

      {/* CONTACT DETAILS */}
      {data.showContact && (
        <div className="mt-10 text-xs text-center">
          <h3 className="text-indigo-400 font-bold mb-3 uppercase">Contact</h3>

          <div className="space-y-2">
            <p className="uppercase">📞 {data.phone}</p>
            <p>✉ {data.email}</p>
            <p className="uppercase">📍 {data.address}</p>
          </div>
        </div>
      )}
    </div>

    {/* RIGHT SIDE CONTENT */}
    <div className="w-2/3 bg-white p-12">
      {/* EDUCATION */}
      <div className="mb-10">
        <h3 className="text-indigo-600 font-bold uppercase mb-4">Education</h3>

        <p className="uppercase">
          {data.education} from {data.college}
        </p>
      </div>

      {/* PROFESSIONAL DETAILS */}
      <div className="mb-10">
        <h3 className="text-indigo-600 font-bold uppercase mb-4">Profession</h3>

        <p className="uppercase">
          {data.job} at {data.company}
        </p>

        <p className="uppercase mt-2">Annual Income : {data.income}</p>
      </div>

      {/* FAMILY DETAILS */}
      <div>
        <h3 className="text-indigo-600 font-bold uppercase mb-4">
          Family Details
        </h3>

        <div className="space-y-2 uppercase">
          <p>
            Father : {data.fatherName} ({data.fatherJob})
          </p>
          <p>
            Mother : {data.motherName} ({data.motherJob})
          </p>
          <p>Siblings : {data.siblings}</p>
        </div>
      </div>
      {data.horoscopeShow && (
        <div className="mt-10">
          <h3 className="text-indigo-600 font-bold uppercase mb-4">
            Horoscope Details
          </h3>

          <div className="space-y-2 uppercase">
            <p>Rashi : {data.rashi}</p>
            <p>Nakshatra : {data.nakshatra}</p>
            <p>Gothram : {data.gothram}</p>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default Dashboard;
