import React, { useState } from "react";
import { Box, TextField, Button, Paper, Typography, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "applicant" });

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const res = register(form);
    if (res.ok) navigate("/");
    else alert("User exists or invalid data");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <Paper sx={{ width: 500, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Register</Typography>
        <form onSubmit={submit}>
          <TextField label="Full name" name="name" fullWidth value={form.name} onChange={onChange} sx={{ mb: 2 }} />
          <TextField label="Email" name="email" fullWidth value={form.email} onChange={onChange} sx={{ mb: 2 }} />
          <TextField label="Password" name="password" type="password" fullWidth value={form.password} onChange={onChange} sx={{ mb: 2 }} />
          <TextField select label="Role" name="role" value={form.role} onChange={onChange} sx={{ mb: 2 }}>
            <MenuItem value="applicant">Applicant</MenuItem>
            <MenuItem value="employer">Employer</MenuItem>
          </TextField>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="submit" variant="contained">Register</Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
