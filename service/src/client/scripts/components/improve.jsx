import React from 'react';
import { Button, Panel, ListGroup, ListGroupItem, Table  } from 'react-bootstrap';

export class Improve extends React.Component {

    render() {
        return (
            <Panel header="Misses">
                <Table>
                    <thead>
                        <th><td>Entity</td><td>Term</td></th>
                    </thead>
                </Table>
            </Panel>
        );
    }
}