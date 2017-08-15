import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import APPCONFIG from 'constants/Config';
import NavLeftList from './NavLeftList';
import NavRightList from './NavRightList';

import Web3 from 'web3';
import BigNumber from 'bignumber.js';

import contract from 'truffle-contract'
import MintableToken from 'build/contracts/MintableToken.json'

import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';

import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';


import {
  changeEthAddress
} from '../../actions';

const ImgIconButtonStyle = {
  width: '60px',
  height: '60px'
};


class Web3Bar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      handleChangeEthAddress: this.props.handleChangeEthAddress,
      tknBalance: 0,
      ethBalance: 0,
      sweetAlertOpen: false,
    }
  };

  onChangeEthAddress = () => {
    this.state.handleChangeEthAddress("val");
  };

  handleRequestClose = () => {
    this.setState({
      sweetAlertOpen: false,
    });
  };  

  componentDidMount() {

    let web3
    let updateBalance = () => {

      let thisAccount = web3.eth.accounts[0]
      web3.eth.getBalance(thisAccount, (error, res) => {
        if (error) { return }
        this.setState({ ethBalance: Number(web3.fromWei(res)).toFixed(2) })
      })
      web3.eth.filter({}, () => {
        web3.eth.getBalance(thisAccount, (error, res) => {
          if (error) { return }
          this.setState({ ethBalance: Number(web3.fromWei(res)).toFixed(2) })
        })
      })

      // STK 
      var usrAddrss = thisAccount
      var contAddrss = window.web3Instance.daoStackAddresses.nativeToken

      const MintableTokenCont = contract(MintableToken)
      let contInst
      MintableTokenCont.setProvider(web3.currentProvider)

      MintableTokenCont.at(contAddrss).then(inst => {
        contInst = inst
        inst.symbol.call().then(res => {
          this.setState({ tknSymbol: res })
        })

        const myEvent = inst.allEvents({ fromBlock: 'latest' })
        myEvent.watch(res => {
          contInst.balanceOf(usrAddrss).then(res => {
            this.setState({ tknBalance: Number(web3.fromWei(res)) })
          })
        })
        return (inst.balanceOf(usrAddrss))
      }).then(res => {
        this.setState({ tknBalance: Number(web3.fromWei(res)) })
      })

    }

    if (typeof window.web3Instance == 'object'){
      updateBalance()
    } else {     
      window.addEventListener("web3Event", () => { 
        web3 = window.web3Instance.web3
        updateBalance()
      });    
    }


  }
  render() {
    return (
      <div>
        <ul className="list-unstyled list-inline">
          <li className="list-inline-item">
            <FlatButton style={ImgIconButtonStyle}><b>ETH:</b> {this.state.ethBalance}</FlatButton>
          </li>
          <li className="list-inline-item">
            <FlatButton style={ImgIconButtonStyle}><b>STK:</b> {this.state.tknBalance}</FlatButton>
          </li>
          <li className="list-inline-item">
            <FlatButton style={ImgIconButtonStyle}><i className="nav-icon nav-dot material-icons color-success" style={{marginTop: "13px"}}>fiber_manual_record</i></FlatButton>
          </li>
        </ul>
      </div>
    )
  }
}





class Header extends React.Component {

  componentDidMount() {
    const sidebarToggler = this.sidebarBtn;
    const $sidebarToggler = $(sidebarToggler);
    const $body = $('#body');

    $sidebarToggler.on('click', (e) => {
      // _sidebar.scss, _page-container.scss
      $body.toggleClass('sidebar-mobile-open');
    });
  }


  render() {
    const { isFixedHeader, colorOption, handleChangeEthAddress} = this.props;
    
    return (
      <section className="app-header">
        <div
          className={classnames('app-header-inner', {
            'bg-color-light': ['11', '12', '13', '14', '15', '16', '21'].indexOf(colorOption) >= 0,
            'bg-color-dark': colorOption === '31',
            'bg-color-primary': ['22', '32'].indexOf(colorOption) >= 0,
            'bg-color-success': ['23', '33'].indexOf(colorOption) >= 0,
            'bg-color-info': ['24', '34'].indexOf(colorOption) >= 0,
            'bg-color-warning': ['25', '35'].indexOf(colorOption) >= 0,
            'bg-color-danger': ['26', '36'].indexOf(colorOption) >= 0 })}
                >
          <div className="hidden-lg-up float-left">
            <a href="javascript:;" className="md-button header-icon toggle-sidebar-btn" ref={(c) => { this.sidebarBtn = c; }}>
              <i className="material-icons">menu</i>
            </a>
          </div>

          <div className="brand hidden-md-down">
            <h2><Link to="/">{APPCONFIG.brand}</Link></h2>
          </div>

          <div className="top-nav-left hidden-md-down">
            <NavLeftList />
          </div>

          <div className="top-nav-right">
            <NavRightList />
          </div>

          <div className="top-nav-right">
            <Web3Bar handleChangeEthAddress={handleChangeEthAddress} />
          </div>

        </div>
      </section>
    );
  }
}


const mapStateToProps = state => ({
  colorOption: state.settings.colorOption,
  isFixedHeader: state.settings.isFixedHeader,
  changeEthAddress: state.settings.changeEthAddress
});


const mapDispatchToProps = dispatch => ({
  handleChangeEthAddress: (ethAddress) => {
    dispatch(changeEthAddress(ethAddress));
  }
});


module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

