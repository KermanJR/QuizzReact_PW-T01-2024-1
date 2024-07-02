export const updateUser = async (id, data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/users/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const userData = await response.json();
    localStorage.setItem("userData", JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.error("Erro ao atualizar dados do usuário:", error.message);
    throw error;
  }
};
