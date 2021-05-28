import  React  from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

export class AccountProfileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.firstname = '',
    this.lastName= '',
    this.email= '',
    this.phone= '',
    this.state= '',
    this.country= '',
    this.selectedFile= null
  }
  onFileChange = event => {

    // Update the state
    this.setState({ selectedFile: event.target.files[0] });

  };
  onFileUpload = () => {

  // Create an object of formData
  const formData = new FormData();

  // Update the formData object
  formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
  );

  // Details of the uploaded file
  console.log(this.state.selectedFile);

  // Request made to the backend api
  // Send formData object
  axios.post("api/uploadfile", formData);
};
  handleChange = (event) => {
      event.target.name = event.target.value
    };
  lastModifiedDate=new Date();
render() {
  return (
      <form
          autoComplete="off"
          noValidate
      >
        <Card>
          <CardHeader
              subheader="The information can be edited"
              title="Profile"
          />
          <Divider/>
          <CardContent>
            <Grid
                container
                spacing={3}
            >
              <Grid
                  item
                  md={6}
                  xs={12}
              >
                <TextField
                    fullWidth
                    helperText="Please specify the first name"
                    label="First name"
                    name="firstName"
                    onChange={this.handleChange}
                    required
                    value={this.state.fullName}
                    variant="outlined"
                />
              </Grid>
              <Grid
                  item
                  md={6}
                  xs={12}
              >
                <TextField
                    fullWidth
                    label="Last name"
                    name="lastName"
                    onChange={this.handleChange}
                    required
                    value={this.state.lastName}
                    variant="outlined"
                />
              </Grid>
              <Grid
                  item
                  md={6}
                  xs={12}
              >
                <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    onChange={this.handleChange}
                    required
                    value={this.state.email}
                    variant="outlined"
                />
              </Grid>
              <Grid
                  item
                  md={6}
                  xs={12}
              >
                <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    onChange={this.handleChange}
                    type="number"
                    value={this.state.phone}
                    variant="outlined"
                />
              </Grid>
              <Grid
                  item
                  md={6}
                  xs={12}
              >
                <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    onChange={this.handleChange}
                    required
                    value={this.state.country}
                    variant="outlined"
                />
              </Grid>
              <Grid
                  item
                  md={6}
                  xs={12}
              >
                <TextField
                    fullWidth
                    label="Select State"
                    name="state"
                    onChange={this.handleChange}
                    required
                    select
                    SelectProps={{native: true}}
                    value={this.state.state}
                    variant="outlined"
                >
                  {states.map((option) => (
                      <option
                          key={option.value}
                          value={option.value}
                      >
                        {option.label}
                      </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider/>
          <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
          >
            <input type="file" onChange={this.onFileChange}/>
            <Button
                color="primary"
                variant="contained"
            >
              Save details
            </Button>
          </Box>
        </Card>
      </form>
  );
}
}
export default AccountProfileDetails;