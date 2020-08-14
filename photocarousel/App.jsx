import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { useContext } from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import Gallery from './Gallery.jsx';
import Modal from './Modal.jsx';

// refactored class component to use hooks
const App = (props) => {
  // set state name and initial state
  const [listing, setListing] = useState([]);
  const [show, setShow] = useState(false);
  // set show to true when user click open
  const openModal = () => setShow(true);
  // set show to false when user click close
  const closeModal = () => setShow(false);
  // console.log('clientb', listing);

  useEffect(() => { // a hooks thing... similar to componentDidMount
    const queryID = window.location.search;
    // console.log('logged: window.location (url parameter) = ?id=10', queryID)
    const url = '/listing' + '/' + queryID;
    axios.get(url)
    .then((res) => {
      // console.log('client:succes geting db', res.data);
      setListing(res.data);
    })
    .catch((err) => {
      console.log('client: failed getting db', err);
    })
  }, []);

  if (listing.length == 0) {return null;}
  if (show === true) {
    return (
      <Modal
        list={listing[0]}
        closeModal={closeModal}
        show={show}
      />
    )
  }
  return (
      <MainWrapper>
        <Header list={listing[0]}/>
        <Gallery
          list={listing[0]}
          openModal={openModal}
          closeModal={closeModal}
          show={show}
        />
      </MainWrapper>
  )
}

const theme = {
  background: '#aaa',
  color: '#24292e'
};

const MainWrapper = styled.div`
  width: 70% ;
  margin: 0 auto;
  font-family: sans-serif, Roboto;
`;

export default App;
