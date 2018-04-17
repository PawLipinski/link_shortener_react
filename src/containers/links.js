import React from 'react';

import Pagination from '../components/Pagination';
import Searchbar from '../components/Searchbar';
import StopsTable from '../components/LinksTable';
import { CFG_HTTP } from '../cfg/cfg_http';
import { UtilsApi } from '../utils/utils_api';

class LinksContainer extends React.Component {
  handlePageChange = (pageNumber) => {
    this.fetchLinks(this.state.searchPhrase, pageNumber);
  };

  fetchLinks = (searchPhrase = '', currentPage = 1) => {
    let sendData = {page: currentPage};

    if(searchPhrase) {
      sendData.search = searchPhrase;
    }

    UtilsApi
      .get(CFG_HTTP.URL_LINKS, sendData)
      .then((links) => {
        this.setState({
          links: links.items,
          searchPhrase,
          pagesLimit: links.pageInfo.maxPage,
          currentPage: links.pageInfo.currentPage
        });
      });
  };

  componentDidMount() {
    this.fetchLinks();
  }

  constructor() {
    super();

    this.state = {
      links: [],
      searchPhrase: '',
      pagesLimit: 0,
      currentPage: 1
    };
  }

  render() {
    return (
      <React.Fragment>
        <Searchbar onSearch={this.fetchLinks} />
        <Pagination currentPage={this.state.currentPage}
                    pagesLimit={this.state.pagesLimit}
                    onPageChange={this.handlePageChange} />
        <StopsTable links={this.state.links} />
      </React.Fragment>
    );
  }
}

export default LinksContainer;
