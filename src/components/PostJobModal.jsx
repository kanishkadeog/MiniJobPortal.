import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

export default function PostJobModal({ open, onClose, onPost }) {
  const [form, setForm] = useState({ title: "", company: "", location: "", role: "", description: "" });

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = () => {
    if (!form.title || !form.company) return alert("Title and company required");
    onPost(form);
    setForm({ title: "", company: "", location: "", role: "", description: "" });
  };

  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 520,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={boxStyle}>
        <Typography variant="h6" sx={{ mb: 2 }}>Post Internship</Typography>
        <TextField label="Job Title" name="title" fullWidth value={form.title} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField label="Company" name="company" fullWidth value={form.company} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField label="Location" name="location" fullWidth value={form.location} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField label="Role" name="role" fullWidth value={form.role} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField label="Description" name="description" fullWidth multiline rows={3} value={form.description} onChange={handleChange} sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={submit}>Post</Button>
        </Box>
      </Box>
    </Modal>
  );
}
