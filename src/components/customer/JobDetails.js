import React from 'react';
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
import OffersDataService from '../../services/offer.service';

export default class JobDetails extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeLevel = this.onChangeLevel.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveOffer = this.saveOffer.bind(this);
        this.newOffer = this.newOffer.bind(this);


        this.state = {
            id: null,
            title: '',
            description: '',
            published: false,
            type: '',
            skills: '',
            level: '',
            location: '',
            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }

    onChangeSkills() {
        this.setState({
            skills: event.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeLevel(e) {
        this.setState({
            level: e.target.value
        });
    }
    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        });
    }

    saveOffer() {
        const data = {
            title: this.state.title,
            description: this.state.description
        };
        OffersDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    published: response.data.published,
                    type: response.data.type,
                    skills: response.data.skills,
                    level: response.data.level,
                    location: response.data.location,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newOffer() {
        this.setState({
            id: null,
            title: '',
            description: '',
            published: false,
            type: '',
            skills: '',
            level: '',
            location: '',
            submitted: false
        });
    }

    render() {
        return (
            <form
                autoComplete="off"
                noValidate
            >
                <Card>
                    <CardHeader
                        subheader="The information can be edited"
                        title="Add Offers"
                    />
                    <Divider />
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
                                    helperText="Please specify the Title of the Job"
                                    label="Title"
                                    name="Title"
                                    onChange={this.onChangeTitle}
                                    required
                                    value={this.state.Title}
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
                                    label="Location"
                                    name="location"
                                    onChange={this.onChangeLocation}
                                    required
                                    value={this.state.location}
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
                                    label="Skills"
                                    name="Skills"
                                    onChange={this.onChangeSkills()}
                                    required
                                    value={this.state.skills}
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
                                    label="Seniority Level"
                                    name="level"
                                    onChange={this.onChangeLevel}
                                    required
                                    value={this.state.level}
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
                                    label="TYPE"
                                    name="type"
                                    onChange={this.onChangeType()}
                                    required
                                    value={this.state.type}
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
                                    label="Description"
                                    name="description"
                                    onChange={this.onChangeDescription}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={this.state.description}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                        }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.saveOffer}
                        >
                            Save details
                        </Button>
                    </Box>
                </Card>
            </form>
        );
    }
}
