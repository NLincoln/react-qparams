import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import QueryLink from "./QueryLink";

const QueryParams = withRouter(
  class QueryParams extends React.Component {
    static propTypes = {
      children: PropTypes.func,
      render: PropTypes.func
    };
    setQuery = (query, options = { replace: false }) => {
      let currentQuery = queryString.parse(this.props.location.search);
      options.replace
        ? this.props.history.replace({
            search: queryString.stringify({
              ...currentQuery,
              ...query
            })
          })
        : this.props.history.push({
            search: queryString.stringify({
              ...currentQuery,
              ...query
            })
          });
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
export { QueryLink, QueryParams };
export default QueryParams;
