import React from 'react';
import { AppBar, Toolbar, Container, Typography, makeStyles} from "@material-ui/core";
import { findByLabelText } from '@testing-library/dom';

const useStyles = makeStyles(() => ({
    footer: {
        backgroundColor: "#FA8072",
        marginTop: "auto",
        alignItems: "center",
    },
    toolbar: { 
        paddingLeft: "35%", 
    }
}));

const Footer = () => {
    const { footer, toolbar} = useStyles();
    return (
        <AppBar position="relative" color="primary" className={footer}>
            <Container maxWidth="md">
                <Toolbar className = {toolbar}>
                    <Typography  variant="body1" color="inherit">
                        &copy; 2020 Brocoli & Co. All Rights Reserved
                  </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Footer;