import React from 'react';
import QueueAnim from 'rc-queue-anim';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment'
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import contract from 'truffle-contract'
import SimpleICO from 'build/contracts/SimpleICO.json'
import EtherscanLink from 'components/EtherscanLink'

import { connect } from 'react-redux';


const Hero = () => (
  <section className="hero hero-bg-img" style={{backgroundImage: 'url(assets/images-demo/covers/geometric-bk1.jpg)'}}>
    <div className="hero-inner">
      <div className="hero-content">
        <h1 className="hero-title">Get some Stacks (STK)</h1>
      </div>
      <p className="hero-tagline">Stacks are the native token of the DAOstack network and you can get some by contributing ETH in DAOstack ICO.</p>
    </div>
  </section>
);


class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: this.props.completed
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }

  render() {
    return (
      <div>
        <div><strong>ICO Progress:</strong> {Math.round(this.state.completed)}</div>
        <LinearProgress mode="determinate" style={{height:'30px'}}value={this.state.completed} />
      </div>
    );
  }
}


class DaoTokenInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      contractAddress: "",
      defaultAddress: "",
      contributionAmount: "1",
      contributionSuccessMessage: "",
      showSweetAlert1: false,
      web3: ""
    };
  }

  handleTouchTap = () => {
    this.setState({
      showSweetAlert1: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      showSweetAlert1: false,
    });
  };

  componentDidMount () {

    let updateState = () => {
      let web3 = window.web3Instance.web3
      this.setState({web3: web3})
      this.setState({contractAddress: window.web3Instance.daoStackAddresses.simpleICO})  
      this.loadDetails()
    }

    if (typeof window.web3Instance == 'object'){
      updateState()
    } else {
      window.addEventListener("web3Event", () => { 
        updateState()
      });    
    }
  }


  onAmountChange = evt => {
    this.setState({ contributionAmount: evt.target.value })
  }


  loadDetails = () => {
    let web3 = window.web3Instance.web3
    let contractAddress = window.web3Instance.daoStackAddresses.simpleICO
    const SimpleICOCont = contract(SimpleICO)
    SimpleICOCont.setProvider(web3.currentProvider)

    SimpleICOCont.at(contractAddress).then(inst => {
      inst.startBlock.call().then(res => {
        this.setState({ startBlock: Number(res) })
      })
      inst.endBlock.call().then(res => {
        this.setState({ endBlock: Number(res) })
      })
      inst.cap.call().then(res => {
        this.setState({ cap: Number(web3.fromWei(res)) })
      })
      inst.totalEthRaised.call().then(res => {
        this.setState({ totalEthRaised: Number(web3.fromWei(res)) })
      })
      inst.isOpen.call().then(res => {
        this.setState({ isOpen: res })
      })
      inst.getCurrentPrice.call().then(res => {
        this.setState({ tokenPrice: Number(res) })
      })
    })

    web3.eth.getBlockNumber((error, result) => {
      if (error) { return }
      this.setState({ currentBlock: result })
    })
  }

  donate = () => {

    let web3 = window.web3Instance.web3
    let contractAddress = window.web3Instance.daoStackAddresses.simpleICO
    const { contributionAmount } = this.state
    const defaultAddress = web3.eth.accounts[0]
    const SimpleICOCont = contract(SimpleICO)
    const amountInWei = web3.toWei(Number(this.state.contributionAmount), 'ether')
    SimpleICOCont.setProvider(web3.currentProvider)

    SimpleICOCont.at(contractAddress).then(inst => {
      return inst.donate({ from: defaultAddress, value: amountInWei, gas: 150000 }).then(res => {
        console.log(res);
        const receivedTokens = Number(web3.fromWei(res.logs[0].args._tokensAmount))

        this.setState({ showSweetAlert1: true })
        this.setState({ contributionSuccessMessage: `You contributed ${contributionAmount} ETH in return for ${receivedTokens} STK` })
        this.setState({ contributionAmount: '' })
        this.loadDetails()
        // console.log(this.state.contributionSuccessMessage);
      })
    })
  }  


  renderIcoDetails () {
    const { cap, totalEthRaised, tokenPrice, currentBlock, endBlock, blockInvtervalInSeconds, contractAddress } = this.state
    const blocksLeft = endBlock - currentBlock
    const blocksPerMinute = 60 / blockInvtervalInSeconds
    const minutesLeft = Math.round(blocksLeft / blocksPerMinute)
    const hoursLeft = Math.round(minutesLeft / 60)
    const daysLeft = Math.round(hoursLeft / 24)

    const now = moment()
    const endDate = moment().add(daysLeft, 'days')
    const timeLeft = now.to(endDate, true)

    const icoStatus = totalEthRaised === cap ? 'Complete' : 'Running'

    const icoProgress = (totalEthRaised / cap) * 100
    let progressColor = 'info'
    if (icoProgress === 100) { progressColor = 'success' }

    if (timeLeft && cap && tokenPrice) {
      return (
        <div>
          <p><strong>Contract address:</strong> <EtherscanLink address={ contractAddress } >{ contractAddress }</EtherscanLink></p>
          <p><strong>ICO Status:</strong> { icoStatus }</p>
          <p><strong>Time left:</strong> { timeLeft }</p>
          <p><strong>Cap:</strong> { cap.toLocaleString() } ETH</p>
          <p><strong>Tokens per ETH:</strong> { tokenPrice }</p>
          <p><strong>ETH raised:</strong> { totalEthRaised }</p>
          <Progress completed={icoProgress} />

        </div>
      )
    } else {
      return (<div>loading ICO details...</div>)
    }
  }  

  render() {


    return (
      <section>
        <article className="article">
          <h2 className="article-title">DAOstack ICO</h2>
          <div className="box box-default">
            <div className="box-body">
              <div className="grid-structure">

                <div className="row">
                  <div className="col-sm-12">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                    { this.renderIcoDetails() }
                    <br /><br />

                    <form className="form-inline" role="form">
                      <label className="sr-only" htmlFor="inlineFormInput">How much ETH would you like to contirbute?</label>
                      <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" type="number" value={ this.state.contributionAmount } onChange={ this.onAmountChange } />
                      <RaisedButton label="Contribute ETH" secondary className="btn-w-md" onClick={ this.donate } />
                    </form>   

                    <br/>
                    <p>{this.state.contributionSuccessMessage}</p>             
                    <SweetAlert
                      show={this.state.showSweetAlert1}
                      title={this.state.contributionSuccessMessage}
                      onConfirm={this.handleRequestClose}
                      type="success"
                    />  

                  </div>
                </div>

              </div>
              
            </div>
          </div>
        </article>
      </section>
    );
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="page-about">
        <QueueAnim type="alpha" className="ui-animate">
          <div key="1"><Hero /></div>
        </QueueAnim>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="container-fluid"><DaoTokenInfo/></div>
        </QueueAnim>
      </section>
    )
  }  
}

const mapStateToProps = (state, ownProps) => ({
});

module.exports = connect(
  mapStateToProps
)(Page);

