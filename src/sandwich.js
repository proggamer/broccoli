import React, {useContext} from "react";
import Button from '@material-ui/core/Button';
import Typical from "react-typical";
import InitialModal from "./initialmodal";
//import {ModalContext} from "./initialmodal";

const Sandwich = () => {

    //const value = useContext(ModalContext);
    // const [open, setOpen] = React.useState(false);
    const [open, setOpen] = React.useState();

    const handleClickOpen = () => {
        setOpen("first");
        console.log("1");
    };

    const handleClickOpenSecond = () => {
        setOpen("second");
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="sandwich">
            <h1> A better way to{' '}
                <Typical
                    // loop={Infinity}
                    wrapper="b"
                    steps={[
                        'enjoy every day.',
                        3000,
                        // 'cherish your dreams',
                        // 3000,
                    ]}
                />
            </h1>
            <h3> Be the first to know when we launch.</h3>
            
            <InitialModal open ={handleClickOpen} close = {handleClose} openState = {open} openSecond ={handleClickOpenSecond}/>
            

        </div>
    )
}

export default Sandwich;