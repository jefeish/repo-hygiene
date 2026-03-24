
import React from 'react';
import { DataTable, DataTableProps, Table } from '@primer/react/drafts'

const MyTable = ({ data }) => {
    return (
        <div>
        <Table.Title as="h2" id="repositories">
        Repositories
      </Table.Title>
      <Table.Subtitle as="p" id="repositories-subtitle">
        A subtitle could appear here to give extra context to the data.
      </Table.Subtitle>
            <DataTable aria-labelledby="repositories" aria-describedby="repositories-subtitle" data={data} columns={[{
                header: 'Repository',
                field: 'name',
                rowHeader: true
            }, {
                header: 'Type',
                field: 'type',
                renderCell: row => {
                    return {}
                }
            }, {
                header: 'Updated',
                field: 'updatedAt',
                renderCell: row => {
                    return {}
                }
            }, {
                header: 'Dependabot',
                field: 'securityFeatures.dependabot',
                renderCell: row => {
                    return {}
                }
            }, {
                header: 'Code scanning',
                field: 'securityFeatures.codeScanning',
                renderCell: row => {
                    return {}
                }
            }
            ]} />
            </div>
    )
}
export default MyTable;
