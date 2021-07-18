import React from 'react';

//utilities
import { withStyles } from '@material-ui/styles';

//components
import LoadModal from '../components/LoadModal';
import { Grid, Paper, TextField, FormControl, Typography, Button, MenuItem, Grow  } from '@material-ui/core'

const styles = theme => ({

    paper: {
        width: "300px",
        minHeight: "375px",
        display: "flex",
        alignItems: "top",
        justifyContent: "center",
        float: "bottom"
    },

    paperDiv: {
        width: "94%",
        height: "94%",
    },

    valorantLogo: {
        fill: "#fa4454",
        alignItems: "center",
        justifyContent: "center",
        display: "block",
        margin: "auto",
        marginTop: "20px",
        marginBottom: "20px",
        height: "55px"
    },

    loginText: {
        fontSize: "20px",
        textAlign: "center",
        lineHeight: "25px",
        marginBottom: "20px",
        wordWrap: "break-word"
    },

    footerText: {
        textAlign: "center",
        color: "darkgrey",
        fontSize: "12px",
        marginBottom: "10px",
        lineHeight: "15px"
    },

    form: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        margin: "auto",
        width: "95%"
    },

    entry: {
        display: "flex",
        width: "95%",
    }

});


const regions = [{ value: "na", label: "NA" }, { value: "eu", label: "EU" }, { value: "latam", label: "LATAM" }, { value: "br", label: "BR" }, { value: "ap", label: "AP" }, { value: "kr", label: "KR" }, { value: "pbe", label: "PBE" }]

class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameErrors: {
                "usernameError": false,
                "usernameHelperText": "",
            },
            passwordErrors: {
                "passwordError": false,
                "passwordHelperText": "",
            },
            actionType: {
                "type": this.props.type,
                "label": "",
            },
            "riot-username": "",
            "riot-password": "",
            "region": this.props.region,
            "processing": false,
            "processingState": "",
        }
    }

    change(event) {
        this.verify(false);
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    verify(isSubmit) {
        var error = false
        if(this.state['riot-username'] === "" && isSubmit){
            this.setState({
                usernameErrors: {
                    "usernameError": true,
                    "usernameHelperText": "Enter a username"
                }
            });
            error = true
        }
        if(this.state['riot-username'] !== ""){
            this.setState({
                usernameErrors: {
                    "usernameError": false,
                    "usernameHelperText": ""
                }
            });
        }
        if(this.state['riot-password'] === "" && isSubmit){
            this.setState({
                passwordErrors: {
                    "passwordError": true,
                    "passwordHelperText": "Enter a password"
                }
            });
            error = true
        }
        if(this.state['riot-password'] !== ""){
            this.setState({
                passwordErrors: {
                    "passwordError": false,
                    "passwordHelperText": ""
                }
            });
        }
        return error
    }

    async onSubmit(evnt) {
        evnt.preventDefault();
        var isError = this.verify(true);
        if(!isError){
            this.setState({
                processing: true,
            })
            await this.makeRequest()
        };
    };

    async makeRequest() {
        console.log("req")
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                username: this.state['riot-username'],
                password: this.state['riot-password'],   
            }),
        };
        fetch(`https://valorant-rpc.herokuapp.com${this.props.redir}?region=${this.props.region}`, options)
            .then(response => response.json())
            .then(function(response) {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        processing: false,
                    });
                }
            });
    }


    componentDidMount() {
        document.title = 'valorant-rpc / auth'
        if (this.state.actionType.type === "request"){
            this.setState({
                actionType: {
                    "label": `request to join ${this.props.playername}#${this.props.playertag}`,
                }
            });
        } else if (this.state.actionType.type === "join"){
            this.setState({
                actionType: {
                    "label": `join ${this.props.playername}#${this.props.playertag}`,
                }
            });
        } else {
            this.setState({
                actionType: {
                    "label": `do absolutely nothing.`,
                }
            });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
                <LoadModal open={this.state.processing} processingState={this.state.processingState}/>
                <Grid item xs={6}>
                    <Paper variant="outlined" className={classes.paper}>
                        <div className={classes.paperDiv}>
                            <svg viewBox="0 0 100 100" className={classes.valorantLogo}><path d="M99.25 48.66V10.28c0-.59-.75-.86-1.12-.39l-41.92 52.4a.627.627 0 00.49 1.02h30.29c.82 0 1.59-.37 2.1-1.01l9.57-11.96c.38-.48.59-1.07.59-1.68zM1.17 50.34L32.66 89.7c.51.64 1.28 1.01 2.1 1.01h30.29c.53 0 .82-.61.49-1.02L1.7 9.89c-.37-.46-1.12-.2-1.12.39v38.38c0 .61.21 1.2.59 1.68z"></path></svg>
                            <Typography variant="body1" className={classes.loginText}>Log in with your VALORANT account to { this.state.actionType.label }</Typography>

                            <form action="/auth" method="POST">
                                <FormControl className={classes.form} fullWidth>
                                    <TextField style={{ marginBottom: "15px" }} className={classes.entry} disabled={this.state.authenticating} id="usernameEntry" error={this.state.usernameErrors.usernameError} helperText={this.state.usernameErrors.usernameHelperText} value={this.state['riot-username']} color="secondary" autoFocus required size="medium" name="riot-username" label="Username" type="text" variant="outlined" onChange={event => this.change(event)} />
                                    <TextField className={classes.entry} value={this.state['riot-password']} disabled={this.state.authenticating} id="passwordEntry" error={this.state.passwordErrors.passwordError} helperText={this.state.passwordErrors.passwordHelperText} color="secondary" required size="medium" name="riot-password" label="Password" type="password" variant="outlined" onChange={event => this.change(event)} />
                                    <div style={{ display: "flex", margin: "23px", display: "flex", alignItems: "center" }}>
                                        <TextField style={{ display: "flex", height: "100%", width: "100px", marginRight: "25px" }} size="small" disabled={this.state.authenticating} name="region" color="secondary" select label="Region" value={this.state.region} onChange={event => this.change(event)} variant="outlined">
                                            {regions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <Button style={{ display: "flex", height: "40px", }} type="submit" variant="contained" disableElevation color="primary" onClick={(evnt) => this.onSubmit(evnt)}>
                                            Log in
                                        </Button>
                                    </div>
                                </FormControl>
                            </form>
                            <div>
                                <Typography variant="body1" className={classes.footerText}>Your credentials are not saved or sent anywhere besides Riot Games. Check out the <a href="https://github.com/colinhartigan/valorweb" style={{ color: "lightgrey" }}>authentication source code</a> for more information.</Typography>
                            </div>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

}

export default withStyles(styles)(Auth)