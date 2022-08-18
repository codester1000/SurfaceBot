import React from "react";
import { CDBCard, CDBCardBody, CDBIcon, CDBContainer } from "cdbreact";

const TopCards = (props) => {
  return (
    <CDBContainer>
      <CDBCard style={{width: "100%"}} className="topcard">
        <CDBCardBody>
          <h3 className="lead card_title">{props.title}</h3>
          <h7 className="h3" tag="h3">{props.data}</h7>
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  );
};

export default TopCards