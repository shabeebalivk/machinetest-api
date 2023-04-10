import axios from "axios";
import moment from "moment/moment";

function fetchingNews() {
  return (dispatch) => {
    var data = JSON.stringify({ page: 0 });
    var config = {
      method: "post",
      url: "https://tsd.shtdevops.xyz/admin/testGetNews",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(fetchedNews(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

function fetchedNews(events) {
  return {
    type: "FETCHED_NEWS",
    payload: events,
  };
}

function saveNews(news) {
  return (dispatch) => {
    console.log(news);
    var FormData = require("form-data");
    var data = new FormData();
    if (news._id) {
      data.append("id", news._id);
    }
    data.append("title", news.title);
    data.append("description", news.description);
    data.append("date_added", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
    // data.append('date_added', news.date_added);
    news.search_tags[0] && data.append("search_tags[0]", news.search_tags[0]);
    news.search_tags[1] && data.append("search_tags[1]", news.search_tags[1]);
    data.append("publish", news.publish);
    data.append("featured_image", news.featured_image);
    Array.from(news.news_image).forEach((item) => {
      data.append("news_image", item);
    });

    var config = {
      method: "post",
      url: `https://tsd.shtdevops.xyz/admin/${
        news._id ? `testUpdateNews` : `testInsertNews`
      }`,
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.status === true) {
          alert(news._id ? "updated" : "saved");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

function deleteNews(id) {
  return (dispatch) => {
    var data = JSON.stringify({ del_id: id });

    var config = {
      method: "post",
      url: "https://tsd.shtdevops.xyz/admin/testDeleteNews",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Deleted");
        dispatch(fetchingNews());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export { fetchingNews, saveNews, deleteNews };
