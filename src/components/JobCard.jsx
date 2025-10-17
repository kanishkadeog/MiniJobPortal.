import React from "react";
import { Card, CardContent, Typography, CardActions, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { formatDate } from "../utils";

export default function JobCard({ job }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6">{job.title}</Typography>
            <Typography variant="subtitle2">{job.company} • {job.location} • {job.role}</Typography>
          </Box>
          <Typography variant="caption">{formatDate(job.createdAt)}</Typography>
        </Box>
        <Typography sx={{ mt: 1 }} noWrap>{job.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/job/${job.id}`}>View</Button>
      </CardActions>
    </Card>
  );
}
