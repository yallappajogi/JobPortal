import React from "react";
import InputFeild from "../components/InputFeild";

const EmploymentType = ({ handleChange }) => {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-medium mb-2">Type of Experience</h4>

      <div className="space-y-2">
        <InputFeild
          handleChange={handleChange}
          value=""
          title="Any Type"
          name="contract_type"
        />
        <InputFeild
          handleChange={handleChange}
          value="full_time"
          title="Full-time"
          name="contract_type"
        />
        <InputFeild
          handleChange={handleChange}
          value="part_time"
          title="Part-time"
          name="contract_type"
        />
        <InputFeild
          handleChange={handleChange}
          value="contract"
          title="Contract"
          name="contract_type"
        />
        <InputFeild
          handleChange={handleChange}
          value="permanent"
          title="Permanent"
          name="contract_type"
        />
      </div>
    </div>
  );
};

export default EmploymentType;
