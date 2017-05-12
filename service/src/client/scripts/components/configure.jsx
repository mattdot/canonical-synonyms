import React from 'react';
import { Button, Breadcrumb, Panel, ListGroup, ListGroupItem, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';

//import 'react-tagsinput/react-tagsinput.css';

export class Configure extends React.Component {
    synonymsChanged() {
        console.log(arguments);
    }

    render() {
        return (
            <div>
                <Panel header="LUIS">
                    <FormGroup>
                        <ControlLabel>LUIS URI</ControlLabel>
                        <FormControl componentClass="text"></FormControl>
                    </FormGroup>
                </Panel>
                <Panel header="Azure Storage Account">
                    <FormGroup>
                        <ControlLabel>Storage Account</ControlLabel>
                        <FormControl componentClass="text"></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Storage Key</ControlLabel>
                        <FormControl componentClass="text"></FormControl>
                    </FormGroup>
                </Panel>
            </div>
        );
    }
}