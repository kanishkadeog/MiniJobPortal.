import React, { useEffect, useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import * as api from "../api";
import { useAuth } from "../AuthContext";

export default function ApplicantDashboard() {
  const { user } = useAuth();
  const [myApplications, setMyApplications] = useState([]);

  useEffect(() => {
    // find jobs where user has applied
    const jobs = api.getJobs();
    const apps = [];
    jobs.forEach(job => {
      job.applicants.forEach(a => {
        if (a.email === user.email) {
          apps.push({ jobTitle: job.title, company: job.company, appliedAt: a.appliedAt });
        }
      });
    });
    setMyApplications(apps);
  }, [user]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Applicant Dashboard</Typography>
      <Paper sx={{ p:2, mt:2 }}>
        <Typography variant="h6">My Applications</Typography>
        {myApplications.length === 0 ? <Typography>No applications yet.</Typography> : myApplications.map((a, idx)=>(
          <Paper key={idx} sx={{ p: 1, mt: 1 }}>
            <Typography><strong>{a.jobTitle}</strong> — {a.company}</Typography>
            <Typography variant="caption">Applied: {new Date(a.appliedAt).toLocaleString()}</Typography>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
