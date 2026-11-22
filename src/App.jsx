import { useState } from 'react'
import { menu } from './data/menu'

import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import AddEntry from './components/AddEntry'
import Calendar from './components/Calendar'
import MonthlyBill from './components/MonthlyBill'
import Settings from './components/Settings'

function App() {
  const [menuData, setMenuData] = useState(() => {
    const savedPrices =
      localStorage.getItem('messMatePrices')

    return savedPrices
      ? JSON.parse(savedPrices)
      : menu
  })

  const [entries, setEntries] = useState(() => {
    const savedEntries =
      localStorage.getItem('messMateEntries')

    return savedEntries
      ? JSON.parse(savedEntries)
      : []
  })

  const [activePage, setActivePage] =
    useState('home')

  const [editingDate, setEditingDate] =
    useState(null)


  function saveEntry(entry) {
    setEntries((previousEntries) => {
      const updatedEntries = [
        ...previousEntries.filter(
          (item) => item.date !== entry.date
        ),
        entry,
      ]

      localStorage.setItem(
        'messMateEntries',
        JSON.stringify(updatedEntries)
      )

      return updatedEntries
    })
  }


  function deleteEntry(date) {
    setEntries((previousEntries) => {
      const updatedEntries =
        previousEntries.filter(
          (item) => item.date !== date
        )

      localStorage.setItem(
        'messMateEntries',
        JSON.stringify(updatedEntries)
      )

      return updatedEntries
    })
  }


  function editEntry(date) {
    setEditingDate(date)
    setActivePage('add')
  }


  function cancelEdit() {
    setEditingDate(null)
    setActivePage('calendar')
  }


  return (
    <div>

      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      


      {activePage === 'home' && (
        <Dashboard
          entries={entries}
          menuData={menuData}
          setActivePage={setActivePage}
        />
      )}


      {activePage === 'add' && (
        <AddEntry
          menuData={menuData}
          entries={entries}
          saveEntry={saveEntry}
          editingDate={editingDate}
          setEditingDate={setEditingDate}
          cancelEdit={cancelEdit}
        />
      )}


      {activePage === 'calendar' && (
        <Calendar
          entries={entries}
          menuData={menuData}
          deleteEntry={deleteEntry}
          editEntry={editEntry}
        />
      )}


      {activePage === 'bill' && (
        <MonthlyBill
          entries={entries}
          menuData={menuData}
        />
      )}


      {activePage === 'settings' && (
        <Settings
          menuData={menuData}
          setMenuData={setMenuData}
        />
      )}

    </div>
  )
}

export default App