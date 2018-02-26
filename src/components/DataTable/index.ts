import * as React from 'react';



interface Props {

}

interface States {

}

class DataTable extends React.Component<Props, object> {
    render() {
        const { data: { list, pagination }, loading } = this.props;
        const { selectedRowKeys } = this.state;


    }
}

export default DataTable;