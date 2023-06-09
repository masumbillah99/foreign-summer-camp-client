// add a new class
export const addNewClass = async (classData) => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/classes`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(classData),
  });
  const data = await res.json();
  return data;
};

// get all classes
export const getAllClass = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/classes`);
  const data = await res.json();
  return data;
};
