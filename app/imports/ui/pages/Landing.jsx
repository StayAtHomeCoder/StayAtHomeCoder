import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';

/** Renders the Landing page. Snazzy. */
class Landing extends React.Component {
    render() {
        return (
            <Grid centered stackable={true} textAlign='center'>
                <Grid.Column textAlign='center' width={8}>
                    <Image size='huge' circular src=''/>
                    <div className='backdrop'>
                        <Header as='h1' inverted>UH Occupancy Application</Header>
                    </div>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Landing;
