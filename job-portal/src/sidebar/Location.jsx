import React from "react";
import InputFeild from "../components/InputFeild";

const Location = ({ handleChange }) => {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-medium mb-2">Location</h4>

      <div className="space-y-2">
        <InputFeild
          handleChange={handleChange}
          value=""
          title="All"
          name="where"
        />
        <InputFeild
          handleChange={handleChange}
          value="India"
          title="India"
          name="where"
        />
        <InputFeild
          handleChange={handleChange}
          value="bangalore"
          title="bangalore"
          name="where"
        />
        <InputFeild
          handleChange={handleChange}
          value="mumbai"
          title="mumbai"
          name="where"
        />
        <InputFeild
          handleChange={handleChange}
          value="pune"
          title="pune"
          name="where"
        />
      </div>
    </div>
  );
};

export default Location;
