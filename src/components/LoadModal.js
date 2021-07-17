import React from 'react';

//utilities
import { withStyles } from '@material-ui/styles';

//components
import { Backdrop, CircularProgress } from '@material-ui/core'

const styles = theme => ({

    backdrop: {
        zIndex: "10",
    },
    
    infoCard: {
        width: "275px",
        minHeight: "100px",
        display: "flex",
        flexDirection: "column",
    },

    holderDiv: {
        height: "95%",
        width: "96%",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
    },

    statusText: {
        fontSize: "20px",
        textAlign: "center",
        lineHeight: "25px",
        wordWrap: "break-word",
        marginTop: "10px"
    },

    statusSubText: {
        fontSize: "15px",
        textAlign: "center",
        lineHeight: "25px",
        wordWrap: "break-word",
        color: "lightgrey",
    }

});

class LoadModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Backdrop className={classes.backdrop} open={this.props.open}>
                <CircularProgress color="primary" />
            </Backdrop>
        )
    }

}

export default withStyles(styles)(LoadModal)