import React from "react";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";


const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "#FA8072",
    },
    toolbar: {
        paddingLeft: "50px",
    },
}));

const Header = () => {
    const { header, toolbar } = useStyles();
    const titleBroccoli = () => {
        return <Toolbar className={toolbar}><h3>Broccoli & Co</h3></Toolbar>;
    };

    return (
        <header>
            <AppBar className={header}>{titleBroccoli()}</AppBar>
        </header>
    );
}

export default Header;