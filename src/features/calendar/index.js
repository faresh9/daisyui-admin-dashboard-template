import { useState, useEffect } from 'react'
import CalendarView from '../../components/CalendarView'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { openRightDrawer } from '../common/rightDrawerSlice'
import { RIGHT_DRAWER_TYPES } from '../../utils/globalConstantUtil'
import { showNotification } from '../common/headerSlice'
import AddEventModal from '../../components/CalendarView/AddEventModal'

function Calendar(){

    const dispatch = useDispatch()

    const [events, setEvents] = useState([]) // Initialize events with an empty array
    const [isModalOpen, setIsModalOpen] = useState(false) // State to control the visibility of the modal

    // Fetch events from your backend when the component mounts
    // useEffect(() => {
    //     fetchEventsFromBackend().then(fetchedEvents => {
    //         setEvents(fetchedEvents)
    //     })
    // }, [])

    // Open the AddEventModal when a date is clicked
    const addNewEvent = (date) => {
        setIsModalOpen(true)
    }

    // Function to handle form submission from the AddEventModal
    const handleAddEvent = async (eventDetails) => {
        try{
        let newEventObj = {
            id: Math.floor(Math.random() * 1000000),
            title: eventDetails.title,
            theme: eventDetails.theme,      
            date: eventDetails.date,
        }
       
        
        console.log('Adding task:', newEventObj);
      const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEventObj),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const createdEvent = await response.json();
      setEvents([]);
      setEvents([...events, createdEvent]);
      dispatch(showNotification({message: "New Event Added!", status: 1}));
        setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error adding event:', error);
    }
    }

    const openDayDetail = ({filteredEvents, title}) => {
        dispatch(openRightDrawer({header: title, bodyType: RIGHT_DRAWER_TYPES.CALENDAR_EVENTS, extraObject: {filteredEvents}}))
    }

    return(
        <>
           <CalendarView 
                calendarEvents={events}
                addNewEvent={addNewEvent}
                openDayDetail={openDayDetail}
           />
           <AddEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddEvent={handleAddEvent} />
        </>
    )
}

export default Calendar