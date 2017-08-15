import React from 'react';
import QueueAnim from 'rc-queue-anim';
import FilterableTable from 'react-filterable-table';
import 'react-filterable-table/dist/style.css';


let fields = [
  { name: 'name', displayName: "Name", inputFilterable: true, sortable: true },
  { name: 'address', displayName: "Address", inputFilterable: true, exactFilterable: true, sortable: true },
  { name: 'members', displayName: "Members", inputFilterable: true, exactFilterable: true, sortable: true },
  { name: 'promotedAmount', displayName: "Promoted Token", inputFilterable: true, exactFilterable: true, sortable: true },
  { name: 'rank', displayName: "Rank", inputFilterable: true, exactFilterable: true, sortable: true },
  { name: 'reputation', displayName: "Reputation", inputFilterable: true, exactFilterable: true, sortable: true },
  { name: 'tokens', displayName: "Tokens", inputFilterable: true, exactFilterable: true, sortable: true },
  { name: 'actions', displayName: "Actions", inputFilterable: true, exactFilterable: true, sortable: true }
];


const Hero = () => (
  <section className="hero hero-bg-img" style={{backgroundImage: 'url(assets/images-demo/covers/geometric-bk1.jpg)'}}>
    <div className="hero-inner">
      <div className="hero-content">
        <h1 className="hero-title">Promote a DAO</h1>
      </div>
      <p className="hero-tagline">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </section>
);


class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sweetAlertOpen: false,
      organizationArray: []
    };
  }

  componentDidMount () {

    let updateState = () => {
      let web3 = window.web3Instance.web3
      this.setState({web3: web3})
      this.setState({contractAddress: window.web3Instance.daoStackAddresses.simpleICO})  
      this.readOrganizations()
    }

    if (typeof window.web3Instance == 'object'){
      updateState()
    } else {
      window.addEventListener("web3Event", () => { 
        updateState()
      });    
    }
  }

  readOrganizations () {

    const web3 = window.web3Instance.web3
    const myDefAddrss = web3.eth.accounts[0]
    const orgBoardAddress = OrganizationsBoard.networks[CURRENT_CHAIN_ID]['address']


    const OrganizationsBoardCont = contract(OrganizationsBoard)
    const newOrganizationArray = []
    OrganizationsBoardCont.setProvider(web3.currentProvider)
    OrganizationsBoardCont.at(orgBoardAddress).then(inst => {
      console.log(inst);
      const myEvent = inst.OrgAdded({}, { fromBlock: 0 })
      myEvent.get((err, eventsArray) => {
        if (!err) {
          for (let cnt = 0; cnt < eventsArray.length; cnt++) {
            let promotedAmount = 0
            inst.orgList.call(eventsArray[cnt].args._addrss).then(res => {
              promotedAmount = Number(web3.fromWei(res[1]))
              this.state.organizationArray[cnt].promotedAmount = promotedAmount
              this.forceUpdate()
              if (eventsArray.length === (cnt + 1)) {
                const sortedArray = this.state.organizationArray.sort((a, b) => {
                  return b.promotedAmount - a.promotedAmount
                })
                this.setState({ organizationArray: sortedArray })
              }
            })
            newOrganizationArray[cnt] = {
              rank: cnt + 1,
              name: eventsArray[cnt].args._orgName,
              members: 3,
              tokens: 300000,
              reputation: 30000,
              promotedAmount: promotedAmount,
              address: eventsArray[cnt].args._addrss,
            }
          }
          console.log(newOrganizationArray);
          this.setState({ organizationArray: newOrganizationArray })
        }
      })
    })
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
                <h2 className="article-title">Promote DAOs</h2>
                <div className="box box-default">
                  <div className="box-body">
                    <div className="grid-structure">

                      <div className="row">
                        <div className="col-sm-12">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                          <FilterableTable
                              namespace="People"
                              initialSort="name"
                              data={this.state.organizationArray}
                              fields={fields}
                              noRecordsMessage="There are no people to display"
                              noFilteredRecordsMessage="No people match your filters!"
                          />

                        </div>
                      </div>

                    </div>
                    
                  </div>
                </div>
              </article>
            </section>          
          </div>
        </QueueAnim>
      </section>
    )
  }
}


module.exports = Page;

