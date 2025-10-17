import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Paper, Box, Button, TextField } from "@mui/material";
import * as api from "../api";
import { useAuth } from "../AuthContext";
import { formatDate } from "../utils";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [applyForm, setApplyForm] = useState({ name: "", email: "", resumeLink: "" });

  useEffect(() => {
    setJob(api.getJobById(id));
  }, [id]);

  const submitApply = () => {
    if (!user || user.role !== "applicant") {
      return alert("Log in as an applicant to apply.");
    }
    const applicant = { name: applyForm.name || user.name, email: applyForm.email || user.email, resumeLink: applyForm.resumeLink };
    const res = api.applyToJob({ jobId: id, applicant });
    if (res) {
      alert("Applied successfully");
      setJob(api.getJobById(id));
      setApplyForm({ name: "", email: "", resumeLink: "" });
    } else {
      alert("You have already applied or error occurred.");
    }
  };

  if (!job) return <Container sx={{ mt: 4 }}>Job not found</Container>;

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h5">{job.title}</Typography>
            <Typography variant="subtitle2">{job.company} • {job.location} • {job.role}</Typography>
            <Typography variant="caption">Posted: {formatDate(job.createdAt)}</Typography>
          </Box>
        </Box>

        <Typography sx={{ mt: 2 }}>{job.description}</Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Apply for this internship</Typography>
          <TextField label="Name" fullWidth value={applyForm.name} onChange={(e)=>setApplyForm(s=>({...s, name:e.target.value}))} sx={{ mt:1 }} />
          <TextField label="Email" fullWidth value={applyForm.email} onChange={(e)=>setApplyForm(s=>({...s, email:e.target.value}))} sx={{ mt:1 }} />
          <TextField label="Resume link (optional)" fullWidth value={applyForm.resumeLink} onChange={(e)=>setApplyForm(s=>({...s, resumeLink:e.target.value}))} sx={{ mt:1 }} />
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Button variant="contained" onClick={submitApply}>Submit Application</Button>
            <Button onClick={() => {
              setApplyForm({ name: user?.name || "", email: user?.email || "", resumeLink: "" });
            }}>Fill with my profile</Button>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Applicants ({job.applicants.length})</Typography>
          {job.applicants.length===0 ? <Typography>No applicants yet.</Typography> : job.applicants.map((a, i)=>(
            <Paper key={i} sx={{ p:2, mt:1 }}>
              <Typography><strong>{a.name}</strong> ({a.email})</Typography>
              {a.resumeLink && <Typography>Resume: <a href={a.resumeLink} target="_blank" rel="noreferrer">{a.resumeLink}</a></Typography>}
              <Typography variant="caption">Applied: {formatDate(a.appliedAt)}</Typography>
            </Paper>
          ))}
        </Box>
      </Paper>
    </Container>
  );
}
