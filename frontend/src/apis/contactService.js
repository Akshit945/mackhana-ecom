const ApiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const sendContactInfo = async (formData) => {
  try {
    // API call to the backend
    const response = await fetch(`${ApiUrl}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return response;

  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};