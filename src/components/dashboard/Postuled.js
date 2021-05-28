import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import * as React from 'react';
import axios from "axios";
import OffersDataService from '../../services/offer.service'
import { axiosApiInstance } from '../../interceptors';

class Postuled extends React.Component {

    handleChange = event => {
        console.log(event.target.value)
        this.setState({ [event.target.name]: event.target.value });
    }
    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        const endpoint = "http://localhost:8083/api/offers/";
        axiosApiInstance.post(endpoint, this.state).then(res => {
                alert('postuled success');
            },
            error => {
                alert('Authentication failure' + error);
            });
    };
    deleteOffer(id) {
        OffersDataService.deleteOffer(id).then(res => {
            this.setState({Offer: this.state.Offers.filter(offer => offer.id !== id)});
        });
    }
    componentDidMount() {
        OffersDataService.getOffers().then((res) => {
            console.log(res.data)
            this.setState({Offers: res.data});
        });
    }

    addOffer() {
        // window.location.replace('http://localhost:3000/app/add');
    }

    render() {
        return (
            <React.Fragment>
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            data-target="#exampleModal"
                            data-toggle="modal"
                        >
                            Posuler
                        </Button>
                    </Box>
                    <Box sx={{mt: 3}}>
                        <Card>
                            <CardContent>
                                <Box sx={{maxWidth: 500}}>
                                    <TextField
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SvgIcon
                                                        fontSize="small"
                                                        color="action"
                                                    >
                                                        <SearchIcon/>
                                                    </SvgIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                        placeholder="Search customer"
                                        variant="outlined"
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
                <div className="modal fade" id="ModalPosted" tabIndex="-1" role="dialog"
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
                                            <input
                                                type="submit"
                                                className="btn btn-warning"
                                                value="Add"
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

        );
    }
}

export default Postuled;
