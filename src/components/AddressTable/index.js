import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { Loader, Table, Icon } from 'semantic-ui-react';
import './AddressTable.scss';

class AddressTable extends PureComponent {    

    render() {

        const {
            header,
            detailsPath,
            isFetching,
            records, 
            errors
        } = this.props;

        return (
            <div>
                <Loader size="large" active={isFetching} />
                <Table inverted celled selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><Icon name="chevron right" /></Table.HeaderCell>
                            <Table.HeaderCell>
                                <Link to={detailsPath}><h3>{header}</h3></Link>                                        
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell width={1}>Id</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                        </Table.Row>                            
                    </Table.Header>
                    <Table.Body>
                        {(!records || records.length === 0) &&
                            <Table.Row>
                                <Table.Cell colSpan="2">Nothing to display</Table.Cell>
                            </Table.Row>
                        }
                        {(records && records.length > 0) &&
                            (records.map(record => (
                                <Table.Row key={record.address}>
                                    <Table.Cell>{record.id}</Table.Cell>
                                    <Table.Cell title={record.address} className="pn-text-ellipsis">
                                        <Link to={{
                                            pathname: `${detailsPath}/${record.address}`,
                                            state: {
                                                prevPath: this.props.location.pathname
                                            } 
                                        }}>{record.address}</Link>
                                    </Table.Cell>
                                </Table.Row>
                            )))                                
                        }
                    </Table.Body>
                </Table>               
            </div>
        )
    }
}

AddressTable.propTypes = {
    header: PropTypes.string.isRequired,
    detailsPath: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    records: PropTypes.array.isRequired,
    errors: PropTypes.array.isRequired
}

export default withRouter(AddressTable);
