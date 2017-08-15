import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import getWeb3 from 'components/Web3Holder/getWeb3'
import contract from 'truffle-contract'

import GenesisScheme from 'build/contracts/GenesisScheme.json'
import Controller from 'build/contracts/Controller.json'
import OrganizationsBoard from 'build/contracts/OrganizationsBoard.json'
import SimpleICO from 'build/contracts/SimpleICO.json'
import { CURRENT_CHAIN_ID } from 'constants/Network'


// = styles =
// 3rd
import 'styles/bootstrap.scss';
// custom
import 'styles/layout.scss';
import 'styles/theme.scss';
import 'styles/ui.scss';
import 'styles/app.scss';

import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';
import grayTheme from './themes/grayTheme';

import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';



injectTapEventPlugin(); // Needed for onTouchTap for Material UI


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sweetAlertOpen: false,
    }
  };


  handleRequestClose = () => {
    this.setState({
      sweetAlertOpen: false,
    });
  };  


  getDaoStackAddresses = (callBack) => {
    const web3 = window.web3Instance.web3
    let controllerAddrss
    let tokenAddrss
    let reputationAddrss
    let controllerInst


    const orgBoardAddress = OrganizationsBoard.networks[CURRENT_CHAIN_ID]['address']
    console.log(OrganizationsBoard);

    const genesisAddress = GenesisScheme.networks[CURRENT_CHAIN_ID]['address']
    const simpleICOAddress = SimpleICO.networks[CURRENT_CHAIN_ID]['address']

    // console.log("orgBoardAddress", orgBoardAddress);
    // console.log("genesisAddress", genesisAddress);
    // console.log("simpleICOAddress", simpleICOAddress);
    // console.log("CURRENT_CHAIN_ID   ", CURRENT_CHAIN_ID);

    let promise = new Promise((resolve, reject) => {

      if (web3 != null) {
        let daoStackAddresses = {}
        web3.version.getNetwork((err, res) => {
          if (err) { return }
          const isCorrectChain = CURRENT_CHAIN_ID === res
          // this.setState({ currentNetworkId: res, isCorrectChain: isCorrectChain })
          daoStackAddresses.currentNetworkId = res
          daoStackAddresses.isCorrectChain = isCorrectChain
        })
        const GenesisCont = contract(GenesisScheme)
        GenesisCont.setProvider(web3.currentProvider)
        return GenesisCont.at(genesisAddress).then(genInst => {
          return genInst.controller.call()
        }).then(contAddrss => {
          controllerAddrss = contAddrss
          const ControllerCont = contract(Controller)
          ControllerCont.setProvider(web3.currentProvider)
          return ControllerCont.at(contAddrss)
        }).then(contInst => {
          controllerInst = contInst
          return controllerInst.nativeToken.call()
        }).then(res => {
          tokenAddrss = res
          return controllerInst.nativeReputation.call()
        }).then(res => {
          reputationAddrss = res
        }).then(() => {
          daoStackAddresses.genesis = genesisAddress
          daoStackAddresses.orgBoard = orgBoardAddress
          daoStackAddresses.simpleICO = simpleICOAddress
          daoStackAddresses.controller = controllerAddrss
          daoStackAddresses.nativeToken = tokenAddrss
          daoStackAddresses.nativeRep = reputationAddrss
          // this.setState({ daoStackAddresses })
          // console.log(daoStackAddresses);
          callBack(daoStackAddresses);
        })
      }
    });
  }

  componentDidMount() {
    getWeb3
    .then(results => {
      console.log('Web3 initialized!')
      let web3Event = new CustomEvent("web3Event")
      window.web3Instance = {
        web3: results.payload.web3Instance
      }
      if (results.payload.web3Provider === false){
        this.setState({
          sweetAlertOpen: true,
        });  
      }

      this.getDaoStackAddresses(function(daoStackAddresses){
        // console.log(daoStackAddresses);
        window.web3Instance.daoStackAddresses = daoStackAddresses
        window.dispatchEvent(web3Event);      
      })
    })
    .catch((err) => {
      console.error('Error in web3 initialization.', err)
    })
  }


  render() {
    const { layoutBoxed, navCollapsed, navBehind, fixedHeader, sidebarWidth, theme} = this.props;

    let materialUITheme;
    switch (theme) {
      case 'gray':
        materialUITheme = grayTheme;
        break;
      case 'dark':
        materialUITheme = darkTheme;
        break;
      default:
        materialUITheme = lightTheme;
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(materialUITheme)}>
        <div id="app-inner">
          <div className="preloaderbar hide"><span className="bar" /></div>
          <div
            className={classnames('app-main full-height', {
              'fixed-header': fixedHeader,
              'nav-collapsed': navCollapsed,
              'nav-behind': navBehind,
              'layout-boxed': layoutBoxed,
              'theme-gray': theme === 'gray',
              'theme-dark': theme === 'dark',
              'sidebar-sm': sidebarWidth === 'small',
              'sidebar-lg': sidebarWidth === 'large'})
                    }>
            {this.props.children}
          </div>
          <SweetAlert
            show={this.state.sweetAlertOpen}
            title="Not connected to a network. Please use a wallet like MetaMask."
            onConfirm={this.handleRequestClose}
            type="error"
          />           
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  layoutBoxed: state.settings.layoutBoxed,
  navCollapsed: state.settings.navCollapsed,
  navBehind: state.settings.navBehind,
  fixedHeader: state.settings.fixedHeader,
  sidebarWidth: state.settings.sidebarWidth,
  theme: state.settings.theme
});


module.exports = connect(
  mapStateToProps
)(App);
