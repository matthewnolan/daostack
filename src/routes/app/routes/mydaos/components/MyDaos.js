import React from 'react';
import QueueAnim from 'rc-queue-anim';
import FilterableTable from 'react-filterable-table';
import 'react-filterable-table/dist/style.css';


let data = [
  { name: "Steve", address: " 0x44c210eaef95318e63274d45442e8de134e87d38", promoted: 2, actions: "Promote" },
  { name: "Cool Corp", address: " 0x44c210eaef95318e63274d45442e8de134e87d38", promoted: 3, actions: "Promote" },
  { name: "Good Org", address: " 0x44c210eaef95318e63274d45442e8de134e87d38", promoted: 0, actions: "Promote" },
  { name: "AnotherDAO", address: " 0x44c210eaef95318e63274d45442e8de134e87d38", promoted: 19, actions: "Promote" },
  { name: "AwesomeDAO", address: " 0x44c210eaef95318e63274d45442e8de134e87d38", promoted: 2, actions: "Promote" },
  { name: "DAO crew", address: " 0x44c210eaef95318e63274d45442e8de134e87d38", promoted: 3, actions: "Promote" },
  { name: "DAO Stack", address: " 0x44c210eaef95318e63274d45442e8de134e87d38", promoted: 3, actions: "Promote" },
  { name: "Steve", address: " 0x44c210eaef95318e63274d45442e8de134e87d38", promoted: 1, actions: "Promote" },
  { name: "BobCorb", address: " 0x44c210eaef95318e63274d45442e8de134e87d38", promoted: 2, actions: "Promote" },
  { name: "Cool Corp", address: " 0x44c210eaef95318e63274d45442e8de134e87d38", promoted: 23, actions: "Promote" },
  { name: "Good Org", address: " 0x44c210eaef95318e63274d45442e8de134e87d38", promoted: 0, actions: "Promote" },
  { name: "AnotherDAO", address: " 0x44c210eaef95318e63274d45442e8de134e87d38", promoted: 9, actions: "Promote" },
  { name: "AwesomeDAO", address: " 0x44c210eaef95318e63274d45442e8de134e87d38", promoted: 2, actions: "Promote" },
  { name: "DAO crew", address: " 0x44c210eaef95318e63274d45442e8de134e87d38", promoted: 88, actions: "Promote" },
  { name: "DAO Stack", address: " 0x44c210eaef95318e63274d45442e8de134e87d38", promoted: 3, actions: "Promote" },
  { name: "Steve", address: " 0x44c210eaef95318e63274d45442e8de134e87d38", promoted: 1, actions: "Promote" }
];


let fields = [
  { name: 'name', displayName: "Name", inputFilterable: true, sortable: true },
  { name: 'address', displayName: "Address", inputFilterable: true, exactFilterable: true, sortable: true },
  { name: 'promoted', displayName: "Promoted With", inputFilterable: true, exactFilterable: true, sortable: true },
  { name: 'actions', displayName: "Actions", inputFilterable: true, exactFilterable: true, sortable: true }
];

// TODO iterate on layout of table
// https://github.com/ianwitherow/react-filterable-table


const Hero = () => (
  <section className="hero hero-bg-img" style={{backgroundImage: 'url(assets/images-demo/covers/geometric-bk1.jpg)'}}>
    <div className="hero-inner">
      <div className="hero-content">
        <h1 className="hero-title">My DAOs</h1>
      </div>
      <p className="hero-tagline">All of my DAOs.</p>
    </div>
  </section>
);


const TableLayout = () => (
  <section>
    <article className="article">
      <h2 className="article-title">My DAOs</h2>
      <div className="box box-default">
        <div className="box-body">
          <div className="grid-structure">

            <div className="row">
              <div className="col-sm-12">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                <FilterableTable
                    namespace="People"
                    initialSort="name"
                    data={data}
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
);


const Page = () => (
  <section className="page-about">
    <QueueAnim type="alpha" className="ui-animate">
      <div key="1"><Hero /></div>
    </QueueAnim>
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1" className="container-fluid"><TableLayout /></div>
    </QueueAnim>
  </section>
);


module.exports = Page;

