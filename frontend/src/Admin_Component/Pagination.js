import React,{useState} from 'react';

function Pagination(){
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [offset, setOffset] = useState(0);
    const [page, setPage] = useState(0);

    const handleChangePage = (newPage) => {
        // alert(newPage)
        setPage(newPage);
        setOffset(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
      };

      const handleChangeRowsPerPage = (event) => {
        console.log(event)
        setRowsPerPage(parseInt(event, 10));
        setPage(0);
      };
    return {
        handleChangePage,
        offset,
        page,
        rowsPerPage,
        handleChangeRowsPerPage
    }
}
export default Pagination;