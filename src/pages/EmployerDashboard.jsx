import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Paper } from "@mui/material";
import PostJobModal from "../components/PostJobModal";
import * as api from "../api";
import { useAuth } from "../AuthContext";
import { formatDate } from "../utils";

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);

  const load = () => {
    setJobs(api.getJobsByEmployer(user.id));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  const onPost = (data) => {
    api.postJob({ ...data, employerId: user.id });
    setOpen(false);
    load();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Employer Dashboard</Typography>
        <Button variant="contained" onClick={()=>setOpen(true)}>Post Internship</Button>
      </Box>

      <PostJobModal open={open} onClose={()=>setOpen(false)} onPost={onPost} />

      <Box>
        {jobs.length===0 ? <Typography>No postings yet.</Typography> : jobs.map(job => (
          <Paper key={job.id} sx={{ p:2, mb:2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography variant="h6">{job.title}</Typography>
                <Typography variant="subtitle2">{job.company} • {job.location} • {job.role}</Typography>
                <Typography variant="caption">Posted: {formatDate(job.createdAt)}</Typography>
              </div>
              <div>
                <Typography>Applicants: {job.applicants.length}</Typography>
              </div>
            </Box>

            <Box sx={{ mt:2 }}>
              <Typography variant="subtitle1">Applicants</Typography>
              {job.applicants.length===0 ? <Typography>No applicants yet</Typography> : job.applicants.map((a, idx)=>(
                <Paper key={idx} sx={{ p:2, mt:1 }}>
                  <Typography><strong>{a.name}</strong> — {a.email}</Typography>
                  {a.resumeLink && <Typography>Resume: <a href={a.resumeLink} target="_blank" rel="noreferrer">{a.resumeLink}</a></Typography>}
                  <Typography variant="caption">Applied: {formatDate(a.appliedAt)}</Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}
