import React, { useEffect, useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import JobCard from "../components/JobCard";
import * as api from "../api";
import { useAuth } from "../AuthContext";

export default function JobList() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ role: "", location: "", search: "" });

  const load = () => {
    const result = api.getJobs({ filterRole: filters.role, filterLocation: filters.location, search: filters.search });
    setJobs(result);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  const applyFilters = () => {
    load();
  };

  const clearFilters = () => {
    setFilters({ role: "", location: "", search: "" });
    setJobs(api.getJobs({}));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">Internship Openings</Typography>
        {user && user.role === "employer" && (
          <Button variant="contained" onClick={() => (window.location.href = "/employer")}>
            Go to Employer Dashboard
          </Button>
        )}
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField label="Role filter" value={filters.role} onChange={(e)=>setFilters(s=>({...s, role:e.target.value}))} />
        <TextField label="Location filter" value={filters.location} onChange={(e)=>setFilters(s=>({...s, location:e.target.value}))} />
        <TextField label="Search" value={filters.search} onChange={(e)=>setFilters(s=>({...s, search:e.target.value}))} />
        <Button variant="contained" onClick={applyFilters}>Apply</Button>
        <Button onClick={clearFilters}>Clear</Button>
      </Box>

      <Box>
        {jobs.length===0 ? <Typography>No internships found.</Typography> : jobs.map(job => <JobCard key={job.id} job={job} />)}
      </Box>
    </Container>
  );
}
