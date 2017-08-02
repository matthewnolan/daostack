import React from 'react';
import QueueAnim from 'rc-queue-anim';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import {blue500, yellow600} from 'material-ui/styles/colors';

import contract from 'truffle-contract'
import Web3 from 'web3';


import OrganizationsBoard from 'build/contracts/OrganizationsBoard.json'
import SimpleVote from 'build/contracts/SimpleVote.json'
import Genesis from 'build/contracts/GenesisScheme.json'
import Controller from 'build/contracts/Controller.json'
import MintableToken from 'build/contracts/MintableToken.json'
import { CURRENT_CHAIN_ID } from 'constants/Network'






const pie1 = {};
const pie2 = {};
const colors = ['#673AB7','#3F51B5', '#009688', '#2196F3', '#03A9F4', '#00BCD4']

pie1.options = {
  color: colors,
  title: {
    text: 'Tokens Distribution',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    show: false,
    orient: 'vertical',
    x: 'left',
    data: ['Direct', 'Email', 'Affiliate', 'Video Ads', 'Search'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {show: true, title: 'save'}
    }
  },
  calculable: true,
  series: [
    {
      name: 'Vist source',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        {value: 335, name: 'Direct'},
        {value: 310, name: 'Email'},
        {value: 234, name: 'Affiliate'},
        {value: 135, name: 'Video Ads'},
        {value: 1548, name: 'Search'}
      ]
    }
  ]
};

pie2.options = {
  title: {
    text: 'Reputation Distribution',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    show: false,
    orient: 'vertical',
    x: 'left',
    data: ['Direct', 'Email', 'Affiliate', 'Video Ads', 'Search'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {show: true, title: 'save'}
    }
  },
  calculable: true,
  series: [
    {
      name: 'Vist source',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        {value: 335, name: 'Direct'},
        {value: 310, name: 'Email'},
        {value: 234, name: 'Affiliate'},
        {value: 135, name: 'Video Ads'},
        {value: 1548, name: 'Search'}
      ]
    }
  ]
};


const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
    tooltipPosition="bottom-left"
    >
    <MoreVertIcon color={grey400} />
  </IconButton>
);


const MemberListStyle = {
  width: '44%',
  marginRight: '3%'
};

const DaoMemberStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}

const ListExampleSimple = () => (
      <List>
        <ListItem
          leftAvatar={<Avatar icon={<ActionAccountCircle />} backgroundColor={colors[0]} />}
          rightIconButton={rightIconMenu}
          primaryText={
            <div>
              <div style={DaoMemberStyle}>0xc2cbc7802c17e5233ea75da597d648164c5d3b71</div>
              <div>
                <TextField
                  defaultValue="dsjkvdjskhdsjkdshf"
                  hintText="dsjkvdjskhdsjkdshf"
                  type="text"
                  floatingLabelText="Member Id"
                  floatingLabelFixed
                  style={MemberListStyle}
                />  
              </div>                         
              <TextField
                defaultValue="1000"
                hintText="ie 1000"
                type="number"
                floatingLabelText="Tokens"
                floatingLabelFixed
                style={MemberListStyle}
              />              
              <TextField
                hintText="ie 1000"
                type="number"
                floatingLabelText="Reputation"
                floatingLabelFixed
                style={MemberListStyle}
              />
            </div>
          }
        />
      </List>
);


const Hero = () => (
  <section className="hero hero-bg-img" style={{backgroundImage: 'url(assets/images-demo/covers/photo-1438893761775-f1db119d27b22.jpg)'}}>
    <div className="hero-inner">
      <div className="hero-content">
        <h1 className="hero-title">Launch a new DAO</h1>
      </div>
      <p className="hero-tagline">Use your freshly minted Stacks to forge a DAO; choose your cofounders and deploy it to the Ethereum blockchain!</p>
    </div>
  </section>
);



class DaoDeploy extends React.Component {

  update () {
    this.props.onDeployBtn()
  }

