import React, { useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const res = login(form.email, form.password);
    if (res.ok) navigate("/");
    else alert("Invalid credentials");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <Paper sx={{ width: 420, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Login</Typography>
        <form onSubmit={submit}>
          <TextField label="Email" name="email" fullWidth value={form.email} onChange={onChange} sx={{ mb: 2 }} />
          <TextField label="Password" name="password" type="password" fullWidth value={form.password} onChange={onChange} sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="submit" variant="contained">Login</Button>
            <Button component={Link} to="/register">Register</Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
