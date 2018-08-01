import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import config from '../../config';
import * as converters from '../../utils/converters';

import { Loader, Table, Icon } from 'semantic-ui-react';
import PaginationBlock from '../../containers/PaginationBlock';
import './AddressTable.scss';

class AddressTable extends PureComponent {    

    render() {

        const {
            header,
            detailsPath,
            isFetching,
            records,
            refreshAction,
            pageSelector,
            totalPagesSelector,
            extraColumnName,
            extraColumnTitle,
            extraColumnFormat
        } = this.props;

        let formatterFunc = val => val;

        if (extraColumnFormat && typeof converters[extraColumnFormat] === 'function') {

            formatterFunc = converters[extraColumnFormat];
        }

        return (
            <div>
                <Loader size="large" active={isFetching} />
                <Table inverted celled selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><Icon name="chevron right" /></Table.HeaderCell>
                            <Table.HeaderCell colSpan={extraColumnTitle ? 2 : 1}>
                                <Link to={detailsPath}><h3>{header}</h3></Link>                                        
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell width={1}>Id</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            {extraColumnTitle &&
                                <Table.HeaderCell>{extraColumnTitle}</Table.HeaderCell>
                            }
                        </Table.Row>                            
                    </Table.Header>
                    <Table.Body>
                        {(!records || records.length === 0) &&
                            <Table.Row>
                                <Table.Cell colSpan={extraColumnTitle ? 2 : 1}>Nothing to display</Table.Cell>
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
                                        }}>{record.address.length > 42 ? record.address.substr(0, 39) + '...' : record.address}</Link>
                                    </Table.Cell>
                                    {extraColumnName &&
                                        <Table.Cell>{formatterFunc(record[extraColumnName])}</Table.Cell>
                                    }
                                </Table.Row>
                            )))                                
                        }
                        {(records && records.length < config.pagination.limit) && 
                            ([...Array(config.pagination.limit - records.length).keys()].map(key => (
                                <Table.Row key={key}>
                                    <Table.Cell>&nbsp;</Table.Cell>
                                    <Table.Cell>&nbsp;</Table.Cell>
                                    {extraColumnTitle &&
                                        <Table.Cell>&nbsp;</Table.Cell>
                                    }
                                </Table.Row>
                            )))
                        }
                        <Table.Row>
                            <Table.Cell colSpan={extraColumnTitle ? 3 : 2}>
                                <PaginationBlock 
                                    refreshAction={refreshAction} 
                                    pageSelector={pageSelector}
                                    totalPagesSelector={totalPagesSelector}
                                    />
                            </Table.Cell>
                        </Table.Row>
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
    refreshAction: PropTypes.string.isRequired,
    pageSelector: PropTypes.string.isRequired,
    totalPagesSelector: PropTypes.string.isRequired,
    extraColumnName: PropTypes.string,
    extraColumnTitle: PropTypes.string,
    extraColumnFormat: PropTypes.string,
    errors: PropTypes.array.isRequired
}

export default withRouter(AddressTable);
