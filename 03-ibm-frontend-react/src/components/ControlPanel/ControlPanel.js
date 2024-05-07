const ControlPanel = ({ isMultipleRowsSelected, onEdit, onDelete }) => {

    return (
        <div className="d-flex justify-content-end">
            <button className="btn btn-primary me-2" disabled={isMultipleRowsSelected}>Edit</button>
            <button className="btn btn-danger" disabled={isMultipleRowsSelected} >Delete</button>
        </div>
    );

}

export default ControlPanel