const MessageSort = (title, users) => {
  users = users.users;
  if (!Array.isArray(users)) {
    console.log("users is not an array");
  }

  const timeFix = (delta) => {
    let hours = Math.floor(delta / 3600);
    delta -= hours * 3600;
    if (hours === 0) {
      hours = "00";
    } else if (hours.length === 1) {
      hours = `0${hours}`;
    }
    let mins = Math.floor(delta / 60);
    delta -= mins * 60;
    if (mins === 0) {
      mins = "00";
    } else if (mins.length === 1) {
      mins = `0${mins}`;
    }
    let secs = delta;
    if (secs == 0) {
      secs = "00";
    } else if (secs < 10) {
      secs = `0${secs}`;
    }

    return `${hours}:${mins}:${secs}`;
  };
  let userList = [];
  if (title === "Messages") {
    const filterData = users.sort(
      (a, b) => b.numberOfMessages - a.numberOfMessages
    );

    userList = filterData.map((user) => {
      return {
        key: user.userID,
        username: user.username,
        data: user.numberOfMessages,
        avatar: user.avatar || null,
      };
    });
  } else if (title === "Voice") {
    const filterData = users.sort((a, b) => b.voiceChatTime - a.voiceChatTime);
    userList = filterData.map((user) => {
      let time = timeFix(user.voiceChatTime);
      return {
        key: user.userID,
        username: user.username,
        data: time,
        avatar: user.avatar || null,
      };
    });
  } else if (title === "Invites") {
    const filterData = users.sort(
      (a, b) => b.invitees.length - a.invitees.length
    );

    userList = filterData.map((user) => {
      return {
        key: user.userID,
        username: user.username,
        data: user.invitees.length,
        avatar: user.avatar || null,
      };
    });
  } else if (title === "Karma") {
    const filterData = users.sort((a, b) => b.karma - a.karma);
    userList = filterData.map((user) => {
      console.log(user);
      return {
        key: user.userID,
        username: user.username,
        data: user.karma,
        avatar: user.avatar || null,
      };
    });
  }
  return userList;
};

export default MessageSort;
