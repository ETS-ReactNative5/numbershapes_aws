import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./App.css";

import * as PIXI from "pixi.js-legacy";

class Arena extends Component {
  constructor() {
    super();
    this.app = {};
    this.state = {
      open: false,
    };
  }

  handleClickOpen(){
    this.setState({open: true})
  };

  onChange(event){
    this.setState({text: event.target.value})
    this.app.updateActiveTextBox(event.target.value)
  }

  handleClose(){
    if (this.state.text == ""){
      this.setState({text: "Text"})
      this.app.updateActiveTextBox("Text")
    }
    this.setState({open: false})
  };


  componentWillUnmount() {
    this.app.destroy(true);
  }

  componentWillMount() {

    PIXI.settings.RESOLUTION = 2
    this.app = new PIXI.Application({forceCanvas: true});
    this.app.renderer.backgroundColor = 0xffffff;
    this.app.renderer.resolution = 2
    this.app.renderer.autoDensity = true;
  }

  loadInstructions() {
    this.setState({ open: true });
  }

  resize(){
    this.app.resize({width: this.gameCanvas.clientWidth,height: this.gameCanvas.clientHeight})
  }

  componentDidMount() {
    this.gameCanvas.appendChild(this.app.view);

    const setup = {
      height: this.gameCanvas.clientHeight,
      width: this.gameCanvas.clientWidth,
      props: this.props,
      arena: this,
    };

    this.app.renderer.resize(
      this.gameCanvas.clientWidth,
      this.gameCanvas.clientHeight
    );

    this.props.script(this.app, setup);


    window.addEventListener('resize',()=>this.resize())
  }

  // Need fullscreen prop
  render() {
    let styleType = this.props.fullscreen ? { height: "100vh"} : null;
    return (
      <div>
        <div
          style={styleType}
          ref={(me) => {
            this.gameCanvas = me;
          }}
        />
                <Dialog
          ref={this.dialog}
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Text</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              value = {this.state.text}
              onChange = {this.onChange.bind(this)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Arena;
