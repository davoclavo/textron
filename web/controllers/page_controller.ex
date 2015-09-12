defmodule Textron.PageController do
  use Textron.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
