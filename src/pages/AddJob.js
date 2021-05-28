import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import JobDetails from '../components/customer/JobDetails'

const AddJob = () => (
  <>
    <Helmet>
      <title>   Job </title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <JobDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default AddJob;
