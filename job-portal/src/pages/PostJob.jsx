import { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const PostJob = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.skills = selectedOption.map((option) => option.value);
    const formattedJob = {
      ...data,
      date: new Date(data.date).toLocaleDateString("en-US"), // Ensures MM/DD/YYYY format
    };

    try {
      const response = await fetch("http://localhost:5000/api/posted-Jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedJob),
      });

      if (response.ok) {
        console.log("✅ Job successfully posted to MongoDB");
      } else {
        const errorData = await response.json();
        console.error("❌ Failed to post job:", errorData);
      }
    } catch (error) {
      console.error("❌ Error posting job:", error);
    }
  };

  const options = [
    { value: "Javascript", label: "Javascript" },
    { value: "C++", label: "C++" },
    { value: "Java", label: "Java" },
    { value: "DSA", label: "DSA" },
    { value: "CSS", label: "CSS" },
    { value: "HTML", label: "HTML" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Post a Job
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Job Title & Company Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium">
                Job Title
              </label>
              <input
                type="text"
                {...register("jobTitle", { required: "Job title is required" })}
                className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.jobTitle && (
                <p className="text-red-500">{errors.jobTitle.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Company Name
              </label>
              <input
                type="text"
                {...register("companyName", {
                  required: "Company name is required",
                })}
                className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.companyName && (
                <p className="text-red-500">{errors.companyName.message}</p>
              )}
            </div>
          </div>

          {/* Location & Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium">
                Location
              </label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.location && (
                <p className="text-red-500">{errors.location.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Salary</label>
              <input
                type="text"
                {...register("salary", { required: "Salary is required" })}
                className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.salary && (
                <p className="text-red-500">{errors.salary.message}</p>
              )}
            </div>
          </div>

          {/* Date & Experience Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium">Date</label>
              <input
                type="date"
                {...register("date", { required: "Date is required" })}
                className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.date && (
                <p className="text-red-500">{errors.date.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Type of Experience
              </label>
              <input
                type="text"
                {...register("experienceType", {
                  required: "Experience type is required",
                })}
                className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.experienceType && (
                <p className="text-red-500">{errors.experienceType.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Skills Selection */}
          <div>
            <label className="block text-gray-700 font-medium">
              Required Skill Sets
            </label>
            <CreatableSelect
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className="w-full"
            />
          </div>

          {/* Posted By */}
          <div>
            <label className="block text-gray-700 font-medium">
              Job posted by
            </label>
            <input
              type="email"
              {...register("postedBy", { required: "Email is required" })}
              className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.postedBy && (
              <p className="text-red-500">{errors.postedBy.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-600 transition w-half"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
