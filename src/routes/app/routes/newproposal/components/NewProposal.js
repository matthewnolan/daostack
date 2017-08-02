import React from 'react';
import QueueAnim from 'rc-queue-anim';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const optionsStyle = {
  maxWidth: 300
};

const Hero = () => (
  <section className="hero hero-bg-img" style={{backgroundImage: 'url(assets/images-demo/covers/geometric-bk1.jpg)'}}>
    <div className="hero-inner">
      <div className="hero-content">
        <h1 className="hero-title">New Proposal</h1>
      </div>
      <p className="hero-tagline">Create a new proposal for a DAO.</p>
    </div>
  </section>
);


class SelectFieldOrgType extends React.Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <SelectField
        floatingLabelText="Organization Type"
        value={this.state.value}
        onChange={this.handleChange}
                  >
        <MenuItem value={1} primaryText="Organization Token" />
        <MenuItem value={2} primaryText="ETH" />
        <MenuItem value={3} primaryText="Other ERC20 Token" />
      </SelectField>
    );
  }
}


class ProposalForm extends React.Component {

  constructor(props) {
    super(props);

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 1);
    minDate.setHours(0, 0, 0, 0);

    this.state = {
      minDate,
      autoOk: false,
      disableYearSelection: false,
    };
  }

  handleChangeDate = (event, date) => {
    this.setState({
      minDate: date,
    });
  };


  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  render() {
    return (

      <form role="form">

        <div className="form-group">
          <label htmlFor="input3">Proposal Name</label>
          <div>
            <TextField
              id="input3"
              hintText="Proposal Name"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="input4">Proposal Creation Date</label>
          <div style={optionsStyle}>
            <DatePicker
              id="input4"
              onChange={this.handleChangeDate}
              autoOk={this.state.autoOk}
              defaultDate={this.state.minDate}
              disableYearSelection={this.state.disableYearSelection}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="input5">Proposal Due Date</label>
          <div style={optionsStyle}>
            <DatePicker
              id="input5"
              onChange={this.handleChangeDate}
              autoOk={this.state.autoOk}
              defaultDate={this.state.minDate}
              disableYearSelection={this.state.disableYearSelection}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="input6">Description</label>
          <div>
            <TextField
              id="input"
              hintText="Description of proposal"
              multiLine
              rows={2}
              rowsMax={4}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="">Vote Required</label>
          <div>Vote % required (50%, 75%) -> inherited from scheme</div>
        </div>

        <div className="form-group">
          <label htmlFor="">Organization Type</label>
          <div>
            <SelectFieldOrgType />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="">Token Allocation</label>
          <div></div>
        </div>

        <RaisedButton label="Submit" primary className="btn-w-md" />

      </form>

    );
  }
}


const Body = () => (
  <section>
    <article className="article">
      <h2 className="article-title">New Proposal</h2>
      <div className="box box-default">
        <div className="box-body">
          <div className="grid-structure">

            <div className="row">
              <div className="col-sm-12">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <br/><br/>
                <ProposalForm/>

              </div>
            </div>

          </div>
          
        </div>
      </div>
    </article>
  </section>
);


const Page = () => (
  <section className="page-about">
    <QueueAnim type="alpha" className="ui-animate">
      <div key="1"><Hero /></div>
    </QueueAnim>
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1" className="container-fluid"><Body /></div>
    </QueueAnim>
  </section>
);


module.exports = Page;

