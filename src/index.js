import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

const QueryParams = withRouter(
  class QueryParams extends React.Component {
    static propTypes = {
      children: PropTypes.func,
      render: PropTypes.func,
      replace: PropTypes.bool,
    };
    setQuery = query => {
      const currentQuery = queryString.parse(this.props.location.search);
      const { history, replace } = this.props;
      const newQuery = {
        search: queryString.stringify({
          ...currentQuery,
          ...query
        })
      };
      if (replace) {
        history.replace(newQuery);
      } else {
        history.push(newQuery);
      }
    };
    render() {
      const { location } = this.props;
      const renderProps = queryString.parse(location.search);
      let render = this.props.render;
      if (typeof this.props.children === "function") {
        render = this.props.children;
      }
      return render({
        ...renderProps,
        setQuery: this.setQuery
      });
    }
  }
);

export default QueryParams;