  render() {
    return (
      <div>
        <br/>
        <h2 className="article-title">Deploy Organization</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-default">
              <div className="box-body">
                <div className="">
                  <p>Forging a new organization requires the signing of three separate transactions at the moment. So please be patient and make sure to sign all three transactions.</p>
                </div>
                <RaisedButton label="Deploy" onTouchTap={this.update.bind(this)} primary /><div className="divider" /  >                          
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};



class DaoCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [{
        name: "0x11111",
        tokens: 100,
        reputation: 100
      }]
    };    
  }


  add_more = () => {
    // pie1.options.series.data.push[{value: 100, name: 'Direct'}]

    let new_val = this.state.value
    new_val.push({
        name: "0x11111",
        tokens: 100,
        reputation: 100
      })
    this.setState({ value: new_val })
  }

  update_item = (i, e) => {
    let new_val = this.state.value
    new_val.push()
    this.setState({ value: new_val })
  }

  remove_item = (i, e) => {
    let new_state = this.state.value
    new_state[i] = undefined
    this.setState({ value: new_state })
  }

  orgFieldChange = (event, i, prop) => {
    console.log(event, i, prop);
    // this.setState({orgName: event.target.value});
    // let new_prop = this.state.value
    // new_prop[i][prop] = event.target.value
    // new_prop[i][prop] = event.target.value
    // this.setState({ value: new_prop })
    // this.setState({orgName: event.target.value});
  }  

  render() {
    let me = this

    let lines = this.state.value.map( function(e, i) {
      if (e == undefined) {
        return null
      }

      return (
        <ListItem
          key={i}
          leftAvatar={<Avatar icon={<ActionAccountCircle />} backgroundColor={colors[i]} />}
          rightIconButton={
            <IconMenu iconButtonElement={iconButtonElement}>
              <MenuItem onClick={me.remove_item.bind(null, i)}>Delete</MenuItem>
            </IconMenu>            
          }
          primaryText={
            <div>
              <div style={DaoMemberStyle}>Member {i+1}</div>
              <div>
                <TextField
                  defaultValue={e.name}
                  hintText="Your address"
                  type="text"
                  floatingLabelText="Member Id"
                  floatingLabelFixed
                  style={MemberListStyle}
                  onChange={me.orgFieldChange(event, i, "name")}
                />  
              </div>                         
              <TextField
                value={me.state.value[i].tokens}
                hintText="ie 1000"
                type="number"
                floatingLabelText="Tokens"
                floatingLabelFixed
                style={MemberListStyle}
              />              
              <TextField
                value={me.state.value[i].reputation}
                hintText="ie 1000"
                type="number"
                floatingLabelText="Reputation"
                floatingLabelFixed
                style={MemberListStyle}
              />
            </div>
          }
        />        
      )
    }).filter( function(e) {
      return e != undefined
    })

    return (
      <div>
        <br/>
        <h2 className="article-title">Choose DAO Team Members</h2>

        <div className="box box-default">
          <div className="box-body">
            <div className="grid-structure">
              <div className="row">
                <div className="col-xl-4">
                  <RaisedButton label="Add Another Collaborator" onClick={this.add_more} primary /><div className="divider" /  >
                  <List>
                    {lines}
                  </List>
                </div>
                <div className="col-xl-8">
                  <div><ReactEcharts option={pie1.options} showLoading={false} /></div>
                  <div><ReactEcharts option={pie2.options} showLoading={false} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}





class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sweetAlertOpen: false,
      orgName: "",
      orgToken: "",
      orgTokenValid: "",
      orgNameValid: ""
    };
  }

  componentDidMount () {

    let updateState = () => {
      let web3 = window.web3Instance.web3
      this.setState({web3: web3})
      this.setState({contractAddress: window.web3Instance.daoStackAddresses.simpleICO})  
      this.readBalances()
    }

    if (typeof window.web3Instance == 'object'){
      updateState()
    } else {
      window.addEventListener("web3Event", () => { 
        updateState()
      });    
    }
  }

  // addressArray () {
  //   return this.state.collaborators.map((collaborator, sidx) => {
  //     return collaborator.address
  //   })
  // }

  deploySequence = () => {
    console.log("deploySequence");
    const DAOstack = window.web3Instance.daoStackAddresses
    const web3 = window.web3Instance.web3
    const defaultAddress = web3.eth.accounts[0]
    const orgName = this.state.orgName
    const orgToken = this.state.orgToken

    // const addressArray = this.addressArray()
    // const tokensArray = this.tokensArray()
    // const reputationsArray = this.reputationsArray()

    const addressArray = ["0xab4637ad8c32cb2575a534eca2bde4b907d4b5d4"]
    const tokensArray = ["1000000000000000000000"]
    const reputationsArray = ["1000000000000000000000"]

    const SimpleVoteCont = contract(SimpleVote)
    const GenesisCont = contract(Genesis)
    const OrganizationsBoardCont = contract(OrganizationsBoard)

    SimpleVoteCont.setProvider(web3.currentProvider)
    GenesisCont.setProvider(web3.currentProvider)
    OrganizationsBoardCont.setProvider(web3.currentProvider)

    // this.setState({ deployOrgStatus: 'deploying', simpleVoteDeployMessage: 'deploying' })
    SimpleVoteCont.new({ from: defaultAddress, gas: 3000000 }).then(inst => {
      this.setState({ simpleVoteDeployMessage: 'deployed', simpleVoteContractAddress: inst.address })
      return (inst.address)
    }).then(simpleVoteAddrss => {
      this.setState({ genesisDeployMessage: 'deploying' })
      return GenesisCont.new(orgName, orgToken, addressArray, tokensArray, reputationsArray, simpleVoteAddrss, { from: defaultAddress, gas: 4000000 })
    }).then(genInst => {
      this.setState({ genesisDeployMessage: 'deployed', genesisContractAddress: genInst.address })
      return genInst.controller.call()
    }).then(controllerAddrss => {
      this.setState({ addOrgToIndexMessage: 'adding_org' })
      OrganizationsBoardCont.at(DAOstack.orgBoard).then(inst => {
        return inst.addOrg(controllerAddrss, orgName, { from: web3.eth.accounts[0], gas: 200000 })
      }).then(() => {
        console.log(controllerAddrss);
        this.setState({ controllerAddrss: controllerAddrss, deployOrgStatus: 'deployed', addOrgToIndexMessage: 'org_added' })
      })
    })
  }  


  readBalances = () => {
    const web3 = window.web3Instance.web3
    const defaultAddress = web3.eth.accounts[0]

    const GenesisSchemeCont = contract(Genesis)
    const ControllerCont = contract(Controller)
    const MintableTokenCont = contract(MintableToken)

    GenesisSchemeCont.setProvider(web3.currentProvider)
    ControllerCont.setProvider(web3.currentProvider)
    MintableTokenCont.setProvider(web3.currentProvider)

    const genesisAddress = Genesis.networks[CURRENT_CHAIN_ID]['address']

    GenesisSchemeCont.at(genesisAddress).then(genInst => {
      return genInst.controller.call()
    }).then(contAddrss => {
      return ControllerCont.at(contAddrss)
    }).then(contInst => {
      return contInst.nativeToken.call()
    }).then(tknAddress => {
      MintableTokenCont.at(tknAddress).then(inst => {
        return (inst.balanceOf.call(defaultAddress, { from: defaultAddress }))
      }).then(res => {
        console.log(Number(web3.fromWei(res)))
        this.setState({ tknBalance: Number(web3.fromWei(res)) })
      })
      web3.eth.getBalance(defaultAddress, (error, res) => {
        if (error) { return }
        console.log(Number(web3.fromWei(res)))
        this.setState({ ethBalance: Number(web3.fromWei(res)) })
      })
    })
  }



  updateName = () => {
    console.log("updateName");
  };

  resetFormValid = () => {
      console.log("resetFormValid");
      this.setState({
        orgNameValid: "",
        orgTokenValid: ""
      })
  }

  onDeployBtn = () => {

    let isFormValid = true;
    if (this.state.orgName === "") { 
      isFormValid = false
      this.setState({orgNameValid: "This is required"})
    }
    if (this.state.orgToken === "") {
      isFormValid = false
      this.setState({orgTokenValid: "This is required"})
    }

    if (isFormValid !== true) return

    this.deploySequence()
    this.setState({
      sweetAlertOpen: true,
    });
    this.resetFormValid()
  };

  handleTouchTap = () => {
    this.deploySequence()
    this.setState({
      sweetAlertOpen: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      sweetAlertOpen: false,
    });
  };

  orgNameHandleChange = (event) => {
    this.setState({orgName: event.target.value});
  }

  orgTokenHandleChange = (event) => {
    this.setState({orgToken: event.target.value});
  }


  render() {
    return (
      <section className="page-about">
        <QueueAnim type="alpha" className="ui-animate">
          <div key="1"><Hero /></div>
        </QueueAnim>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="container-fluid">

            <section>
              <article className="article">
                <h2 className="article-title">Name your DAO</h2>
                <div className="box box-default">
                  <div className="box-body">
                    <div className="grid-structure">

                      <div className="row">
                        <div className="col-sm-12">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is helpful description.
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-6">
                          <TextField
                            hintText="New Organization"
                            floatingLabelText="Token Name"
                            floatingLabelFixed
                            value={this.state.orgName} 
                            onChange={this.orgNameHandleChange}
                            errorText={this.state.orgNameValid}
                          />  
                        </div> 
                        <div className="col-sm-6">       
                          <TextField
                            hintText="TKN"
                            floatingLabelText="Token Symbol"
                            floatingLabelFixed
                            value={this.state.orgToken} 
                            onChange={this.orgTokenHandleChange}                            
                            errorText={this.state.orgTokenValid}
                          /><br/>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </article>
            </section>

          </div>
          <div key="2" className="container-fluid"><DaoCharts /></div>
          <div key="3" className="container-fluid"><DaoDeploy onDeployBtn={this.onDeployBtn.bind(this)} /></div>
        </QueueAnim>
        <SweetAlert
          show={this.state.sweetAlertOpen}
          title="Your organization has been successfully deployed!"
          onConfirm={this.handleRequestClose}
          type="success"
        />          
      </section>
    )
  }
};


// const Page = () => (
// );

module.exports = Page;

