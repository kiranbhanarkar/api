import React from 'react'
import { useState, useEffect } from "react";
import { Container, Row, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import "./crypto.css"

function CryptoData() {
    const [crypto, setCrypto] = useState([]);

    useEffect(() => {
      axios
        .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
        .then((res) => setCrypto(res.data))
        .catch((err) => console.log(err));
    }, []);
  

  return (

    <Container>
    <Row>
      {crypto.length ? (
        crypto.map((crypto) => (
      

        <Card  style={{marginTop: "20px", borderStyle:"none"}} className="card">
        <Card.Body>
            
            <Card.Img
                variant="top"
                src={crypto.image}
                style={{ height: "30px", width:"30px" }}
              />
              <span className='name'>{crypto.name}</span>
              <span className='symbol'>{crypto.symbol}</span>
              <span className='cprice'>{"$"}{crypto.current_price}</span>
              <span className='tvolume'>{crypto.total_volume}</span>
              <span className='percent'>{(crypto.price_change_percentage_24h*100).toFixed(2)}{"%"}</span>
              <span className='mprice'>{"$"}{crypto.market_cap}</span>
              
              </Card.Body>
              <hr></hr>
         </Card>
        ))
      ) : (
        <Spinner
          animation="border"
          role="status"
          style={{ margin: "200px auto" }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </Row>
  </Container>
  )
}

export default CryptoData