import axios from "axios";
import moment from "moment/moment";

function fetchingEvents() {
  return (dispatch) => {
    var data = JSON.stringify({ page: 0 });
    var config = {
      method: "post",
      url: "https://tsd.shtdevops.xyz/admin/testGetEvents",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(fetchedEvents(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

function fetchedEvents(events) {
  return {
    type: "FETCHED_EVENTS",
    payload: events,
  };
}

function saveEvent(event) {
  return (dispatch) => {
    console.log(event);
    var FormData = require("form-data");
    var data = new FormData();
    if (event._id) {
      data.append("id", event._id);
    }
    data.append("title", event.title);
    data.append("full_descripton", event.full_description);
    data.append("short_descripton", event.short_description);
    data.append("location", event.location);
    data.append("date_added", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
    // data.append('date_added', event.date_added);
    event.search_tags[0] && data.append("search_tags[0]", event.search_tags[0]);
    event.search_tags[1] && data.append("search_tags[1]", event.search_tags[1]);
    data.append("publish", event.publish);
    data.append("featured_image", event.featured_image);
    Array.from(event.events_image).forEach((item) => {
      data.append("news_image", item);
    });

    var config = {
      method: "post",
      url: `https://tsd.shtdevops.xyz/admin/${
        event._id ? `testUpdateEvent` : `testInsertEvent`
      }`,
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.status === true) {
          alert(event._id ? "updated" : "saved");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

function deleteEvent(id) {
  return (dispatch) => {
    var data = JSON.stringify({ del_id: id });

    var config = {
      method: "post",
      url: "https://tsd.shtdevops.xyz/admin/testDeleteEvent",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Deleted");
        dispatch(fetchingEvents());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export {
  fetchingEvents,
  deleteEvent,
  saveEvent,
};
