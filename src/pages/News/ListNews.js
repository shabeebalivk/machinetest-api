import React, { useEffect } from "react";
import PermanentDrawerLeft from "../Drawer";
import SimpleTable from "../Table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNews, fetchingNews } from "../../redux/actions/newsActions";
import { Button } from "@mui/material";

const ListNews = () => {
  const navigate = useNavigate();
  const handleEdit = (data) => {
    navigate("/add_news", { state: { data: data } });
  };

  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);

  useEffect(() => {
    dispatch(fetchingNews());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteNews(id))
  }

  return (
    <div style={{ width: "calc(100vw - 240px)", padding: 20 }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>List News</h2>
        <Button variant="contained" onClick={() => navigate("/add_news")}>
          Add News
        </Button>
      </div>
      <SimpleTable handleEdit={handleEdit} data={news} handleDelete={handleDelete}/>
    </div>
  );
};

export default ListNews;
