import { v4 as uuid } from 'uuid';
import React from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card, CardContent,
  CardHeader,
  Chip,
  Divider, InputAdornment, SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel, TextField,
  Tooltip
} from '@material-ui/core';
import {Search as SearchIcon} from 'react-feather';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import OffersDataService from '../../services/offer.service';
import Postuled from './Postuled';
import {axiosApiInstance} from "../../interceptors";


export class LatestOffers extends React.Component {
  constructor(props) {
    super(props);
  this.state ={
    offers:[],
    idOffre: ''
  }};
  componentDidMount() {
    OffersDataService.getOffers().then((res) => {
      console.log(res.data)
      this.setState({offers: res.data});
    });
  }
  setIdOffer(id) {
    console.log(id);
    this.setState({ idOffre : ''+id.toString()}, () => {
      console.log(this.state);
    });
   }
  onFileChange = event => {

    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };
  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    const endpoint = "http://localhost:8083/uploadFile";
    axiosApiInstance.post(endpoint, this.state).then(res => {
          alert('upload success');
        },
        error => {
          alert('Authentication failure' + error);
        });
  };
  render(){
 return (
    <Card>
  <CardHeader title="Latest Offers" />
  <Divider />
  <PerfectScrollbar>
    <Box sx={{ minWidth: 800 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Offer Ref
            </TableCell>
            <TableCell>
              Offer Title
            </TableCell>
            <TableCell sortDirection="desc">
              <Tooltip
                  enterDelay={300}
                  title="Sort"
              >
                <TableSortLabel
                    active
                    direction="desc"
                >
                  Date
                </TableSortLabel>
              </Tooltip>
            </TableCell>
            <TableCell>
              Type
            </TableCell>
            <TableCell>
              Location
            </TableCell>
            <TableCell>
              Description
            </TableCell>
            <TableCell>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.offers.map((offer) => (
              <TableRow
                  hover
                  key={offer.id}
              >
                <TableCell>
                  {offer.id}
                </TableCell>
                <TableCell>
                  {offer.title}
                </TableCell>
                <TableCell>
                  welcome
                  {offer.type}
                </TableCell>
                <TableCell>
                  {offer.location}
                </TableCell>
                <TableCell>
                  {offer.competence}
                </TableCell>
                <TableCell>
                  {offer.niveau}
                </TableCell>
                <TableCell>
                  {offer.description}
                </TableCell>
                <TableCell>
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
                            data-target="#ModalPosted"
                            data-toggle="modal"
                            onClick={() => this.setIdOffer(offer.id)}                        >
                          Postuler
                        </Button>
                      </Box>
                    </Box>
                    <div className="modal fade" id="ModalPosted" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Postuler </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className="form">
                              <form onSubmit={this.handleFormSubmit}>
                                <div className="form-group">
                                  <input type="file" onChange={this.onFileChange}/>
                                </div>
                              </form>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button   type="submit"
                                    className="btn btn-warning">Save</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  </PerfectScrollbar>
  <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
  >
    <Button
        color="primary"
        size="small"
        variant="text"
    >
    </Button>
  </Box>
</Card>)}
}

export default LatestOffers;
