import React from "react";
import { withRouter, Link } from "react-router-dom";
import queryString from "query-string";
import PropTypes from "prop-types";

export default withRouter(
  class QueryLink extends React.Component {
    static propTypes = {
      query: PropTypes.object
    };

    render() {
      let {
        location,
        history,
        match,
        query,
        to,
        staticContext, // No idea where this gets passed in, but it's necessary
        ...rest
      } = this.props;
      /**
       * `to` is an optional prop. We fill it in with the current route if it is.
       */
      if (!to) {
        to = location;
      }

      if (typeof to === "string") {
        to = { pathname: to };
      }

      let currentQuery = queryString.parse(location.search);
      let search = queryString.stringify({
        ...currentQuery,
        ...query
      });

      return (
        <Link
          to={{
            ...to,
            search
          }}
          {...rest}
        />
      );
    }
  }
);
