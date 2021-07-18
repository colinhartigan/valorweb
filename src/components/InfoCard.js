import React from 'react';

//utilities
import { withStyles } from '@material-ui/styles';

//components
import { Backdrop, CircularProgress } from '@material-ui/core'

const styles = theme => ({
    
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

class InfoCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.infoCard} >
                <div className={classes.holderDiv}>
                    aaaaaaa
                </div>
            </Card>
        )
    }

}

export default withStyles(styles)(InfoCard)