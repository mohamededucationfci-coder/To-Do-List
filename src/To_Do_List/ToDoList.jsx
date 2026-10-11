// Components
import Head from "./Head";
import Statistics from "./Statistics";
import Input from "./Input";
import ToDos from "./ToDos";

// Mui
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

//Hook

export default function ToDoList() {
  return (
    <>
      <Container maxWidth="md">
        <Grid container sx={{ rowGap: { xs: "16px", md: "20px" } }}>
          <Grid size={12}>
            <Head />
          </Grid>
          <Grid size={12}>
            <Input />
          </Grid>
          <Grid size={12}>
            <Statistics />
          </Grid>
          <Grid size={12}>
            <ToDos />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
