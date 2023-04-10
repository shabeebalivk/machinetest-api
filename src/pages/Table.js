import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

export default function SimpleTable({ handleEdit, data, page, handleDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ backgroundColor: "#324d48" }}>
          <TableRow>
            <TableCell align="center" style={{ color: "white" }}>
              TITLE
            </TableCell>
            <TableCell align="center" style={{ color: "white" }}>
              DATE ADDED
            </TableCell>
            <TableCell align="center" style={{ color: "white" }}>
              PUBLISH
            </TableCell>
            <TableCell align="center" style={{ color: "white" }}>
              {page === "events" ? "LOCATION" : "DESCRIPTION"}
            </TableCell>
            <TableCell align="center" style={{ color: "white" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="center">{row.date_added}</TableCell>
              <TableCell align="center">
                {row.publish == "1" ? "Yes" : "No"}
              </TableCell>
              <TableCell align="center">
                {page === "events" ? row.location : row.description}
              </TableCell>
              <TableCell align="center">
                <IconButton onClick={() => handleEdit(row)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(row._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
