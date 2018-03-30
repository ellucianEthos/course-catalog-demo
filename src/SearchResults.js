import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ActionBook from 'material-ui/svg-icons/action/book';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import ActionDescription from 'material-ui/svg-icons/action/description';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import MapsPlace from 'material-ui/svg-icons/maps/place';

class SearchResults extends Component {

    render() {
        const iconColor = this.props.muiTheme.palette.accent1Color;

        const listItems = this.props.data.map( (d) => {
                return <ListItem key={d.id} leftIcon={<ActionBook />} primaryText={d.title} secondaryText={d.subject}
                    initiallyOpen={false}
                    nestedItems={[
                        <ListItem key={0} leftIcon={<ActionDescription color={iconColor}/>} primaryText={d.courseTitle} secondaryText={d.courseDesc} secondaryTextLines={2} />,
                        <ListItem key={1} leftIcon={<ActionSchedule color={iconColor}/>} primaryText={d.schedule} secondaryText={d.dates} />,
                        <ListItem key={2} leftIcon={<MapsPlace color={iconColor}/>} primaryText={d.location} secondaryText={d.site} />,
                        <ListItem key={3} leftIcon={<ActionAssessment color={iconColor}/>} primaryText={d.creditDesc} />
                    ]}
                />
            });

        return (
            <div>
                <List>
                    {listItems}
                </List>
           </div>
        );
    }
}

export default muiThemeable()(SearchResults);
