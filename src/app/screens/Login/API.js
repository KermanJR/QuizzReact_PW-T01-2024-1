export const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const userData = await response.json();
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    throw error;
  }
};
