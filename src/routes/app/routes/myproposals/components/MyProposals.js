import React from 'react';
import QueueAnim from 'rc-queue-anim';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const pie1 = {};

pie1.options = {
  title: {
    show: false,
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
    show: false,
    feature: {
      saveAsImage: {show: false, title: 'save'}
    }
  },
  calculable: false,
  series: [
    {
      name: 'Vist source',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        {value: 335, name: 'Prop 1'},
        {value: 310, name: 'Prop 2'},
        {value: 234, name: 'Prop 3'}
      ]
    }
  ]
};

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};


const Hero = () => (
  <section className="hero hero-bg-img" style={{backgroundImage: 'url(assets/images-demo/covers/geometric-bk1.jpg)'}}>
    <div className="hero-inner">
      <div className="hero-content">
        <h1 className="hero-title">My Proposals</h1>
      </div>
      <p className="hero-tagline">All of my proposals.</p>
    </div>
  </section>
);


const TableLayout = () => (
  <section>
    <article className="article">
      <h2 className="article-title">My Proposals</h2>
      
      <div className="row">

        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Proposal 1</div>
            <div className="box-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
                <div><ReactEcharts option={pie1.options} showLoading={false} /></div>

                <RadioButtonGroup name="proposal" defaultSelected="prop1">
                  <RadioButton
                    value="prop1"
                    label="Prop 1"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop2"
                    label="Prop 2"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop3"
                    label="Prop 3"
                    style={styles.radioButton}
                          />
                </RadioButtonGroup>
                <RaisedButton label="Vote" />
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Proposal 2</div>
            <div className="box-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
                <div><ReactEcharts option={pie1.options} showLoading={false} /></div>

                <RadioButtonGroup name="proposal" defaultSelected="prop1">
                  <RadioButton
                    value="prop1"
                    label="Prop 1"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop2"
                    label="Prop 2"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop3"
                    label="Prop 3"
                    style={styles.radioButton}
                          />
                </RadioButtonGroup>
                <RaisedButton label="Vote" />
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Proposal 3</div>
            <div className="box-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
                <div><ReactEcharts option={pie1.options} showLoading={false} /></div>

                <RadioButtonGroup name="proposal" defaultSelected="prop1">
                  <RadioButton
                    value="prop1"
                    label="Prop 1"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop2"
                    label="Prop 2"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop3"
                    label="Prop 3"
                    style={styles.radioButton}
                          />
                </RadioButtonGroup>
                <RaisedButton label="Vote" />
            </div>
          </div>
        </div>

      </div>
      
      <div className="row">

        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Proposal 1</div>
            <div className="box-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
                <div><ReactEcharts option={pie1.options} showLoading={false} /></div>

                <RadioButtonGroup name="proposal" defaultSelected="prop1">
                  <RadioButton
                    value="prop1"
                    label="Prop 1"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop2"
                    label="Prop 2"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop3"
                    label="Prop 3"
                    style={styles.radioButton}
                          />
                </RadioButtonGroup>
                <RaisedButton label="Vote" />
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Proposal 2</div>
            <div className="box-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
                <div><ReactEcharts option={pie1.options} showLoading={false} /></div>

                <RadioButtonGroup name="proposal" defaultSelected="prop1">
                  <RadioButton
                    value="prop1"
                    label="Prop 1"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop2"
                    label="Prop 2"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop3"
                    label="Prop 3"
                    style={styles.radioButton}
                          />
                </RadioButtonGroup>
                <RaisedButton label="Vote" />
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Proposal 3</div>
            <div className="box-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
                <div><ReactEcharts option={pie1.options} showLoading={false} /></div>

                <RadioButtonGroup name="proposal" defaultSelected="prop1">
                  <RadioButton
                    value="prop1"
                    label="Prop 1"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop2"
                    label="Prop 2"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop3"
                    label="Prop 3"
                    style={styles.radioButton}
                          />
                </RadioButtonGroup>
                <RaisedButton label="Vote" />
            </div>
          </div>
        </div>

      </div>
      
      <div className="row">

        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Proposal 1</div>
            <div className="box-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
                <div><ReactEcharts option={pie1.options} showLoading={false} /></div>

                <RadioButtonGroup name="proposal" defaultSelected="prop1">
                  <RadioButton
                    value="prop1"
                    label="Prop 1"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop2"
                    label="Prop 2"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop3"
                    label="Prop 3"
                    style={styles.radioButton}
                          />
                </RadioButtonGroup>
                <RaisedButton label="Vote" />
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Proposal 2</div>
            <div className="box-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
                <div><ReactEcharts option={pie1.options} showLoading={false} /></div>

                <RadioButtonGroup name="proposal" defaultSelected="prop1">
                  <RadioButton
                    value="prop1"
                    label="Prop 1"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop2"
                    label="Prop 2"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop3"
                    label="Prop 3"
                    style={styles.radioButton}
                          />
                </RadioButtonGroup>
                <RaisedButton label="Vote" />
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Proposal 3</div>
            <div className="box-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
                <div><ReactEcharts option={pie1.options} showLoading={false} /></div>

                <RadioButtonGroup name="proposal" defaultSelected="prop1">
                  <RadioButton
                    value="prop1"
                    label="Prop 1"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop2"
                    label="Prop 2"
                    style={styles.radioButton}
                          />
                  <RadioButton
                    value="prop3"
                    label="Prop 3"
                    style={styles.radioButton}
                          />
                </RadioButtonGroup>
                <RaisedButton label="Vote" />
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

