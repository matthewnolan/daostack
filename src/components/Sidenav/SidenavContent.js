import React from 'react';
import { Link, hashHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import 'jquery-slimscroll/jquery.slimscroll.min';


class SidebarContent extends React.Component {

  componentDidMount() {
    const nav = this.nav;
    const $nav = $(nav);

    // scroll
    $nav.slimscroll({
      height: '100%'
    });


    // Append icon to submenu
    // Append to child `div`
    $nav.find('.prepend-icon').children('div').prepend('<i class="material-icons">keyboard_arrow_right</i>');


    // AccordionNav
    const slideTime = 250;
    const $lists = $nav.find('ul').parent('li');
    $lists.append('<i class="material-icons icon-has-ul">arrow_drop_down</i>');
    const $As = $lists.children('a');

    // Disable A link that has ul
    $As.on('click', event => event.preventDefault());

    // Accordion nav
    $nav.on('click', (e) => {

      const target = e.target;
      const $parentLi = $(target).closest('li'); // closest, insead of parent, so it still works when click on i icons
      if (!$parentLi.length) return; // return if doesn't click on li
      const $subUl = $parentLi.children('ul');


      // let depth = $subUl.parents().length; // but some li has no sub ul, so...
      const depth = $parentLi.parents().length + 1;

      // filter out all elements (except target) at current depth or greater
      const allAtDepth = $nav.find('ul').filter(function () {
        if ($(this).parents().length >= depth && this !== $subUl.get(0)) {
          return true;
        }
        return false;
      });
      allAtDepth.slideUp(slideTime).closest('li').removeClass('open');

      // Toggle target
      if ($parentLi.has('ul').length) {
        $parentLi.toggleClass('open');
      }
      $subUl.stop().slideToggle(slideTime);

    });


    // HighlightActiveItems
    const $links = $nav.find('a');
    const currentLocation = hashHistory.getCurrentLocation();
    function highlightActive(pathname) {
      const path = `#${pathname}`;

      $links.each((i, link) => {
        const $link = $(link);
        const $li = $link.parent('li');
        const href = $link.attr('href');
        // console.log(href);

        if ($li.hasClass('active')) {
          $li.removeClass('active');
        }
        if (path.indexOf(href) === 0) {
          $li.addClass('active');
        }
      });
    }
    highlightActive(currentLocation.pathname);
    hashHistory.listen((location) => {
      highlightActive(location.pathname);
    });
  }


  render() {

    return (
      <ul className="nav" ref={(c) => { this.nav = c; }}>
        <li className="nav-header"><span>Welcome</span></li>

        <li><FlatButton href="#/app/getstack"><i className="nav-icon material-icons">list</i><span className="nav-text">Get Stack</span></FlatButton></li>

        <li><FlatButton href="#/app/newdao"><i className="nav-icon material-icons">add</i><span className="nav-text">Get New DAO</span></FlatButton></li>

        <li><FlatButton href="#/app/mydaos"><i className="nav-icon material-icons">face</i><span className="nav-text">My DAOs</span></FlatButton></li>

        <li><FlatButton href="#/app/browsedaos"><i className="nav-icon material-icons">search</i><span className="nav-text">Browse DAOs</span></FlatButton></li>

        <li><FlatButton href="#/app/promotedao"><i className="nav-icon material-icons">mode_edit</i><span className="nav-text">Promote DAO</span></FlatButton></li>

        <li><FlatButton href="#/app/newproposal"><i className="nav-icon material-icons">add</i><span className="nav-text">New Proposal</span></FlatButton></li>

        <li><FlatButton href="#/app/myproposals"><i className="nav-icon material-icons">face</i><span className="nav-text">My Proposals</span></FlatButton></li>

        <li className="nav-divider" />

        <li><FlatButton href="#/app/page/about"><i className="nav-icon material-icons">info_outline</i><span className="nav-text">About</span></FlatButton></li>

        <li><FlatButton href="#/app/page/about"><i className="nav-icon material-icons">attach_money</i><span className="nav-text">Presale</span></FlatButton></li>

        <li><FlatButton href="#/app/page/about"><i className="nav-icon material-icons">import_contacts</i><span className="nav-text">Whitepaper</span></FlatButton></li>

        <li><FlatButton href="https://github.com/daostack/daostack" target="_blank"><i className="nav-icon material-icons">fiber_manual_record</i><span className="nav-text">Github</span></FlatButton></li>

        <li><FlatButton href="https://daostack.slack.com/" target="_blank"><i className="nav-icon material-icons">fiber_manual_record</i><span className="nav-text">Slack</span></FlatButton></li>










      </ul>
    );
  }
}

module.exports = SidebarContent;
