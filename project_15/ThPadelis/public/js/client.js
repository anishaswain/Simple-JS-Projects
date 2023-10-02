$(function () {
  const socket = io.connect();
  // Log in area DOM
  const loginArea = $("#loginArea");
  const userForm = $("#userForm");
  const userName = $("#username");

  // Chat area DOM
  const chatArea = $("#chatArea");
  const chatMessages = $("#chatMessages");
  const chatForm = $("#chatForm");
  const message = $("#message");

  // On login form submit
  userForm.submit(function (e) {
    e.preventDefault();

    if (userName.val() != "") {
      socket.emit("new:member", userName.val(), function (data) {
        if (data) {
          loginArea.hide();
          chatArea.show();
          message.focus();
        } else {
          $("#usernameError").html("Username is taken...");
        }
      });
    }
    userName.val("");
  });

  // On message form submit
  chatForm.submit(function (e) {
    e.preventDefault();

    if (message.val() != "") {
      socket.emit("new:message", message.val());
      message.val("");
    }
  });

  // Listen on events

  // Display and count online users
  socket.on("users:get", function (data) {
    let displayUsers = "";
    for (let i = 0; i < data.length; i++) {
      displayUsers += `<li class="nav-item"><a href="#" class="nav-link text-dark text-truncate" data-toggle="modal" data-target="#directModal">${data[i]}</a></li>`;
    }

    $("#users-now").html(displayUsers);
    $("#online-now").html(data.length);
  });

  // Display member connected message
  socket.on("member:connected", function (data) {
    console.log(`${data} connected...`);
    chatMessages.append(
      `<p class="mb-2 text-center text-muted"><em>${data} connected...</em</p>`
    );
  });

  // Display member disconnected message
  socket.on("member:disconnected", function (data) {
    chatMessages.append(
      `<p class="mb-2 text-center text-muted"><em>${data} disconnected...</em</p>`
    );
  });

  // Display new message
  socket.on("new:message", function (data) {
    chatMessages.append(
      `<p class="mb-2"><strong style="color: ${data.color};">${data.username}: </strong>${data.message}</p>`
    );
    chatMessages.scrollTop(chatMessages[0].scrollHeight);
  });
});
