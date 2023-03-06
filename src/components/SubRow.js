import React from 'react';
import { TableRow, TableCell, Card } from '@material-ui/core';


const SubRow = () => {

    return (
        
        <TableRow >
        <TableCell colSpan={4}>
        <Card>
            <div>This is a card that drops below the first row on first row click</div>
        </Card>

        </TableCell>
        </TableRow>

    );
};

export default SubRow;