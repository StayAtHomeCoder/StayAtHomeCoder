import React from 'react';
import { Grid, Loader, Image, Segment, Button } from 'semantic-ui-react';
import {DateField, SelectField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';

/** Renders the Page for editing a single document. */
class EditStuff extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, quantity, condition, _id } = data;
    Stuffs.collection.update(_id, { $set: { name, quantity, condition } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container>
          <Grid.Column width={8}>
            <Image src=""
                   floated='left' size='huge' alt="filler placement for eventual map"/>
          </Grid.Column>
            <Grid container width={8}>
            <h1>Filters</h1>
            <Segment>
                  <SelectField name='Building'/>
                  <DateField name='Date'/>
                  <TextField name='Threshold' decimal={false}/>
                  // Will use DateInput
            </Segment>
            <Segment>
                  <h1>Violations</h1>
                  <p>Top Three: </p>
             </Segment>
             <Segment>
                  <h1>Map View</h1>
                 <Button color='green'>Buildings</Button>
                 <Button color='green'>Floors</Button>
                 <Button color='green'>Dorms</Button>
             </Segment>
            </Grid>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditStuff.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  return {
    doc: Stuffs.collection.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditStuff);
