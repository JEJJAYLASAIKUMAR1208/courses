import { useState } from "react";
import api from "../api/axios";

export default function Login({ setPage }) { // ✅ receive setPage
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            alert("Login successful");

            // ✅ Switch to dashboard page
            setPage("courses");
        } catch {
            alert("Invalid credentials");
        }
    };

    return (
        <form className="card" onSubmit={submit}>
            <h3>Login</h3>

            <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
            />

            <button type="submit">Login</button>
        </form>
    );
}
