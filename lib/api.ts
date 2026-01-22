const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://yuksekolah.yuksekolah.online/api";

async function handleResponse(response: Response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request gagal");
  }

  return data;
}

export const authApi = {
  async testConnection() {
    const response = await fetch(`${API_URL}/test-connection`);
    return handleResponse(response);
  },

  async registerSchool(data: {
    school_name: string;
    school_email: string;
    school_phone: string;
    school_address: string;
    admin_name: string;
    admin_email: string;
    admin_password: string;
  }) {
    const response = await fetch(`${API_URL}/register-school`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return handleResponse(response);
  },
};
