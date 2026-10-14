
import { useState } from "react";
import "./Admin.css";

const API = "http://localhost:5000/api/admin";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadLeads(authToken) {
    const response = await fetch(`${API}/leads`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to load enquiries.");
    }

    setLeads(data);
  }

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      await loadLeads(data.token);
      setToken(data.token);
      setPassword("");
    } catch (err) {
      setError(err.message || "Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    try {
      const response = await fetch(`${API}/leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed.");
      }

      setLeads((previous) =>
        previous.map((lead) =>
          lead._id === id ? { ...lead, status } : lead
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteLead(id) {
    if (!window.confirm("Delete this enquiry permanently?")) return;

    try {
      const response = await fetch(`${API}/leads/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed.");
      }

      setLeads((previous) => previous.filter((lead) => lead._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  if (!token) {
    return (
      <main className="admin-page">
        <form className="admin-login" onSubmit={handleLogin}>
          <p className="admin-eyebrow">ETHIXWEB INDIA</p>
          <h1>Admin Login</h1>
          <p>Sign in to manage client enquiries.</p>

          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <p className="admin-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page admin-dashboard">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">ETHIXWEB INDIA</p>
          <h1>Client Enquiries</h1>
          <p>{leads.length} enquiries received</p>
        </div>
        <button
          onClick={() => {
            setToken("");
            setLeads([]);
            setEmail("");
          }}
        >
          Log Out
        </button>
      </header>

      {error && <p className="admin-error">{error}</p>}

      {leads.length === 0 ? (
        <p>No enquiries yet.</p>
      ) : (
        <div className="lead-list">
          {leads.map((lead) => (
            <article className="lead-card" key={lead._id}>
              <div className="lead-top">
                <h2>{lead.name}</h2>
                <span>{lead.status || "new"}</span>
              </div>

              <p><strong>Email:</strong> {lead.email}</p>
              {lead.company && <p><strong>Company:</strong> {lead.company}</p>}
              <p><strong>Service:</strong> {lead.service}</p>
              <p className="lead-message">{lead.message}</p>
              <p className="lead-date">
                {new Date(lead.createdAt).toLocaleString()}
              </p>

              <div className="lead-actions">
                <label>
                  Status
                  <select
                    value={lead.status || "new"}
                    onChange={(event) =>
                      updateStatus(lead._id, event.target.value)
                    }
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </label>

                <button
                  className="delete-button"
                  onClick={() => deleteLead(lead._id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
