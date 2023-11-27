import { Typography, Stack, Container, Box, Grid, Card, CardContent, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ResponsiveNetwork } from '@nivo/network'

const InviteNetwork = ({invitees, username, serverID}) => {
  const currentHeight = window.innerHeight*0.25;
  const [iNodes, setiNodes] = useState([]);
  const [links, setLinks] = useState([]);  
  const [iUsernames, setIUsernames] = useState([]);

  const getUsernames = async (serverID, userID) => {
    try {
      const response = await fetch(`http://localhost:3000/users/byServerUser/${serverID}/${userID}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (iUsernames.length === 0) {
      // Create an array of promises for inviteeUsernames
      const inviteeUsernamePromises = invitees.map((invitee) => getUsernames(serverID, invitee));
  
      Promise.all(inviteeUsernamePromises)
        .then((resolvedUsernames) => {
          setIUsernames(resolvedUsernames);
  
          if (iNodes.length === 0 && links.length === 0) {
            const newINodes = [
              {
                "id": username,
                "height": 2,
                "size": 50,
                "color": "#41772b"
              }
            ];
            const newLinks = [{}];
  
            for (let i = 0; i < resolvedUsernames.length; i++) {
              const inviteeNode = {
                "id": resolvedUsernames[i].username,
                "height": 1,
                "size": 25,
                "color": "#5dab3e"
              };
              const inviteeLink = {
                "source": username,
                "target": resolvedUsernames[i].username,
                "distance": 80
              };
  
              newINodes.push(inviteeNode);
              newLinks.push(inviteeLink);
            }
  
            setiNodes(newINodes);
            newLinks.shift();
            setLinks(newLinks);
            console.log({ "nodes": iNodes, "links": links });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("no set");
    }
  }, [invitees, iUsernames]);
  
  
  return (
    <Box height="100%" width="100%">
      <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" marginLeft={6} color="#3a4037">Invites Relationship</Typography>

      <Box maxHeight="100%" maxWidth="100%" width="100%" height={currentHeight}>
        {iNodes.length > 0 && links.length > 0 && (<ResponsiveNetwork
          data={{ "nodes": iNodes, "links": links }}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          linkDistance={e=>e.distance}
          centeringStrength={0.3}
          repulsivity={6}
          nodeSize={n=>n.size}
          activeNodeSize={n=>1.5*n.size}
          nodeColor={e=>e.color}
          nodeBorderWidth={1}
          nodeBorderColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      0.8
                  ]
              ]
          }}
          linkThickness={n=>2+2*n.target.data.height}
          linkBlendMode="multiply"
          motionConfig="wobbly"
        />)}
      </Box>
      <Typography variant="p" fontFamily="'PT Sans Caption', sans-serif" marginLeft={6} color="#3a4037"><span style={{color: "#5dab3e", fontWeight: "600"}}>#Invites: {invitees.length} </span> | <span style={{color: "#bcd131", fontWeight:"600"}}> #Invites by Extention: </span></Typography>

    </Box>
  );
  }
export default InviteNetwork;