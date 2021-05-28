import React from "react";
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import customers from 'src/__mocks__/customers';
import OffersDataService from "../services/offer.service";

export class CustomerList extends React.Component {

  render() {
      return (
      <Box
          sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3
          }}
      >
          <Container maxWidth={false}>
              <CustomerListToolbar />
              <Box sx={{ pt: 3 }}>
                  <CustomerListResults  />
              </Box>
          </Container>
      </Box>
      )
  };
}

export default CustomerList;
