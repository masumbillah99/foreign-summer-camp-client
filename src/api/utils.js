/** upload image in img-bb */

export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_UPLOAD_TOKEN
  }`;

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};

// save a user to database

export const saveUserDb = (user) => {
  const userInfo = {
    email: user.email,
    name: user.displayName,
    image: user.photoURL,
    role: "",
  };

  return fetch(`${import.meta.env.VITE_SERVER_URL}/users/${user?.email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userInfo),
  }).then((res) => res.json());
};

/** role save for user */
export const becomeUserRole = (email, role) => {
  const currentUser = {
    role: role,
    // role: "instructor",
  };

  return fetch(`${import.meta.env.VITE_SERVER_URL}/users/${email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  }).then((res) => res.json());
};

/** get role */
export const getUserRole = async (email) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/users/${email}`
  );
  const user = await response.json();
  return user?.role;
};
