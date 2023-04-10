import React, { useEffect, useState } from "react";
import SimpleTable from "../Table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost, deleteEvent, fetchingEvents, fetchingJoke } from "../../redux/actions/eventActions";
import { Button } from "@mui/material";

const ListEvents = () => {
  const navigate = useNavigate();
  const handleEdit = (data) => {
    navigate("/add_events", { state: { data: data } });
  };

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);

  useEffect(() => {
    dispatch(fetchingEvents());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id))
  }

  return (
    <div style={{ width: "calc(100vw - 240px)", padding: 20 }}>
      <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
        <h2>List Events</h2>
        <Button variant="contained" onClick={()=> navigate("/add_events")}>Add Event</Button>
      </div>
      <SimpleTable page="events" handleEdit={handleEdit} data={events} handleDelete={handleDelete} />
    </div>
  );
};

export default ListEvents;
