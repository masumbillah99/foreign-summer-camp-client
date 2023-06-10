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

// get my add classes
export const getMyAddClass = async (email) => {
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/classes/${email}`
  );
  const data = await res.json();
  return data;
};

// update class data or status
export const updateClassData = async (classData, id) => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/classes/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(classData),
  });
  const data = await res.json();
  return data;
};

// fetch(`${import.meta.env.VITE_SERVER_URL}/classes/${id}`, {
//   method: "PUT",
//   headers: { "content-type": "application/json" },
//   body: JSON.stringify(newData),
// })
//   .then((res) => res.json())
