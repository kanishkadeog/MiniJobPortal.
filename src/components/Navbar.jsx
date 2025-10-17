import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  const styles = {
    link: { color: "inherit", textDecoration: "none", marginRight: 12 },
    container: { marginBottom: 24 },
  };

  return (
    <Box sx={styles.container}>
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component={Link} to="/" sx={{ color: "inherit", textDecoration: "none", fontWeight: 600 }}>
              Mini Job Board
            </Typography>
            <Typography component={Link} to="/" sx={styles.link}>
              <small>Browse internships</small>
            </Typography>
          </Box>
          <Box>
            {user ? (
              <>
                <Button color="inherit" component={Link} to={user.role === "employer" ? "/employer" : "/applicant"}>
                  Dashboard
                </Button>
                <Button color="inherit" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
