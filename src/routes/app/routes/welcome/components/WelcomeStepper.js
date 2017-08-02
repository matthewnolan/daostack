import React from 'react';
import {
    Step,
    Stepper,
    StepButton,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


class WelcomeStepper extends React.Component {

  state = {
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Next"
          disableTouchRipple
          disableFocusRipple
          primary
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
                />
        {step > 0 && (
        <FlatButton
          label="Back"
          disableTouchRipple
          disableFocusRipple
          onTouchTap={this.handlePrev}
                    />
                )}
      </div>
    );
  }

  render() {
    const {stepIndex} = this.state;

    return (
      <article className="article">
        <h2 className="article-title">It's easy to create a DAO</h2>
        <div className="box box-default">
          <div className="box-body padding-xl">

            <div style={{maxWidth: 380, height: 700, margin: 'auto'}}>
              <Stepper
                activeStep={stepIndex}
                linear={false}
                orientation="vertical"
                            >
                <Step>
                  <StepButton onClick={() => this.setState({stepIndex: 0})}>
                    Pick a name for your organization
                  </StepButton>
                  <StepContent>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>

                    <h6>Token Name</h6>
                      <TextField
                        hintText="Creative Group"
                      /><br />

                    <h6>Token Symbol</h6>
                      <TextField
                        hintText="CGT"
                      /><br />
                    {this.renderStepActions(0)}
                  </StepContent>
                </Step>
                <Step>
                  <StepButton onClick={() => this.setState({stepIndex: 1})}>
                    Choose Orgnization Team Members
                  </StepButton>
                  <StepContent>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>                  
                    <h6>Member 1</h6>
                      <TextField
                        hintText=""
                      /><br />

                    <h6>Tokens</h6>
                      <TextField
                      /><br />

                    <h6>Reputation</h6>
                      <TextField
                      /><br />
                    {this.renderStepActions(1)}
                  </StepContent>
                </Step>
                <Step>
                  <StepButton onClick={() => this.setState({stepIndex: 2})}>
                    Deploy you DAO
                  </StepButton>
                  <StepContent>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                    {this.renderStepActions(2)}
                  </StepContent>
                </Step>
              </Stepper>
            </div>

          </div>
        </div>
      </article>
    );
  }
}


export default WelcomeStepper;
