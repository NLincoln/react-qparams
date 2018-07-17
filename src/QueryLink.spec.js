import React from "react";

import QueryLink from "./QueryLink";
import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";

let render = ({ initial = "/route", children }) => {
  return mount(
    <MemoryRouter initialEntries={[initial]}>
      <Route
        path={(initial.pathname ? initial.pathname : initial) || "/route"}
        render={() => {
          return children;
        }}
      />
    </MemoryRouter>
  );
};

test("it renders the links", () => {
  let wrapper = render({
    children: <QueryLink query={{ name: "value" }}>Content</QueryLink>
  });
  expect(wrapper.html()).toEqual(`<a href="/route?name=value">Content</a>`);
});

test("it will override an existing link", () => {
  let wrapper = render({
    initial: {
      pathname: "/route",
      search: "?name=other"
    },
    children: <QueryLink query={{ name: "value" }}>Content</QueryLink>
  });

  expect(wrapper.html()).toEqual(`<a href="/route?name=value">Content</a>`);
});

test("it wont remove an existing qparam", () => {
  let wrapper = render({
    initial: {
      pathname: "/route",
      search: "?key=value"
    },
    children: <QueryLink query={{ name: "something" }}>Content</QueryLink>
  });
  expect(wrapper.html()).toEqual(
    `<a href="/route?key=value&amp;name=something">Content</a>`
  );
});

test("it respects the to prop", () => {
  let wrapper = render({
    children: (
      <QueryLink to={"/other-route"} query={{ name: "value" }}>
        Content
      </QueryLink>
    )
  });
  expect(wrapper.html()).toEqual(
    `<a href="/other-route?name=value">Content</a>`
  );
});

test("it can handle an object for the location", () => {
  let wrapper = render({
    children: (
      <QueryLink
        to={{ pathname: "/other-route", hash: "#foo" }}
        query={{ name: "value" }}
      >
        Content
      </QueryLink>
    )
  });
  expect(wrapper.html()).toEqual(
    `<a href="/other-route?name=value#foo">Content</a>`
  );
});
