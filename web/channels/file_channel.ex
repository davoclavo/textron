defmodule Textron.FileChannel do
  use Phoenix.Channel

  def join("file:lobby", auth_msg, socket) do
    {:ok, socket}
  end

  def handle_in("file:cursor", body, socket) do
    #IO.puts "moved!"
    broadcast! socket, "file:cursor", body
    {:noreply, socket}
  end
end
