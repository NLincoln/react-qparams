import QueryParams from "react-qparams";

function RenderView(props) {
  return (
    <QueryParams>
      {query => (
        <button onClick={() => query.setQuery({ tab: "other" })}>
          {query.tab || "default"}
        </button>
      )}
    </QueryParams>
  );
}
