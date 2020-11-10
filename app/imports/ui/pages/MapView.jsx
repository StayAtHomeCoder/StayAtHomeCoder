import React from 'react';
import { Grid, Button, Image, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
    name: String,
    quantity: Number,
    condition: {
        type: String,
        allowedValues: ['excellent', 'good', 'fair', 'poor'],
        defaultValue: 'good',
    },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class MapView extends React.Component {

    /** On submit, insert the data. */
    submit(data, formRef) {
        const { name, quantity, condition } = data;
        const owner = Meteor.user().username;
        Stuffs.collection.insert({ name, quantity, condition, owner },
            (error) => {
                if (error) {
                    swal('Error', error.message, 'error');
                } else {
                    swal('Success', 'Item added successfully', 'success');
                    formRef.reset();
                }
            });
    }

    /** IMAGES AS TEMP PLACEHOLDERS FOR MAPS */
    render() {
        return (
            <Grid container width={16}>
                <Grid.Column width={8}>
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/2/27/Wkipedia_blank_world_map.jpg"
                           floated='left' size='massive' alt="filler placement for eventual map"/>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Grid.Column>
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/2/27/Wkipedia_blank_world_map.jpg"
                               floated='right' size='medium' alt="filler placement for eventual map"/>
                    </Grid.Column>
                    <Grid.Column stretched className='history'>
                        <h2>History</h2>
                        <Button size='large' color='green'>Day</Button>
                        <Button size='large' color='green'> Week </Button>
                        <Button size='large' color='green'>Month</Button>
                    </Grid.Column>
                </Grid.Column>
                <Grid container width={16}>
                    <Grid.Column floated='left' width={5}>
                        <div className='violations'>
                            <h2>Filters</h2>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Building Name' placeholder='Building' />
                                    <Form.Input fluid label='Date' placeholder='Enter Date' start='1' end='12'/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Threshold' placeholder='Threshold' />
                                    <Form.Input fluid label='Time Period' placeholder='Enter Times' />
                                </Form.Group>
                            </Form>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <div className='violations'>
                            <h2>Violations</h2>
                            <p>Top Three: </p>
                        </div>
                    </Grid.Column>
                    <Grid.Column right width={6}>
                        <div className='map-view'>
                            <h2>Map View</h2>
                            <Button size='large' color='green'>Buildings</Button>
                            <Button size='large' color='green'>Floors</Button>
                            <Button size='large' color='green'>Dorms</Button>
                            <div className='map-stack'>
                                <Button size='large' color='green'>Libraries</Button>
                                <Button size='large' color='green'> Study </Button>
                                <Button size='large' color='green'>Eateries</Button>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid>
            </Grid>
        );
    }
}

export default MapView;
