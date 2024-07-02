const registerUser = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage); 
      }
  
      const userData = await response.json();
      localStorage.setItem('userData', JSON.stringify(userData));
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      throw error;
    }
  };
  
  export default registerUser;
  