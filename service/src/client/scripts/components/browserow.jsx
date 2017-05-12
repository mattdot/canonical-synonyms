import React from 'react';
import { Button, Table } from 'react-bootstrap';
import TagsInput from 'react-tagsinput';
import { connect } from 'react-redux';
import { addSynonym } from '../actions/index';

const mapStateToProps = (state, ownProps) => {
    console.log("mapStateToProps", state, ownProps);
    return state.canonicals.filter(val => val.entity === ownProps.entity && val.canonical === ownProps.canonical)[0];
};

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log("mapDispatchToProps", ownProps);
    return {
        onSynonymsChanged : (synonyms, added) => {
            added.forEach((a) => dispatch(addSynonym(ownProps.entity, ownProps.canonical, a)));
        }
    };
};

const BrowseRow = ({entity, canonical, synonyms, onSynonymsChanged}) => (
    <tr><td>{ entity }</td><td>{ canonical }</td><td>{ <TagsInput onChange={ onSynonymsChanged } value={ synonyms }/> }</td></tr>
);

BrowseRow.propTypes = {
    entity : React.PropTypes.string.isRequired,
    canonical : React.PropTypes.string.isRequired,
    synonyms : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onSynonymsChanged : React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseRow);