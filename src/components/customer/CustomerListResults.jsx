import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box, Button,
  Card, CardContent,
  Checkbox, InputAdornment, SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow, TextField,
  Typography
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import {Search as SearchIcon} from "react-feather";
import OffersDataService from '../../services/offer.service';
import {axiosApiInstance} from "../../interceptors";



export class CustomerListResults extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    offers:[],
    idSelectedOffer : '',
    selectedCustomerIds : [],
    setSelectedCustomerIds :[],
    limit : 10,
    setLimit: 10,
    page : 0,
    setPage :0
  }
  this.UpdateOffer = this.UpdateOffer.bind(this)
  this.remove = this.remove.bind(this);
  OffersDataService.getOffers().then((res) => {
    console.log(res.data)
    this.setState({ ['offers']: res.data });
  });
}
  componentDidMount() {
    fetch('/api/offers/DeleteOffer')
        .then(response => response.json())
        .then(data => this.setState({offers: data}));
  }
  async remove(id, event) {
    console.log(this.state);
    const endpoint = "http://localhost:8083/api/offers/DeleteOffer/${id}"
      OffersDataService.deleteOffer(id).then(res => {
        this.setState({Offer: this.state.offers.filter(offer => offer.id !== id)});
    })
}
UpdateOffer(id) {
  console.log(id);
  this.setState({ idSelectedOffer : id}, () => {
    console.log(this.state);
    const selectedOffer = this.state.offers.filter(offer => offer.id === this.state.idSelectedOffer);
    this.setState(
        {
          id: id,
           location: selectedOffer[0].location,
           type: selectedOffer[0].type,
           niveau: selectedOffer[0].niveau,
           competence: selectedOffer[0].competence,
           description: selectedOffer[0].description,
           title: selectedOffer[0].title,
    }
    )
    console.log(selectedOffer);
  });}
  handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = this.state.offers.map((offer) => offer.id);
    } else {
      newSelectedCustomerIds = [];
    }
    this.setState({ ['setSelectedCustomerIds']: newSelectedCustomerIds });
  };
  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    const endpoint = "http://localhost:8083/api/offers/UpdateOffer";
    axiosApiInstance.post(endpoint, this.state).then(res => {
          alert('add success');
        },
        error => {
          alert('Authentication failure' + error);
        });
  };
  handleSelectOne = (event, id) => {
    const selectedIndex = this.state.selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(this.state.selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(this.state.selectedCustomerIds.slice(1));
    } else if (selectedIndex === this.state.selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(this.state.selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
          this.state.selectedCustomerIds.slice(0, selectedIndex),
          this.state.selectedCustomerIds.slice(selectedIndex + 1)
      );
    }
    this.setState({ ['setSelectedCustomerIds']: newSelectedCustomerIds});

  };
  handleLimitChange = (event) => {
    this.setState({ ['setLimit']: event.target.value });

  };

  handlePageChange = (event, newPage) => {
    this.setState({ ['setPage']: newPage });
  };
render(){
  return (
    <Card >
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={this.state.selectedCustomerIds.length === this.state.offers.length}
                    color="primary"
                    indeterminate={
                      this.state.selectedCustomerIds.length > 0
                      && this.state.selectedCustomerIds.length < this.state.offers.length
                    }
                    onChange={this.handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Type
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Skills
                </TableCell>
                <TableCell>
                  Descrpition
                </TableCell>
                <TableCell>
                  Update
                </TableCell>
                <TableCell>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.offers.slice(0, this.state.limit).map((offer) => (
                <TableRow
                  hover
                  key={offer.id}
                  selected={this.state.selectedCustomerIds.indexOf(offer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={this.state.selectedCustomerIds.indexOf(offer.id) !== -1}
                      onChange={(event) => this.handleSelectOne(event, offer.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {offer.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {offer.type}
                  </TableCell>
                  <TableCell>
                    {offer.location}
                  </TableCell>
                  <TableCell>
                    {offer.competence}
                  </TableCell>
                  <TableCell>
                    {offer.description}
                  </TableCell>
                  <TableCell>
                    <React.Fragment>
                      <Box>
                          <Button
                              color="primary"
                              variant="contained"
                              data-target="#exampleModal"
                              data-toggle="modal"
                              title="Update"
                              onClick={() => this.UpdateOffer(offer.id)}
                          >
                            Edit Offer
                          </Button>
                      </Box>
                      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                           aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Content Update</h5>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <div className="form">
                                <form onSubmit={this.handleFormSubmit}>
                                  <div className="form-group">
                                    <label>Title</label>
                                    <select value={this.state.title}
                                            name="title"
                                            className="form-control"
                                            onChange={this.handleChange} >
                                      <option value="">Select Title</option>
                                      <option value="SalesRepresentative">Sales Representative</option>
                                      <option value="SoftwareDeveloper">Software Developer</option>
                                      <option value="FinancialAnalyst">Financial Analyst</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label>Job Type</label>
                                    <select
                                        value={this.state.type}
                                        name="type"
                                        className="form-control"
                                        onChange={this.handleChange}>
                                      <option value="">Select Type</option>
                                      <option value="full_time">Full Time</option>
                                      <option value="part_time">PartTime</option>
                                      <option value="contract">contract</option>
                                      <option value="voluntary">voluntary</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label>Skills</label>
                                    <select
                                        value={this.state.competence}
                                        name="competence"
                                        className="form-control"
                                        onChange={this.handleChange}>
                                      <option value="">Select Skills</option>
                                      <option value="software">Software</option>
                                      <option value="Finance">Finance</option>
                                      <option value="Stock_Market">Stock Market</option>
                                      <option value="Salesforce">Salesforce</option>
                                      <option value="SEO">SEO</option>
                                      <option value="Growth_Hacking">Growth Hacking</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label>Seniority Level</label>
                                    <select
                                        value={this.state.niveau}
                                        name="niveau"
                                        className="form-control"
                                        onChange={this.handleChange}>
                                      <option value="">Select Level</option>
                                      <option value="Junior">Junior</option>
                                      <option value="Senior">Senior</option>
                                      <option value="Entry">Entry</option>
                                      <option value="Associate">Associate</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label>Location</label>
                                    <select
                                        value={this.state.location}
                                        name="location"
                                        className="form-control"
                                        onChange={this.handleChange}>
                                      <option value="">Select Location</option>
                                      <option value="United_States">United States</option>
                                      <option value="Île_de_France">Île de France</option>
                                      <option value="São_Paulo">São Paulo</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        value={this.state.description}
                                        name="description"
                                        className="form-control"
                                        onChange={this.handleChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <Button
                                        type="submit"
                                        className="btn btn-warning"
                                        value="Update"
                                    />
                                  </div>
                                </form>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  </TableCell>
                  <TableCell>
                    <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip"
                            data-placement="top" onClick={() => this.remove(offer.id)} title="Delete"><i className="fa fa-trash"></i>
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={this.state.offers.length}
        onPageChange={this.handlePageChange}
        onRowsPerPageChange={this.handleLimitChange}
        page={this.state.page}
        rowsPerPage={this.state.limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );}
};

CustomerListResults.propTypes = {
  offers: PropTypes.array.isRequired
};

export default CustomerListResults;
