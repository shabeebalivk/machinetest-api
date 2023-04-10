import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveNews } from "../../redux/actions/newsActions";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";

const AddNews = () => {
  const dispatch = useDispatch();
  const {state} = useLocation();
  const [news, setNews] = useState((state && state.data) ? state.data:  {
    title: "",
    description: "",
    date_added: "",
    search_tags: [],
    publish: 0,
    featured_image: "",
    news_image: [],
    tag: "",
  });

  const [featuredPreview, setFeaturedPreview] = useState();
  const [preview, setPreview] = useState([]);

  const handleChange = (event) => {
    if (event.target.type === "file") {
      setNews({
        ...news,
        [event.target.name]:
          event.target.name === "featured_image"
            ? event.target.files[0]
            : event.target.files,
      });
      if (event.target.name === "featured_image") {
        setFeaturedPreview(URL.createObjectURL(event.target.files[0]));
      } else {
        Array.from(event.target.files).forEach((item) => {
          console.log(item);
          setPreview((prev) => [
            ...prev,
            { image: URL.createObjectURL(item), name: item.name },
          ]);
        });
      }
    } else {
      setNews({ ...news, [event.target.name]: event.target.value });
    }
  };

  const handleSave = () => {
    dispatch(saveNews(news));
  };

  const deleteFeaturedImage = () => {
    setFeaturedPreview();
    setNews({ ...news, featured_image: "" });
  };

  const deleteImage = (name, index) => {
    setPreview(preview.filter((pre) => pre.name !== name));

    let fileBuffer = Array.from(news.news_image);
    fileBuffer.splice(index, 1);

    const dT = new ClipboardEvent("").clipboardData || new DataTransfer();

    for (let file of fileBuffer) {
      dT.items.add(file);
    }

    setNews({
      ...news,
      news_image: dT.files,
    });
  };

  const handlePressEnter = (event) => {
    if (event.key === "Enter") {
      setNews({
        ...news,
        search_tags: [...news.search_tags, event.target.value],
        tag: "",
      });
    }
  };

  const removeTag = (item, e) => {
    e.preventDefault();
    setNews({
      ...news,
      search_tags: news.search_tags.filter((obj) => obj !== item),
    });
  };

  return (
    <div style={{ width: "calc(100vw - 240px)", padding: 20 }}>
      <h2>Add News</h2>
      <Box component="form" noValidate autoComplete="off">
        <Grid container md={12} spacing={2}>
          <Grid md={4} item>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              style={{ width: "100%" }}
              name="title"
              value={news.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid md={4} item>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              style={{ width: "100%" }}
              name="description"
              value={news.description}
              onChange={handleChange}
            />
          </Grid>
          {/* <Grid md={4} item>
            <input
              type="datetime-local"
              id="outlined-basic"
              variant="outlined"
              name="date_added"
              style={{ height: 56 }}
              value={news.date_added || Date.now()}
              onChange={handleChange}
            />
          </Grid> */}
          <Grid md={4} item>
            <TextField
              id="outlined-basic"
              label="Tags"
              variant="outlined"
              value={news.tag}
              disabled={news.search_tags.length === 2}
              name="tag"
              style={{ width: "100%" }}
              onChange={handleChange}
              onKeyDown={handlePressEnter}
            />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {news.search_tags.map((item) => (
                <div
                  style={{
                    padding: "5px 10px",
                    border: "1px solid black",
                    backgroundColor: "white",
                    marginRight: 10,
                    marginBottom: 10,
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                >
                  <span>{item}</span>
                  <IconButton
                    onClick={(e) => removeTag(item, e)}
                    style={{ marginLeft: 20, cursor: "pointer" }}
                  >
                    <Delete />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>
          <Grid md={4} item>
            <FormControlLabel
              control={
                <Switch
                  name="publish"
                  checked={news.publish}
                  onChange={(e) =>
                    setNews({ ...news, publish: e.target.checked ? 1: 0 })
                  }
                />
              }
              label="Publish"
            />
          </Grid>
        </Grid>
        <h4>Featured Image</h4>
        <Grid container md={12}>
          <Grid
            item
            md={4}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "100%" }}
              type="file"
              name="featured_image"
              onChange={handleChange}
              key={Date.now()}
            />
            {news.featured_image && (
              <>
                <img src={featuredPreview} alt="img" width={200} />
                <div>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={deleteFeaturedImage}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </Grid>
        </Grid>

        <h4>News Image</h4>
        <Grid container md={12} spacing={2} marginTop={1}>
          <Grid
            md={4}
            item
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "100%" }}
              key={Date.now()}
              type="file"
              inputProps={{
                multiple: true,
                accept: "image/*",
              }}
              name="news_image"
              onChange={handleChange}
            />
            <div
              style={{ display: "flex", alignItems: "center", marginLeft: 200 }}
            >
              {preview.map((item, index) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <img src={item.image} alt="img" width={200} />
                  <div>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteImage(item.name, index)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          md={12}
          spacing={2}
          marginTop={2}
          alignItems={"flex-end"}
          justifyContent={"flex-end"}
        >
          <Button color="primary" variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </Box>
    </div>
  );
};

export default AddNews;
