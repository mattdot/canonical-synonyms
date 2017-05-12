import React from 'react';
import { Button, Breadcrumb, Panel, ListGroup, ListGroupItem, FormControl, ControlLabel, FormGroup, ModalDialog, Table } from 'react-bootstrap';
import TagsInput from 'react-tagsinput';
import { connect } from 'react-redux';
import { addTerm } from '../actions/index';
import BrowseRow from './browserow.jsx';

//import 'react-tagsinput/react-tagsinput.css';

const getCanonicalRoots = (canonicals, entity) => {
    return canonicals;
};

const mapStateToProps = (state) => {
    return {
        canonicals: getCanonicalRoots(state.canonicals),
        mfg: true
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTermsChanged : (entity, canonical, term) => {
            dispatch(addTerm(entity, canonical, term));
        } 
    };
};



class Browse extends React.Component {
    synonymsChanged() {
        console.log(arguments);
    }

    render() {
        return (
            <div>
                <Panel header="Canonical Roots">
                    <Table>
                        <thead>
                            <tr><th>Entity</th><th>Canonical Root</th><th>Synonyms</th></tr>
                        </thead>
                        <tbody>
                            {
                                this.props.canonicals.map((can, index, arr) => {
                                    return (<BrowseRow key={`${can.entity}\$${can.canonical}`} entity={can.entity} canonical={can.canonical} synonyms={can.synonyms} />);
                                })
                            }
                        </tbody>
                    </Table>
                </Panel>
                {/*<ModalDialog>
                                    <Panel header="New Canonical Root">
                    <FormGroup>
                        <ControlLabel>Canonical Form</ControlLabel>
                        <FormControl componentClass="text"></FormControl>
                        </FormGroup>
                    <ControlLabel formTarget="entity">Entity</ControlLabel>
                    <FormControl id="entity" componentClass="select" placeholder="choose an entity...">
                        <option value="1">status</option>
                        <option value="2">specific</option>
                    </FormControl>
                    <FormGroup>
                        <TagsInput onChange={this.synonymsChanged.bind(this)} value={ ["yo"] }/>
                    </FormGroup>
                </Panel>
                </ModalDialog>*/}
            </div>
        );    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Browse);