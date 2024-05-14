import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Swal from 'sweetalert2';
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import ReservationPDF from './ReservationPDF';
import { TbArrowBigUpLinesFilled } from "react-icons/tb";

const Reservation = () => {
  const [details, setDetails] = React.useState({
    firstName: '',
    lastName: '',
    date: '',
    time: '',
    email: '',
    phone: '',
    commaned: "",
    resto: ""
  });
  const [menu, setMenu] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smooth scrolling
    });
  };
  const handleReservation = async () => {
    try {
      // Check if any of the fields are empty
      if (!details.firstName || !details.lastName || !details.date || !details.time || !details.email || !details.phone) {
        // Show an error alert if any field is empty
        Swal.fire({
          title: 'Error!',
          text: 'Please fill in all fields before making a reservation.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        // All fields are filled, proceed with reservation confirmation
        Swal.fire({
          title: 'Reservation Successful!',
          text: 'Your reservation ticket is ready for download.',
          icon: 'success',
          confirmButtonText: 'Download Ticket'
        }).then(result => {
          if (result.isConfirmed) {
            // Clear the fields after "Download Ticket" button is clicked
            setDetails({
              firstName: '',
              lastName: '',
              date: '',
              time: '',
              email: '',
              phone: '',
              commaned: "",
              resto: "",
            });

            // User clicks on 'Download Ticket', trigger PDF download
            document.getElementById('download-pdf').click();
          }
        });
      }


      const res = await fetch('http://localhost:5000/api/reservation', {
        method: 'POST',
        body: JSON.stringify({
          nom: details.lastName,
          prenom: details.firstName,
          email: details.email,
          phone: details.phone,
          time: details.time,
          date: details.date,
          command: details.commaned,
          Restaurant: details.resto
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error)
    }

  };
  const fetchMenus = () => {
    fetch("http://localhost:5000/api/menus")
      .then(Response => Response.json())
      .then(data => setMenu(data))
  }
  const fetchRestaurants = () => {
    fetch("http://localhost:5000/api/restaurants")
      .then(Response => Response.json())
      .then(data => setRestaurants(data))
  }
  useEffect(() => {
    fetchMenus()
    fetchRestaurants()
  }, [])

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reservation.png" alt="res" />
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>MAKE A RESERVATION</h1>
            <p>For Further Questions, Please Call</p>
            <form>
              <div>
                <input type="text" placeholder="First Name" name="firstName" value={details.firstName} onChange={(e => setDetails({ ...details, firstName: e.target.value }))} />
                <input type="text" placeholder="Last Name" name="lastName" value={details.lastName} onChange={(e => setDetails({ ...details, lastName: e.target.value }))} />
              </div>
              <div>
                <input type="date" placeholder="Date" name="date" value={details.date} onChange={(e => setDetails({ ...details, date: e.target.value }))} />
                <input type="time" placeholder="Time" name="time" value={details.time} onChange={(e => setDetails({ ...details, time: e.target.value }))} />
              </div>
              <div>
                <input type="email" placeholder="Email" className="email_tag" name="email" value={details.email} onChange={(e => setDetails({ ...details, email: e.target.value }))} />
                <input type="number" placeholder="Phone" name="phone" value={details.phone} onChange={(e => setDetails({ ...details, phone: e.target.value }))} />
              </div>
              <div className='flex'>
                <div>
                  <select className="input-style" name="commaned" value={details.commaned} onChange={(e => setDetails({ ...details, commaned: e.target.value }))}>
                    <option>Select your Meal</option>
                    {
                      menu.map((m) => (
                        <option key={m.id}>{m.name}</option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <select name="resto" value={details.resto} onChange={(e => setDetails({ ...details, resto: e.target.value }))}>
                    <option>Select your restaurants</option>
                    {
                      restaurants.map((r) => (
                        <option key={r.id}>{r.name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <button type="button" style={{ cursor: "pointer" }} onClick={handleReservation}>
                RESERVE NOW <span><HiOutlineArrowNarrowRight /></span>
              </button>
              <PDFDownloadLink
                document={<ReservationPDF details={details} />}
                fileName="reservation_ticket.pdf"
                style={{ display: 'none' }}
                id="download-pdf"
              >
                Download PDF
              </PDFDownloadLink>
            </form>
          </div>
        </div>
        <div
          style={{
            borderRadius: "50%",
            width: "60px", // Increased the width to fit padding
            height: "60px", // Set height to maintain circle shape
            backgroundColor: "#e5bcbe",
            padding: "20px",
            display: 'flex', // Added to center the icon
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer', // Cursor as pointer indicates clickable item
            position: "relative",
            marginTop: "600px",
            marginLeft: "10px"
          }}
          onClick={scrollToTop} // Added click event to perform action
        >
          <TbArrowBigUpLinesFilled size={24} />
        </div>
      </div>
    </section >
  );
};

export default Reservation;
