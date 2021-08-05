import React, { useState, createContext } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import Sandwich from "./sandwich";
//export const ModalContext = createContext();

const InitialModal = (props) => {

    const [nameField, setNameField] = useState('A');
    const [emailField, setEmailField] = useState('A');
    const [emailConfirmField, setConfirmEmailField] = useState('A');
    const [errorMessage, setErrorMessage] = useState('');
    const [isNameInvalid, setIsNameInvalid] = useState(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isConfirmEmailInvalid, setIsConfirmEmailInvalid] = useState(false);
    const [sending, setSending] = useState('false');

    const validateName = (name) => {
        if (name.length < 3 || name == null) {
            setIsNameInvalid(true);
            return false;
        }
        else {
            setIsNameInvalid(false);
            return true;
        }
    };

    const validateEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setIsEmailInvalid(false);
            return true;
        }
        else {
            setIsEmailInvalid(true);
            return false;
        }
    };

    const validateConfirmEmail = (confirmEmail) => {
        if (confirmEmail.match(emailField)) {
            setIsConfirmEmailInvalid(false);
            return true;
        }
        else {
            setIsConfirmEmailInvalid(true);
            return false;
        }
    };

    function handleNameChange(event) {
        setNameField(event.target.value);
    }

    function handleEmailChange(event) {
        setEmailField(event.target.value);
    }

    function handleConfirmEmailChange(event) {
        setConfirmEmailField(event.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setErrorMessage('');
        if (validateName(nameField)
            && validateEmail(emailField)
            && validateConfirmEmail(emailConfirmField)) {
            setSending(false);
            let name = nameField;
            let email = emailField;
            let data = { name, email }

            fetch("https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => {
                setSending(true);
                document.getElementById("name").value = '';
                setNameField('');
                document.getElementById("email").value = '';
                setEmailField('');
                document.getElementById("cemail").value = '';
                setConfirmEmailField('');
                if (response.status === 200) {
                    props.openSecond();
                    return "Registered";
                } else if (response.status === 400) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
                .then((responseJson) => {
                    if (typeof responseJson === 'object' && responseJson != null) {
                        setErrorMessage(JSON.stringify(responseJson.errorMessage));
                    } else {
                        //setErrorMessage(responseJson);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });

        }
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={props.open}>
                Request an invite
            </Button>

            <Dialog open={props.openState && props.openState === "first"} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>Request an Invite</DialogTitle>
                <DialogContent>

                    <form onSubmit={handleSubmit} >

                        <TextField
                            error={isNameInvalid}
                            helperText={isNameInvalid && "Name Should Be Atleast 3 Characters Long"}
                            autoFocus
                            margin="dense"
                            name="name"
                            id="name"
                            label="Full Name"
                            type="text"
                            onChange={handleNameChange}
                            fullWidth
                        />
                        <TextField
                            error={isEmailInvalid}
                            helperText={isEmailInvalid && "Please Enter Valid Email Address"}
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            onChange={handleEmailChange}
                            fullWidth
                        />
                        <TextField
                            error={isConfirmEmailInvalid}
                            helperText={isConfirmEmailInvalid && "Confirm Email Should Match Email"}
                            margin="dense"
                            id="cemail"
                            label="Confirm Email"
                            type="email"
                            onChange={handleConfirmEmailChange}
                            fullWidth
                        />

                        <DialogActions>
                            {sending ? <Button type="Submit" fullWidth color="primary" style={{ border: "1px solid", margin: "15px", marginTop: "35px" }}>
                                Send
                            </Button> : <Button disabled fullWidth color="secondary" style={{ color: "green", border: "1px solid green", margin: "15px", marginTop: "35px" }}>
                                Sending.......
                            </Button>}
                        </DialogActions>
                    </form>
                </DialogContent>
                <DialogContentText style={{ textAlign: "center", color: "Red" }}>{errorMessage}</DialogContentText>
            </Dialog>

            <Dialog open={props.openState && props.openState === "second"} onClose={props.close} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>All Done !</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You ll be one of the first to experience Brocolli & Co. when we launch.
          </DialogContentText>
                    <Button onClick={props.close} color="primary" fullWidth style={{ border: "1px solid", margin: "5px", marginTop: "15px" }}>
                        Ok!!!!
          </Button>
                </DialogContent>
            </Dialog>
            {/* 
            <ModalContext.Provider value={"hello"}>
           {props.children}
        </ModalContext.Provider> */}
        </>
    )
}

export default InitialModal;