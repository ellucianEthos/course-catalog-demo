import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import muiThemeable from 'material-ui/styles/muiThemeable';
import SearchResults from './SearchResults';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
           showApiKeyDialog: false,
           ethosIsBusy: false,
           busyMessage: "some message",
           searchResults: [],
           selectedAcademicPeriod: "",
           academicPeriods: []
        };

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.searchClick = this.searchClick.bind(this);
    }

    componentDidMount() {
        this.load();
    }

    load() {
        this.setState({ethosIsBusy: true, busyMessage: "Loading..."});

        this.props.ethos.load()
        .then((results) => {
            this.setState({academicPeriods: this.props.ethos.academicPeriods});
        })
        .finally(() => {
            this.setState({ethosIsBusy: false, busyMessage: ""});
        });
    }

    handleSelectChange(event, index, value) {
        this.setState({selectedAcademicPeriod: value});
    }

    searchClick() {

        if (this.state.selectedAcademicPeriod) {
            this.setState({ethosIsBusy: true, busyMessage: "Searching...", searchResults: []});
            this.props.ethos.searchForSections(this.state.selectedAcademicPeriod)
            .then((results) => {
                this.setState({searchResults: results});
            })
            .finally(() => {
                this.setState({ethosIsBusy: false, busyMessage: ""});
            });

        } else {
            console.log("no academic period selected");
        }

    }

    render() {
        const searchButtonStyle = {
            marginLeft: 50,
        };

        const searchDivStyle = {
            marginTop: 5,
            marginLeft: 50
        };

        const noResultsStyle = {
            marginLeft: 50,
            fontFamily: this.props.muiTheme.fontFamily,
            color: this.props.muiTheme.palette.textColor
        }

        const busyStyle = {
            marginLeft: 50,
            fontFamily: this.props.muiTheme.fontFamily,
            color: this.props.muiTheme.palette.accent1Color
        }

        const academicPeriodItems = this.state.academicPeriods.map((ap) => {
            return <MenuItem value={ap.id} key={ap.id} primaryText={ap.title} />
        });

        return (
            <div>
                <AppBar title="Course Catalog Demo Application" showMenuIconButton={false}/>

                <br/>

                <div style={searchDivStyle}>
                    <SelectField
                        floatingLabelText="Academic Period"
                        value={this.state.selectedAcademicPeriod}
                        onChange={this.handleSelectChange}
                        autoWidth={true}
                        >
                        {academicPeriodItems}
                    </SelectField>
                    <RaisedButton label="Search" primary={true} style={searchButtonStyle} onClick={this.searchClick} disabled={this.state.ethosIsBusy}/>
                </div>

                <br/>

            {this.state.ethosIsBusy &&
                <div>
                <br/>
                <br/>
                <LinearProgress mode="indeterminate" color={this.props.muiTheme.palette.accent1Color} />
                <h1 style={busyStyle}>{this.state.busyMessage}</h1>
                </div>
            }

            {this.state.searchResults && this.state.searchResults.length > 0 &&
                <div className="container">
                   <div className="row">
                        <div className="one column"></div>
                        <div className="ten columns">
                            <SearchResults data={this.state.searchResults}/>
                        </div>
                         <div className="one column"></div>
                   </div>
                 </div>
            }

            {this.state.searchResults && this.state.searchResults.length === 0 && !this.state.ethosIsBusy &&
                <div style={noResultsStyle}>
                <br/>
                    <h1>No search results</h1>
                </div>
            }

      </div>
    );
  }
}

export default muiThemeable()(Main);
