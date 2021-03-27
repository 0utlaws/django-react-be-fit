import { useState } from "react";

export default (valueOnStart) => {
  const [fields, setValues] = useState(valueOnStart);

  return [
    fields,
    (e) => {
      setValues({
        ...fields,
        [e.target.name]: e.target.value
      });
    },
    (values) => {
        setValues(values)
    }
  ];
};