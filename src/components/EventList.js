import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import EventIcon from "@material-ui/icons/Event";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import RemoveIcon from "@material-ui/icons/Remove";
import { format } from "date-fns";
import { dateFormat } from "../utils/DateUtils";
import 'tachyons';
const containerStyle = {
  overflowY: "scroll",
  width: "100%"
};

const EventList = (props) => {
  
  const events = props.events
    .sort((a, b) => {
      return new Date(a.dtstart) > new Date(b.dtend) ? 1 : -1;
    })
    .map((node, index) => {
      const fmtDTStart = format(new Date(node.dtstart), dateFormat);
      const fmtDTEnd = format(new Date(node.dtend), dateFormat);
     
      return (
        <div key={index}>
          <ListItem button alignItems="flex-start" className='br3 pa3 ma2 dib bw2 shadow-5 c'>
            <ListItemIcon>
              <EventIcon style={{ color: "#FFFF00", fontSize: "2em" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    component="p"
                    //variant="body2"
                    style={{ color: "black" }}
                  >
                    <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      From:
                    </span>
                    {fmtDTStart}
                  </Typography>
                  <Typography
                    component="p"
                    //variant="body2"
                    style={{ color: "#black" }}
                  >
                    <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      To:
                    </span>
                    {fmtDTEnd}
                  </Typography>
                  
                  <Typography component="p" style={{ color: "#black" }}>
                  <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      duration (minutes):
                    </span>
                  {node.duration} 
                  </Typography>
                  <Typography
                    component="p"
                    //variant="body2"
                    style={{ color: "#black", fontWeight: "bold" }}
                  >
                    {node.title}
                  </Typography>
                  <Typography
                    component="p"
                    //variant="body2"
                    style={{ color: "#black" }}
                  >
                    <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      Location:
                    </span>
                    {node.location}
                  </Typography>
                  <Typography
                    component="p"
                    //variant="body2"
                    style={{ color: "#black" }}
                  >
                    <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      Status:
                    </span>
                    <p style={{color: "darkcyan", fontWeight: "bold"}}>{node.status}</p>
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    //variant="body2"
                    style={{ color: "#FFFFFF", fontSize: "1em" }}
                  >
                    {node.description}
                  </Typography>
                </React.Fragment>
              }
            />
            <div
              style={{
                position: "absolute",
                right: "2em",
                top: "1em",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<RemoveIcon />}

                onClick={() => props.onRemoveItem(node)}
                title="Cancel (Delete) Appointment"
                disabled={props.formVisible}
                className="deletebutton grow"
                style={{ marginBottom: "1em" }}
              >
                <span className="buttontext">Cancel (Delete)</span>
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => props.onEditItem(node)}
                title="Edit Appointment"
                disabled={props.formVisible}
                className="editbutton grow"
                style={{ marginBottom: "1em" }}
              >
                <span className="buttontext">Edit</span>
              </Button>
              <Button
                variant="contained"
                color="primary"                
                onClick={() => props.onApproveItem(node)}
                title="Confirm Appointment"
                disabled={props.formVisible}
                className="editbutton grow"

              >
                <span className="buttontext">Confirm</span>
              </Button>
            </div>
          </ListItem>
        </div>
      );
    });
  return (
    <div style={containerStyle}>
      <List>{events}</List>
    </div>
  );
};
export default EventList;