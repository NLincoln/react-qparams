import React from "react";
import QueryParams from "./index";
import { MemoryRouter, Route, Link } from "react-router-dom";
import { mount } from "enzyme";

describe("<QueryParams />", () => {
  let setup = (initial, render) => {
    return mount(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/",
            search: initial
          }
        ]}
      >
        <div>
          <Route
            path={"/"}
            render={({ location }) => <span id={"url"}>{location.search}</span>}
          />
          <QueryParams>{render}</QueryParams>
        </div>
      </MemoryRouter>
    );
  };
  test("it provides the current url query as a render prop", () => {
    expect.assertions(2);
    let wrapper = setup("?foo=bar&bar=baz", query => {
      expect(query.foo).toBe("bar");
      expect(query.bar).toBe("baz");
      return null;
    });
    wrapper.unmount();
  });
  test("the query can be set", () => {
    let wrapper = setup("?a=b", query => {
      return (
        <button
          onClick={() =>
            query.setQuery({
              a: "c"
            })
          }
        >
          {query.a}
        </button>
      );
    });

    expect(wrapper.find("button")).toHaveText("b");
    expect(wrapper.find("#url")).toHaveText("?a=b");
    wrapper.find("button").simulate("click");
    // The component is re-rendered
    expect(wrapper.find("button")).toHaveText("c");
    // The URL updates
    expect(wrapper.find("#url")).toHaveText("?a=c");
    wrapper.unmount();
  });
  test("adding a new key", () => {
    let wrapper = setup("?a=b", query => {
      return (
        <button
          onClick={() =>
            query.setQuery({
              b: "c"
            })
          }
        >
          <span id={"a"}>{query.a}</span>
          <span id={"b"}>{query.b}</span>
        </button>
      );
    });
    expect(wrapper.find("#b")).toHaveText("");
    wrapper.find("button").simulate("click");
    expect(wrapper.find("#a")).toHaveText("b");
    expect(wrapper.find("#b")).toHaveText("c");
    expect(wrapper.find("#url")).toHaveText("?a=b&b=c");
    wrapper.unmount();
  });
  test("clearing a key", () => {
    let wrapper = setup("?a=b&b=c", query => {
      return (
        <button
          onClick={() =>
            query.setQuery({
              a: undefined
            })
          }
        >
          <span id={"a"}>{query.a}</span>
        </button>
      );
    });
    wrapper.find("button").simulate("click");
    expect(wrapper.find("#url")).toHaveText("?b=c");
    expect(wrapper.find("#a")).toHaveText("");
    wrapper.unmount();
  });
});
